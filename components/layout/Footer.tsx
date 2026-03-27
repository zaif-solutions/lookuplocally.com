import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { CONTENT_GUTTER, CONTENT_MAX } from "@/lib/content-layout";
import { cn } from "@/lib/utils";

const footerColumns = [
  {
    title: "Discover",
    links: [
      { label: "Restaurants", href: "/search?q=restaurants" },
      { label: "Home Services", href: "/search?q=home-services" },
      { label: "Health & Beauty", href: "/search?q=health-beauty" },
      { label: "Auto Services", href: "/search?q=auto-services" },
      { label: "More Categories", href: "/biz" },
    ],
  },
  {
    title: "Businesses",
    links: [
      { label: "Claim Your Profile", href: "/business" },
      { label: "Advertise", href: "/business#advertise" },
      { label: "Business Support", href: "/business#support" },
      { label: "Success Stories", href: "/business#stories" },
      { label: "Business Login", href: "/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
      { label: "Write a Review", href: "/search?write-review" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookie Policy", href: "/privacy#cookies" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Content Guidelines", href: "/guidelines" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className={cn(CONTENT_MAX, CONTENT_GUTTER, "py-12 sm:py-14")}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 text-sm font-semibold text-foreground">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {column.links.map(({ label, href }) => (
                  <li key={label + href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {year} {SITE_NAME}, Inc. Building trusted local discovery.
          </p>
          <p className="text-sm text-muted-foreground">
            Made for local communities, business owners, and everyday customers.
          </p>
        </div>
      </div>
    </footer>
  );
}
