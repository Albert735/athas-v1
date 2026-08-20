import { MAPBOX_PUBLIC_TOKEN } from "@/constants/mapbox";

export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;

  maneuver: {
    type: string;
    modifier?: string;
    location: [number, number];
  };
}

export interface RouteResult {
  distanceMeters: number;
  durationSeconds: number;
  geometry: GeoJSON.LineString;
  steps: RouteStep[];
}

export type TransportProfile = "walking" | "driving" | "cycling";

export async function getRoute(
  origin: [number, number],
  destination: [number, number],
  profile: TransportProfile = "walking",
): Promise<RouteResult | null> {
  const coords = `${origin[0]},${origin[1]};${destination[0]},${destination[1]}`;

  const url =
    `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coords}` +
    `?geometries=geojson` +
    `&steps=true` +
    `&overview=full` +
    `&access_token=${MAPBOX_PUBLIC_TOKEN}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn("Directions request failed:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      return null;
    }

    const route = data.routes[0];

    const steps: RouteStep[] = route.legs[0].steps.map((step: any) => ({
      instruction: step.maneuver.instruction,
      distance: step.distance,
      duration: step.duration,
      maneuver: {
        type: step.maneuver.type,
        modifier: step.maneuver.modifier,
        location: step.maneuver.location,
      },
    }));

    return {
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      geometry: route.geometry,
      steps,
    };
  } catch (error) {
    console.warn("Directions API error:", error);
    return null;
  }
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }

  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);

  if (minutes < 1) {
    return "< 1 min";
  }

  return `${minutes} min`;
}
