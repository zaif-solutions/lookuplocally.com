"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Loader2,
  LocateFixed,
  MapPin,
  Search,
} from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import {
  CURRENT_LOCATION_LABEL,
  filterLocationSuggestions,
} from "@/lib/mock-location-suggestions";

type ActivePanel = "loc" | null;

function buildSearchHref(q: string, loc: string): string {
  const params = new URLSearchParams();
  const qt = q.trim();
  const loct = loc.trim();
  if (qt) params.set("q", qt);
  if (loct) params.set("loc", loct);
  return params.toString() ? `/search?${params.toString()}` : "/search";
}

export type DirectorySearchBarProps = {
  idPrefix: string;
  tone?: "default" | "hero";
  variant?: "inline" | "stacked";
  className?: string;
  onSubmitSuccess?: () => void;
};

export function DirectorySearchBar({
  idPrefix,
  tone = "default",
  variant = "inline",
  className,
  onSubmitSuccess,
}: DirectorySearchBarProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [q, setQ] = React.useState("");
  const [loc, setLoc] = React.useState("");
  const [activePanel, setActivePanel] = React.useState<ActivePanel>(null);

  const rootRef = React.useRef<HTMLFormElement>(null);
  const idQ = `${idPrefix}-find`;
  const idLoc = `${idPrefix}-near`;

  const isHero = tone === "hero";
  const isInline = variant === "inline";
  /** Home header: same solid card bar + readable inputs as inner pages (not glass / white text). */
  const homeSolidBar = isHero && isInline;

  const iconMuted =
    isHero && !homeSolidBar ? "text-white/70" : "text-muted-foreground";
  const inputClass = cn(
    "min-h-10 min-w-0 flex-1 border-0 bg-transparent py-2 text-base outline-none focus:ring-0 sm:min-h-0 sm:py-2.5 sm:text-sm",
    isHero && !homeSolidBar
      ? "text-white placeholder:text-white/60"
      : "text-foreground placeholder:text-muted-foreground",
  );

  type Segment = "find" | "near";

  const rowShell = (segment: Segment, segmentOpen: boolean) =>
    cn(
      "flex min-h-12 w-full min-w-0 items-center gap-2 px-3",
      isInline && "sm:min-h-0 sm:flex-1 sm:py-0 sm:pl-3 sm:pr-2",
      isInline &&
        segmentOpen &&
        segment === "near" &&
        "relative z-[1] rounded-t-md border border-b-0 border-border bg-popover",
      !isInline &&
        cn(
          "border border-input bg-background px-3 py-0.5 focus-within:ring-2 focus-within:ring-ring",
          !segmentOpen && "rounded-md",
          segmentOpen &&
            segment === "near" &&
            "rounded-t-md rounded-b-none border-b-0 bg-popover",
        ),
    );

  React.useEffect(() => {
    if (!activePanel) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setActivePanel(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [activePanel]);

  React.useEffect(() => {
    if (!activePanel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePanel]);

  const pushSearch = (nextQ: string, nextLoc: string) => {
    const nq = nextQ.trim();
    const nl = nextLoc.trim();
    const href = buildSearchHref(nq, nl);
    onSubmitSuccess?.();
    startTransition(() => {
      router.push(href);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushSearch(q, loc);
    setActivePanel(null);
  };

  const pickLocation = (value: string) => {
    setLoc(value);
    setActivePanel(null);
  };

  const locSuggestions = filterLocationSuggestions(loc);

  const panelSurfaceBase = cn(
    "overflow-hidden border-border bg-popover text-popover-foreground shadow-md",
    "animate-in fade-in-0 slide-in-from-top-1 duration-200 ease-out",
    "motion-reduce:animate-none",
  );

  const locationPanelSurface = cn(
    panelSurfaceBase,
    isInline &&
      "absolute left-0 right-0 top-full z-100 mt-0 rounded-b-md border border-t-0 border-border",
    !isInline &&
      "-mt-px rounded-b-md rounded-t-none border border-t-0 border-border shadow-sm",
  );

  const panelItemClass =
    "flex w-full min-h-10 items-center gap-2 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted/80";

  const locationDropdown = activePanel === "loc" && (
    <div
      className={locationPanelSurface}
      role="region"
      aria-label="Location suggestions"
    >
      {loc.trim() === "" ? (
        <button
          type="button"
          className={cn(panelItemClass, "font-medium")}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => pickLocation(CURRENT_LOCATION_LABEL)}
        >
          <LocateFixed
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
          {CURRENT_LOCATION_LABEL}
        </button>
      ) : locSuggestions.length > 0 ? (
        <ul className="max-h-56 overflow-y-auto overscroll-contain py-1" role="list">
          {locSuggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                className={panelItemClass}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pickLocation(s)}
              >
                <MapPin
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <span className="line-clamp-1">{s}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-3 py-3 text-sm text-muted-foreground">
          No local matches for “{loc.trim()}”. Google Places suggestions will
          appear here once connected.
        </p>
      )}
    </div>
  );

  const submitBtn = (
    <Button
      type="submit"
      disabled={isPending}
      size="lg"
      aria-label={isPending ? "Searching" : "Search"}
      aria-busy={isPending}
      className={cn(
        "shrink-0 gap-2 border-0 shadow-none",
        isInline &&
          cn(
            "min-h-12 h-12 w-full rounded-md py-0 text-base font-semibold sm:text-sm",
            "sm:h-full sm:min-h-0 sm:w-auto sm:rounded-none sm:rounded-r-md",
            "sm:border-l sm:border-border sm:px-5 sm:py-0",
          ),
        !isInline && "h-10 w-full py-0 font-semibold",
      )}
    >
      {isPending ? (
        <Loader2 className="size-5 shrink-0 animate-spin" aria-hidden />
      ) : (
        <>
          <Search className="size-5 shrink-0" aria-hidden />
          {isInline ? (
            <span className="hidden xl:inline xl:text-lg xl:font-semibold">
              Search
            </span>
          ) : (
            <span>Search</span>
          )}
        </>
      )}
    </Button>
  );

  return (
    <form
      ref={rootRef}
      role="search"
      aria-label="Search businesses"
      onSubmit={handleSubmit}
      className={cn(
        isInline &&
          cn(
            "flex w-full overflow-visible rounded-md border shadow-md",
            "flex-col gap-0 sm:h-12 sm:flex-row sm:items-stretch",
            homeSolidBar || !isHero
              ? "border-border bg-card"
              : "border-white/20 bg-white/10 backdrop-blur-md",
          ),
        !isInline && "flex w-full flex-col gap-2.5 overflow-visible",
        className,
      )}
    >
      <label htmlFor={idQ} className="sr-only">
        Find
      </label>
      <div
        className={cn(
          "relative flex min-w-0 flex-col",
          isInline && "min-h-12 flex-1 sm:h-full sm:min-h-0",
        )}
      >
        <div
          className={rowShell("find", false)}
          onMouseDown={() => setActivePanel(null)}
        >
          <Search
            className={cn("size-5 shrink-0 self-center", iconMuted)}
            aria-hidden
          />
          <input
            id={idQ}
            name="q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setActivePanel(null)}
            autoComplete="off"
            placeholder={
              isInline
                ? "restaurants, services..."
                : "things to do, nail salons…"
            }
            className={cn(inputClass, !isInline && "text-sm")}
          />
        </div>
      </div>

      {isInline ? (
        <span
          className={cn(
            "hidden h-auto w-px shrink-0 sm:block",
            homeSolidBar || !isHero ? "bg-border" : "bg-white/25",
          )}
          aria-hidden
        />
      ) : null}

      <label htmlFor={idLoc} className="sr-only">
        Near
      </label>
      <div
        className={cn(
          "relative flex min-w-0 flex-col",
          isInline &&
            "min-h-12 w-full min-w-0 flex-1 sm:h-full sm:min-h-0 sm:w-44 sm:flex-none md:w-52 lg:w-60",
        )}
      >
        <div className={rowShell("near", activePanel === "loc")}>
          <MapPin
            className={cn("size-5 shrink-0 self-center", iconMuted)}
            aria-hidden
          />
          <input
            id={idLoc}
            name="loc"
            type="text"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            onFocus={() => setActivePanel("loc")}
            autoComplete="street-address"
            placeholder={isInline ? "address, city..." : "Location"}
            className={cn(inputClass, !isInline && "text-sm")}
          />
        </div>
        {locationDropdown}
      </div>

      {submitBtn}
    </form>
  );
}
