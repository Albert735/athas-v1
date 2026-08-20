import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { useColor } from "@/hooks/useColor";

import {
  formatDistance,
  formatDuration,
  type RouteResult,
} from "@/utils/directions";

import { getManeuverIcon } from "@/utils/navigation";
import { getDistanceMeters } from "@/utils/geo";
import { useLiveLocation } from "@/hooks/useLiveLocation";

const ARRIVAL_THRESHOLD_METERS = 20;

interface Props {
  route: RouteResult | null;
  onExit?: () => void;
}

export default function MapNavigationCard({ route, onExit }: Props) {
  const [stepIndex, setStepIndex] = useState(0);

  const liveLocation = useLiveLocation(Boolean(route));

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");
  const primaryColor = useColor("primary");

  const step = route?.steps[stepIndex];

  const isLastStep =
    route && route.steps.length > 0
      ? stepIndex === route.steps.length - 1
      : true;

  useEffect(() => {
    setStepIndex(0);
  }, [route]);

  useEffect(() => {
    if (!route || !step || !liveLocation) {
      return;
    }

    if (liveLocation.accuracy !== null && liveLocation.accuracy > 30) {
      return;
    }

    const distanceToManeuver = getDistanceMeters(
      liveLocation.coords,
      step.maneuver.location,
    );

    if (distanceToManeuver > ARRIVAL_THRESHOLD_METERS) {
      return;
    }

    if (isLastStep) {
      onExit?.();
      return;
    }

    setStepIndex((current) => {
      if (current !== stepIndex) {
        return current;
      }

      return Math.min(current + 1, route.steps.length - 1);
    });
  }, [liveLocation, route, step, stepIndex, isLastStep, onExit]);

  if (!route || !step) {
    return (
      <View style={[styles.sheet, { backgroundColor: cardColor }]}>
        <Text style={{ color: mutedColor }}>No route available.</Text>

        <View style={styles.footer}>
          <Button variant="destructive" onPress={onExit}>
            Exit
          </Button>
        </View>
      </View>
    );
  }

  const distanceToManeuver = liveLocation
    ? getDistanceMeters(liveLocation.coords, step.maneuver.location)
    : step.distance;

  const futureSteps = route.steps.slice(stepIndex + 1);

  const futureDistance = futureSteps.reduce(
    (total, item) => total + item.distance,
    0,
  );

  const futureDuration = futureSteps.reduce(
    (total, item) => total + item.duration,
    0,
  );

  const currentProgress =
    step.distance > 0 ? Math.min(distanceToManeuver / step.distance, 1) : 0;

  const currentRemainingDuration = step.duration * currentProgress;

  const remainingDistance = distanceToManeuver + futureDistance;

  const remainingDuration = currentRemainingDuration + futureDuration;

  const iconName = getManeuverIcon(step.maneuver.type, step.maneuver.modifier);

  return (
    <View style={[styles.sheet, { backgroundColor: cardColor }]}>
      <View style={styles.navHeader}>
        <View style={[styles.iconCircle, { backgroundColor: primaryColor }]}>
          <MaterialIcons name={iconName as any} size={26} color="#FFFFFF" />
        </View>

        <View style={styles.instructionInfo}>
          <Text style={[styles.turnDistance, { color: textColor }]}>
            {formatDistance(distanceToManeuver)}
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
            {formatDuration(remainingDuration)}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        <View style={styles.statBox}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>
            Distance
          </Text>

          <Text style={[styles.statValue, { color: textColor }]}>
            {formatDistance(remainingDistance)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button variant="destructive" onPress={onExit}>
          Exit Navigation
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
    gap: 14,
    marginBottom: 16,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  instructionInfo: {
    flex: 1,
  },

  turnDistance: {
    fontSize: 20,
    fontWeight: "700",
  },

  instructionText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 3,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },

  statBox: {
    flex: 1,
    alignItems: "center",
  },

  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700",
  },

  divider: {
    width: 1,
    height: 28,
  },

  footer: {},
});
