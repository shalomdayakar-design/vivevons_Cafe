export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
export type ItemAvailability = 'AVAILABLE' | 'SOLD_OUT' | 'HIDDEN';
export type IdeaStatus = 'PENDING' | 'APPROVED' | 'HIDDEN';
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  creativeName: string; // e.g. THE FIRST DRAFT
  normalName: string; // e.g. CAPPUCCINO
  price: string; // e.g. "$5.50" or "180"
  category: string; // 'coffee' | 'tea' | 'cold-drinks' | 'pizzas' | 'burgers' | 'pasta' | 'snacks' | 'signatures'
  description: string;
  image?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isFeatured?: boolean;
  availability: ItemAvailability;
  displayOrder?: number;
  dietary?: string[];
  deletedAt?: string | null;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'interior' | 'coffee' | 'food' | 'tables' | 'details' | 'people' | 'exterior';
  image: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  altText?: string;
  displayOrder?: number;
  isPublished: boolean;
  isFeatured?: boolean;
}

export interface TableChapter {
  id: string;
  number: string; // "01", "02", etc.
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  image: string;
  idealFor: string[];
  displayOrder?: number;
}

export interface IdeaNote {
  id: string;
  author: string;
  title: string;
  message: string;
  category: 'dream' | 'project' | 'life' | 'creative';
  createdAt: string;
  likes: number;
  color: string;
  status: IdeaStatus;
}

export interface Reservation {
  id: string;
  bookingRef: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  tablePreference: string;
  specialNotes?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  adminId?: string;
  adminEmail: string;
  adminRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
}

export interface ContactDetails {
  address: string;
  city: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapsUrl: string;
}

export interface OpeningHour {
  dayName: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface HeroSectionContent {
  brandTitle: string;
  headline: string;
  subtitle: string;
  description: string;
  ctaTextPrimary: string;
  ctaTextSecondary: string;
  bgImage: string;
}

export interface BrandStoryContent {
  heading: string;
  quote: string;
  p1: string;
  p2: string;
  p3: string;
  founderQuote: string;
  image: string;
}

export interface SignatureWallContent {
  headingLine1: string;
  headingLine2: string;
  subtext: string;
  notes: { text: string; tag: string; crossed?: boolean }[];
}

export interface SectionVisibility {
  hero: boolean;
  story: boolean;
  moreThanCoffee: boolean;
  fiveTables: boolean;
  menu: boolean;
  signatureWall: boolean;
  ideaWall: boolean;
  gallery: boolean;
  reservation: boolean;
  location: boolean;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  twitterCard: string;
}

export interface BrandSettings {
  logoUrl: string;
  brandName: string;
  tagline: string;
  conceptTagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}
