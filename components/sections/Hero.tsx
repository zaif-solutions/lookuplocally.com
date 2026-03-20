import Link from "next/link";
import {
  Search,
  UtensilsCrossed,
  ShoppingBag,
  Wine,
  Dumbbell,
  Sparkles,
  Car,
  Wrench,
  MoreHorizontal,
} from "@/components/ui/Icon";

const CATEGORIES = [
  { name: "Restaurants", href: "/search?q=restaurants", icon: UtensilsCrossed },
  { name: "Shopping", href: "/search?q=shopping", icon: ShoppingBag },
  { name: "Nightlife", href: "/search?q=nightlife", icon: Wine },
  { name: "Sports & Leisure", href: "/search?q=sports", icon: Dumbbell },
  { name: "Beauty & Spas", href: "/search?q=beauty", icon: Sparkles },
  { name: "Automotive", href: "/search?q=automotive", icon: Car },
  { name: "Home Services", href: "/search?q=home-services", icon: Wrench },
  { name: "More", href: "/search", icon: MoreHorizontal },
] as const;

export function Hero() {
  return (
    <section
      className="border-b border-border bg-card "
      aria-label="Search and categories"
    >
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 h-screen">
        {/* Headline */}
        <h1 className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Connect with great local businesses
        </h1>

        {/* Categories */}
        <div className="mt-8">
          <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
            Popular categories
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-muted"
              >
                <Icon className="size-5 shrink-0 text-muted-foreground" />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
