"use client";

import Link from "next/link";
import { Search, Menu, PenLine, User } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-card px-8 pt-3">
      <div className="mx-auto flex h-12 items-center gap-4 px-3 py-2 sm:px-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-display text-2xl font-bold text-primary sm:text-3xl"
          aria-label={`${SITE_NAME} home`}
        >
          {SITE_NAME}
        </Link>

        {/* Center: Find / Near / Search (desktop) */}
        <div className="hidden flex-1 items-center justify-center gap-0 md:flex">
          <form
            action="/search"
            method="get"
            className="flex w-full max-w-3xl overflow-hidden rounded-md border border-border bg-card shadow-lg"
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
              className="flex-1 border-0 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 h-12"
            />
            <span
              className="w-px bg-border"
              aria-hidden
            />
            <label htmlFor="header-near" className="sr-only">
              Near
            </label>
            <input
              id="header-near"
              type="text"
              name="loc"
              placeholder="address, city..."
              className="w-60 shrink-0 border-0 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 h-12"
            />
            <Button
              type="submit"
              size="lg"
              className="shrink-0 rounded-none rounded-r-md px-3.5 py-3.5 font-semibold text-lg h-12"
            >
              <Search className="size-5" />
              Search
            </Button>
          </form>
        </div>

        {/* Right: Nav links + auth */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            className="flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted md:hidden"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Link>
          <Link
            href="/search?write-review"
            className="hidden items-center gap-2 rounded-sm text-lg font-semibold px-3.5 py-3.5 text-foreground hover:bg-muted sm:flex h-12"
          >
            Write a Review
          </Link>
          <Button
          size="lg"
          className="rounded-sm py-3.5 h-12 px-3.5 font-semibold text-lg"
          asChild
          variant={'outline'}
          >
            <Link href="/login" className="gap-1.5 text-lg">
              Log In
            </Link>
          </Button>
          <Button asChild size='lg' className="rounded-sm py-3.5 h-12 px-3.5 font-semibold text-lg">
            <Link href="/signup" className="gap-1.5 text-lg">
              {/* <User className="size-4" /> */}
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
    </header>
  );
}
