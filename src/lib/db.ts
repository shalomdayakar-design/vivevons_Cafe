import {
  MenuItem,
  GalleryItem,
  TableChapter,
  IdeaNote,
  Reservation,
  ActivityLog,
  ContactDetails,
  OpeningHour,
  HeroSectionContent,
  BrandStoryContent,
  SignatureWallContent,
  SectionVisibility,
  SeoSettings,
  BrandSettings,
  AdminUser,
} from '../types';

import { MENU_ITEMS as DEFAULT_MENU } from '../data/menuData';
import { GALLERY_ITEMS as DEFAULT_GALLERY } from '../data/galleryData';
import { FIVE_TABLES as DEFAULT_TABLES } from '../data/tablesData';
import { INITIAL_IDEAS as DEFAULT_IDEAS } from '../data/initialIdeas';

// Initial Seed Data
const DEFAULT_CONTACT: ContactDetails = {
  address: '428 Sanctuary Lane, Creative District',
  city: 'Metropolis, MP 10001',
  phone: '+1 (555) 848-3866',
  email: 'hello@vivevons.com',
  whatsapp: '+15558483866',
  instagramUrl: 'https://instagram.com/vivevons',
  facebookUrl: 'https://facebook.com/vivevons',
  googleMapsUrl: 'https://maps.google.com',
};

const DEFAULT_HOURS: OpeningHour[] = [
  { dayName: 'Monday', openTime: '07:30', closeTime: '22:00', isClosed: false },
  { dayName: 'Tuesday', openTime: '07:30', closeTime: '22:00', isClosed: false },
  { dayName: 'Wednesday', openTime: '07:30', closeTime: '22:00', isClosed: false },
  { dayName: 'Thursday', openTime: '07:30', closeTime: '22:00', isClosed: false },
  { dayName: 'Friday', openTime: '07:30', closeTime: '22:00', isClosed: false },
  { dayName: 'Saturday', openTime: '08:00', closeTime: '23:00', isClosed: false },
  { dayName: 'Sunday', openTime: '08:00', closeTime: '23:00', isClosed: false },
];

const DEFAULT_HERO: HeroSectionContent = {
  brandTitle: 'VIVEVONS',
  headline: 'THE CAFÉ OF SECOND CHANCES',
  subtitle: '“More Than Just a Café.”',
  description: 'A place for unfinished dreams and fresh beginnings.',
  ctaTextPrimary: 'EXPLORE THE MENU',
  ctaTextSecondary: 'RESERVE A TABLE',
  bgImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop',
};

const DEFAULT_STORY: BrandStoryContent = {
  heading: 'EVERY IDEA STARTS SOMEWHERE.',
  quote: '“Once, there was a boy with a mind full of ideas.”',
  p1: 'He dreamed of doing many things. Some worked. Some didn’t. Some never made it past his notebook.',
  p2: '“But every failure left him with something new — a lesson, a different perspective, or another idea.”',
  p3: 'One day, he decided to turn his little dream into a place of its own. A place where coffee meets creativity, where conversations become ideas, and where unfinished dreams are always welcome.',
  founderQuote: 'A café built by a boy who didn’t stop dreaming.',
  image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
};

const DEFAULT_SIGNATURE_WALL: SignatureWallContent = {
  headingLine1: 'FAILED IDEAS.',
  headingLine2: 'NEW BEGINNINGS.',
  subtext: 'Inside VIVEVONS, our main wall is covered in physical notes, crossed-out blue-prints, coffee-stained sketches, and brave declarations.',
  notes: [
    { text: 'Draft 01: A mobile app for antique collectors. (Scrapped 2024)', tag: 'CROSSED OUT', crossed: true },
    { text: '☕ + 💡 = VIVEVONS', tag: 'THE SPARK' },
    { text: '“Fail faster, brew stronger, start again.”', tag: 'CHAPTER 01' },
    { text: '★ ★ ★ ★ ★ "The place where my 2nd startup was born."', tag: 'GUEST NOTE' },
  ],
};

const DEFAULT_VISIBILITY: SectionVisibility = {
  hero: true,
  story: true,
  moreThanCoffee: true,
  fiveTables: true,
  menu: true,
  signatureWall: true,
  ideaWall: true,
  gallery: true,
  reservation: true,
  location: true,
};

const DEFAULT_SEO: SeoSettings = {
  siteTitle: 'VIVEVONS | More Than Just a Café — The Café of Second Chances',
  metaDescription: 'VIVEVONS is more than just a café — a warm creative space where coffee meets creativity, conversations become ideas, and unfinished dreams are welcome.',
  keywords: 'VIVEVONS, luxury cafe, specialty coffee, second chances, boutique cafe, creative space',
  ogImage: '/logo.jpg',
  twitterCard: 'summary_large_image',
};

const DEFAULT_BRAND: BrandSettings = {
  logoUrl: '/logo.jpg',
  brandName: 'VIVEVONS',
  tagline: 'MORE THAN JUST A CAFÉ',
  conceptTagline: 'The Café of Second Chances',
  primaryColor: '#263F32',
  secondaryColor: '#5A402B',
  accentColor: '#B96F4A',
};

const DEFAULT_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    email: 'owner@vivevons.com',
    fullName: 'Founder & Owner',
    role: 'SUPER_ADMIN',
    isActive: true,
    lastLoginAt: 'Just now',
    createdAt: '2026-01-01',
  },
  {
    id: 'usr-2',
    email: 'manager@vivevons.com',
    fullName: 'Café General Manager',
    role: 'ADMIN',
    isActive: true,
    lastLoginAt: '2 hours ago',
    createdAt: '2026-02-15',
  },
  {
    id: 'usr-3',
    email: 'editor@vivevons.com',
    fullName: 'Content Curator',
    role: 'EDITOR',
    isActive: true,
    lastLoginAt: 'Yesterday',
    createdAt: '2026-03-01',
  },
];

const DEFAULT_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    bookingRef: 'VV-849201',
    customerName: 'Sophia Vance',
    phone: '+1 (555) 392-1982',
    email: 'sophia.vance@example.com',
    date: '2026-10-02',
    time: '10:30',
    guests: 2,
    tablePreference: '02 — THE NOTEBOOK',
    specialNotes: 'Window seat preferred for reading.',
    status: 'CONFIRMED',
    createdAt: '2026-09-27 14:30',
  },
  {
    id: 'res-102',
    bookingRef: 'VV-772819',
    customerName: 'Julian Thorne',
    phone: '+1 (555) 491-0023',
    email: 'j.thorne@creative.io',
    date: '2026-10-02',
    time: '18:30',
    guests: 4,
    tablePreference: '04 — THE CONVERSATION',
    specialNotes: 'Co-founder strategy meeting.',
    status: 'PENDING',
    createdAt: '2026-09-28 09:15',
  },
];

// Database Engine Class with Event Subscribers
class DatabaseEngine {
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initDefaults();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  private getItem<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(`vv_${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`vv_${key}`, JSON.stringify(value));
      this.notify();
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  private initDefaults() {
    if (!localStorage.getItem('vv_initialized')) {
      this.setItem('menu', DEFAULT_MENU);
      this.setItem('gallery', DEFAULT_GALLERY);
      this.setItem('tables', DEFAULT_TABLES);
      this.setItem('ideas', DEFAULT_IDEAS.map(i => ({ ...i, status: 'APPROVED' })));
      this.setItem('contact', DEFAULT_CONTACT);
      this.setItem('hours', DEFAULT_HOURS);
      this.setItem('hero', DEFAULT_HERO);
      this.setItem('story', DEFAULT_STORY);
      this.setItem('signature_wall', DEFAULT_SIGNATURE_WALL);
      this.setItem('visibility', DEFAULT_VISIBILITY);
      this.setItem('seo', DEFAULT_SEO);
      this.setItem('brand', DEFAULT_BRAND);
      this.setItem('users', DEFAULT_USERS);
      this.setItem('reservations', DEFAULT_RESERVATIONS);
      this.setItem('activity_logs', [
        {
          id: 'log-1',
          adminEmail: 'owner@vivevons.com',
          adminRole: 'SUPER_ADMIN',
          action: 'SYSTEM_INITIALIZED',
          details: 'VIVEVONS CMS Engine deployed successfully.',
          timestamp: new Date().toISOString(),
        },
      ]);
      localStorage.setItem('vv_initialized', 'true');
    }
  }

  // --- MENU METHODS ---
  public getMenuItems(includeHidden = false): MenuItem[] {
    const items: MenuItem[] = this.getItem('menu', DEFAULT_MENU);
    return items.filter((item) => {
      if (item.deletedAt) return false;
      if (!includeHidden && item.availability === 'HIDDEN') return false;
      return true;
    });
  }

  public getAllMenuItemsAdmin(): MenuItem[] {
    return this.getItem('menu', DEFAULT_MENU);
  }

  public saveMenuItem(item: Partial<MenuItem>): MenuItem {
    const items = this.getAllMenuItemsAdmin();
    let updatedItem: MenuItem;
    if (item.id) {
      const idx = items.findIndex((i) => i.id === item.id);
      updatedItem = { ...items[idx], ...item } as MenuItem;
      items[idx] = updatedItem;
    } else {
      updatedItem = {
        id: `item-${Date.now()}`,
        creativeName: item.creativeName || 'NEW CREATION',
        normalName: item.normalName || 'ITEM',
        price: item.price || '$5.00',
        category: item.category || 'coffee',
        description: item.description || '',
        image: item.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
        availability: item.availability || 'AVAILABLE',
        isVegetarian: item.isVegetarian ?? true,
        isSpicy: item.isSpicy ?? false,
        isFeatured: item.isFeatured ?? false,
      };
      items.unshift(updatedItem);
    }
    this.setItem('menu', items);
    return updatedItem;
  }

  public toggleItemAvailability(id: string, availability: 'AVAILABLE' | 'SOLD_OUT' | 'HIDDEN') {
    const items = this.getAllMenuItemsAdmin();
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) {
      items[idx].availability = availability;
      this.setItem('menu', items);
    }
  }

  public deleteMenuItem(id: string, softDelete = true) {
    let items = this.getAllMenuItemsAdmin();
    if (softDelete) {
      items = items.map((i) => (i.id === id ? { ...i, deletedAt: new Date().toISOString() } : i));
    } else {
      items = items.filter((i) => i.id !== id);
    }
    this.setItem('menu', items);
  }

  // --- GALLERY METHODS ---
  public getGalleryImages(publishedOnly = false): GalleryItem[] {
    const gallery: GalleryItem[] = this.getItem('gallery', DEFAULT_GALLERY);
    if (publishedOnly) {
      return gallery.filter((g) => g.isPublished);
    }
    return gallery;
  }

  public saveGalleryImage(img: Partial<GalleryItem>): GalleryItem {
    const gallery = this.getGalleryImages(false);
    let updated: GalleryItem;
    if (img.id) {
      const idx = gallery.findIndex((g) => g.id === img.id);
      updated = { ...gallery[idx], ...img } as GalleryItem;
      gallery[idx] = updated;
    } else {
      updated = {
        id: `gal-${Date.now()}`,
        title: img.title || 'Untitled Photo',
        caption: img.caption || '',
        category: img.category || 'interior',
        image: img.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
        isPublished: img.isPublished ?? true,
        isFeatured: img.isFeatured ?? false,
      };
      gallery.unshift(updated);
    }
    this.setItem('gallery', gallery);
    return updated;
  }

  public deleteGalleryImage(id: string) {
    const gallery = this.getGalleryImages(false).filter((g) => g.id !== id);
    this.setItem('gallery', gallery);
  }

  // --- FIVE TABLES METHODS ---
  public getFiveTables(): TableChapter[] {
    return this.getItem('tables', DEFAULT_TABLES);
  }

  public saveFiveTable(table: TableChapter) {
    const tables = this.getFiveTables();
    const idx = tables.findIndex((t) => t.id === table.id);
    if (idx !== -1) {
      tables[idx] = table;
      this.setItem('tables', tables);
    }
  }

  // --- IDEA WALL METHODS ---
  public getIdeas(statusFilter?: 'ALL' | 'PENDING' | 'APPROVED' | 'HIDDEN'): IdeaNote[] {
    const ideas: IdeaNote[] = this.getItem('ideas', DEFAULT_IDEAS.map(i => ({ ...i, status: 'APPROVED' as any })));
    if (statusFilter && statusFilter !== 'ALL') {
      return ideas.filter((i) => i.status === statusFilter);
    }
    return ideas;
  }

  public submitIdea(note: Omit<IdeaNote, 'id' | 'createdAt' | 'likes' | 'status'>): IdeaNote {
    const ideas = this.getIdeas('ALL');
    const newIdea: IdeaNote = {
      ...note,
      id: `idea-${Date.now()}`,
      createdAt: 'Just now',
      likes: 1,
      status: 'PENDING',
    };
    ideas.unshift(newIdea);
    this.setItem('ideas', ideas);
    return newIdea;
  }

  public updateIdeaStatus(id: string, status: 'PENDING' | 'APPROVED' | 'HIDDEN') {
    const ideas = this.getIdeas('ALL');
    const idx = ideas.findIndex((i) => i.id === id);
    if (idx !== -1) {
      ideas[idx].status = status;
      this.setItem('ideas', ideas);
    }
  }

  public deleteIdea(id: string) {
    const ideas = this.getIdeas('ALL').filter((i) => i.id !== id);
    this.setItem('ideas', ideas);
  }

  // --- RESERVATIONS METHODS ---
  public getReservations(statusFilter?: string): Reservation[] {
    const res: Reservation[] = this.getItem('reservations', DEFAULT_RESERVATIONS);
    if (statusFilter && statusFilter !== 'ALL') {
      return res.filter((r) => r.status === statusFilter);
    }
    return res;
  }

  public submitReservation(data: Omit<Reservation, 'id' | 'bookingRef' | 'status' | 'createdAt'>): Reservation {
    const list = this.getReservations('ALL');
    const newRes: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      bookingRef: `VV-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'PENDING',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    list.unshift(newRes);
    this.setItem('reservations', list);
    return newRes;
  }

  public updateReservationStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') {
    const list = this.getReservations('ALL');
    const idx = list.findIndex((r) => r.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      this.setItem('reservations', list);
    }
  }

  public deleteReservation(id: string) {
    const list = this.getReservations('ALL').filter((r) => r.id !== id);
    this.setItem('reservations', list);
  }

  // --- SECTION CONTENT METHODS (HERO, STORY, SIGNATURE WALL) ---
  public getHeroSection(): HeroSectionContent {
    return this.getItem('hero', DEFAULT_HERO);
  }

  public saveHeroSection(hero: HeroSectionContent) {
    this.setItem('hero', hero);
  }

  public getBrandStorySection(): BrandStoryContent {
    return this.getItem('story', DEFAULT_STORY);
  }

  public saveBrandStorySection(story: BrandStoryContent) {
    this.setItem('story', story);
  }

  public getSignatureWallSection(): SignatureWallContent {
    return this.getItem('signature_wall', DEFAULT_SIGNATURE_WALL);
  }

  public saveSignatureWallSection(wall: SignatureWallContent) {
    this.setItem('signature_wall', wall);
  }

  // --- VISIBILITY, CONTACT, HOURS, SEO & BRAND SETTINGS ---
  public getSectionVisibility(): SectionVisibility {
    return this.getItem('visibility', DEFAULT_VISIBILITY);
  }

  public saveSectionVisibility(visibility: SectionVisibility) {
    this.setItem('visibility', visibility);
  }

  public getContactDetails(): ContactDetails {
    return this.getItem('contact', DEFAULT_CONTACT);
  }

  public saveContactDetails(contact: ContactDetails) {
    this.setItem('contact', contact);
  }

  public getOpeningHours(): OpeningHour[] {
    return this.getItem('hours', DEFAULT_HOURS);
  }

  public saveOpeningHours(hours: OpeningHour[]) {
    this.setItem('hours', hours);
  }

  public getSeoSettings(): SeoSettings {
    return this.getItem('seo', DEFAULT_SEO);
  }

  public saveSeoSettings(seo: SeoSettings) {
    this.setItem('seo', seo);
  }

  public getBrandSettings(): BrandSettings {
    return this.getItem('brand', DEFAULT_BRAND);
  }

  public saveBrandSettings(brand: BrandSettings) {
    this.setItem('brand', brand);
  }

  // --- ADMIN USERS & AUDIT LOGS ---
  public getAdminUsers(): AdminUser[] {
    return this.getItem('users', DEFAULT_USERS);
  }

  public saveAdminUser(user: Partial<AdminUser>): AdminUser {
    const users = this.getAdminUsers();
    let updated: AdminUser;
    if (user.id) {
      const idx = users.findIndex((u) => u.id === user.id);
      updated = { ...users[idx], ...user } as AdminUser;
      users[idx] = updated;
    } else {
      updated = {
        id: `usr-${Date.now()}`,
        email: user.email || 'newadmin@vivevons.com',
        fullName: user.fullName || 'Admin User',
        role: user.role || 'EDITOR',
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      users.push(updated);
    }
    this.setItem('users', users);
    return updated;
  }

  public toggleUserStatus(id: string) {
    const users = this.getAdminUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      users[idx].isActive = !users[idx].isActive;
      this.setItem('users', users);
    }
  }

  public getActivityLogs(): ActivityLog[] {
    return this.getItem('activity_logs', []);
  }

  public logActivity(adminEmail: string, role: any, action: string, details: string) {
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      adminEmail,
      adminRole: role,
      action,
      details,
      timestamp: new Date().toLocaleString(),
    };
    logs.unshift(newLog);
    this.setItem('activity_logs', logs.slice(0, 100)); // keep last 100 entries
  }
}

export const db = new DatabaseEngine();
