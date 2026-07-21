import { buildingData } from "@/data/buildings";
import { useState } from "react";
import { BottomSheetWrapper } from "@/components/ui/bottom-sheet";
import MapDetailsCard from "@/components/map/map-details-card";
import MapDirectionsCard from "@/components/map/map-directions-card";
import MapNavigationCard from "@/components/map/map-navigation-card";

type SheetState = "details" | "directions" | "navigating";

interface Props {
  building: (typeof buildingData)[0];
  onStateChange?: (state: SheetState) => void;
}

export default function MapBottomSheet({ building, onStateChange }: Props) {
  const [state, setState] = useState<SheetState>("details");

  const updateState = (newState: SheetState) => {
    setState(newState);
    onStateChange?.(newState);
  };

  return (
    <BottomSheetWrapper>
      {state === "details" && (
        <MapDetailsCard
          building={building}
          onDirections={() => updateState("directions")}
        />
      )}
      {state === "directions" && (
        <MapDirectionsCard
          building={building}
          onStart={() => updateState("navigating")}
          onBack={() => updateState("details")}
        />
      )}
      {state === "navigating" && (
        <MapNavigationCard onExit={() => updateState("details")} />
      )}
    </BottomSheetWrapper>
  );
}
