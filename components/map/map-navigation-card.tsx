import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { useColor } from "@/hooks/useColor";

import type { RouteResult } from "@/utils/directions";
import { formatDistance, formatDuration } from "@/utils/directions";

import { useLiveLocation } from "@/hooks/useLiveLocation";
import { getDistanceMeters } from "@/utils/geo";
import { getManeuverIcon } from "@/utils/navigation";

const ARRIVAL_THRESHOLD_METERS = 15;

interface Props {
  route: RouteResult | null;
  onExit?: () => void;
}

export default function MapNavigationCard({ route, onExit }: Props) {
  const [stepIndex, setStepIndex] = useState(0);

  const liveLocation = useLiveLocation(true);

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");
  const primaryColor = useColor("primary");

  const step = route?.steps[stepIndex] ?? null;

  const isLastStep = route ? stepIndex >= route.steps.length - 1 : true;

  useEffect(() => {
    if (!liveLocation || !step || !route) {
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

    if (isLastStep) {
      onExit?.();
      return;
    }

    setStepIndex((currentIndex) => currentIndex + 1);
  }, [liveLocation, step, route, isLastStep, onExit]);

  useEffect(() => {
    setStepIndex(0);
  }, [route]);

  if (!route || !step) {
    return (
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: cardColor,
          },
        ]}
      >
        <Text
          style={{
            color: mutedColor,
          }}
        >
          No route available.
        </Text>

        <Button
          onPress={onExit}
          variant="destructive"
          style={{
            marginTop: 16,
          }}
        >
          Exit
        </Button>
      </View>
    );
  }

  const liveDistance = liveLocation
    ? getDistanceMeters(liveLocation.coords, step.maneuver.location)
    : step.distance;

  const futureSteps = route.steps.slice(stepIndex + 1);

  const futureDistance = futureSteps.reduce(
    (total, currentStep) => total + currentStep.distance,
    0,
  );

  const futureDuration = futureSteps.reduce(
    (total, currentStep) => total + currentStep.duration,
    0,
  );

  const currentStepRatio =
    step.distance > 0 ? Math.min(liveDistance / step.distance, 1) : 0;

  const currentStepRemainingDuration = step.duration * currentStepRatio;

  const totalRemainingDistance = liveDistance + futureDistance;

  const totalRemainingDuration = currentStepRemainingDuration + futureDuration;

  const iconName = getManeuverIcon(step.maneuver.type, step.maneuver.modifier);

  return (
    <View
      style={[
        styles.sheet,
        {
          backgroundColor: cardColor,
        },
      ]}
    >
      <View style={styles.navHeader}>
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: primaryColor,
            },
          ]}
        >
          <MaterialIcons name={iconName as any} size={25} color="#FFFFFF" />
        </View>

        <View style={styles.instructionInfo}>
          <Text
            style={[
              styles.turnDistance,
              {
                color: textColor,
              },
            ]}
          >
            {formatDistance(liveDistance)}
          </Text>

          <Text
            style={[
              styles.instructionText,
              {
                color: mutedColor,
              },
            ]}
            numberOfLines={2}
          >
            {step.instruction}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.progressRow,
          {
            backgroundColor,
          },
        ]}
      >
        <View style={styles.statBox}>
          <Text
            style={[
              styles.statLabel,
              {
                color: mutedColor,
              },
            ]}
          >
            Time Left
          </Text>

          <Text
            style={[
              styles.statValue,
              {
                color: textColor,
              },
            ]}
          >
            {formatDuration(totalRemainingDuration)}
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            {
              backgroundColor: borderColor,
            },
          ]}
        />

        <View style={styles.statBox}>
          <Text
            style={[
              styles.statLabel,
              {
                color: mutedColor,
              },
            ]}
          >
            Distance
          </Text>

          <Text
            style={[
              styles.statValue,
              {
                color: textColor,
              },
            ]}
          >
            {formatDistance(totalRemainingDistance)}
          </Text>
        </View>
      </View>

      <Button onPress={onExit} variant="destructive">
        Exit Navigation
      </Button>
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
    marginTop: 2,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
    fontWeight: "500",
    marginBottom: 4,
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700",
  },

  divider: {
    width: 1,
    height: 24,
  },
});
