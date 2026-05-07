/**
 * Placeholder until Google Places / Geocoding is wired.
 * Filter client-side for autocomplete-style UI.
 */
export const MOCK_LOCATION_SUGGESTIONS: readonly string[] = [
  "Austin, TX",
  "Dallas, TX",
  "Houston, TX",
  "San Antonio, TX",
  "Miami, FL",
  "Tampa, FL",
  "Orlando, FL",
  "Atlanta, GA",
  "Chicago, IL",
  "Phoenix, AZ",
  "Denver, CO",
  "Seattle, WA",
  "Portland, OR",
  "Los Angeles, CA",
  "San Diego, CA",
  "San Francisco, CA",
  "New York, NY",
  "Philadelphia, PA",
  "Boston, MA",
  "Downtown",
  "Midtown",
  "Airport area",
] as const;

export function filterLocationSuggestions(
  query: string,
  limit = 6,
): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return MOCK_LOCATION_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(q),
  ).slice(0, limit);
}

/** Shown in the Near field when the user picks “Current location” (geo later). */
export const CURRENT_LOCATION_LABEL = "Current location";
