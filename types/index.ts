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
