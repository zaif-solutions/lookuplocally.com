import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { CONTENT_GUTTER, CONTENT_MAX } from "@/lib/content-layout";
import { SITE_NAME } from "@/lib/constants";

export function Hero() {
  return (
    <section
      className="relative isolate w-full max-w-[100vw] overflow-x-hidden bg-neutral-950 text-white"
      aria-labelledby="hero-heading"
    >
      <Image
        src="/hero-slides/painter.jpg"
        alt="Professional painting a wall"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="pointer-events-none absolute inset-0 z-2 bg-linear-to-b from-black/75 via-black/35 to-black/70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-2 bg-linear-to-r from-black/70 via-black/40 to-black/10"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 flex min-h-[min(85dvh,880px)] flex-col justify-center pb-10 pt-28 sm:min-h-[min(88dvh,840px)] sm:pb-16 sm:pt-32 md:pt-36 lg:pb-20 lg:pt-40",
          CONTENT_MAX,
          CONTENT_GUTTER,
        )}
      >
        <div className="grid items-stretch gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_min(100%,24rem)] lg:items-end xl:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="min-w-0 max-w-3xl">
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm sm:text-xs">
              <Star className="size-3.5 shrink-0" aria-hidden />
              <span className="line-clamp-2 sm:line-clamp-none">
                Trusted local discovery platform
              </span>
            </p>
            <h1
              id="hero-heading"
              className="mt-4 font-display text-[1.75rem] font-bold leading-[1.08] tracking-tight text-white min-[400px]:text-[2rem] sm:mt-5 sm:text-4xl sm:leading-[1.06] md:text-5xl lg:text-6xl"
            >
              Find the right local business in minutes.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base md:text-lg">
              Compare real reviews, check service quality, and connect with
              top-rated businesses near you - all in one trusted place.
            </p>

            <p className="mt-6 text-sm text-white/75 sm:mt-8">
              Use the search bar at the top to find businesses and services near
              you.
            </p>
            <Link
              href="/search"
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              Go to search
              <ChevronRight className="size-4 shrink-0" aria-hidden />
            </Link>

            <div className="mt-6 flex flex-col gap-2 text-xs text-white/80 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 sm:text-sm">
              <span>1.2M+ monthly visitors</span>
              <span className="hidden sm:inline" aria-hidden>
                ·
              </span>
              <span>250K+ verified reviews</span>
              <span className="hidden sm:inline" aria-hidden>
                ·
              </span>
              <span>100+ categories</span>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:p-6">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Why people choose {SITE_NAME}
            </h2>
            <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-white/85 sm:mt-4 sm:gap-3">
              <li>Verified review moderation to reduce fake ratings.</li>
              <li>Faster response rates from active local businesses.</li>
              <li>Location-aware search built for neighborhood intent.</li>
              <li>Transparent business profiles with recent updates.</li>
            </ul>
            <Link
              href="/biz"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/90"
            >
              Browse all categories
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
