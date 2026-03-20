import { Hero } from "@/components/sections";

export default function Home() {
  return (
    <div className="bg-muted">
      <Hero />

      {/* Featured businesses — placeholder for listings */}
      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6"
        aria-labelledby="featured-heading"
      >
        <h2
          id="featured-heading"
          className="font-display text-xl font-semibold text-foreground"
        >
          Featured businesses
        </h2>
        <p className="mt-2 text-muted-foreground">
          Top-rated local spots will appear here.
        </p>
      </section>
    </div>
  );
}
