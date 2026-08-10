import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getManeuverIcon } from "@/utils/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { useColor } from "@/hooks/useColor";
import type { RouteResult } from "@/utils/directions";
import { formatDistance, formatDuration } from "@/utils/directions";

interface Props {
  route: RouteResult | null; // the full calculated route (null if directions haven't loaded)
  onExit?: () => void; // called when the user taps Exit or finishes the last step
}

/**
 * Bottom sheet shown while actively navigating.
 * Displays the current turn instruction and lets the user manually
 * step forward/backward through the route (no live GPS tracking yet —
 * advancement is user-driven via the Next/Back buttons).
 */
export default function MapNavigationCard({ route, onExit }: Props) {
  // Which step in route.steps we're currently showing
  const [stepIndex, setStepIndex] = useState(0);

  const step = route?.steps[stepIndex];
  const isLastStep = route ? stepIndex === route.steps.length - 1 : true;

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");
  const primaryColor = useColor("primary");

  // Defensive fallback — if directions failed to load or somehow we got here
  // without a route, show a simple exit option instead of crashing on
  // `route.steps[stepIndex]` being undefined.
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

  // Map Mapbox's maneuver type/modifier (e.g. "turn" + "left") to a MaterialIcons name
  const iconName = getManeuverIcon(step.maneuver.type, step.maneuver.modifier);

  const handleNext = () => {
    if (isLastStep) {
      // On the final step, "Next" becomes "Arrived — Exit" and closes navigation
      onExit?.();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    // Math.max guards against going below step 0
    setStepIndex((i) => Math.max(0, i - 1));
  };

  return (
    <View style={[styles.sheet, { backgroundColor: cardColor }]}>
      {/* Current instruction header: icon + distance + text */}
      <View style={styles.navHeader}>
        <View style={[styles.iconCircle, { backgroundColor: primaryColor }]}>
          <MaterialIcons name={iconName as any} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.instructionInfo}>
          <Text style={[styles.turnDistance, { color: textColor }]}>
            {formatDistance(step.distance)}
          </Text>
          <Text
            style={[styles.instructionText, { color: mutedColor }]}
            numberOfLines={2}
          >
            {step.instruction}
          </Text>
        </View>
      </View>

      {/* Dot indicator showing progress through all steps in the route */}
      <View style={styles.stepDots}>
        {route.steps.map((_, i) => (
          <View
            key={i}
            style={[
              styles.stepDot,
              // Highlight the dot matching the currently displayed step
              { backgroundColor: i === stepIndex ? primaryColor : borderColor },
            ]}
          />
        ))}
      </View>

      {/* Trip-level stats: which step we're on, and total time remaining for the whole route */}
      <View style={[styles.progressRow, { backgroundColor }]}>
        <View style={styles.statBox}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>Step</Text>
          <Text style={[styles.statValue, { color: textColor }]}>
            {stepIndex + 1} / {route.steps.length}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: borderColor }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>
            Total Left
          </Text>
          <Text style={[styles.statValue, { color: textColor }]}>
            {formatDuration(route.durationSeconds)}
          </Text>
        </View>
      </View>

      {/* Navigation controls: Back only shows after the first step, Next always shows */}
      <View style={styles.buttonRow}>
        {stepIndex > 0 && (
          <TouchableOpacity
            style={[styles.secondaryButton, { backgroundColor }]}
            onPress={handlePrevious}
          >
            <Text style={[styles.secondaryButtonText, { color: textColor }]}>
              Back
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          <Button onPress={handleNext} variant="default">
            {isLastStep ? "Arrived — Exit" : "Next Step"}
          </Button>
        </View>
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
  buttonRow: { flexDirection: "row", gap: 12, alignItems: "center" },
  secondaryButton: {
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: { fontSize: 15, fontWeight: "600" },
});
