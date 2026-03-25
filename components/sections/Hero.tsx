"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { HERO_SLIDES } from "@/lib/hero-slides";
import { CONTENT_GUTTER, CONTENT_MAX } from "@/lib/content-layout";

const AUTOPLAY_MS = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const total = HERO_SLIDES.length;
  const slide = HERO_SLIDES[index]!;

  const goTo = useCallback((i: number) => {
    setIndex(((i % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const t = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [next]);

  return (
    <section
      className="relative isolate w-full min-h-[min(88vh,820px)] overflow-hidden "
      aria-roledescription="carousel"
      aria-label="Featured highlights"
    >
      {/* Slides */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            i === index ? "z-[1] opacity-100" : "z-0 opacity-0"
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Readability gradients (Yelp-style: top dark for header + left for copy) */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/50 via-black/10 to-black/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black/50 via-black/10 to-transparent sm:from-black/30"
        aria-hidden
      />

      {/* Content — one left edge: indicators, headline, CTA share CONTENT_GUTTER */}
      <div
        className={cn(
          "relative z-10 flex min-h-[min(88vh,820px)] flex-col justify-end pb-10 pt-28 sm:justify-center sm:pb-16 sm:pt-32 lg:pt-36",
          CONTENT_MAX,
          CONTENT_GUTTER
        )}
      >
        <div className="flex w-full max-w-3xl flex-col items-start gap-6 sm:flex-row sm:items-start sm:gap-5 md:gap-6">
          {/* Carousel indicators */}
          <div
            className="flex shrink-0 flex-row gap-2 sm:flex-col sm:gap-3"
            role="tablist"
            aria-label="Slide"
          >
            {HERO_SLIDES.map((_, i) => (
              <button
                key={HERO_SLIDES[i]!.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1} of ${total}`}
                onClick={() => goTo(i)}
                className={cn(
                  "rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                  i === index
                    ? "h-10 w-1.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)] md:h-24 md:w-2"
                    : "h-6 w-1 bg-white/35 hover:bg-white/55 md:h-16 md:w-1.5"
                )}
              />
            ))}
            <span
              className="hidden h-2 w-2 shrink-0 rounded-full bg-white/50 md:block"
              aria-hidden
            />
          </div>

          {/* Headline + CTA share one left edge; mt-6 + pill styles unchanged */}
          <div className="flex min-w-0 flex-1 flex-col items-start text-left">
            <h1 className="m-0 font-display text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
              {slide.headline}
            </h1>
            <Link
              href={slide.ctaHref}
              className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-lg"
            >
              <Search className="size-5 shrink-0" />
              {slide.ctaLabel}
            </Link>
          </div>
        </div>
      </div>

      {slide.credit ? (
        <p className="absolute bottom-4 left-4 z-10 max-w-[min(90vw,28rem)] text-xs text-white/75 sm:left-6 sm:text-sm lg:left-8">
          {slide.credit}
        </p>
      ) : null}
    </section>
  );
}
