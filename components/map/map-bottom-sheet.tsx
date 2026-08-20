import { places } from "@/data/places";

import MapDetailsCard from "@/components/map/map-details-card";
import MapDirectionsCard from "@/components/map/map-directions-card";
import MapNavigationCard from "@/components/map/map-navigation-card";

import type { RouteResult } from "@/utils/directions";
import type { SheetState, TransportProfile } from "@/types/map";

interface Props {
  place: (typeof places)[number];

  route: RouteResult | null;

  routeLoading: boolean;

  sheetState: SheetState;

  onSheetStateChange: (state: SheetState) => void;

  onRequestDirections: (profile?: TransportProfile) => void;

  onClose?: () => void;

  onNavigationExit?: () => void;

  distanceOverride?: string;

  isOpenOverride?: boolean;
}

export default function MapBottomSheet({
  place,
  route,
  routeLoading,
  sheetState,
  onSheetStateChange,
  onRequestDirections,
  onClose,
  onNavigationExit,
  distanceOverride,
  isOpenOverride,
}: Props) {
  if (sheetState === "details") {
    return (
      <MapDetailsCard
        place={place}
        distanceOverride={distanceOverride}
        isOpenOverride={isOpenOverride}
        onClose={onClose}
        onDirections={() => {
          onSheetStateChange("directions");
          onRequestDirections("walking");
        }}
      />
    );
  }

  if (sheetState === "directions") {
    return (
      <MapDirectionsCard
        place={place}
        route={route}
        routeLoading={routeLoading}
        onModeChange={onRequestDirections}
        onStart={() => {
          if (!route) return;

          onSheetStateChange("navigating");
        }}
        onBack={() => {
          onSheetStateChange("details");
        }}
      />
    );
  }

  return (
    <MapNavigationCard
      route={route}
      onExit={() => {
        onSheetStateChange("details");
        onNavigationExit?.();
      }}
    />
  );
}
