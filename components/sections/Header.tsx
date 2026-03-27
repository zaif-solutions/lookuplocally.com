"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE_NAME } from "@/lib/constants";
import { CONTENT_GUTTER, CONTENT_MAX } from "@/lib/content-layout";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const categories = [
  { label: "Restaurants", href: "/search?q=restaurants" },
  { label: "Home & Garden", href: "/search?q=home-garden" },
  { label: "Auto Services", href: "/search?q=auto-services" },
  { label: "Health & Beauty", href: "/search?q=health-beauty" },
  { label: "Travel & Activities", href: "/search?q=travel" },
  { label: "More", href: "/biz" },
] as const;

// function DesktopSearchForm({ idPrefix }: { idPrefix: string }) {
//   return (
//     <form
//       action="/search"
//       method="get"
//       className="flex w-full max-w-4xl flex-1 items-stretch gap-2"
//       role="search"
//       aria-label="Search businesses"
//     >
//       <label htmlFor={`${idPrefix}-q`} className="sr-only">
//         Search
//       </label>
//       <input
//         id={`${idPrefix}-q`}
//         name="q"
//         type="search"
//         placeholder="things to do, nail salons, plumbers"
//         className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:text-sm"
//       />
//       <label htmlFor={`${idPrefix}-loc`} className="sr-only">
//         Location
//       </label>
//       <input
//         id={`${idPrefix}-loc`}
//         name="loc"
//         type="text"
//         placeholder="address, neighborhood, city…"
//         className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:text-sm md:max-w-xs"
//       />
//       <button
//         type="submit"
//         className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-3 py-2 text-primary-foreground transition hover:bg-primary/90 sm:px-5"
//         aria-label="Search"
//       >
//         <Search className="size-[18px]" aria-hidden />
//       </button>
//     </form>
//   );
// }

function DesktopSearchForm({
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
        "flex w-full overflow-hidden rounded-md border border-border bg-card shadow-md",
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
        className="min-h-12 w-full shrink-0 rounded-none rounded-b-md border-none px-4 py-3 text-base font-semibold sm:h-auto sm:w-auto sm:rounded-none sm:rounded-r-md sm:px-3.5 sm:text-lg"
      >
        <Search className="size-5 sm:mr-1" aria-hidden />
        {/* Search */}
      </Button>
    </form>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border shadow-sm px-2 md:px-8 lg:px-12">
      <div className={"mx-auto w-full content-max"}>
        <div className="flex w-full h-16 items-center  border-b border-border sm:h-20">
          <div className="min-w-0 shrink-0 w-[16%]">
            <Link
              href="/"
              className="font-display text-xl font-bold text-primary sm:text-2xl"
            >
              {SITE_NAME}
            </Link>
          </div>
          <div className="flex-1 flex justify-between">
            <div className="hidden min-w-[50%] items-center justify-center sm:flex">
              <DesktopSearchForm idPrefix="hdr-desk" />
            </div>

            <div className="hidden shrink-0 items-center gap-2 xl:flex xl:gap-3">
              <Link
                href="/business"
                className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"
              >
                For Business
              </Link>
              <Link
                href="/search?write-review"
                className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"
              >
                Write a Review
              </Link>
              <Link
                href="/search?ref=project"
                className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"
              >
                Start a Project
              </Link>
              <Link
                href="/login"
                className="whitespace-nowrap rounded-md border border-input px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted lg:text-sm"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="whitespace-nowrap rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:bg-primary/90 lg:text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex shrink-0 p-2 xl:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-6 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm bg-background"
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Main menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-2 pb-6 pt-2">
                <form
                  action="/search"
                  method="get"
                  className="flex flex-col gap-3"
                  role="search"
                  onSubmit={() => setIsOpen(false)}
                >
                  <input
                    name="q"
                    type="search"
                    placeholder="things to do, nail salons…"
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <input
                    name="loc"
                    type="text"
                    placeholder="Location"
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Search
                  </button>
                </form>

                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className={cn(
                      "flex flex-1 items-center justify-center rounded-md border border-input py-2 text-sm font-medium text-foreground hover:bg-muted",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="flex flex-1 items-center justify-center rounded-md bg-primary py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>

                <nav className="flex flex-col gap-1 border-t border-border pt-4 text-sm">
                  <Link
                    href="/business"
                    className="border-b border-border py-3 font-medium text-foreground hover:bg-muted/50"
                    onClick={() => setIsOpen(false)}
                  >
                    For Business
                  </Link>
                  <Link
                    href="/search?write-review"
                    className="border-b border-border py-3 font-medium text-foreground hover:bg-muted/50"
                    onClick={() => setIsOpen(false)}
                  >
                    Write a Review
                  </Link>
                  <Link
                    href="/search?ref=project"
                    className="py-3 font-medium text-foreground hover:bg-muted/50"
                    onClick={() => setIsOpen(false)}
                  >
                    Start a Project
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <nav
          className="hidden gap-6 border-b border-border xl:flex xl:flex-wrap mx-auto max-w-[68%] pl-2 pr-2"
          aria-label="Browse categories"
        >
          {categories.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="border-b-2 border-transparent py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
