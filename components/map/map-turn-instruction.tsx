import { View, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { getManeuverIcon } from "@/utils/navigation";
import type { NavigationStep } from "@/data/navigation-steps";

interface Props {
  step: NavigationStep;
}

export function MapTurnInstruction({ step }: Props) {
  const iconName = getManeuverIcon(step.maneuver);

  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Feather size={20} color="#FFFFFF" />
      </View>
      <View style={styles.info}>
        <Text style={styles.instruction}>{step.instruction}</Text>
        <Text style={styles.meta}>
          {step.distance} • {step.duration} remaining
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: 3,
  },
  instruction: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  meta: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});
