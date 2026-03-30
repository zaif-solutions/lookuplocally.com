"use client";

import Link from "next/link";
import { useState } from "react";
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
  Hammer,
  Paintbrush,
  Droplets,
  Waves,
  House,
  Wrench,
  Fan,
  Key,
  Sprout,
  Flower2,
  Armchair,
  ParkingCircle,
  Trash2,
  Disc,
  CarFront,
  Trees,
  Stethoscope,
  Eye,
  Scissors,
  Activity,
  Smile,
  Plus,
  Compass,
  Castle,
  Theater,
  Church,
  BookOpen,
  Flag,
  Bed,
  Bike,
  Tent,
  Umbrella,
  Car,
  Shirt,
  WashingMachine,
  Dog,
  Landmark,
  Building,
  Dumbbell,
  Menu,
  Search,
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
  { label: "Contractors & Handymen", href: "/search?q=contractors", icon: Hammer },
  { label: "Plumbers", href: "/search?q=plumbers", icon: Droplets },
  { label: "Electricians", href: "/search?q=electricians", icon: Zap },
  { label: "Heating & Air Conditioning", href: "/search?q=hvac", icon: Fan },
  { label: "Appliances and Repair", href: "/search?q=appliances", icon: Wrench },
  { label: "Roofing", href: "/search?q=roofing", icon: House },
  { label: "Locksmiths", href: "/search?q=locksmiths", icon: Key },
  { label: "Painters", href: "/search?q=painters", icon: Paintbrush },
  { label: "Landscaping", href: "/search?q=landscaping", icon: Leaf },
  { label: "Nurseries & Gardening", href: "/search?q=gardening", icon: Sprout },
  { label: "Florists", href: "/search?q=florists", icon: Flower2 },
  { label: "Tree Services", href: "/search?q=tree-services", icon: Trees },
  { label: "Home Cleaning", href: "/search?q=home-cleaning", icon: Sparkles },
  { label: "Furniture Stores", href: "/search?q=furniture", icon: Armchair },
  { label: "Movers", href: "/search?q=movers", icon: Truck },
];

const autoServiceLinks = [
  { label: "Auto Repair", href: "/search?q=auto-repair", icon: Wrench },
  { label: "Body Shops", href: "/search?q=body-shops", icon: Hammer },
  { label: "Oil Change", href: "/search?q=oil-change", icon: Droplets },
  { label: "Tires", href: "/search?q=tires", icon: Disc },
  { label: "Towing", href: "/search?q=towing", icon: Truck },
  { label: "Car Wash", href: "/search?q=car-wash", icon: Waves },
  { label: "Auto Detailing", href: "/search?q=auto-detailing", icon: Sparkles },
  { label: "Parking", href: "/search?q=parking", icon: ParkingCircle },
  { label: "Car Dealers", href: "/search?q=car-dealers", icon: CarFront },
  { label: "Junkyards", href: "/search?q=junkyards", icon: Trash2 },
];

const healthBeautyLinks = [
  { label: "Dentists", href: "/search?q=dentists", icon: Smile },
  { label: "Doctors", href: "/search?q=doctors", icon: Stethoscope },
  { label: "Chiropractors", href: "/search?q=chiropractors", icon: Activity },
  { label: "Optometrists", href: "/search?q=optometrists", icon: Eye },
  { label: "Dermatologists", href: "/search?q=dermatologists", icon: Sparkles },
  { label: "Podiatrists", href: "/search?q=podiatrists", icon: Activity },
  { label: "Massage", href: "/search?q=massage", icon: Flower2 },
  { label: "Hair Salons", href: "/search?q=hair-salons", icon: Scissors },
  { label: "Nail Salons", href: "/search?q=nail-salons", icon: Sparkles },
  { label: "Barbers", href: "/search?q=barbers", icon: Scissors },
  { label: "Spas", href: "/search?q=spas", icon: Waves },
  { label: "Physical Therapy", href: "/search?q=therapy", icon: Plus },
];

const travelLinks = [
  { label: "Things to Do", href: "/search?q=things-to-do", icon: Compass },
  { label: "Kids Activities & Camps", href: "/search?q=kids-activities", icon: Castle },
  { label: "Venues & Events", href: "/search?q=venues", icon: Theater },
  { label: "Churches", href: "/search?q=churches", icon: Church },
  { label: "Shopping Malls", href: "/search?q=shopping", icon: ShoppingBag },
  { label: "Bookstores", href: "/search?q=bookstores", icon: BookOpen },
  { label: "Mini Golf", href: "/search?q=mini-golf", icon: Flag },
  { label: "Bowling", href: "/search?q=bowling", icon: Disc },
  { label: "Hotels", href: "/search?q=hotels", icon: Bed },
  { label: "Taxis", href: "/search?q=taxis", icon: Car },
  { label: "Bike Rentals", href: "/search?q=bike-rentals", icon: Bike },
  { label: "Campgrounds", href: "/search?q=campgrounds", icon: Tent },
  { label: "Beaches", href: "/search?q=beaches", icon: Umbrella },
  { label: "Swimming Pools", href: "/search?q=pools", icon: Waves },
  { label: "Bars & Nightlife", href: "/search?q=nightlife", icon: Wine },
];

const moreLinks = [
  { label: "Dry Cleaning", href: "/search?q=dry-cleaning", icon: Shirt },
  { label: "Laundromats", href: "/search?q=laundromats", icon: WashingMachine },
  { label: "Thrift Stores", href: "/search?q=thrift-stores", icon: ShoppingBag },
  { label: "Tailors & Alterations", href: "/search?q=tailors", icon: Scissors },
  { label: "Apartments", href: "/search?q=apartments", icon: Building },
  { label: "Junk Removal", href: "/search?q=junk-removal", icon: Trash2 },
  { label: "Gyms", href: "/search?q=gyms", icon: Dumbbell },
  { label: "Yoga & Pilates", href: "/search?q=yoga", icon: Activity },
  { label: "Pet Groomers", href: "/search?q=pet-groomers", icon: Dog },
  { label: "Banks & Credit Unions", href: "/search?q=banks", icon: Landmark },
  { label: "Real Estate Agents", href: "/search?q=real-estate", icon: House },
  { label: "Parking", href: "/search?q=parking", icon: ParkingCircle },
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
            "w-full max-w-full justify-start",
          )}
          aria-label="Browse categories"
          viewport={false}
        >
          <NavigationMenuList className="flex-wrap justify-start gap-1">
            {categories.map((cat) => (
              <NavigationMenuItem key={cat.label} className="flex">
                {cat.hasDropdown ? (
                  <>
                    <NavigationMenuTrigger className="group relative h-auto bg-transparent px-2.5 py-4 text-[15px] font-bold text-[#202124] transition-colors hover:bg-transparent hover:text-primary data-[state=open]:text-primary 2xl:px-4 2xl:text-lg">
                      {cat.label}
                      <span className="absolute bottom-0 left-0 h-[3px] w-full scale-x-0 bg-[#d32323] group-data-[state=open]:scale-x-100" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-max">
                      <div className="p-4"> {/* <-- ADJUST THIS PADDING FOR THE WHOLE DROPDOWN BOX --> */}
                        <div className="grid grid-flow-col grid-rows-5 gap-x-6 gap-y-0 text-gray-900">
                          {cat.links?.map((link) => (
                            <NavigationMenuLink
                              key={link.label}
                              href={link.href}
                              className="group flex w-max whitespace-nowrap flex-row items-center gap-2 rounded-lg pt-3 pb-1.5 text-[15px] font-medium transition-colors hover:bg-gray-100 hover:text-foreground"
                            >
                              <link.icon className="size-[22px] shrink-0 text-[#202124]/80 transition-colors group-hover:text-[#202124]" />
                              <span className="text-[#202125] font-bold">{link.label}</span>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    href={cat.href}
                    className="flex h-auto items-center px-2.5 py-3.5 text-[15px] font-bold text-[#202124] transition-colors hover:text-primary 2xl:px-4 2xl:text-lg"
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
