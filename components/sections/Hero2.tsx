import { BusinessCard } from "@/components/business/BusinessCard";
import { HOME_HERO_OVERLAP, PAGE_SHELL } from "@/lib/content-layout";
import { homeHeroSlides, homeRecentActivity } from "@/lib/data/home";
import { HeroCarousel } from "./HeroCarousel";

export function Hero2() {
  return (
    <>
      <div className={HOME_HERO_OVERLAP}>
        <HeroCarousel slides={homeHeroSlides} interval={6000} />
      </div>

      <section
        className="bg-background py-10 sm:py-12 lg:py-14"
        aria-labelledby="recent-activity-heading"
      >
        <div className={PAGE_SHELL}>
          <h3
            id="recent-activity-heading"
            className="mb-8 text-center font-display text-3xl font-bold text-foreground sm:mb-10 sm:text-4xl lg:mb-12"
          >
            Recent Activity
          </h3>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
            {homeRecentActivity.map(({ activityLabel, activityTime, business }) => (
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
