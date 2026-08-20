import { useMemo } from "react";
import { places } from "@/data/places";

/**
 * Filters and ranks campus places against a freeform search query.
 *
 * - Returns an empty array when the query is blank so no dropdown appears.
 * - Names that *start with* the query are ranked above substring matches.
 * - Results are capped at 8 items to keep the dropdown compact.
 */
export function usePlaceSearch(query: string): (typeof places)[number][] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return places
      .filter((p) => p.name.toLowerCase().includes(q))
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        return aStarts - bStarts;
      })
      .slice(0, 8);
  }, [query]);
}
