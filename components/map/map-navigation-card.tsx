import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { X } from "lucide-react-native";
import Feather from "@expo/vector-icons/Feather";
import { getManeuverIcon } from "@/utils/navigation";
import { MOCK_STEPS } from "@/data/navigation-steps";
import { useState } from "react";
import { TouchableOpacity as RNTouchable } from "react-native";

interface Props {
  onExit?: () => void;
}

export default function MapNavigationCard({ onExit }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = MOCK_STEPS[stepIndex];
  const iconName = getManeuverIcon(currentStep.maneuver);

  return (
    <View style={styles.sheet}>
      <View style={styles.navHeader}>
        <View style={styles.iconCircle}>
          <Feather size={24} color="#FFFFFF" />
        </View>
        <View style={styles.instructionInfo}>
          <Text style={styles.turnDistance}>{currentStep.distance}</Text>
          <Text style={styles.instructionText}>{currentStep.instruction}</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onExit}
          activeOpacity={0.7}
        >
          <X size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={styles.statValue}>{currentStep.duration}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={styles.statValue}>{currentStep.distance}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>ETA</Text>
          <Text style={styles.statValue}>5:24 PM</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.endButton}
          onPress={onExit}
          activeOpacity={0.85}
        >
          <Text style={styles.endButtonText}>End Navigation</Text>
        </TouchableOpacity>
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
    backgroundColor: "white",
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
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },
  instructionInfo: {
    flex: 1,
  },
  turnDistance: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  instructionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
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
    color: "#9CA3AF",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#E5E7EB",
  },
  footer: {},
  endButton: {
    height: 54,
    backgroundColor: "#EF4444",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  endButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
