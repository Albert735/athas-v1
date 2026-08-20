import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { ArrowLeft, Footprints, Car, Bike } from "lucide-react-native";

import { useState } from "react";

import { Button } from "../ui/button";

import { useColor } from "@/hooks/useColor";

import { places } from "@/data/places";

import type { RouteResult } from "@/utils/directions";

import { formatDistance, formatDuration } from "@/utils/directions";

import type { TransportProfile } from "@/types/map";

interface Props {
  place: (typeof places)[number];

  route: RouteResult | null;

  routeLoading: boolean;

  onModeChange: (profile: TransportProfile) => void;

  onStart?: () => void;

  onBack?: () => void;
}

export default function MapDirectionsCard({
  place,
  route,
  routeLoading,
  onModeChange,
  onStart,
  onBack,
}: Props) {
  const [transportMode, setTransportMode] =
    useState<TransportProfile>("walking");

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");

  const selectMode = (mode: TransportProfile) => {
    setTransportMode(mode);
    onModeChange(mode);
  };

  return (
    <View style={[styles.sheet, { backgroundColor: cardColor }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor }]}
          onPress={onBack}
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

      <View style={styles.modes}>
        {[
          {
            mode: "walking" as const,
            Icon: Footprints,
            label: "Walk",
          },
          {
            mode: "driving" as const,
            Icon: Car,
            label: "Drive",
          },
          {
            mode: "cycling" as const,
            Icon: Bike,
            label: "Cycle",
          },
        ].map(({ mode, Icon, label }) => {
          const active = transportMode === mode;

          return (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                { backgroundColor },
                active && styles.modeButtonActive,
              ]}
              onPress={() => selectMode(mode)}
            >
              <Icon size={18} color={active ? "#FFFFFF" : mutedColor} />

              <Text
                style={[
                  styles.modeLabel,
                  {
                    color: active ? "#FFFFFF" : mutedColor,
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.summary, { borderTopColor: borderColor }]}>
        {routeLoading ? (
          <ActivityIndicator color={mutedColor} />
        ) : route ? (
          <>
            <View>
              <Text style={styles.duration}>
                {formatDuration(route.durationSeconds)}
              </Text>

              <Text style={[styles.distance, { color: mutedColor }]}>
                {formatDistance(route.distanceMeters)}
              </Text>
            </View>

            <View style={styles.fastestBadge}>
              <Text style={styles.fastestText}>Fastest Route</Text>
            </View>
          </>
        ) : (
          <Text style={[styles.distance, { color: mutedColor }]}>
            No route available
          </Text>
        )}
      </View>

      <Button onPress={onStart} disabled={!route || routeLoading}>
        Start Navigation
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    padding: 20,
    borderRadius: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  routeContainer: {
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
    height: 18,
    marginLeft: 4,
    marginVertical: 4,
  },

  locationText: {
    fontSize: 14,
    fontWeight: "500",
  },

  destinationText: {
    fontSize: 14,
    fontWeight: "700",
  },

  modes: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  modeButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  modeButtonActive: {
    backgroundColor: "#10B981",
  },

  modeLabel: {
    fontSize: 13,
    fontWeight: "700",
  },

  summary: {
    minHeight: 50,
    borderTopWidth: 1,
    paddingTop: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  duration: {
    fontSize: 22,
    fontWeight: "800",
    color: "#10B981",
  },

  distance: {
    fontSize: 14,
    marginTop: 2,
  },

  fastestBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: "#ECFDF5",
  },

  fastestText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "700",
  },
});
