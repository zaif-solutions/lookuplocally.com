"use client";

import Link from "next/link";
import { Search, Menu, X } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PAGE_SHELL } from "@/lib/content-layout";

function HeaderSearchForm({
  className,
  idPrefix = "header",
}: {
  className?: string;
  idPrefix?: string;
}) {
  return (
    <form
      action="/search"
      method="get"
      className={cn(
        "flex w-full overflow-hidden rounded-none border border-border bg-card shadow-md",
        "flex-col gap-0 sm:h-12 sm:flex-row sm:items-stretch",
        className,
      )}
      role="search"
      aria-label="Search businesses"
    >
      <label htmlFor={`${idPrefix}-find`} className="sr-only">
        Find
      </label>
      <input
        id={`${idPrefix}-find`}
        type="search"
        name="q"
        placeholder="restaurants, services..."
        className="min-h-12 min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 sm:min-h-0 sm:py-2.5 sm:text-sm"
      />
      <span
        className="hidden h-auto w-px shrink-0 bg-border sm:block"
        aria-hidden
      />
      <label htmlFor={`${idPrefix}-near`} className="sr-only">
        Near
      </label>
      <input
        id={`${idPrefix}-near`}
        type="text"
        name="loc"
        placeholder="address, city..."
        className="min-h-12 w-full min-w-0 border-0 bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 sm:min-h-0 sm:w-44 sm:shrink-0 sm:py-2.5 sm:text-sm md:w-52 lg:w-60"
      />
      <Button
        type="submit"
        size="lg"
        className="min-h-12 w-full shrink-0 rounded-none border-none px-4 py-3 text-base font-semibold sm:h-auto sm:w-auto sm:px-3.5 sm:text-lg"
      >
        <Search className="size-5 sm:mr-1" aria-hidden />
        Search
      </Button>
    </form>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
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

  const logoClass = cn(
    "min-w-0 shrink-0 truncate text-base font-bold tracking-tight sm:text-lg",
    isHome ? "text-white" : "text-foreground",
  );

  const navLinkClass = (extra?: string) =>
    cn(
      "inline-flex items-center whitespace-nowrap rounded-none px-2 py-2 text-sm font-semibold transition-colors",
      isHome
        ? "text-white hover:bg-white/10"
        : "text-foreground hover:bg-muted",
      extra,
    );

  return (
    <header
      className={cn(
        "relative top-0 z-50 w-full",
        isHome
          ? "fixed pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pb-4 sm:pt-[max(1rem,env(safe-area-inset-top))]"
          : "sticky border-b border-border bg-card pt-[env(safe-area-inset-top)] shadow-sm",
      )}
    >
      <div className={PAGE_SHELL}>
        {/*
          Desktop: grid [logo | flexible center | nav]. Search lives only in the
          center track so it can never paint under “Write a Review” / buttons.
        */}
        <div className="hidden min-h-13 items-center gap-3 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
          <div className="flex min-w-0 items-center justify-self-start">
            <Link href="/" className={cn(logoClass, "max-w-48 xl:max-w-none")}>
              Lookup Locally
            </Link>
          </div>

          <div className="flex min-w-0 justify-center justify-self-stretch px-2">
            <div className="w-full max-w-xl ">
              <HeaderSearchForm idPrefix="hdr-desk" />
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
              className={cn(
                "h-10 shrink-0 px-2.5 text-sm font-semibold sm:px-3",
                isHome
                  ? "border-0 text-white hover:bg-white/10"
                  : "border-0 hover:bg-muted",
              )}
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
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors",
                isHome
                  ? "text-white hover:bg-white/15"
                  : "text-foreground hover:bg-muted",
              )}
              aria-label="Search"
            >
              <Search className="size-5" />
            </Link>
            <button
              type="button"
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors",
                isHome
                  ? "text-white hover:bg-white/15"
                  : "text-foreground hover:bg-muted",
              )}
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
        <div
          className={cn(
            "mt-3 hidden md:block lg:hidden",
            isHome && "border-t border-white/10 pt-3",
          )}
        >
          <HeaderSearchForm idPrefix="hdr-md" />
        </div>
      </div>

      {/* Mobile slide-down panel (below header bar) */}
      {mobileOpen ? (
        <div
          id="mobile-nav"
          className={cn(
            "absolute left-0 right-0 top-full z-60 max-h-[min(75dvh,32rem)] overflow-y-auto overscroll-contain border-b shadow-xl lg:hidden",
            isHome
              ? "border-white/15 bg-neutral-950/98 backdrop-blur-md"
              : "border-border bg-card",
          )}
        >
          <div className={cn(PAGE_SHELL, "py-4")}>
            <HeaderSearchForm idPrefix="hdr-mob" className="shadow-lg" />
            <nav className="mt-4 flex flex-col gap-0.5" aria-label="Mobile">
              <Link
                href="/search?write-review"
                className={cn(
                  "flex min-h-11 items-center rounded-lg px-3 py-3 text-base font-semibold",
                  isHome ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted",
                )}
                onClick={closeMobile}
              >
                Write a Review
              </Link>
              <Link
                href="/login"
                className={cn(
                  "flex min-h-11 items-center rounded-lg px-3 py-3 text-base font-semibold",
                  isHome ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted",
                )}
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
