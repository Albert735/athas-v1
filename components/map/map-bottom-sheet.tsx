import { buildingData } from "@/data/buildings";
import { useState } from "react";
import { BottomSheetWrapper } from "@/components/ui/bottom-sheet";
import MapDetailsCard from "@/components/map/map-details-card";
import MapDirectionsCard from "@/components/map/map-directions-card";
import MapNavigationCard from "@/components/map/map-navigation-card";

type SheetState = "details" | "directions" | "navigating";

interface Props {
  building: (typeof buildingData)[0];
}

export default function MapBottomSheet({ building }: Props) {
  const [state, setState] = useState<SheetState>("details");

  return (
    <BottomSheetWrapper>
      {state === "details" && (
        <MapDetailsCard
          building={building}
          onDirections={() => setState("directions")}
        />
      )}
      {state === "directions" && (
        <MapDirectionsCard
          building={building}
          onStart={() => setState("navigating")}
          onBack={() => setState("details")}
        />
      )}
      {state === "navigating" && (
        <MapNavigationCard onExit={() => setState("details")} />
      )}
    </BottomSheetWrapper>
  );
}
