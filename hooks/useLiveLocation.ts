import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

export interface LiveLocation {
  coords: [number, number];
  accuracy: number | null;
  heading: number | null;
}

export function useLiveLocation(active: boolean) {
  const [location, setLocation] = useState<LiveLocation | null>(null);

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    let mounted = true;

    const startTracking = async () => {
      if (!active) {
        subscriptionRef.current?.remove();
        subscriptionRef.current = null;
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      subscriptionRef.current?.remove();

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 500,
          distanceInterval: 1,
        },
        (position) => {
          if (!mounted) {
            return;
          }

          setLocation({
            coords: [position.coords.longitude, position.coords.latitude],
            accuracy: position.coords.accuracy,
            heading: position.coords.heading,
          });
        },
      );
    };

    startTracking();

    return () => {
      mounted = false;

      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
    };
  }, [active]);

  return location;
}
