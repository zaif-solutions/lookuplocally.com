import { HOME_HERO_OVERLAP } from "@/lib/content-layout";
import { homeHeroSlides } from "@/lib/data/home";
import { HeroCarousel } from "./HeroCarousel";

export function Hero() {
  return (
    <div className={HOME_HERO_OVERLAP}>
      <HeroCarousel slides={homeHeroSlides} interval={6500} />
    </div>
  );
}
