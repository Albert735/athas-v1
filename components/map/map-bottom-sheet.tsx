import { places } from "@/data/places";
import { useState } from "react";
import MapDetailsCard from "@/components/map/map-details-card";
import MapDirectionsCard from "@/components/map/map-directions-card";
import MapNavigationCard from "@/components/map/map-navigation-card";
import type { RouteResult } from "@/utils/directions";

type SheetState = "details" | "directions" | "navigating";
type TransportProfile = "walking" | "driving" | "cycling";

interface Props {
  place: (typeof places)[number];
  route: RouteResult | null;
  routeLoading: boolean;
  onRequestDirections: (profile?: TransportProfile) => void;
  onStartNavigation: () => void;
  onStateChange?: (state: SheetState) => void;
  onClose?: () => void;
}

export default function MapBottomSheet({
  place,
  route,
  routeLoading,
  onRequestDirections,
  onStartNavigation,
  onStateChange,
}: Props) {
  const [state, setState] = useState<SheetState>("details");

  const updateState = (newState: SheetState) => {
    setState(newState);
    onStateChange?.(newState);
  };

  return (
    <>
      {state === "details" && (
        <MapDetailsCard
          place={place}
          onDirections={() => {
            updateState("directions");
            onRequestDirections("walking");
          }}
        />
      )}
      {state === "directions" && (
        <MapDirectionsCard
          place={place}
          route={route}
          routeLoading={routeLoading}
          onModeChange={onRequestDirections}
          onStart={() => {
            updateState("navigating");
            onStartNavigation();
          }}
          onBack={() => updateState("details")}
        />
      )}
      {state === "navigating" && (
        <MapNavigationCard
          route={route}
          onExit={() => updateState("details")}
        />
      )}
    </>
  );
}
