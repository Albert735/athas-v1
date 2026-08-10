import { MAPBOX_PUBLIC_TOKEN } from "@/constants/mapbox";

/**
 * A single turn-by-turn instruction returned by the Mapbox Directions API.
 */
export interface RouteStep {
  instruction: string; // Human-readable instruction, e.g. "Turn left onto Main St"
  distance: number; // Distance for this step, in meters
  duration: number; // Estimated time for this step, in seconds
  maneuver: {
    type: string; // e.g. "turn", "depart", "arrive", "roundabout"
    modifier?: string; // e.g. "left", "right", "straight" — direction of the maneuver
  };
}

/**
 * Full result of a directions request: overall trip stats plus
 * the line geometry (for drawing the route) and step-by-step instructions.
 */
export interface RouteResult {
  distanceMeters: number; // Total trip distance
  durationSeconds: number; // Total estimated trip time
  geometry: GeoJSON.LineString; // The route path, used to draw the line on the map
  steps: RouteStep[]; // Ordered turn-by-turn instructions
}

type TransportProfile = "walking" | "driving" | "cycling";

/**
 * Calls the Mapbox Directions API to get a route between two points.
 *
 * @param origin - [longitude, latitude] of the starting point (usually the user's location)
 * @param destination - [longitude, latitude] of where they're going
 * @param profile - mode of transport; defaults to walking since Athas is a campus app
 * @returns a RouteResult with distance, duration, path geometry, and steps — or null if the request fails
 */
export async function getRoute(
  origin: [number, number],
  destination: [number, number],
  profile: TransportProfile = "walking",
): Promise<RouteResult | null> {
  // Mapbox expects coordinates as "lng,lat;lng,lat" in the URL
  const coords = `${origin[0]},${origin[1]};${destination[0]},${destination[1]}`;

  // geometries=geojson gives us a GeoJSON LineString we can feed straight into a ShapeSource
  // steps=true tells Mapbox to include turn-by-turn instructions in the response
  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coords}?geometries=geojson&steps=true&access_token=${MAPBOX_PUBLIC_TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // No route found (e.g. points too far apart, or unreachable) — Mapbox returns an empty routes array
    if (!data.routes || data.routes.length === 0) {
      return null;
    }

    // Mapbox can return multiple route alternatives; we always take the first (best/fastest) one
    const route = data.routes[0];

    // Flatten Mapbox's step data into our simpler RouteStep shape
    const steps: RouteStep[] = route.legs[0].steps.map((step: any) => ({
      instruction: step.maneuver.instruction,
      distance: step.distance,
      duration: step.duration,
      maneuver: {
        type: step.maneuver.type,
        modifier: step.maneuver.modifier,
      },
    }));

    return {
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      geometry: route.geometry,
      steps,
    };
  } catch (err) {
    // Network failure, bad token, etc. — fail gracefully rather than crashing the screen
    console.warn("Directions API error:", err);
    return null;
  }
}

/**
 * Converts raw meters into a friendly display string.
 * Under 1km shows meters ("450 m"), otherwise shows km with one decimal ("1.2 km").
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Converts raw seconds into a friendly display string in minutes.
 * Rounds to the nearest minute; shows "< 1 min" for anything under 60 seconds.
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 1) return "< 1 min";
  return `${minutes} min`;
}
