import { View, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { useEffect, useMemo, useState } from "react";

import { Button } from "../ui/button";

import { useColor } from "@/hooks/useColor";

import {
  formatDistance,
  formatDuration,
  type RouteResult,
} from "@/utils/directions";

import { getManeuverIcon } from "@/utils/navigation";

import { useLiveLocation } from "@/hooks/useLiveLocation";

import { getDistanceMeters } from "@/utils/geo";

const ARRIVAL_THRESHOLD = 15;

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

  /**
   * Reset the instruction index whenever
   * a completely new route starts.
   */
  useEffect(() => {
    setStepIndex(0);
  }, [route]);

  const step = route?.steps[stepIndex];

  const isLastStep = route ? stepIndex >= route.steps.length - 1 : true;

  /**
   * Determine whether the current
   * maneuver has been reached.
   */
  useEffect(() => {
    if (!route) return;
    if (!step) return;
    if (!liveLocation) return;

    if (liveLocation.accuracy !== null && liveLocation.accuracy > 30) {
      return;
    }

    const distanceToManeuver = getDistanceMeters(
      liveLocation.coords,
      step.maneuver.location,
    );

    if (distanceToManeuver > ARRIVAL_THRESHOLD) {
      return;
    }

    if (isLastStep) {
      onExit?.();
      return;
    }

    setStepIndex((current) => (current === stepIndex ? current + 1 : current));
  }, [liveLocation, route, step, stepIndex, isLastStep, onExit]);

  const liveDistance = useMemo(() => {
    if (!step) return 0;

    if (!liveLocation) {
      return step.distance;
    }

    return getDistanceMeters(liveLocation.coords, step.maneuver.location);
  }, [liveLocation, step]);

  const remainingDistance = useMemo(() => {
    if (!route || !step) return 0;

    const futureDistance = route.steps
      .slice(stepIndex + 1)
      .reduce((total, item) => total + item.distance, 0);

    return liveDistance + futureDistance;
  }, [route, step, stepIndex, liveDistance]);

  const remainingDuration = useMemo(() => {
    if (!route || !step) return 0;

    const currentRatio =
      step.distance > 0 ? Math.min(liveDistance / step.distance, 1) : 0;

    const currentRemaining = step.duration * currentRatio;

    const futureDuration = route.steps
      .slice(stepIndex + 1)
      .reduce((total, item) => total + item.duration, 0);

    return currentRemaining + futureDuration;
  }, [route, step, stepIndex, liveDistance]);

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
          No route available
        </Text>

        <Button
          variant="destructive"
          onPress={onExit}
          style={{
            marginTop: 16,
          }}
        >
          Exit
        </Button>
      </View>
    );
  }

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
      <View style={styles.navigationHeader}>
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: primaryColor,
            },
          ]}
        >
          <MaterialIcons name={iconName as any} size={26} color="#FFFFFF" />
        </View>

        <View style={styles.instructionContainer}>
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
              styles.instruction,
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
          styles.progressCard,
          {
            backgroundColor,
          },
        ]}
      >
        <View style={styles.stat}>
          <Text
            style={[
              styles.statLabel,
              {
                color: mutedColor,
              },
            ]}
          >
            Time left
          </Text>

          <Text
            style={[
              styles.statValue,
              {
                color: textColor,
              },
            ]}
          >
            {formatDuration(remainingDuration)}
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

        <View style={styles.stat}>
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
    left: 0,
    right: 0,
    bottom: 0,
    margin: 16,
    padding: 20,
    borderRadius: 32,
  },

  navigationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 18,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  instructionContainer: {
    flex: 1,
  },

  turnDistance: {
    fontSize: 20,
    fontWeight: "800",
  },

  instruction: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 3,
  },

  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },

  statValue: {
    fontSize: 17,
    fontWeight: "800",
  },

  divider: {
    width: 1,
    height: 28,
  },
});
