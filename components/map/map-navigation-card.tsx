import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getManeuverIcon } from "@/utils/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useColor } from "@/hooks/useColor";
import type { RouteResult } from "@/utils/directions";
import { formatDistance, formatDuration } from "@/utils/directions";
import { useLiveLocation } from "@/hooks/useLiveLocation";
import { getDistanceMeters } from "@/utils/geo";

// How close (in meters) the user needs to be to a maneuver point
// before we consider that step "reached" and move to the next one
const ARRIVAL_THRESHOLD_METERS = 15;

interface Props {
  route: RouteResult | null;
  onExit?: () => void;
}

export default function MapNavigationCard({ route, onExit }: Props) {
  const [stepIndex, setStepIndex] = useState(0);

  // Actively track the user's live position while this card is mounted (i.e. while navigating)
  const liveLocation = useLiveLocation(true);

  const step = route?.steps[stepIndex];
  const isLastStep = route ? stepIndex === route.steps.length - 1 : true;

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");
  const primaryColor = useColor("primary");

  // Auto-advance: every time the user's live location updates, check how
  // close they are to the current step's maneuver point. Once within the
  // threshold, move to the next step automatically — or exit if it was the last one.
  useEffect(() => {
    if (!liveLocation || !step) return;

    // Ignore readings with poor GPS accuracy — these cause false early/late triggers
    if (liveLocation.accuracy !== null && liveLocation.accuracy > 15) return;

    const distanceToCurrentManeuver = getDistanceMeters(
      liveLocation.coords,
      step.maneuver.location,
    );

    const nextStep = route?.steps[stepIndex + 1];
    const distanceToNextManeuver = nextStep
      ? getDistanceMeters(liveLocation.coords, nextStep.maneuver.location)
      : null;

    // Advance only when we're within a tight radius of the current point
    // AND (if there's a next step) we're now closer to the next point than this one —
    // this stops the instruction from flipping too early while still approaching
    const closeEnough = distanceToCurrentManeuver <= 10;
    const pastThisPoint =
      distanceToNextManeuver === null ||
      distanceToNextManeuver < distanceToCurrentManeuver;

    if (closeEnough && pastThisPoint) {
      if (isLastStep) {
        onExit?.();
      } else {
        setStepIndex((i) => i + 1);
      }
    }
  }, [liveLocation]);

  if (!route || !step) {
    return (
      <View style={[styles.sheet, { backgroundColor: cardColor }]}>
        <Text style={{ color: mutedColor }}>No route available</Text>
        <Button
          onPress={onExit}
          variant="destructive"
          style={{ marginTop: 16 }}
        >
          Exit
        </Button>
      </View>
    );
  }

  const iconName = getManeuverIcon(step.maneuver.type, step.maneuver.modifier);

  // Live distance remaining to the current maneuver, recalculated as the user moves —
  // falls back to the step's original distance until the first GPS fix comes in
  const liveDistance = liveLocation
    ? getDistanceMeters(liveLocation.coords, step.maneuver.location)
    : step.distance;

  return (
    <View style={[styles.sheet, { backgroundColor: cardColor }]}>
      <View style={styles.navHeader}>
        <View style={[styles.iconCircle, { backgroundColor: primaryColor }]}>
          <MaterialIcons name={iconName as any} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.instructionInfo}>
          <Text style={[styles.turnDistance, { color: textColor }]}>
            {formatDistance(liveDistance)}
          </Text>
          <Text
            style={[styles.instructionText, { color: mutedColor }]}
            numberOfLines={2}
          >
            {step.instruction}
          </Text>
        </View>
      </View>

      <View style={[styles.progressRow, { backgroundColor }]}>
        <View style={styles.statBox}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>
            Time Left
          </Text>
          <Text style={[styles.statValue, { color: textColor }]}>
            {formatDuration(route.durationSeconds)}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: borderColor }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>
            Distance
          </Text>
          <Text style={[styles.statValue, { color: textColor }]}>
            {formatDistance(route.distanceMeters)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button onPress={onExit} variant="destructive">
          Exit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    margin: 16,
    borderRadius: 40,
  },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 14,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  instructionInfo: { flex: 1 },
  turnDistance: { fontSize: 20, fontWeight: "700" },
  instructionText: { fontSize: 14, fontWeight: "500", marginTop: 2 },
  stepDots: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 16,
    justifyContent: "center",
  },
  stepDot: { width: 6, height: 6, borderRadius: 3 },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  statBox: { flex: 1, alignItems: "center" },
  statLabel: { fontSize: 12, fontWeight: "500", marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: "700" },
  divider: { width: 1, height: 24 },
  footer: {},
});
