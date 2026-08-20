import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Button } from "../ui/button";

import { useColor } from "@/hooks/useColor";

import type { RouteResult } from "@/utils/directions";

import { formatDistance, formatDuration } from "@/utils/directions";

import { useLiveLocation } from "@/hooks/useLiveLocation";

import { getDistanceMeters } from "@/utils/geo";

import { getManeuverIcon } from "@/utils/navigation";

interface Props {
  route: RouteResult | null;
  onExit?: () => void;
}

const ARRIVAL_THRESHOLD_METERS = 15;

export default function MapNavigationCard({ route, onExit }: Props) {
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");
  const primaryColor = useColor("primary");

  const liveLocation = useLiveLocation(Boolean(route));

  const [stepIndex, setStepIndex] = React.useState(0);

  const step = route?.steps[stepIndex];

  React.useEffect(() => {
    if (!liveLocation || !route || !step) {
      return;
    }

    if (liveLocation.accuracy !== null && liveLocation.accuracy > 20) {
      return;
    }

    const distanceToManeuver = getDistanceMeters(
      liveLocation.coords,
      step.maneuver.location,
    );

    if (distanceToManeuver > ARRIVAL_THRESHOLD_METERS) {
      return;
    }

    if (stepIndex >= route.steps.length - 1) {
      onExit?.();
      return;
    }

    setStepIndex((current) => current + 1);
  }, [liveLocation, route, step, stepIndex, onExit]);

  React.useEffect(() => {
    setStepIndex(0);
  }, [route]);

  if (!route || !step) {
    return (
      <View style={[styles.sheet, { backgroundColor: cardColor }]}>
        <Text style={{ color: mutedColor }}>No route available.</Text>

        <Button
          variant="destructive"
          onPress={onExit}
          style={styles.exitButton}
        >
          Exit
        </Button>
      </View>
    );
  }

  const iconName = getManeuverIcon(step.maneuver.type, step.maneuver.modifier);

  const liveDistance = liveLocation
    ? getDistanceMeters(liveLocation.coords, step.maneuver.location)
    : step.distance;

  const remainingSteps = route.steps.slice(stepIndex + 1);

  const futureDistance = remainingSteps.reduce(
    (total, currentStep) => total + currentStep.distance,
    0,
  );

  const futureDuration = remainingSteps.reduce(
    (total, currentStep) => total + currentStep.duration,
    0,
  );

  const currentStepProgress =
    step.distance > 0 ? Math.min(liveDistance / step.distance, 1) : 0;

  const currentStepRemainingDuration = step.duration * currentStepProgress;

  const remainingDistance = liveDistance + futureDistance;

  const remainingDuration = currentStepRemainingDuration + futureDuration;

  return (
    <View style={[styles.sheet, { backgroundColor: cardColor }]}>
      <View style={styles.instructionRow}>
        <View style={[styles.iconCircle, { backgroundColor: primaryColor }]}>
          <MaterialIcons name={iconName as any} size={24} color="#FFFFFF" />
        </View>

        <View style={styles.instructionInfo}>
          <Text style={[styles.turnDistance, { color: textColor }]}>
            {formatDistance(liveDistance)}
          </Text>

          <Text
            style={[styles.instruction, { color: mutedColor }]}
            numberOfLines={2}
          >
            {step.instruction}
          </Text>
        </View>
      </View>

      <View style={[styles.progress, { backgroundColor }]}>
        <View style={styles.stat}>
          <Text style={[styles.label, { color: mutedColor }]}>Time left</Text>

          <Text style={[styles.value, { color: textColor }]}>
            {formatDuration(remainingDuration)}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        <View style={styles.stat}>
          <Text style={[styles.label, { color: mutedColor }]}>Distance</Text>

          <Text style={[styles.value, { color: textColor }]}>
            {formatDistance(remainingDistance)}
          </Text>
        </View>
      </View>

      <Button variant="destructive" onPress={onExit}>
        Exit Navigation
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    padding: 20,
    borderRadius: 32,
  },

  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  instructionInfo: {
    flex: 1,
  },

  turnDistance: {
    fontSize: 20,
    fontWeight: "800",
  },

  instruction: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },

  progress: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: "800",
  },

  divider: {
    width: 1,
    height: 28,
  },

  exitButton: {
    marginTop: 16,
  },
});
