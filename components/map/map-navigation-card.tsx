import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { getManeuverIcon } from "@/utils/navigation";
import {
  formatDistance,
  formatDuration,
  type RouteResult,
} from "@/utils/directions";

import { useLiveLocation } from "@/hooks/useLiveLocation";
import { getDistanceMeters } from "@/utils/geo";
import { useColor } from "@/hooks/useColor";
import { Button } from "../ui/button";

const ARRIVAL_THRESHOLD_METERS = 15;

interface Props {
  route: RouteResult;
  onExit?: () => void;
}

export default function MapNavigationCard({ route, onExit }: Props) {
  const [stepIndex, setStepIndex] = useState(0);

  const liveLocation = useLiveLocation(true);

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");

  const step = route.steps[stepIndex];

  const isLastStep = stepIndex === route.steps.length - 1;

  useEffect(() => {
    if (!liveLocation || !step) return;

    if (liveLocation.accuracy !== null && liveLocation.accuracy > 20) {
      return;
    }

    const distanceToStep = getDistanceMeters(
      liveLocation.coords,
      step.maneuver.location,
    );

    if (distanceToStep > ARRIVAL_THRESHOLD_METERS) {
      return;
    }

    if (isLastStep) {
      onExit?.();
      return;
    }

    setStepIndex((current) => current + 1);
  }, [liveLocation, step, isLastStep, onExit]);

  if (!step) {
    return null;
  }

  const iconName = getManeuverIcon(step.maneuver.type, step.maneuver.modifier);

  const distanceToManeuver = liveLocation
    ? getDistanceMeters(liveLocation.coords, step.maneuver.location)
    : step.distance;

  const remainingSteps = route.steps.slice(stepIndex + 1);

  const remainingDistance =
    distanceToManeuver +
    remainingSteps.reduce((total, item) => total + item.distance, 0);

  const remainingDuration =
    remainingSteps.reduce((total, item) => total + item.duration, 0) +
    step.duration *
      Math.min(distanceToManeuver / Math.max(step.distance, 1), 1);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: cardColor,
          borderColor,
        },
      ]}
    >
      {/* Current instruction */}
      <View style={styles.instructionRow}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: primaryColor,
            },
          ]}
        >
          <MaterialIcons name={iconName as any} size={28} color="#FFFFFF" />
        </View>

        <View style={styles.instructionContent}>
          <Text style={[styles.distance, { color: primaryColor }]}>
            {formatDistance(distanceToManeuver)}
          </Text>

          <Text
            style={[styles.instruction, { color: textColor }]}
            numberOfLines={2}
          >
            {step.instruction}
          </Text>
        </View>
      </View>

      {/* Trip information */}
      <View style={[styles.stats, { borderTopColor: borderColor }]}>
        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>
            Time left
          </Text>

          <Text style={[styles.statValue, { color: textColor }]}>
            {formatDuration(remainingDuration)}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>
            Distance
          </Text>

          <Text style={[styles.statValue, { color: textColor }]}>
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
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,

    padding: 16,

    borderRadius: 24,
    borderWidth: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,

    elevation: 12,
  },

  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,

    alignItems: "center",
    justifyContent: "center",
  },

  instructionContent: {
    flex: 1,
  },

  distance: {
    fontSize: 20,
    fontWeight: "800",
  },

  instruction: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 2,
  },

  stats: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 16,
    marginBottom: 16,

    paddingTop: 14,

    borderTopWidth: 1,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 3,
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700",
  },

  divider: {
    width: 1,
    height: 28,
  },
});
