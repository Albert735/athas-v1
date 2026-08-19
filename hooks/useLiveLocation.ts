import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

export interface LiveLocation {
  coords: [number, number];
  accuracy: number | null; // meters — lower is better
  heading: number | null; // degrees, direction of travel
}

export function useLiveLocation(active: boolean) {
  const [location, setLocation] = useState<LiveLocation | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (!active) {
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
      return;
    }

    let isMounted = true;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation, // strongest GPS mode available
          timeInterval: 500, // check twice a second instead of once
          distanceInterval: 1, // update on every 1m of movement
        },
        (position) => {
          if (isMounted) {
            setLocation({
              coords: [position.coords.longitude, position.coords.latitude],
              accuracy: position.coords.accuracy,
              heading: position.coords.heading,
            });
          }
        },
      );
    })();

    return () => {
      isMounted = false;
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
    };
  }, [active]);

  return location;
}
