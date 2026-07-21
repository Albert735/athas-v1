import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Navigation, CornerUpRight, X } from "lucide-react-native";
import { Button } from "../ui/button";

interface Props {
  onExit?: () => void;
}

export default function MapNavigationCard({ onExit }: Props) {
  return (
    <View style={styles.sheet}>
      {/* Live turn instruction header */}
      <View style={styles.navHeader}>
        <View style={styles.iconCircle}>
          <CornerUpRight size={24} color="#FFFFFF" />
        </View>
        <View style={styles.instructionInfo}>
          <Text style={styles.turnDistance}>In 50m</Text>
          <Text style={styles.instructionText}>Turn right toward Main Gate</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onExit} activeOpacity={0.7}>
          <X size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Navigation Progress bar / Details */}
      <View style={styles.progressRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={styles.statValue}>4 mins</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={styles.statValue}>320 m</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>ETA</Text>
          <Text style={styles.statValue}>5:24 PM</Text>
        </View>
      </View>

      {/* End route button */}
      <View style={styles.footer}>
        <Button variant="destructive" size="lg" onPress={onExit}>
          End Navigation
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
});
