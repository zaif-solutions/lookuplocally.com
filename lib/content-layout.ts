/**
 * Shared page shell: same horizontal padding + centered width as major consumer sites.
 * Import this constant wherever the main column should align (header, hero copy, sections, footer).
 *
 * Extra horizontal padding uses `3xl:` (see `--breakpoint-3xl` in app/globals.css), not `2xl:`,
 * so large laptops at the default 2xl width keep tighter gutters.
 */
export const PAGE_SHELL =
  "mx-auto w-full md:container px-5 md:px-8 lg:px-8 2xl:px-0 3xl:px-24";

/**
 * Pull the first hero under the transparent home header (header is `relative`, not fixed).
 * Matches main row h-14 / sm:h-16 / md:h-20 plus the xl category bar (~3rem).
 */
export const HOME_HERO_OVERLAP =
  "relative z-0 -mt-14 sm:-mt-16 md:-mt-20 xl:-mt-32";
