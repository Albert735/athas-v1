import { places } from "@/data/places";
import { useState } from "react";
import MapDetailsCard from "@/components/map/map-details-card";
import MapDirectionsCard from "@/components/map/map-directions-card";
import MapNavigationCard from "@/components/map/map-navigation-card";

type SheetState = "details" | "directions" | "navigating";

interface Props {
  place: (typeof places)[number];
  onStateChange?: (state: SheetState) => void;
  onClose?: () => void;
}

export default function MapBottomSheet({ place, onStateChange }: Props) {
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
          onDirections={() => updateState("directions")}
        />
      )}
      {state === "directions" && (
        <MapDirectionsCard
          place={place}
          onStart={() => updateState("navigating")}
          onBack={() => updateState("details")}
        />
      )}
      {state === "navigating" && (
        <MapNavigationCard onExit={() => updateState("details")} />
      )}
    </>
  );
}
