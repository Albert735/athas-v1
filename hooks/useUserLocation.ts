import { useState, useEffect } from "react";
import * as Location from "expo-location";

export function useUserLocation() {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission denied");
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation([current.coords.longitude, current.coords.latitude]);
    })();
  }, []);

  return { location, error };
}
