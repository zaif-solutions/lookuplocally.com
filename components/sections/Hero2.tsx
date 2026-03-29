import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "@/components/ui/Icon";
import { BusinessCard } from "@/components/business/BusinessCard";
import { CONTENT_GUTTER, CONTENT_MAX } from "@/lib/content-layout";
import { cn } from "@/lib/utils";
import type { Business } from "@/types";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=900&fit=crop";

const ISO_STUB = "2024-01-01T00:00:00.000Z";

/** Featured businesses shown under “Recent activity” — each row is user context + `BusinessCard`. */
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
      <section
        className="relative isolate  w-full overflow-hidden h-[80vh] md:min-h-[500px]"
        aria-labelledby="hero2-heading"
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        <div
          className={cn(
            "relative flex h-full w-full flex-col justify-center",
            CONTENT_MAX,
            CONTENT_GUTTER,
          )}
        >
          <div className="w-full min-w-0">
            <h2
              id="hero2-heading"
              className="mb-6 max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            >
              Get a deep clean
            </h2>
            <Link
              href="/search?q=cleaners"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 sm:text-base"
            >
              <Sparkles className="size-5 shrink-0" aria-hidden />
              Cleaners
            </Link>
          </div>
        </div>
      </section>

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
