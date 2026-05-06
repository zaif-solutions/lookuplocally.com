/**
 * Shared page shell: same horizontal padding + centered width as major consumer sites.
 * Import this constant wherever the main column should align (header, hero copy, sections, footer).
 *
 * Extra horizontal padding uses `3xl:` (see `--breakpoint-3xl` in app/globals.css), not `2xl:`,
 * so large laptops at the default 2xl width keep tighter gutters.
 */
export const PAGE_SHELL =
  "mx-auto w-full md:container px-5 md:px-8 lg:px-12 3xl:px-28";
