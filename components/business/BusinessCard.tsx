import Link from "next/link";
import { Star, MapPin } from "@/components/ui/Icon";
import type { Business } from "@/types";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  business: Business;
  className?: string;
}

export function BusinessCard({ business, className }: BusinessCardProps) {
  const rating = business.rating ?? 0;
  const reviewCount = business.reviewCount ?? 0;

  return (
    <Link
      href={`/biz/${business.slug}`}
      className={cn(
        "block rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex gap-4">
        <div className="size-20 shrink-0 overflow-hidden rounded bg-muted">
          {business.imageUrl ? (
            <img
              src={business.imageUrl}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full bg-muted" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-foreground">
            {business.name}
          </h3>
          {business.category && (
            <p className="text-sm text-muted-foreground">
              {business.category}
            </p>
          )}
          {rating > 0 && (
            <div className="mt-1 flex items-center gap-1 text-sm">
              <Star
                className="size-4 fill-primary text-primary"
                aria-hidden
              />
              <span className="font-medium">{rating.toFixed(1)}</span>
              {reviewCount > 0 && (
                <span className="text-muted-foreground">
                  ({reviewCount} reviews)
                </span>
              )}
            </div>
          )}
          {business.address && (
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{business.address}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
