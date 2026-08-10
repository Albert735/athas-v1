import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getManeuverIcon } from "@/utils/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { useColor } from "@/hooks/useColor";
import type { RouteResult } from "@/utils/directions";
import { formatDistance, formatDuration } from "@/utils/directions";

interface Props {
  route: RouteResult | null;
  onExit?: () => void;
}

export default function MapNavigationCard({ route, onExit }: Props) {
  const [stepIndex] = useState(0);
  const step = route?.steps[stepIndex];

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");
  const primaryColor = useColor("primary");

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
  return (
    <View style={[styles.sheet, { backgroundColor: cardColor }]}>
      <View style={styles.navHeader}>
        <View style={[styles.iconCircle, { backgroundColor: primaryColor }]}>
          <MaterialIcons name={iconName as any} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.instructionInfo}>
          <Text style={[styles.turnDistance, { color: textColor }]}>
            {formatDistance(step.distance)}
          </Text>
          <Text style={[styles.instructionText, { color: mutedColor }]}>
            {step.instruction}
          </Text>
        </View>
      </View>

      <View style={[styles.progressRow, { backgroundColor }]}>
        <View style={styles.statBox}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>
            Remaining
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
    marginBottom: 20,
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
