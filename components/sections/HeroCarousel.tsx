"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CONTENT_GUTTER, CONTENT_MAX } from "@/lib/content-layout";

export interface HeroSlide {
  image: string;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  interval?: number;
}

export function HeroCarousel({ slides, interval = 6000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, interval);
  }, [slides.length, interval]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  const goTo = useCallback(
    (index: number) => {
      stopTimer();
      setActive(index);
      startTimer();
    },
    [stopTimer, startTimer],
  );

  return (
    <section
      className="relative isolate w-full overflow-hidden h-dvh md:h-[85vh] md:min-h-[500px]"
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      {/* ─── Stacked images with crossfade ─── */}
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === active ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden />

      {/* ─── Content ─── */}
      <div
        className={cn(
          "relative flex h-full w-full flex-col justify-center border items-center px-2 md:px-8 lg:px-12",
          // CONTENT_MAX,
          // CONTENT_GUTTER,
        )}
      >
        <div className="w-full min-w-0">
          {slides.map((slide, i) => (
            <div
              key={slide.ctaHref}
              className={cn(
                "transition-all duration-700 ease-out",
                i === active
                  ? "visible relative opacity-100 translate-y-0"
                  : "invisible absolute opacity-0 translate-y-3",
              )}
              aria-hidden={i !== active}
            >
              <h2
                id={i === active ? "hero-heading" : undefined}
                className="mb-6 max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
              >
                {slide.heading}
              </h2>
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-lg font-bold text-primary-foreground transition hover:bg-primary/90 sm:text-base"
                tabIndex={i === active ? 0 : -1}
              >
                {slide.ctaLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* ─── Dots ─── */}
        <div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-10"
          role="tablist"
          aria-label="Slide controls"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "relative h-2 overflow-hidden rounded-full transition-all duration-300",
                i === active ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70",
              )}
            >
              {i === active && (
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-primary"
                  style={{
                    animation: `hero-dot-fill ${interval}ms linear forwards`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
