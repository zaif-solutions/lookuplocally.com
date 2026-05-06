"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PAGE_SHELL } from "@/lib/content-layout";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types";

interface HeroCarouselProps {
  slides: HeroSlide[];
  interval?: number;
}

export function HeroCarousel({ slides, interval = 6000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = slides.length;
  const prevIndex = n > 0 ? (active - 1 + n) % n : 0;

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

  const shouldMountImage = (i: number) =>
    n <= 1 ? i === active : i === active || i === prevIndex;

  return (
    <section
      className="relative isolate h-dvh w-full overflow-hidden md:h-[85vh] md:min-h-[500px]"
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      {/* Only active + previous slide stay mounted — avoids decoding every hero asset at once */}
      {slides.map((slide, i) =>
        shouldMountImage(i) ? (
          <div
            key={slide.image}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              i === active ? "z-[1] opacity-100" : "z-0 opacity-0",
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
        ) : null,
      )}

      <div className="absolute inset-0 z-[2] bg-black/50" aria-hidden />

      <div
        className={cn(
          "relative z-[3] flex h-full w-full flex-col items-center justify-center",
          PAGE_SHELL,
        )}
      >
        <div className="w-full min-w-0">
          {slides.map((slide, i) => (
            <div
              key={slide.ctaHref}
              className={cn(
                "transition-all duration-700 ease-out",
                i === active
                  ? "visible relative translate-y-0 opacity-100"
                  : "invisible absolute translate-y-3 opacity-0",
              )}
              aria-hidden={i !== active}
            >
              <h2
                id={i === active ? "hero-heading" : undefined}
                className="mb-6 max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
              >
                {slide.heading}
              </h2>
              <Button asChild size="lg" className="text-base font-bold sm:text-lg">
                <Link href={slide.ctaHref} tabIndex={i === active ? 0 : -1}>
                  {slide.ctaLabel}
                </Link>
              </Button>
            </div>
          ))}
        </div>

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
                "relative h-2 overflow-hidden rounded-none transition-all duration-300",
                i === active ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70",
              )}
            >
              {i === active && (
                <span
                  className="absolute inset-y-0 left-0 bg-primary"
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
