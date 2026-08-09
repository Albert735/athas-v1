import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { X } from "lucide-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getManeuverIcon } from "@/utils/navigation";
import { MOCK_STEPS } from "@/data/navigation-steps";
import { useState } from "react";
import { Button } from "../ui/button";
import { useColor } from "@/hooks/useColor";

interface Props {
  onExit?: () => void;
}

export default function MapNavigationCard({ onExit }: Props) {
  const [stepIndex] = useState(0);
  const currentStep = MOCK_STEPS[stepIndex];
  const iconName = getManeuverIcon(currentStep.maneuver);

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");
  const primaryColor = useColor("primary");

  return (
    <View style={[styles.sheet, { backgroundColor: cardColor }]}>
      <View style={styles.navHeader}>
        <View style={[styles.iconCircle, { backgroundColor: primaryColor }]}>
          <MaterialIcons name={iconName as any} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.instructionInfo}>
          <Text style={[styles.turnDistance, { color: textColor }]}>
            {currentStep.distance}
          </Text>
          <Text style={[styles.instructionText, { color: mutedColor }]}>
            {currentStep.instruction}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor }]}
          onPress={onExit}
          activeOpacity={0.7}
        >
          <X size={20} color={mutedColor} />
        </TouchableOpacity>
      </View>

      <View style={[styles.progressRow, { backgroundColor }]}>
        <View style={styles.statBox}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>
            Remaining
          </Text>
          <Text style={[styles.statValue, { color: textColor }]}>
            {currentStep.duration}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: borderColor }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>
            Distance
          </Text>
          <Text style={[styles.statValue, { color: textColor }]}>
            {currentStep.distance}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: borderColor }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>ETA</Text>
          <Text style={[styles.statValue, { color: textColor }]}>5:24 PM</Text>
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
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
