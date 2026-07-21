import Feather from "@expo/vector-icons/Feather";

type ManeuverType =
  | "turn-left"
  | "turn-right"
  | "straight"
  | "arrive"
  | "depart";

export function getManeuverIcon(maneuver: ManeuverType): string {
  switch (maneuver) {
    case "turn-left":
      return "corner-down-left";
    case "turn-right":
      return "corner-down-right";
    case "straight":
      return "arrow-up";
    case "arrive":
      return "map-pin";
    case "depart":
      return "navigation";
    default:
      return "arrow-up";
  }
}
