"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { PAGE_SHELL } from "@/lib/content-layout";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types";

interface HeroCarouselProps {
  slides: HeroSlide[];
  /** Autoplay duration per slide in ms */
  interval?: number;
}

/**
 * Yelp-style hero carousel:
 *  - full-bleed photo (smooth crossfade, neighbors pre-mounted)
 *  - left-aligned headline + a single red search-pill CTA
 *  - vertical segmented progress strip on the left edge
 *  - photo credit bottom-left
 */
export function HeroCarousel({ slides, interval = 6500 }: HeroCarouselProps) {
  const n = slides.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (n <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % n);
    }, interval);
    return () => clearInterval(id);
  }, [n, interval]);

  const prevIndex = n > 0 ? (active - 1 + n) % n : 0;
  const nextIndex = n > 0 ? (active + 1) % n : 0;
  /**
   * Keep every slide mounted when the deck is small so wrap last→first never
   * waits on decode / layout from a cold mount. Hero counts are tiny vs memory.
   */
  const shouldMountImage = (i: number) => {
    if (n <= 1) return i === active;
    if (n <= 10) return true;
    if (n === 2) return i === active || i === prevIndex;
    return i === active || i === prevIndex || i === nextIndex;
  };

  const current = slides[active];

  /**
   * Bar progress restarts whenever the slide changes by re-keying the
   * animated span — keeps the fill in sync with the autoplay timer.
   */
  const barAnimationKey = useMemo(
    () => `${current?.id ?? "slide"}-${active}`,
    [active, current?.id],
  );

  return (
    <section
      className="relative isolate h-dvh min-h-[540px] w-full overflow-hidden md:h-[85vh]"
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      aria-label="Featured local categories"
    >
      {slides.map((slide, i) =>
        shouldMountImage(i) ? (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transform-gpu transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-opacity backface-hidden",
              i === active ? "z-1 opacity-100" : "z-0 opacity-0",
            )}
            aria-hidden={i !== active}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0 || i === n - 1}
              quality={85}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ) : null,
      )}

      {/*
        Layered scrim — single div, composited once. Each gradient has one job:
        1) Strong fade behind the transparent header so logo + nav links stay
           readable on bright photos (top 0–35%).
        2) Bottom fade so the headline, description, photo credit, and progress
           rail keep contrast (bottom 0–55%).
        3) Subtle left bias so the copy block sits on a slightly darker plane
           without dimming the photo subject on the right.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-2"
        style={{
          backgroundImage: [
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 92%, transparent 95%)",
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
            "linear-gradient(to right, rgba(0,0,0,0.4) 40%, transparent 55%)",
          ].join(", "),
        }}
        aria-hidden
      />

      {/*
        All hero UI lives inside PAGE_SHELL so the rail, headline, CTA, and
        photo credit share the same left gutter (and max-width) as the rest of
        the site (header / sections / footer). On wide screens (≥ 2xl) the
        whole stack stays inside the 100rem container instead of hugging the
        viewport edge.
      */}
      <div className="absolute inset-0 z-3">
        <div className={cn(PAGE_SHELL, "relative h-full")}>
          {/*
            Vertical progress rail — passive indicator only. Bars are not
            clickable so users can't jump between slides; the carousel
            advances on its own at `interval`.
          */}
          <div
            className="pointer-events-none absolute top-1/2 flex -translate-y-1/2 flex-col items-center gap-2"
            role="presentation"
            aria-hidden
          >
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                className="relative flex h-20 w-3 items-center justify-center"
              >
                <span
                  className={cn(
                    "block h-full w-[16px] overflow-hidden rounded-full",
                    i === active ? "bg-white/30" : "bg-white/35",
                  )}
                />
                {i === active && (
                  <span
                    key={barAnimationKey}
                    className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-white"
                    style={{
                      width: "10px",
                      height: "0%",
                      animation: `hero-bar-fill ${interval}ms linear forwards`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Headline + CTA — flow inside PAGE_SHELL, with a small inset to clear the rail */}
          <div className="flex h-full items-center pl-9 sm:pl-12 md:pl-14">
            <div className="w-full min-w-0 max-w-2xl">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  className={cn(
                    "transition-all duration-700 ease-out",
                    i === active
                      ? "visible relative translate-y-0 opacity-100"
                      : "invisible absolute translate-y-3 opacity-0",
                  )}
                  aria-hidden={i !== active}
                >
                  <h1
                    id={i === active ? "hero-heading" : undefined}
                    className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-primary-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-5xl md:text-[3.5rem] lg:text-6xl"
                  >
                    {slide.heading}
                  </h1>

                  {slide.description ? (
                    <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-primary-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:mt-4 sm:text-lg md:text-xl">
                      {slide.description}
                    </p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
                    <Button
                      asChild
                      size="lg"
                      className="h-14 rounded-full px-10 font-semibold shadow-lg"
                    >
                      <Link
                        href={slide.ctaHref}
                        tabIndex={i === active ? 0 : -1}
                        className="flex items-center gap-2"
                      >
                        <Search
                          className="size-5"
                          aria-hidden
                          strokeWidth={"2.5"}
                        />
                        <span className="text-lg font-semibold">{slide.ctaLabel}</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo credit — anchored to the bottom-left of PAGE_SHELL, same inset as headline */}
          {current?.photoCredit ? (
            <div
              key={`credit-${current.id}`}
              className="absolute inset-x-0 bottom-5 pl-9 text-primary-foreground sm:bottom-7 sm:pl-12 md:pl-14"
            >
              <p className="text-sm font-semibold leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] sm:text-[0.95rem]">
                {current.photoCredit}
              </p>
              <p className="text-xs leading-tight text-primary-foreground/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] sm:text-sm">
                Photo from the business owner
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
