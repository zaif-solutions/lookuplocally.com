import { Search } from "@/components/ui/Icon";

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Search
      </h1>
      <p className="mt-2 text-muted-foreground">
        Search functionality will be implemented here.
      </p>
      <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3">
        <Search className="size-5 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search businesses..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </div>
  );
}
