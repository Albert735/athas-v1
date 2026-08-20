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
  /** Current sheet mode — owned and controlled by the parent. */
  sheetState: SheetState;
  /** Called whenever the sheet needs to transition to a new state. */
  onSheetStateChange: (state: SheetState) => void;
  onRequestDirections: (profile?: TransportProfile) => void;
  /** Called when the user taps X on the details card to deselect the place. */
  onClose?: () => void;
  /**
   * Called when the user exits active navigation (taps "Exit" on the nav card).
   * The parent uses this to clear the route and reset the camera.
   */
  onNavigationExit?: () => void;
  /** Optional live-computed distance string for the details card. */
  distanceOverride?: string;
  /** Optional live-computed open/closed status for the details card. */
  isOpenOverride?: boolean;
}

/**
 * Stateless switcher that renders the correct map card for the current sheet state.
 * All state lives in the parent (map/index.tsx) — this component just wires up
 * the three cards and forwards callbacks.
 */
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
  return (
    <>
      {/* Details view — shown when a place is first selected */}
      {sheetState === "details" && (
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
      )}

      {/* Directions view — transport mode picker + route summary */}
      {sheetState === "directions" && (
        <MapDirectionsCard
          place={place}
          route={route}
          routeLoading={routeLoading}
          onModeChange={onRequestDirections}
          onStart={() => {
            onSheetStateChange("navigating");
          }}
          onBack={() => onSheetStateChange("details")}
        />
      )}

      {/* Navigation view — live turn-by-turn instructions */}
      {sheetState === "navigating" && (
        <MapNavigationCard
          route={route}
          onExit={() => {
            // Go back to the details card, then let the parent clean up
            onSheetStateChange("details");
            onNavigationExit?.();
          }}
        />
      )}
    </>
  );
}
