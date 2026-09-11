import { View, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { useEffect, useMemo, useRef, useState } from "react";

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

import { useVoiceNavigation } from "@/hooks/useVoiceNavigation";

const ARRIVAL_THRESHOLD = 15;

const VOICE_TRIGGER_DISTANCE = 5;

interface Props {
  route: RouteResult | null;
  onExit?: () => void;
}

export default function MapNavigationCard({ route, onExit }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const liveLocation = useLiveLocation(true);

  const { speak, stop } = useVoiceNavigation();

  const spokenInstructions = useRef<Set<string>>(new Set());

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");
  const primaryColor = useColor("foreground");
  const primaryForeground = useColor("background");

  useEffect(() => {
    setStepIndex(0);
    spokenInstructions.current.clear();

    stop();
  }, [route, stop]);

  const step = route?.steps[stepIndex];

  const isLastStep = route ? stepIndex >= route.steps.length - 1 : true;

  /**
   * Distance from the user's current position
   * to the current maneuver.
   */
  const liveDistance = useMemo(() => {
    if (!step) return 0;

    if (!liveLocation) {
      return step.distance;
    }

    return getDistanceMeters(liveLocation.coords, step.maneuver.location);
  }, [liveLocation, step]);

  /**
   * Speak Mapbox's voice instructions when
   * the user reaches their trigger distance.
   */
  useEffect(() => {
    if (!route) return;
    if (!step) return;
    if (!liveLocation) return;
    if (!voiceEnabled) return;

    if (liveLocation.accuracy !== null && liveLocation.accuracy > 30) {
      return;
    }

    for (const voiceInstruction of step.voiceInstructions) {
      const announcement = voiceInstruction.announcement;

      if (!announcement) continue;

      if (spokenInstructions.current.has(announcement)) {
        continue;
      }

      const triggerDistance = voiceInstruction.distanceAlongGeometry;

      /**
       * Speak when the user is close enough to
       * Mapbox's recommended announcement point.
       */
      if (liveDistance <= triggerDistance + VOICE_TRIGGER_DISTANCE) {
        spokenInstructions.current.add(announcement);

        speak(announcement);
      }
    }
  }, [liveLocation, route, step, liveDistance, voiceEnabled, speak]);

  /**
   * Advance to the next maneuver once the
   * current maneuver has been reached.
   */
  useEffect(() => {
    if (!route) return;
    if (!step) return;
    if (!liveLocation) return;

    if (liveLocation.accuracy !== null && liveLocation.accuracy > 30) {
      return;
    }

    if (liveDistance > ARRIVAL_THRESHOLD) {
      return;
    }

    if (isLastStep) {
      return;
    }

    setStepIndex((current) => (current === stepIndex ? current + 1 : current));
  }, [liveLocation, route, step, stepIndex, liveDistance, isLastStep]);

  /**
   * Handle arrival at the destination.
   */
  useEffect(() => {
    if (!route) return;
    if (!step) return;
    if (!liveLocation) return;
    if (!isLastStep) return;

    if (liveLocation.accuracy !== null && liveLocation.accuracy > 30) {
      return;
    }

    if (liveDistance > ARRIVAL_THRESHOLD) {
      return;
    }

    const arrivalKey = "destination-arrival";

    if (spokenInstructions.current.has(arrivalKey)) {
      return;
    }

    spokenInstructions.current.add(arrivalKey);

    if (voiceEnabled) {
      speak("You have arrived at your destination.");
    }
  }, [
    route,
    step,
    liveLocation,
    isLastStep,
    liveDistance,
    voiceEnabled,
    speak,
  ]);

  /**
   * Calculate remaining route distance.
   */
  const remainingDistance = useMemo(() => {
    if (!route || !step) return 0;

    const futureDistance = route.steps
      .slice(stepIndex + 1)
      .reduce((total, item) => total + item.distance, 0);

    return liveDistance + futureDistance;
  }, [route, step, stepIndex, liveDistance]);

  /**
   * Calculate remaining route duration.
   */
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

  const handleExit = async () => {
    await stop();
    spokenInstructions.current.clear();
    onExit?.();
  };

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
          onPress={handleExit}
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
          <MaterialIcons
            name={iconName as any}
            size={26}
            color={primaryForeground}
          />
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

      <Button
        variant="outline"
        onPress={() => {
          setVoiceEnabled((current) => {
            const next = !current;

            if (!next) {
              stop();
            }

            return next;
          });
        }}
      >
        <MaterialIcons
          name={voiceEnabled ? "volume-up" : "volume-off"}
          size={20}
        />

        {voiceEnabled ? " Voice guidance on" : " Voice guidance off"}
      </Button>

      <Button variant="destructive" onPress={handleExit}>
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
