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
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import { Label } from "../ui/label";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ShoppingBag,
  Truck,
  Flame,
  Sparkles,
  Coffee,
  UtensilsCrossed,
  Wine,
  Pizza,
  Package,
  CakeSlice,
  Beer,
  Zap,
  Leaf,
  Wind,
  Hammer,
  Paintbrush,
  Bug,
  Droplets,
  Waves,
  House,
  Car,
  Wrench,
} from "@/components/ui/Icon";

const restaurantLinks = [
  { label: "Takeout", href: "/search?q=takeout", icon: ShoppingBag },
  { label: "Delivery", href: "/search?q=delivery", icon: Truck },
  { label: "Hot & Trendy", href: "/search?q=hot-trendy", icon: Flame },
  { label: "New Restaurants", href: "/search?q=new-restaurants", icon: Sparkles },
  { label: "Breakfast & Brunch", href: "/search?q=breakfast-brunch", icon: Coffee },
  { label: "Lunch", href: "/search?q=lunch", icon: UtensilsCrossed },
  { label: "Dinner", href: "/search?q=dinner", icon: Wine },
  { label: "Coffee & Cafes", href: "/search?q=coffee-cafes", icon: Coffee },
  { label: "Pizza", href: "/search?q=pizza", icon: Pizza },
  { label: "Chinese", href: "/search?q=chinese", icon: Package },
  { label: "Mexican", href: "/search?q=mexican", icon: Flame },
  { label: "Bakeries", href: "/search?q=bakeries", icon: CakeSlice },
  { label: "Italian", href: "/search?q=italian", icon: Pizza },
  { label: "Food Trucks", href: "/search?q=food-trucks", icon: Truck },
  { label: "Sports Bars & Pubs", href: "/search?q=sports-bars", icon: Beer },
];

const homeGardenLinks = [
  { label: "Plumbers", href: "/search?q=plumbers", icon: Droplets },
  { label: "Electricians", href: "/search?q=electricians", icon: Zap },
  { label: "Landscaping", href: "/search?q=landscaping", icon: Leaf },
  { label: "HVAC", href: "/search?q=hvac", icon: Wind },
  { label: "House Cleaning", href: "/search?q=house-cleaning", icon: Sparkles },
  { label: "Contractors", href: "/search?q=contractors", icon: Hammer },
  { label: "Painters", href: "/search?q=painters", icon: Paintbrush },
  { label: "Roofing", href: "/search?q=roofing", icon: House },
  { label: "Pest Control", href: "/search?q=pest-control", icon: Bug },
  { label: "Moving Services", href: "/search?q=movers", icon: Truck },
];

const autoServiceLinks = [
  { label: "Auto Repair", href: "/search?q=auto-repair", icon: Wrench },
  { label: "Oil Change", href: "/search?q=oil-change", icon: Droplets },
  { label: "Tire Shops", icon: Wrench, href: "/search?q=tire-shops" },
  { label: "Car Wash", icon: Waves, href: "/search?q=car-wash" },
  { label: "Body Shops", icon: Hammer, href: "/search?q=body-shops" },
  { label: "Auto Detailing", icon: Sparkles, href: "/search?q=auto-detailing" },
  { label: "Towing", icon: Truck, href: "/search?q=towing" },
  { label: "Car Dealers", icon: Car, href: "/search?q=car-dealers" },
  { label: "Glass Repair", icon: Wrench, href: "/search?q=glass-repair" },
];

const categories = [
  {
    label: "Restaurants",
    href: "/search?q=restaurants",
    hasDropdown: true,
    links: restaurantLinks,
  },
  {
    label: "Home & Garden",
    href: "/search?q=home-garden",
    hasDropdown: true,
    links: homeGardenLinks,
  },
  {
    label: "Auto Services",
    href: "/search?q=auto-services",
    hasDropdown: true,
    links: autoServiceLinks,
  },
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
        "flex-col gap-0 sm:h-12 sm:flex-row sm:items-stretch ",
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
        className="min-h-12 w-full min-w-0 border-0 bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 sm:min-h-0 sm:flex-1 sm:basis-0 sm:py-2.5 sm:text-sm"
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
        className="min-h-12 w-full min-w-0 border-0 bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 sm:min-h-0 sm:flex-1 sm:basis-0 sm:py-2.5 sm:text-sm"
      />
      <Button
        type="button"
        size="lg"
        className="h-full shrink-0 rounded-l-sm text-lg font-semibold"
      >
        <Search className="size-5" />
        <Label htmlFor={`${idPrefix}-find`} className="hidden xl:block xl:text-lg xl:font-semibold">
            Search
        </Label>
      </Button>
    </form>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border shadow-sm px-2 md:px-8 lg:px-12">
      <div className={"mx-auto w-full content-max"}>
        <div
          className={cn(
            "grid h-16 w-full items-center sm:h-20",
            "grid-cols-[1fr_auto] gap-x-3 gap-y-0",
            "sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-3",
            "lg:gap-x-4 xl:gap-x-6",
          )}
        >
          <div className="min-w-0 justify-self-start w-48">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt={SITE_NAME}
                width={200}
                height={200}
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
          {/* <div className="flex justify-between items-center "> */}
            <div className="hidden min-w-0 w-full justify-self-center sm:flex">
              <DesktopSearchForm
                idPrefix="hdr-desk"
                className="w-full min-w-0 max-w-full 2xl:max-w-3xl"
              />
            </div>

            <div className="flex shrink-0 items-center justify-end justify-self-end gap-2 xl:gap-3 ">
              <div className="hidden shrink-0 items-center gap-2 xl:flex xl:gap-3">
                <Button
                  size="lg"
                  className="rounded-sm py-3.5 h-12 px-3.5 font-semibold text-lg"
                  variant={"ghost"}
                >
                  For Business
                </Button>
                <Button
                  size="lg"
                  className="rounded-sm py-3.5 h-12 px-3.5 font-semibold text-lg"
                  asChild
                  variant={"ghost"}
                >
                  <Link href="/write-review" className="gap-1.5 text-lg">
                    Write a Review
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="rounded-sm py-3.5 h-12 px-3.5 font-semibold text-lg"
                  asChild
                  variant={"ghost"}
                >
                  <Link href="/login" className="gap-1.5 text-lg">
                    Log In
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="rounded-sm py-3.5 h-12 px-3.5 font-semibold text-lg"
                >
                  <Link href="/signup" className="gap-1.5 text-lg">
                    {/* <User className="size-4" /> */}
                    Sign Up
                  </Link>
                </Button>
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
                    {/* Only when outer header search is hidden (< sm); tablet/desktop use outer bar only */}
                    <div className="sm:hidden">
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
                    </div>

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
                        className={cn(
                          "flex flex-1 items-center justify-center rounded-md bg-primary py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90",
                        )}
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
          {/* </div> */}
        </div>

        <NavigationMenu
          className={cn(
            "w-full max-w-full justify-start border-b border-border ",
          )}
          aria-label="Browse categories"
        >
          <NavigationMenuList className="flex-wrap justify-start gap-1">
            {categories.map((cat) => (
              <NavigationMenuItem key={cat.label} className="flex">
                {cat.hasDropdown ? (
                  <>
                    <NavigationMenuTrigger className="group relative h-auto bg-transparent px-2.5 py-3.5 text-[15px] font-medium text-muted-foreground hover:bg-transparent hover:text-foreground data-[state=open]:text-foreground 2xl:px-4 2xl:text-lg">
                      {cat.label}
                      <span className="absolute bottom-[-1px] left-0 h-[2.5px] w-full scale-x-0 bg-primary transition-transform group-data-[state=open]:scale-x-100" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[680px] rounded-lg border bg-card p-6 shadow-2xl">
                      <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                        {cat.links?.map((link) => (
                          <NavigationMenuLink
                            key={link.label}
                            href={link.href}
                            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-muted hover:text-foreground"
                          >
                            <link.icon className="size-[18px] shrink-0 text-muted-foreground/80 transition-colors group-hover:text-primary" />
                            <span>{link.label}</span>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    href={cat.href}
                    className="flex h-auto items-center px-2.5 py-3.5 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground 2xl:px-4 2xl:text-lg"
                  >
                    {cat.label}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
