import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HOME_HERO_OVERLAP, PAGE_SHELL } from "@/lib/content-layout";

export function Hero() {
  return (
    <div className={HOME_HERO_OVERLAP}>
    <section
      className="relative isolate h-dvh min-h-[500px] w-full overflow-x-hidden md:h-[85vh] md:min-h-[500px]"
      aria-labelledby="hero-heading"
    >
      <Image
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&q=80"
        alt="Professional painting a wall"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-b from-black/75 via-black/35 to-black/70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-r from-black/70 via-black/40 to-black/10"
        aria-hidden
      />

      {/* Pin copy to bottom of the hero image; bottom inset mirrors header clearance from top */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end">
        <div
          className={cn(
            PAGE_SHELL,
           
            "pb-[max(8rem,env(safe-area-inset-bottom))] sm:pb-[max(9rem,env(safe-area-inset-bottom))] md:pb-[max(10rem,env(safe-area-inset-bottom))]",
          )}
        >
          <div className="min-w-0 max-w-3xl">
            <p className="inline-flex max-w-full items-center gap-2 rounded-none border border-white/25 bg-white/5 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm sm:text-xs">
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
            <p className="my-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:my-5 sm:text-base md:text-lg">
              Compare real reviews, check service quality, and connect with
              top-rated businesses near you - all in one trusted place.
            </p>

            <Button
              asChild
              size="lg"
              className="mt-3 w-full gap-2 px-6 py-3 text-base font-semibold shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              <Link href="/search">
                Go to search
                <ChevronRight className="size-4 shrink-0" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
