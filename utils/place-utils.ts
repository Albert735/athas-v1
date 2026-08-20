import { getDistanceMeters } from "./geo";
import { formatDistance } from "./directions";

/** Maps 3-letter day abbreviations to JS Date.getDay() values (0 = Sunday). */
const DAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/**
 * Parses a time string like "8:00 AM" or "10:00 PM" into minutes since midnight.
 */
function parseTimeToMinutes(timeStr: string): number {
  const [time, period] = timeStr.trim().split(" ");
  const [hStr, mStr] = time.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr ?? "0", 10);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

/**
 * Determines whether a place is currently open by parsing its `hours` and
 * `days` strings against the current local time.
 *
 * Supported formats:
 *   hours: "24 hours" | "8:00 AM - 4:00 PM"
 *   days:  "Every day" | "Mon - Fri" | "Mon - Sat"
 */
export function computeIsOpen(hours: string, days: string): boolean {
  // 24-hour venues are always open
  if (hours.trim() === "24 hours") return true;

  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday

  // ── Check day ──────────────────────────────────────────────────────────
  let isRightDay = false;
  if (days.trim() === "Every day") {
    isRightDay = true;
  } else {
    const parts = days.split(" - ");
    if (parts.length === 2) {
      const startDay = DAY_MAP[parts[0].trim()];
      const endDay = DAY_MAP[parts[1].trim()];
      if (startDay !== undefined && endDay !== undefined) {
        isRightDay = currentDay >= startDay && currentDay <= endDay;
      }
    }
  }

  if (!isRightDay) return false;

  // ── Check time ─────────────────────────────────────────────────────────
  const hourParts = hours.split(" - ");
  if (hourParts.length !== 2) return false;

  const openMinutes = parseTimeToMinutes(hourParts[0]);
  const closeMinutes = parseTimeToMinutes(hourParts[1]);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return nowMinutes >= openMinutes && nowMinutes < closeMinutes;
}

/**
 * Computes a human-readable distance string from the user's current location
 * to a place. Falls back to the place's static distance string when the user's
 * location isn't available yet.
 *
 * @param userLocation  [longitude, latitude] from useUserLocation, or null
 * @param placeLat      Place latitude
 * @param placeLon      Place longitude
 * @param fallback      Static distance string from place data (e.g. "0.4 km")
 */
export function computeDistanceString(
  userLocation: [number, number] | null,
  placeLat: number,
  placeLon: number,
  fallback: string,
): string {
  if (!userLocation) return fallback;
  const meters = getDistanceMeters(userLocation, [placeLon, placeLat]);
  return formatDistance(meters);
}
