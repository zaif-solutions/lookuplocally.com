"use client";

import Link from "next/link";
import { Search, Menu } from "@/components/ui/Icon";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold text-primary"
        >
          {SITE_NAME}
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2 sm:max-w-md">
          <div className="relative flex flex-1 items-center">
            <Search
              className="absolute left-3 size-4 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search businesses..."
              className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              aria-label="Search businesses"
            />
          </div>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
