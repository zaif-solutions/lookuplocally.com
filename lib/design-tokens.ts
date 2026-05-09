/**
 * Design system tokens — matches brand style guide.
 * Actual values are in app/globals.css. Use Tailwind classes in UI.
 */

export const colors = {
  brand: {
    primary: "#d32323",
    primaryHover: "#b71f1f",
    primaryMuted: "#f5e6e6",
    secondary: "#2d2e2f",
    secondaryHover: "#3d3e3f",
    tertiary: "#bbbac0",
  },
  neutral: {
    0: "#ffffff",
    50: "#f5f5f5",
    200: "#e6e6e6",
    500: "#666666",
    900: "#2d2e2f",
    950: "#1a1a1b",
  },
} as const;

/**
 * Base corner radius — `app/globals.css` `--radius` (all `--radius-*` alias it).
 * In UI prefer Tailwind `rounded-md` (and `rounded-sm` / `rounded-lg` — same token).
 */
export const radius = {
  DEFAULT: "0.295rem",
} as const;

export const fonts = {
  sans: "var(--font-open-sans)",
  display: "var(--font-poppins)",
} as const;

/** Button default size = lg. Override with size="sm" | "default" | "icon" etc. */
export const buttonSize = { default: "lg" } as const;

export const semantic = {
  primary: "Brand primary — CTAs, primary buttons, links, focus ring",
  secondary: "Brand secondary (charcoal) — inverted/secondary buttons",
  accent: "Brand tertiary — hover states, muted UI",
  destructive: "Brand primary — errors, delete",
  muted: "Neutral 50 — secondary text, placeholders",
  border: "Neutral 200 — borders, dividers",
  input: "Neutral 200 — input borders",
  ring: "Brand primary — focus ring",
} as const;
