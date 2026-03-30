"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ChevronDown,
  ShoppingBag,
  Truck,
  Flame,
  Sparkles,
  Coffee,
  UtensilsCrossed,
  Wine,
  Pizza,
  CakeSlice,
  Zap,
  Leaf,
  Hammer,
  Paintbrush,
  Droplets,
  Waves,
  House,
  Wrench,
  Scissors,
  Smile,
  Eye,
  Dumbbell,
  Stethoscope,
  Palette,
  Plane,
  Mountain,
  Tent,
  Camera,
  Ticket,
  Music,
  Bike,
  Sailboat,
  Briefcase,
  GraduationCap,
  PawPrint,
  Shirt,
  Store,
  Landmark,
  Scale,
  Shield,
  Salad,
  CirclePlus,
  LogIn,
} from "@/components/ui/Icon";
import type { LucideIcon } from "@/components/ui/Icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CategoryLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface Category {
  label: string;
  href: string;
  hasDropdown?: boolean;
  links?: CategoryLink[];
}

/** Exactly 12 links: 4 rows × 3 columns (grid fills row-wise). */
const restaurantLinks: CategoryLink[] = [
  { label: "Takeout", href: "/search?q=takeout", icon: ShoppingBag },
  { label: "Lunch", href: "/search?q=lunch", icon: UtensilsCrossed },
  { label: "Mexican", href: "/search?q=mexican", icon: Salad },
  { label: "Delivery", href: "/search?q=delivery", icon: Truck },
  { label: "Dinner", href: "/search?q=dinner", icon: Wine },
  { label: "Bakeries", href: "/search?q=bakery", icon: CakeSlice },
  { label: "Hot & Trendy", href: "/search?q=trending", icon: Flame },
  { label: "Coffee & Cafes", href: "/search?q=coffee", icon: Coffee },
  { label: "Italian", href: "/search?q=italian", icon: Pizza },
  { label: "Restaurants", href: "/search?q=restaurants", icon: Sparkles },
  { label: "Pizza", href: "/search?q=pizza", icon: Pizza },
  { label: "Food Trucks", href: "/search?q=food-trucks", icon: Truck },
];

const homeGardenLinks: CategoryLink[] = [
  { label: "Plumbers", href: "/search?q=plumbers", icon: Droplets },
  { label: "Electricians", href: "/search?q=electricians", icon: Zap },
  { label: "Landscaping", href: "/search?q=landscaping", icon: Leaf },
  { label: "HVAC", href: "/search?q=hvac", icon: Wind },
  { label: "Pest Control", href: "/search?q=pest-control", icon: Bug },
  { label: "Moving Services", href: "/search?q=movers", icon: Truck },
  { label: "Appliance Repair", href: "/search?q=appliance-repair", icon: Wrench },
  { label: "Pool Service", href: "/search?q=pool-service", icon: Waves },
  { label: "House Cleaning", href: "/search?q=house-cleaning", icon: Sparkles },
  { label: "Contractors", href: "/search?q=contractors", icon: Hammer },
  { label: "Painters", href: "/search?q=painters", icon: Paintbrush },
  { label: "Roofing", href: "/search?q=roofing", icon: House },
];

const autoServiceLinks: CategoryLink[] = [
  { label: "Auto Repair", href: "/search?q=auto-repair", icon: Wrench },
  { label: "Body Shops", href: "/search?q=body-shops", icon: Hammer },
  { label: "Oil Change", href: "/search?q=oil-change", icon: Droplets },
  { label: "Tire Shops", href: "/search?q=tire-shops", icon: Wrench },
  { label: "Car Wash", href: "/search?q=car-wash", icon: Waves },
  { label: "Body Shops", href: "/search?q=body-shops", icon: Hammer },
  { label: "Auto Detailing", href: "/search?q=auto-detailing", icon: Sparkles },
  { label: "Towing", href: "/search?q=towing", icon: Truck },
  { label: "Car Dealers", href: "/search?q=car-dealers", icon: Car },
  { label: "Glass Repair", href: "/search?q=glass-repair", icon: Wrench },
  { label: "Transmission", href: "/search?q=transmission", icon: Car },
  { label: "Inspections", href: "/search?q=vehicle-inspection", icon: Car },
  { label: "Brakes", href: "/search?q=brake-service", icon: Wrench },
];

const healthBeautyLinks: CategoryLink[] = [
  { label: "Hair Salons", href: "/search?q=hair-salons", icon: Scissors },
  { label: "Spas", href: "/search?q=spas", icon: Sparkles },
  { label: "Nail Salons", href: "/search?q=nail-salons", icon: Palette },
  { label: "Skin Care", href: "/search?q=skin-care", icon: Smile },
  { label: "Gyms & Fitness", href: "/search?q=gyms", icon: Dumbbell },
  { label: "Eye Care", href: "/search?q=eye-care", icon: Eye },
  { label: "Dentists", href: "/search?q=dentists", icon: Smile },
  { label: "Doctors", href: "/search?q=doctors", icon: Stethoscope },
  { label: "Massage", href: "/search?q=massage", icon: Sparkles },
  { label: "Barbers", href: "/search?q=barbers", icon: Scissors },
  { label: "Yoga & Pilates", href: "/search?q=yoga", icon: Dumbbell },
  { label: "Waxing", href: "/search?q=waxing", icon: Sparkles },
];

const travelLinks: CategoryLink[] = [
  { label: "Hotels", href: "/search?q=hotels", icon: Landmark },
  { label: "Hiking & Trails", href: "/search?q=hiking", icon: Mountain },
  { label: "Camping", href: "/search?q=camping", icon: Tent },
  { label: "Tours", href: "/search?q=tours", icon: Camera },
  { label: "Attractions", href: "/search?q=attractions", icon: Ticket },
  { label: "Nightlife", href: "/search?q=nightlife", icon: Music },
  { label: "Cycling", href: "/search?q=cycling", icon: Bike },
  { label: "Boating", href: "/search?q=boating", icon: Sailboat },
  { label: "Travel Agents", href: "/search?q=travel-agents", icon: Plane },
  { label: "Museums", href: "/search?q=museums", icon: Landmark },
  { label: "Beaches", href: "/search?q=beaches", icon: Waves },
  { label: "Adventure Parks", href: "/search?q=adventure-parks", icon: Mountain },
];

const moreLinks: CategoryLink[] = [
  { label: "Pet Services", href: "/search?q=pet-services", icon: PawPrint },
  { label: "Shopping", href: "/search?q=shopping", icon: Store },
  { label: "Dry Cleaning", href: "/search?q=dry-cleaning", icon: Shirt },
  { label: "Legal Services", href: "/search?q=legal", icon: Scale },
  { label: "Insurance", href: "/search?q=insurance", icon: Shield },
  { label: "Real Estate", href: "/search?q=real-estate", icon: House },
  { label: "Financial Services", href: "/search?q=financial", icon: Landmark },
  { label: "Photography", href: "/search?q=photography", icon: Camera },
  { label: "Events & Catering", href: "/search?q=catering", icon: Ticket },
  { label: "Storage", href: "/search?q=storage", icon: Store },
];

const categories: Category[] = [
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
  {
    label: "Health & Beauty",
    href: "/search?q=health-beauty",
    hasDropdown: true,
    links: healthBeautyLinks,
  },
  {
    label: "Travel & Activities",
    href: "/search?q=travel",
    hasDropdown: true,
    links: travelLinks,
  },
  {
    label: "More",
    href: "/biz",
    hasDropdown: true,
    links: moreLinks,
  },
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

// COMPONENT: DESKTOP SEARCH FORM
function DesktopSearchForm({
  className,
  idPrefix = "header",
}: {
  className?: string;
  idPrefix?: string;
}) {
  const [showPopular, setShowPopular] = useState(false);
  const [showNearPopular, setShowNearPopular] = useState(false);
  const [findValue, setFindValue] = useState("");
  const [nearValue, setNearValue] = useState("");
  const findPopoverRef = React.useRef<HTMLDivElement>(null);
  const nearPopoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (findPopoverRef.current && !findPopoverRef.current.contains(event.target as Node)) {
        setShowPopular(false);
      }
      if (nearPopoverRef.current && !nearPopoverRef.current.contains(event.target as Node)) {
        setShowNearPopular(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const popularSearches = [
    { label: "Restaurants", icon: Utensils },
    { label: "Delivery", icon: Truck },
    { label: "Takeout", icon: ShoppingBag },
    { label: "Accountants", icon: Calculator },
    { label: "Plumbers", icon: Wrench },
    { label: "Auto Repair", icon: Car },
  ];

  const recentLocations = [
    "San Francisco, CA, United States",
    "South San Francisco, CA, United States",
    "Péninsule de San Francisco, CA, United States",
    "Área de la Bahía de San Francisco, CA, United States",
    "Région de la baie de San Francisco, CA, United States",
  ];

  return (
    <form
      action="/search"
      method="get"
      className={cn(
        "flex w-full overflow-hidden rounded-md  bg-card shadow-md",
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
        className="h-full shrink-0 rounded-l-lg text-lg font-semibold"
      >
        <Search className="size-5" />
        <Label
          htmlFor={`${idPrefix}-find`}
          className="hidden xl:block xl:text-lg xl:font-semibold"
        >
          Search
        </Label>
      </Button>
    </form>
  );
}

function DesktopCategoryMegaItem({ cat, isTransparent = false }: { cat: Category; isTransparent?: boolean }) {
  return (
    <>
      <NavigationMenuTrigger
        className={cn(
          "h-auto gap-1 rounded-none border-0 bg-transparent px-3 py-3 text-[15px] font-medium shadow-none transition-colors duration-300",
          "hover:bg-transparent focus:bg-transparent focus-visible:ring-0",
          "data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent",
          "[&_svg]:text-current",
          isTransparent
            ? "text-white/80 hover:text-white data-[state=open]:text-white"
            : "text-muted-foreground hover:text-foreground data-[state=open]:text-foreground",
        )}
      >
        <span className="whitespace-nowrap">{cat.label}</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent
        className={cn(
          "box-border max-w-[calc(100vw-2.5rem)]! min-w-0",
          "w-[min(800px,calc(100vw-2.5rem))] md:w-[min(620px,calc(100vw-2.5rem))]!",
          "z-50 p-4! pb-4! pl-4! pr-4! pt-4!",
          "overflow-hidden rounded-xl border border-black/10 bg-white shadow-none",
          "dark:border-border dark:bg-card dark:shadow-none rounded-none",
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-1 h-0.5"
          aria-hidden
        />
        <div className="grid w-full min-w-0 grid-cols-3 grid-rows-4 gap-x-5 gap-y-0.5 lg:gap-x-1">
          {(cat.links ?? []).slice(0, 12).map((link) => (
            <NavigationMenuLink
              key={link.label}
              href={link.href}
              className="group/row flex! min-w-0 w-full flex-row! items-center gap-3 whitespace-nowrap rounded-lg px-2 py-2.5 text-left text-[15px] font-semibold text-foreground transition-colors hover:bg-zinc-100 focus:ring-0 dark:hover:bg-muted/80 [&_svg]:shrink-0"
            >
              <link.icon
                className="size-[18px] shrink-0 text-foreground/80"
                strokeWidth={1.35}
              />
              <span className="shrink-0 leading-tight">{link.label}</span>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </>
  );
}

function MobileCategorySection({
  category,
  onLinkClick,
}: {
  category: Category;
  onLinkClick: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!category.hasDropdown || !category.links) {
    return (
      <Link
        href={category.href}
        className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        onClick={onLinkClick}
      >
        {category.label}
      </Link>
    );
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full min-h-11 items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
        <span>{category.label}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-0.5 pb-1 pl-2">
          {category.links.slice(0, 12).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-2.5 whitespace-nowrap rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted lg:px-1 lg:py-1"
              onClick={onLinkClick}
            >
              <link.icon className="size-4 shrink-0 text-muted-foreground" />
              <span className="shrink-0">{link.label}</span>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function MobileForBusinessSection({ onLinkClick }: { onLinkClick: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full min-h-11 items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
        <span>For Business</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-0.5 pb-1 pl-2">
          <Link
            href="/biz/add"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            onClick={onLinkClick}
          >
            <CirclePlus className="size-4 shrink-0 text-muted-foreground" />
            Add a Business
          </Link>
          <Link
            href="/biz/claim"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            onClick={onLinkClick}
          >
            <Shield className="size-4 shrink-0 text-muted-foreground" />
            Claim Your Business
          </Link>
          <Link
            href="/biz/login"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            onClick={onLinkClick}
          >
            <LogIn className="size-4 shrink-0 text-muted-foreground" />
            Login to Business Account
          </Link>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const closeMobile = useCallback(() => setIsOpen(false), []);

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full overflow-visible transition-all duration-300",
          isTransparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border bg-background/95 shadow-sm backdrop-blur-md",
        )}
      >
        <div className="mx-auto w-full content-max overflow-visible px-2 md:px-8 lg:px-12">
          {/* ─── Main header row ─── */}
          <div
            className={cn(
              "grid h-14 w-full items-center sm:h-16 md:h-20",
              "grid-cols-[1fr_auto] gap-x-3 gap-y-0",
              "sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-3",
              "lg:gap-x-4 xl:gap-x-6",
            )}
          >
            {/* Logo */}
            <div className="min-w-0 w-32 justify-self-start sm:w-40 md:w-48">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt={SITE_NAME}
                  width={200}
                  height={200}
                  className={cn(
                    "size-full object-contain transition-all duration-300",
                    isTransparent && "brightness-0 invert",
                  )}
                />
              </Link>
            </div>

            {/* Desktop search */}
            <div className="hidden min-w-0 w-full justify-self-center sm:flex">
              <DesktopSearchForm
                idPrefix="hdr-desk"
                className="w-full min-w-0 max-w-full 2xl:max-w-3xl"
              />
            </div>

            {/* Desktop nav buttons + mobile hamburger */}
            <div className="flex shrink-0 items-center justify-end justify-self-end gap-1 xl:gap-2">
              <div className="hidden shrink-0 items-center gap-1 xl:flex xl:gap-2">
                <NavigationMenu viewport={false} className="relative overflow-visible">
                  <NavigationMenuList className="overflow-visible">
                    <NavigationMenuItem className="relative overflow-visible">
                      <NavigationMenuTrigger
                        className={cn(
                          "h-10 gap-1 rounded-md border-0 bg-transparent px-3 text-sm font-semibold shadow-none transition-colors duration-300",
                          "hover:bg-transparent focus:bg-transparent focus-visible:ring-0",
                          "data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent",
                          "[&_svg]:text-current",
                          isTransparent
                            ? "text-white hover:bg-white/10 data-[state=open]:text-white"
                            : "text-foreground hover:bg-muted data-[state=open]:text-foreground",
                        )}
                      >
                        <span className="whitespace-nowrap">For Business</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={cn(
                          "z-50 p-2!",
                          "w-[270px]!",
                          "overflow-hidden rounded-xl border border-black/10 bg-white shadow-none",
                          "dark:border-border dark:bg-card dark:shadow-none",
                        )}
                      >
                        <div className="flex w-full flex-col gap-0.5">
                          <NavigationMenuLink
                            href="/biz/add"
                            className="flex! w-full flex-row! items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-[15px] font-semibold text-foreground transition-colors hover:bg-zinc-100 focus:ring-0 dark:hover:bg-muted/80"
                          >
                            <CirclePlus className="size-[18px] shrink-0 text-foreground/80" strokeWidth={1.35} />
                            <span className="leading-tight">Add a Business</span>
                          </NavigationMenuLink>
                          <NavigationMenuLink
                            href="/biz/claim"
                            className="flex! w-full flex-row! items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-[15px] font-semibold text-foreground transition-colors hover:bg-zinc-100 focus:ring-0 dark:hover:bg-muted/80"
                          >
                            <Shield className="size-[18px] shrink-0 text-foreground/80" strokeWidth={1.35} />
                            <span className="leading-tight">Claim Your Business</span>
                          </NavigationMenuLink>
                          <NavigationMenuLink
                            href="/biz/login"
                            className="flex! w-full flex-row! items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-[15px] font-semibold text-foreground transition-colors hover:bg-zinc-100 focus:ring-0 dark:hover:bg-muted/80"
                          >
                            <LogIn className="size-[18px] shrink-0 text-foreground/80" strokeWidth={1.35} />
                            <span className="leading-tight">Login to Business Account</span>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <Button
                  size="lg"
                  className={cn(
                    "h-10 shrink-0 px-3 font-semibold transition-colors duration-300",
                    isTransparent
                      ? "text-white hover:bg-white/10"
                      : "",
                  )}
                  asChild
                  variant="ghost"
                >
                  <Link href="/write-review">Write a Review</Link>
                </Button>
                <Button
                  size="lg"
                  className={cn(
                    "h-10 shrink-0 px-3 font-semibold transition-colors duration-300",
                    isTransparent
                      ? "text-white hover:bg-white/10"
                      : "",
                  )}
                  asChild
                  variant="ghost"
                >
                  <Link href="/login">Log In</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="h-10 shrink-0 px-3 font-semibold"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>

              {/* Mobile / tablet hamburger */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex shrink-0 items-center justify-center rounded-md p-2 transition-colors xl:hidden",
                      isTransparent
                        ? "text-white hover:bg-white/15"
                        : "text-foreground hover:bg-muted",
                    )}
                    aria-label="Open menu"
                  >
                    <Menu className="size-6" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="flex w-full max-w-sm flex-col overflow-hidden bg-background p-0"
                >
                  <SheetHeader className="border-b border-border px-4 py-3">
                    <SheetTitle className="text-left text-base font-semibold">
                      Menu
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-4 pb-6 pt-4">
                    {/* Mobile search (only below sm where the header search is hidden) */}
                    <div className="sm:hidden">
                      <form
                        action="/search"
                        method="get"
                        className="flex flex-col gap-2.5"
                        role="search"
                        onSubmit={closeMobile}
                      >
                        <input
                          name="q"
                          type="search"
                          placeholder="things to do, nail salons…"
                          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <input
                          name="loc"
                          type="text"
                          placeholder="Location"
                          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <Button type="submit" className="w-full">
                          Search
                        </Button>
                      </form>
                    </div>

                    {/* Auth buttons */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href="/login" onClick={closeMobile}>
                          Log In
                        </Link>
                      </Button>
                      <Button className="flex-1" asChild>
                        <Link href="/signup" onClick={closeMobile}>
                          Sign Up
                        </Link>
                      </Button>
                    </div>

                    {/* Quick links */}
                    <nav className="flex flex-col gap-0.5 border-t border-border pt-3">
                      <MobileForBusinessSection onLinkClick={closeMobile} />
                      <Link
                        href="/write-review"
                        className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        onClick={closeMobile}
                      >
                        Write a Review
                      </Link>
                      <Link
                        href="/search?ref=project"
                        className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        onClick={closeMobile}
                      >
                        Start a Project
                      </Link>
                    </nav>

                    {/* Categories (with collapsible sub-links) */}
                    <div className="flex flex-col gap-0.5 border-t border-border pt-3">
                      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Browse Categories
                      </p>
                      {categories.map((cat) => (
                        <MobileCategorySection
                          key={cat.label}
                          category={cat}
                          onLinkClick={closeMobile}
                        />
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* ─── Desktop category navigation bar (xl+ only) ─── */}
          <NavigationMenu
            viewport={false}
            className="relative z-50 hidden w-full max-w-full justify-start overflow-visible xl:flex"
            aria-label="Browse categories"
          >
            <NavigationMenuList className="flex-wrap justify-start gap-0 overflow-visible">
              {categories.map((cat) => (
                <NavigationMenuItem
                  key={cat.label}
                  className="relative shrink-0 overflow-visible"
                >
                  {cat.hasDropdown ? (
                    <DesktopCategoryMegaItem cat={cat} isTransparent={isTransparent} />
                  ) : (
                    <NavigationMenuLink
                      href={cat.href}
                      className={cn(
                        "flex h-auto items-center px-3 py-3 text-[15px] font-medium transition-colors 2xl:px-4 2xl:text-base",
                        isTransparent
                          ? "text-white/80 hover:text-white"
                          : "text-muted-foreground hover:text-foreground",
                      )}
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

      {/* Spacer: pushes content below the fixed header on non-home pages */}
      {!isHome && (
        <div className="h-14 sm:h-16 md:h-20 xl:h-[calc(5rem+3rem)]" aria-hidden />
      )}
    </>
  );
}
