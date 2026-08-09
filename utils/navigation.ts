export type MapboxManeuverType =
  | "turn"
  | "new name"
  | "depart"
  | "arrive"
  | "merge"
  | "on ramp"
  | "off ramp"
  | "fork"
  | "end of road"
  | "continue"
  | "roundabout"
  | "rotary"
  | "roundabout turn"
  | "notification"
  | "exit roundabout"
  | "exit rotary";

export type MapboxManeuverModifier =
  | "uturn"
  | "sharp right"
  | "right"
  | "slight right"
  | "straight"
  | "slight left"
  | "left"
  | "sharp left";

export function getManeuverIcon(type?: string, modifier?: string): string {
  if (type === "arrive") return "map-marker-check";
  if (type === "depart") return "navigation";
  if (type === "roundabout" || type === "rotary") return "rotate-right";

  switch (modifier) {
    case "left":
    case "slight left":
    case "sharp left":
      return "turn-left";
    case "right":
    case "slight right":
    case "sharp right":
      return "turn-right";
    case "uturn":
      return "u-turn-left";
    case "straight":
    default:
      return "arrow-upward";
  }
}
