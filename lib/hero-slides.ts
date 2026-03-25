export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  credit?: string;
}

/** Add images under public/hero-slides/ and extend this list. */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "painter",
    src: "/hero-slides/painter.jpg",
    alt: "Professional painting a wall",
    headline: "Refresh your space. Hire local pros.",
    ctaLabel: "Find painters",
    ctaHref: "/search?q=painters",
    credit: "Local services",
  },
  {
    id: "painter-2",
    src: "/hero-slides/painter.jpg",
    alt: "Professional painting a wall",
    headline: "Connect with great local businesses.",
    ctaLabel: "Search nearby",
    ctaHref: "/search",
    credit: "Local services",
  },
  {
    id: "painter-3",
    src: "/hero-slides/painter.jpg",
    alt: "Professional painting a wall",
    headline: "Trusted reviews. Real results.",
    ctaLabel: "Explore categories",
    ctaHref: "/biz",
    credit: "Local services",
  },
];
