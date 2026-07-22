import { buildingData } from "@/data/buildings";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useColor } from "@/hooks/useColor";
import { router } from "expo-router";
import { MAP_ACTIONS } from "@/data/map-actions";
import { Clock, Navigation } from "lucide-react-native";
import { Button } from "../ui/button";

interface Props {
  building: (typeof buildingData)[number];
  onDirections?: () => void;
}

export default function MapDetailsCard({ building, onDirections }: Props) {
  return (
    <View style={styles.sheet}>
      <View style={styles.imageWrapper}>
        <View style={styles.imagePlaceholder} />
      </View>
      {/* Name + duration */}
      <View style={styles.nameRow}>
        <View style={styles.nameInfo}>
          <Text style={styles.buildingName}>{building.name}</Text>
          <Text style={styles.buildingDept}>{building.department}</Text>
        </View>
        <View style={styles.distanceInfo}>
          <Text style={styles.duration}>{building.duration}</Text>
          <Text style={styles.distance}>{building.distance}</Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        {MAP_ACTIONS.map((action, index) => {
          const Icon = action.icon;
          return (
            <TouchableOpacity
              key={action.id}
              style={[
                styles.actionButton,
                index === 0 && styles.actionButtonPrimary,
              ]}
              activeOpacity={0.7}
              onPress={() => {
                if (action.id === "info") {
                  router.push(`/building/${building.id}`);
                }
              }}
            >
              <Icon size={16} color={index === 0 ? "#FFFFFF" : "#374151"} />
              <Text
                style={[
                  styles.actionLabel,
                  index === 0 && styles.actionLabelPrimary,
                ]}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Hours */}
      <View style={styles.hoursRow}>
        <Clock size={16} color="#6B7280" />
        <Text style={styles.hoursText}>{building.hours}</Text>
        <Text style={styles.hoursDot}>•</Text>
        <Text style={styles.hoursDays}>{building.days}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {building.isOpen ? "Open" : "Closed"}
          </Text>
        </View>
      </View>
      {/* Description */}
      <Text style={styles.description}>{building.description}</Text>

      {/* Direction button */}
      <View style={styles.footer}>
        <Button variant="default" icon={Navigation} onPress={onDirections}>
          Direction
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
  imageWrapper: {
    height: 150,
    backgroundColor: "#F3F4F6",
    borderRadius: 25,
    marginBottom: 20,
    overflow: "hidden",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  imagePlaceholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  nameInfo: {
    flex: 1,
  },
  buildingName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  buildingDept: {
    fontSize: 15,
    fontWeight: "500",
    color: "#6B7280",
  },
  distanceInfo: {
    alignItems: "flex-end",
  },
  duration: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10B981",
    marginBottom: 4,
  },
  distance: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionButtonPrimary: {
    backgroundColor: "#10B981",
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
  actionLabelPrimary: {
    color: "#FFFFFF",
  },

  hoursRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  hoursText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  hoursDot: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  hoursDays: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  statusBadge: {
    marginLeft: "auto",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: "#ECFDF5",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
  },
  description: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginTop: 12,
    textAlign: "justify",
  },
  footer: {
    marginTop: 24,
  },
});
