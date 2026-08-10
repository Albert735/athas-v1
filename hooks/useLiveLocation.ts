import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

/**
 * Continuously watches the user's GPS position while `active` is true.
 * Used during turn-by-turn navigation to auto-advance steps as the user walks.
 * Stops watching automatically when `active` becomes false or the component unmounts.
 */
export function useLiveLocation(active: boolean) {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (!active) {
      // Stop watching when navigation isn't active — saves battery
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
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // check position at most once per second
          distanceInterval: 3, // or every 3 meters moved, whichever comes first
        },
        (position) => {
          if (isMounted) {
            setLocation([position.coords.longitude, position.coords.latitude]);
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
