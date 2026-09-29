-- ====================================================
-- VIVEVONS CAFÉ DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ====================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & TYPES
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR');
CREATE TYPE item_availability AS ENUM ('AVAILABLE', 'SOLD_OUT', 'HIDDEN');
CREATE TYPE idea_status AS ENUM ('PENDING', 'APPROVED', 'HIDDEN');
CREATE TYPE reservation_status AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE content_status AS ENUM ('DRAFT', 'PUBLISHED');

-- 3. PROFILES / ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'EDITOR',
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. MENU CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.menu_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creative_name TEXT NOT NULL,
    normal_name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id TEXT NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    image_url TEXT,
    is_vegetarian BOOLEAN NOT NULL DEFAULT true,
    is_spicy BOOLEAN NOT NULL DEFAULT false,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    availability item_availability NOT NULL DEFAULT 'AVAILABLE',
    display_order INT NOT NULL DEFAULT 0,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    caption TEXT,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    storage_path TEXT,
    alt_text TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. FIVE TABLES CHAPTERS TABLE
CREATE TABLE IF NOT EXISTS public.five_tables (
    id TEXT PRIMARY KEY,
    number_code TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    quote TEXT NOT NULL,
    image_url TEXT NOT NULL,
    ideal_for TEXT[] NOT NULL DEFAULT '{}',
    display_order INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. WEBSITE SECTIONS (DRAFT/PUBLISH CONTENT)
CREATE TABLE IF NOT EXISTS public.website_sections (
    section_key TEXT PRIMARY KEY,
    content_draft JSONB NOT NULL,
    content_published JSONB NOT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    last_published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. CONTACT & LOCATION DETAILS TABLE
CREATE TABLE IF NOT EXISTS public.contact_details (
    id INT PRIMARY KEY DEFAULT 1,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    google_maps_url TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. OPENING HOURS TABLE
CREATE TABLE IF NOT EXISTS public.opening_hours (
    day_name TEXT PRIMARY KEY,
    open_time TEXT NOT NULL,
    close_time TEXT NOT NULL,
    is_closed BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0
);

-- 11. IDEA WALL POSTS TABLE
CREATE TABLE IF NOT EXISTS public.idea_wall_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'dream',
    card_color TEXT NOT NULL DEFAULT 'cream',
    likes_count INT NOT NULL DEFAULT 1,
    status idea_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_ref TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guest_count INT NOT NULL DEFAULT 2,
    table_preference TEXT NOT NULL,
    special_requests TEXT,
    status reservation_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. AUDIT ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES public.profiles(id),
    admin_email TEXT NOT NULL,
    admin_role user_role NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. CONTENT VERSIONS HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.content_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    changed_by_email TEXT NOT NULL,
    previous_snapshot JSONB NOT NULL,
    new_snapshot JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.five_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_wall_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS POLICIES
CREATE POLICY "Public users can read published menu items" ON public.menu_items FOR SELECT USING (deleted_at IS NULL AND availability != 'HIDDEN');
CREATE POLICY "Public users can read published gallery" ON public.gallery_images FOR SELECT USING (is_published = true);
CREATE POLICY "Public users can read five tables" ON public.five_tables FOR SELECT USING (true);
CREATE POLICY "Public users can read website sections" ON public.website_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public users can read contact details" ON public.contact_details FOR SELECT USING (true);
CREATE POLICY "Public users can read opening hours" ON public.opening_hours FOR SELECT USING (true);
CREATE POLICY "Public users can read approved ideas" ON public.idea_wall_posts FOR SELECT USING (status = 'APPROVED');
CREATE POLICY "Public users can insert reservations" ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public users can insert ideas" ON public.idea_wall_posts FOR INSERT WITH CHECK (status = 'PENDING');

-- ADMIN ALL ACCESS POLICIES (AUTHENTICATED ADMINS ONLY)
CREATE POLICY "Admins full access to menu" ON public.menu_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to gallery" ON public.gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to sections" ON public.website_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to reservations" ON public.reservations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to ideas" ON public.idea_wall_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to logs" ON public.activity_logs FOR ALL USING (auth.role() = 'authenticated');
