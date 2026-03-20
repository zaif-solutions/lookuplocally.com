import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                data-link="secondary"
                className="text-sm font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
