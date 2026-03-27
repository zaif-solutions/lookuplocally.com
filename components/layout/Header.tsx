"use client";

import Link from "next/link";
import { Search, Menu } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CONTENT_GUTTER, CONTENT_MAX } from "@/lib/content-layout";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <header
      className={cn(
        "top-0 z-50 w-full",
        isHome ? "fixed pb-4 pt-5" : "sticky bg-card shadow-sm",
      )}
    >
      {/* Outer container — applies horizontal padding + max-width */}
      {/* <div className={cn(CONTENT_MAX, CONTENT_GUTTER)}> */}
      <div className={cn(" px-4 sm:px-6 lg:px-8")}>
        {/*
          3-column grid: logo (left) | search (center) | nav (right)
          The auto columns take only what they need; the 1fr center column
          is shared equally so the search form sits in true horizontal center.
        */}
        {/* <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4"> */}
        <div className="flex justify-between items-center gap-4 w-full">
          {/* ── 1. Logo ── */}
          <Link
            href="/"
            className={cn(
              "shrink-0 text-lg font-bold tracking-tight w-[18%]",
              isHome ? "text-white" : "text-foreground",
            )}
          >
            Lookup Locally
          </Link>

          <div className="flex flex-1 justify-between items-center w-[64%]">
            {/* ── 2. Search (centered) ── */}
            <div className="w-full">
              <form
                action="/search"
                method="get"
                className="flex h-12 w-full max-w-3xl overflow-hidden rounded-md border-none bg-card shadow-lg"
                role="search"
              >
                <label htmlFor="header-find" className="sr-only">
                  Find
                </label>
                <input
                  id="header-find"
                  type="search"
                  name="q"
                  placeholder="restaurants, services..."
                  className="h-12 flex-1 border-0 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                />
                <span className="w-px bg-border" aria-hidden />
                <label htmlFor="header-near" className="sr-only">
                  Near
                </label>
                <input
                  id="header-near"
                  type="text"
                  name="loc"
                  placeholder="address, city..."
                  className="h-12 w-60 shrink-0 border-0 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 shrink-0 rounded-none rounded-r-md border-none px-3.5 py-3.5 text-lg font-semibold"
                >
                  <Search className="size-5" />
                  Search
                </Button>
              </form>
            </div>

            {/* ── 3. Right nav ── */}
            <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
              <Link
                href="/search?write-review"
                className="hidden h-12 items-center gap-2 rounded-sm px-3.5 text-lg font-semibold text-white hover:text-white/80 sm:flex"
              >
                Write a Review
              </Link>
              <Button
                size="lg"
                className="h-12 rounded-sm border-none px-3.5 py-3.5 text-lg font-semibold text-white hover:bg-white"
                asChild
                variant="ghost"
              >
                <Link
                  href="/login"
                  className="gap-1.5 text-lg text-white hover:text-white"
                >
                  Log In
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-12 rounded-sm px-3.5 py-3.5 text-lg font-semibold"
              >
                <Link href="/signup" className="gap-1.5 text-lg">
                  Sign Up
                </Link>
              </Button>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
