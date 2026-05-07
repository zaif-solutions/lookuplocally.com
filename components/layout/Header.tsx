"use client";

import Link from "next/link";
import { Menu, Search, X } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { DirectorySearchBar } from "@/components/search/DirectorySearchBar";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PAGE_SHELL } from "@/lib/content-layout";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const logoClass =
    "min-w-0 shrink-0 truncate text-base font-bold tracking-tight text-foreground sm:text-lg";

  const navLinkClass = (extra?: string) =>
    cn(
      "inline-flex items-center whitespace-nowrap rounded-md px-2 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
      extra,
    );

  return (
    <header className="relative z-50 w-full bg-card pt-[env(safe-area-inset-top)] shadow-sm">
      <div className={PAGE_SHELL}>
        {/*
          Desktop: [logo + search | nav]. Search sits beside the logo; nav stays right.
        */}
        <div className="hidden min-h-13 items-center gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <Link
              href="/"
              className={cn(logoClass, "max-w-48 shrink-0 xl:max-w-none")}
            >
              Lookup Locally
            </Link>
            <div className="relative z-60 min-w-0 flex-1 max-w-xl overflow-visible md:max-w-2xl xl:max-w-176">
              <DirectorySearchBar idPrefix="hdr-desk" />
            </div>
          </div>

          <nav
            className="flex min-w-0 shrink-0 items-center justify-end justify-self-end gap-1 xl:gap-2"
            aria-label="Account"
          >
            <Link href="/search?write-review" className={navLinkClass()}>
              Write a Review
            </Link>
            <Button
              size="lg"
              className="h-10 shrink-0 border-0 px-2.5 text-sm font-semibold hover:bg-muted sm:px-3"
              asChild
              variant="ghost"
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-10 shrink-0 px-2.5 text-sm font-semibold sm:px-3"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile + small tablet: logo | actions */}
        <div className="flex min-h-13 items-center justify-between gap-3 lg:hidden">
          <Link href="/" className={cn(logoClass, "max-w-[55%]")}>
            Lookup Locally
          </Link>

          <div className="flex shrink-0 items-center gap-1">
            <Link
              href="/search"
              className="flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
              aria-label="Search"
            >
              <Search className="size-5" />
            </Link>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Medium screens: full-width search under logo row (no overlap) */}
        <div className="mt-3 hidden border-t border-border pt-3 md:block lg:hidden">
          <DirectorySearchBar idPrefix="hdr-md" />
        </div>
      </div>

      {/* Mobile slide-down panel (below header bar) */}
      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full z-60 max-h-[min(75dvh,32rem)] overflow-y-auto overscroll-contain border-b border-border bg-card shadow-xl lg:hidden"
        >
          <div className={cn(PAGE_SHELL, "py-4")}>
            <DirectorySearchBar
              idPrefix="hdr-mob"
              className="shadow-lg"
              onSubmitSuccess={closeMobile}
            />
            <nav className="mt-4 flex flex-col gap-0.5" aria-label="Mobile">
              <Link
                href="/search?write-review"
                className="flex min-h-11 items-center rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
                onClick={closeMobile}
              >
                Write a Review
              </Link>
              <Link
                href="/login"
                className="flex min-h-11 items-center rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
                onClick={closeMobile}
              >
                Log In
              </Link>
              <Button asChild className="mt-2 h-11 w-full" size="lg">
                <Link href="/signup" onClick={closeMobile}>
                  Sign Up
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
