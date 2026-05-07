"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isPaused = hovered;

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    if (n <= 1) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % n);
    }, interval);
  }, [n, interval, stopTimer]);

  useEffect(() => {
    if (isPaused || n <= 1) {
      stopTimer();
      return;
    }
    startTimer();
    return stopTimer;
  }, [isPaused, n, active, startTimer, stopTimer]);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % n) + n) % n;
      setActive(next);
    },
    [n],
  );

  // Keyboard nav: ← / → when carousel is in viewport-ish (skip when typing)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("input, textarea, select, [contenteditable=true]"))
        return;
      e.preventDefault();
      goTo(active + (e.key === "ArrowLeft" ? -1 : 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, goTo]);

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
   * Bar progress restarts whenever the slide changes by re-keying the animated
   * span. Using inline `animation-play-state` lets hover-pause stay cheap with
   * no JS-driven interval bookkeeping.
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
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
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
          {/* Vertical progress rail — anchored to PAGE_SHELL's inner left edge */}
          <div className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
            <div
              className="flex flex-col items-center gap-2"
              role="tablist"
              aria-label="Slide controls"
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to slide ${i + 1}: ${slide.heading}`}
                  onClick={() => goTo(i)}
                  className="group relative flex h-20 w-3 items-center justify-center sm:h-20"
                >
                  <span
                    className={cn(
                      "block h-full w-[16px] overflow-hidden rounded-full transition-colors",
                      i === active
                        ? "bg-white/30"
                        : "bg-white/35 group-hover:bg-white/55",
                    )}
                  />
                  {i === active && (
                    <span
                      key={barAnimationKey}
                      className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-white"
                      style={{
                        width: "10px",
                        height: "0%",
                        animation: `hero-bar-fill ${interval}ms linear forwards`,
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                      aria-hidden
                    />
                  )}
                </button>
              ))}
            </div>
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
                      className="h-10 font-semibold shadow-lg"
                    >
                      <Link
                        href={slide.ctaHref}
                        tabIndex={i === active ? 0 : -1}
                      >
                        <Search
                          className="size-4"
                          aria-hidden
                          strokeWidth={2.5}
                        />
                        {slide.ctaLabel}
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
