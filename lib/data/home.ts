import type { Business, HeroSlide } from "@/types";

export const homeHeroSlides: HeroSlide[] = [
  {
    id: "cleaners",
    image:
      "https://images.unsplash.com/photo-1686178827149-6d55c72d81df?w=1920&h=1080&fit=crop&q=82",
    heading: "Get a deep clean",
    description:
      "Vetted cleaners with transparent pricing and reviews from neighbors who actually hired them.",
    ctaLabel: "Cleaners",
    ctaHref: "/search?q=cleaners",
    photoCredit: "Sparkle & Shine Cleaners",
  },
  {
    id: "restaurants",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&q=82",
    heading: "Discover great dining",
    description:
      "Real diner reviews, curated by cuisine and ambience — find your next favorite spot in minutes.",
    ctaLabel: "Restaurants",
    ctaHref: "/search?q=restaurants",
    photoCredit: "Harbour Master Cafe",
  },
  {
    id: "plumbers",
    image:
      "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?w=1920&h=1080&fit=crop&q=82",
    heading: "Find trusted plumbers",
    description:
      "Licensed pros for leaks, water heaters, and remodels. Compare response times and credentials first.",
    ctaLabel: "Plumbers",
    ctaHref: "/search?q=plumbers",
    photoCredit: "Dynamic Maintenance Solutions",
  },
  {
    id: "beauty",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1920&h=1080&fit=crop&q=82",
    heading: "Look your best",
    description:
      "Browse stylist portfolios, read chair-side reviews, and book cuts, color, and spa with confidence.",
    ctaLabel: "Hair Salons",
    ctaHref: "/search?q=hair-salons",
    photoCredit: "The Salt Room",
  },
];

const ISO_STUB = "2024-01-01T00:00:00.000Z";

export const homeRecentActivity: {
  activityLabel: string;
  activityTime: string;
  business: Business;
}[] = [
  {
    activityLabel: "Yi Z. added 7 photos",
    activityTime: "1 year ago",
    business: {
      id: "act-1",
      name: "Harbour Master Cafe",
      slug: "harbour-master-cafe",
      category: "Cafes",
      address: "Waterfront District",
      rating: 4.6,
      reviewCount: 128,
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
      createdAt: ISO_STUB,
      updatedAt: ISO_STUB,
    },
  },
  {
    activityLabel: "Diana C. wrote a review",
    activityTime: "1 year ago",
    business: {
      id: "act-2",
      name: "Cafe Luna",
      slug: "cafe-luna",
      category: "Coffee & Tea",
      address: "Downtown",
      rating: 4.8,
      reviewCount: 214,
      imageUrl:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      createdAt: ISO_STUB,
      updatedAt: ISO_STUB,
    },
  },
  {
    activityLabel: "Diana C. added a photo",
    activityTime: "1 year ago",
    business: {
      id: "act-3",
      name: "Dynamic Maintenance Solutions",
      slug: "dynamic-maintenance-solutions",
      category: "Home Services",
      address: "Metro area",
      rating: 4.9,
      reviewCount: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
      createdAt: ISO_STUB,
      updatedAt: ISO_STUB,
    },
  },
];
