import { BusinessCard } from "@/components/business/BusinessCard";
import { CONTENT_GUTTER, CONTENT_MAX } from "@/lib/content-layout";
import { cn } from "@/lib/utils";
import type { Business } from "@/types";
import { HeroCarousel } from "./HeroCarousel";
import type { HeroSlide } from "./HeroCarousel";

const heroSlides: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1686178827149-6d55c72d81df?w=1920&h=1080&fit=crop&q=80",
    heading: "Get a deep clean",
    ctaLabel: "Cleaners",
    ctaHref: "/search?q=cleaners",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&q=80",
    heading: "Discover great dining",
    ctaLabel: "Restaurants",
    ctaHref: "/search?q=restaurants",
  },
  {
    image:
      "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?w=1920&h=1080&fit=crop&q=80",
    heading: "Find trusted plumbers",
    ctaLabel: "Plumbers",
    ctaHref: "/search?q=plumbers",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=1920&h=1080&fit=crop&q=80",
    heading: "Look your best",
    ctaLabel: "Hair Salons",
    ctaHref: "/search?q=hair-salons",
  },
];

const ISO_STUB = "2024-01-01T00:00:00.000Z";

const recentActivity: {
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

export function Hero2() {
  return (
    <>
      <HeroCarousel slides={heroSlides} interval={6000} />

      <section
        className="bg-background py-10 sm:py-12 lg:py-14"
        aria-labelledby="recent-activity-heading"
      >
        <div className={cn(CONTENT_MAX, CONTENT_GUTTER)}>
          <h3
            id="recent-activity-heading"
            className="mb-8 text-center font-display text-3xl font-bold text-foreground sm:mb-10 sm:text-4xl lg:mb-12"
          >
            Recent Activity
          </h3>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
            {recentActivity.map(({ activityLabel, activityTime, business }) => (
              <li key={business.id} className="flex min-h-0 flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {activityLabel}
                  </span>
                  <span className="mx-1.5 text-border" aria-hidden>
                    ·
                  </span>
                  <time dateTime={business.updatedAt}>{activityTime}</time>
                </p>
                <BusinessCard business={business} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
