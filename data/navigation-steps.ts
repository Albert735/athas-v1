export type ManeuverType =
  | "turn-left"
  | "turn-right"
  | "straight"
  | "arrive"
  | "depart";

export interface NavigationStep {
  id: string;
  maneuver: ManeuverType;
  instruction: string;
  distance: string;
  duration: string;
}

export const MOCK_STEPS: NavigationStep[] = [
  {
    id: "1",
    maneuver: "turn-left",
    instruction: "Head north on Main Street",
    distance: "50 metres",
    duration: "1 minute",
  },
  {
    id: "2",
    maneuver: "turn-left",
    instruction: "Turn left at the Fountain",
    distance: "20 metres",
    duration: "2 minutes",
  },
  {
    id: "3",
    maneuver: "turn-right",
    instruction: "Turn right at the Library",
    distance: "100 metres",
    duration: "3 minutes",
  },
  {
    id: "4",
    maneuver: "arrive",
    instruction: "You have arrived at Engineering School",
    distance: "0 metres",
    duration: "0 minutes",
  },
];
