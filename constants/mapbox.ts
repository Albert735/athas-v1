// Warn loudly at startup if the token is missing so developers
// aren't left wondering why tiles and directions silently fail.
if (!process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN) {
  console.warn(
    "[Mapbox] EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN is not set. " +
      "Map tiles and the Directions API will not work. " +
      "Add it to your .env file and restart the dev server.",
  );
}

// Always a string — never null — so it's safe to interpolate into URLs.
export const MAPBOX_PUBLIC_TOKEN =
  process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN ?? "";

export const MAP_STYLE_URL = "mapbox://styles/mapbox/streets-v12";
