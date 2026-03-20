/**
 * Design system tokens — single source of truth.
 * Actual values are in app/globals.css. Use Tailwind classes in UI.
 */

export const colors = {
  brand: {
    primary: "#d32323",
    primaryHover: "#b71f1f",
    primaryMuted: "#f5e6e6",
    secondary: "#0073bb",
    secondaryHover: "#005a92",
    secondaryMuted: "#e6f2f8",
  },
  neutral: {
    0: "#ffffff",
    50: "#f5f5f5",
    200: "#e6e6e6",
    500: "#666666",
    900: "#333333",
    950: "#000000",
  },
} as const;

export const radius = {
  sm: "0.375rem",
  DEFAULT: "0.5rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
} as const;

export const fonts = {
  sans: "var(--font-open-sans)",
  display: "var(--font-poppins)",
} as const;

export const semantic = {
  primary: "Brand primary — CTAs, primary buttons, badges",
  secondary: "Brand secondary — links, secondary buttons, focus ring",
  accent: "Brand secondary — hover states",
  destructive: "Brand primary — errors, delete",
  muted: "Neutral 50 — secondary text, placeholders",
  border: "Neutral 200 — borders, dividers",
  input: "Neutral 200 — input borders",
  ring: "Brand secondary — focus ring",
} as const;
