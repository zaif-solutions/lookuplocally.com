/**
 * Shared TypeScript types for the business directory
 */

export interface Business {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
  address?: string;
  phone?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

/** Home hero carousel slide — data lives in lib/data/home.ts */
export interface HeroSlide {
  id: string;
  image: string;
  heading: string;
  /** Optional sub-headline shown under `heading` (1–2 short lines). */
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  /** Bottom-left photo credit, e.g. business name shown in the photo */
  photoCredit?: string;
}
