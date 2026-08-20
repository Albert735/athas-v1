export function getManeuverIcon(type?: string, modifier?: string): string {
  if (type === "arrive") {
    return "map-marker-check";
  }

  if (type === "depart") {
    return "navigation";
  }

  if (type === "roundabout" || type === "rotary") {
    return "rotate-right";
  }

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
