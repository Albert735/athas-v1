import { useState, useEffect } from "react";
import * as Location from "expo-location";

/**
 * Fetches the user's current GPS coordinates once, on mount.
 * Requests foreground location permission first — if denied, `error` is set
 * and `location` stays null so calling screens can handle that case
 * (e.g. show "enable location" messaging instead of crashing).
 */
export function useUserLocation() {
  // [longitude, latitude] — this order matches what Mapbox expects everywhere
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Ask the user for permission the first time this runs;
      // subsequent calls just return the already-granted/denied status
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Location permission denied");
        return;
      }

      // High accuracy is worth the extra battery/time cost here since
      // campus buildings can be close together and we want precise routing
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation([current.coords.longitude, current.coords.latitude]);
    })();
  }, []); // runs once when the hook is first used

  return { location, error };
}
