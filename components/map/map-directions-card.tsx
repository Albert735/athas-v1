import { places } from "@/data/places";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ArrowLeft, Footprints, Car, Bike } from "lucide-react-native";
import { Button } from "../ui/button";
import { useState } from "react";
import { useColor } from "@/hooks/useColor";

interface Props {
  place: (typeof places)[number];
  onStart?: () => void;
  onBack?: () => void;
}

export default function MapDirectionsCard({ place, onStart, onBack }: Props) {
  const [transportMode, setTransportMode] = useState<
    "walk" | "drive" | "cycle"
  >("walk");

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");

  return (
    <View style={[styles.sheet, { backgroundColor: cardColor }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor }]}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>
          Directions
        </Text>
      </View>

      <View style={[styles.routeContainer, { backgroundColor }]}>
        <View style={styles.routeItem}>
          <View style={[styles.dot, styles.originDot]} />
          <Text style={[styles.locationText, { color: mutedColor }]}>
            Your Current Location
          </Text>
        </View>
        <View style={[styles.routeLine, { backgroundColor: borderColor }]} />
        <View style={styles.routeItem}>
          <View style={[styles.dot, styles.destinationDot]} />
          <Text style={[styles.destinationText, { color: textColor }]}>
            {place.name}
          </Text>
        </View>
      </View>

      <View style={styles.modesContainer}>
        {(["walk", "drive", "cycle"] as const).map((mode) => {
          const Icon =
            mode === "walk" ? Footprints : mode === "drive" ? Car : Bike;
          const isActive = transportMode === mode;
          return (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                { backgroundColor },
                isActive && styles.modeButtonActive,
              ]}
              onPress={() => setTransportMode(mode)}
              activeOpacity={0.7}
            >
              <Icon size={18} color={isActive ? "#FFFFFF" : mutedColor} />
              <Text
                style={[
                  styles.modeLabel,
                  { color: isActive ? "#FFFFFF" : mutedColor },
                ]}
              >
                {mode === "walk"
                  ? "Walk"
                  : mode === "drive"
                    ? "Drive"
                    : "Cycle"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.summaryRow, { borderTopColor: borderColor }]}>
        <View>
          <Text style={styles.durationText}>{place.distance}</Text>
          <Text style={[styles.distanceText, { color: mutedColor }]}>
            {place.hours}
          </Text>
        </View>
        <View style={styles.fastestBadge}>
          <Text style={styles.fastestText}>Fastest Route</Text>
        </View>
      </View>

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
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  routeContainer: { padding: 16, borderRadius: 20, marginBottom: 20 },
  routeItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  originDot: { backgroundColor: "#3B82F6" },
  destinationDot: { backgroundColor: "#10B981" },
  routeLine: { width: 2, height: 16, marginLeft: 4, marginVertical: 4 },
  locationText: { fontSize: 14, fontWeight: "500" },
  destinationText: { fontSize: 14, fontWeight: "600" },
  modesContainer: { flexDirection: "row", gap: 12, marginBottom: 20 },
  modeButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  modeButtonActive: { backgroundColor: "#10B981" },
  modeLabel: { fontSize: 14, fontWeight: "600" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    marginBottom: 20,
  },
  durationText: { fontSize: 22, fontWeight: "700", color: "#10B981" },
  distanceText: { fontSize: 14, fontWeight: "500", marginTop: 2 },
  fastestBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  fastestText: { fontSize: 12, fontWeight: "600", color: "#10B981" },
  footer: {},
});
