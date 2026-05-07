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
    </>
  );
}
