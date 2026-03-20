import Link from "next/link";
import { Search, MapPin, Star } from "@/components/ui/Icon";

export default function Home() {
  return (
    <div className="bg-muted">
      {/* Hero */}
      <section className="border-b border-border bg-card px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find the best local businesses near you
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Search for restaurants, services, and more in your area.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              <Search className="size-4" />
              Search businesses
            </Link>
            <Link
              href="/biz"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <MapPin className="size-4" />
              Browse by location
            </Link>
          </div>
        </div>
      </section>

      {/* Placeholder content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Popular categories
        </h2>
        <p className="mt-2 text-muted-foreground">
          Categories and featured businesses will appear here.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Restaurants", icon: Star },
            { name: "Services", icon: MapPin },
            { name: "Shopping", icon: Search },
          ].map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-brand-secondary-muted text-secondary">
                <Icon className="size-5" />
              </div>
              <span className="font-medium text-foreground">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
