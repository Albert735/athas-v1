export type ManeuverType =
  | "turn-left"
  | "turn-right"
  | "straight"
  | "arrive"
  | "depart";

export function getManeuverIcon(maneuver: ManeuverType): string {
  switch (maneuver) {
    case "turn-left":
      return "turn-left";

    case "turn-right":
      return "turn-right";

    case "straight":
      return "arrow-up-bold";

    case "arrive":
      return "map-marker-check";

    case "depart":
      return "navigation";

    default:
      return "navigation";
  }
}
