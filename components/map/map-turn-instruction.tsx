import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getManeuverIcon } from "@/utils/navigation";
import type { NavigationStep } from "@/data/navigation-steps";
import { useColor } from "@/hooks/useColor";

interface Props {
  step: NavigationStep;
}

export function MapTurnInstruction({ step }: Props) {
  const iconName = getManeuverIcon(step.maneuver);

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");

  return (
    <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
      <View style={[styles.iconCircle, { backgroundColor: primaryColor }]}>
        <MaterialIcons name={iconName as any} size={24} color="#FFFFFF" />
      </View>
      <View style={styles.info}>
        <Text style={[styles.instruction, { color: textColor }]}>
          {step.instruction}
        </Text>
        <Text style={[styles.meta, { color: mutedColor }]}>
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
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
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
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1, gap: 3 },
  instruction: { fontSize: 15, fontWeight: "600" },
  meta: { fontSize: 12 },
});
