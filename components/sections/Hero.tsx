import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { CONTENT_GUTTER, CONTENT_MAX } from "@/lib/content-layout";
import { SITE_NAME } from "@/lib/constants";

export function Hero() {
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-neutral-950 text-white"
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
          "relative z-10 flex min-h-[min(90vh,840px)] flex-col justify-center pb-14 pt-36 sm:pb-20 sm:pt-40",
          CONTENT_MAX,
          CONTENT_GUTTER,
        )}
      >
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.08em] uppercase text-white/90 backdrop-blur-sm">
              <Star className="size-3.5" aria-hidden />
              Trusted local discovery platform
            </p>
            <h1
              id="hero-heading"
              className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Find the right local business in minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Compare real reviews, check service quality, and connect with
              top-rated businesses near you - all in one trusted place.
            </p>

            <p className="mt-8 text-sm text-white/75">
              Use the search bar at the top to find businesses and services near
              you.
            </p>
            <Link
              href="/search"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Go to search
              <ChevronRight className="size-4" aria-hidden />
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80">
              <span>1.2M+ monthly visitors</span>
              <span>250K+ verified reviews</span>
              <span>100+ categories</span>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white">
              Why people choose {SITE_NAME}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/85">
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
