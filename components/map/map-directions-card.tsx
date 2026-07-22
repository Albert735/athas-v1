import { buildingData } from "@/data/buildings";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  ArrowLeft,
  Footprints,
  Car,
  Bike,
  Navigation,
} from "lucide-react-native";
import { Button } from "../ui/button";
import { useState } from "react";

interface Props {
  building: (typeof buildingData)[number];
  onStart?: () => void;
  onBack?: () => void;
}

export default function MapDirectionsCard({
  building,
  onStart,
  onBack,
}: Props) {
  const [transportMode, setTransportMode] = useState<
    "walk" | "drive" | "cycle"
  >("walk");

  return (
    <View style={styles.sheet}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Directions</Text>
      </View>

      {/* Origin & Destination route points */}
      <View style={styles.routeContainer}>
        <View style={styles.routeItem}>
          <View style={[styles.dot, styles.originDot]} />
          <Text style={styles.locationText}>Your Current Location</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeItem}>
          <View style={[styles.dot, styles.destinationDot]} />
          <Text style={styles.destinationText}>{building.name}</Text>
        </View>
      </View>

      {/* Transport mode selector */}
      <View style={styles.modesContainer}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            transportMode === "walk" && styles.modeButtonActive,
          ]}
          onPress={() => setTransportMode("walk")}
          activeOpacity={0.7}
        >
          <Footprints
            size={18}
            color={transportMode === "walk" ? "#FFFFFF" : "#6B7280"}
          />
          <Text
            style={[
              styles.modeLabel,
              transportMode === "walk" && styles.modeLabelActive,
            ]}
          >
            Walk
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modeButton,
            transportMode === "drive" && styles.modeButtonActive,
          ]}
          onPress={() => setTransportMode("drive")}
          activeOpacity={0.7}
        >
          <Car
            size={18}
            color={transportMode === "drive" ? "#FFFFFF" : "#6B7280"}
          />
          <Text
            style={[
              styles.modeLabel,
              transportMode === "drive" && styles.modeLabelActive,
            ]}
          >
            Drive
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modeButton,
            transportMode === "cycle" && styles.modeButtonActive,
          ]}
          onPress={() => setTransportMode("cycle")}
          activeOpacity={0.7}
        >
          <Bike
            size={18}
            color={transportMode === "cycle" ? "#FFFFFF" : "#6B7280"}
          />
          <Text
            style={[
              styles.modeLabel,
              transportMode === "cycle" && styles.modeLabelActive,
            ]}
          >
            Cycle
          </Text>
        </TouchableOpacity>
      </View>

      {/* Route summary info */}
      <View style={styles.summaryRow}>
        <View>
          <Text style={styles.durationText}>{building.duration}</Text>
          <Text style={styles.distanceText}>{building.distance}</Text>
        </View>
        <View style={styles.fastestBadge}>
          <Text style={styles.fastestText}>Fastest Route</Text>
        </View>
      </View>

      {/* Action button */}
      <View style={styles.footer}>
        <Button variant="default" onPress={onStart}>
          Start Navigation
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  routeContainer: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  originDot: {
    backgroundColor: "#3B82F6",
  },
  destinationDot: {
    backgroundColor: "#10B981",
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: "#E5E7EB",
    marginLeft: 4,
    marginVertical: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  destinationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  modesContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  modeButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  modeButtonActive: {
    backgroundColor: "#10B981",
  },
  modeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  modeLabelActive: {
    color: "#FFFFFF",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginBottom: 20,
  },
  durationText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#10B981",
  },
  distanceText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginTop: 2,
  },
  fastestBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  fastestText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
  },
  footer: {},
});
