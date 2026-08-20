import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { ArrowLeft, Footprints, Car, Bike } from "lucide-react-native";

import { Button } from "../ui/button";

import { useColor } from "@/hooks/useColor";

import {
  formatDistance,
  formatDuration,
  type RouteResult,
} from "@/utils/directions";

import type { TransportProfile } from "@/types/map";

import { places } from "@/data/places";

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
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");

  const [mode, setMode] = React.useState<TransportProfile>("walking");

  const selectMode = (nextMode: TransportProfile) => {
    setMode(nextMode);
    onModeChange(nextMode);
  };

  return (
    <View
      style={[
        styles.sheet,
        {
          backgroundColor: cardColor,
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              backgroundColor,
            },
          ]}
          onPress={onBack}
        >
          <ArrowLeft size={20} color={textColor} />
        </TouchableOpacity>

        <Text
          style={[
            styles.title,
            {
              color: textColor,
            },
          ]}
        >
          Directions
        </Text>
      </View>

      <View
        style={[
          styles.routeCard,
          {
            backgroundColor,
          },
        ]}
      >
        <View style={styles.routeRow}>
          <View style={[styles.dot, styles.startDot]} />

          <Text
            style={[
              styles.location,
              {
                color: mutedColor,
              },
            ]}
          >
            Your Current Location
          </Text>
        </View>

        <View
          style={[
            styles.routeLine,
            {
              backgroundColor: borderColor,
            },
          ]}
        />

        <View style={styles.routeRow}>
          <View style={[styles.dot, styles.destinationDot]} />

          <Text
            style={[
              styles.destination,
              {
                color: textColor,
              },
            ]}
          >
            {place.name}
          </Text>
        </View>
      </View>

      <View style={styles.modes}>
        {[
          {
            mode: "walking" as const,
            icon: Footprints,
            label: "Walk",
          },
          {
            mode: "driving" as const,
            icon: Car,
            label: "Drive",
          },
          {
            mode: "cycling" as const,
            icon: Bike,
            label: "Cycle",
          },
        ].map(({ mode: itemMode, icon: Icon, label }) => {
          const active = mode === itemMode;

          return (
            <TouchableOpacity
              key={itemMode}
              style={[
                styles.modeButton,
                {
                  backgroundColor: active ? "#10B981" : backgroundColor,
                },
              ]}
              onPress={() => selectMode(itemMode)}
            >
              <Icon size={18} color={active ? "#FFFFFF" : mutedColor} />

              <Text
                style={[
                  styles.modeText,
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

      <View
        style={[
          styles.summary,
          {
            borderTopColor: borderColor,
          },
        ]}
      >
        {routeLoading ? (
          <ActivityIndicator />
        ) : route ? (
          <>
            <View>
              <Text style={styles.duration}>
                {formatDuration(route.durationSeconds)}
              </Text>

              <Text
                style={[
                  styles.distance,
                  {
                    color: mutedColor,
                  },
                ]}
              >
                {formatDistance(route.distanceMeters)}
              </Text>
            </View>

            <View style={styles.fastestBadge}>
              <Text style={styles.fastestText}>Best Route</Text>
            </View>
          </>
        ) : (
          <Text
            style={{
              color: mutedColor,
            }}
          >
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

import React from "react";

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    margin: 16,
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

  title: {
    fontSize: 18,
    fontWeight: "800",
  },

  routeCard: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  startDot: {
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

  location: {
    fontSize: 14,
    fontWeight: "500",
  },

  destination: {
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
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  modeText: {
    fontSize: 13,
    fontWeight: "700",
  },

  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    marginBottom: 20,
  },

  duration: {
    fontSize: 22,
    fontWeight: "800",
    color: "#10B981",
  },

  distance: {
    fontSize: 13,
    marginTop: 2,
  },

  fastestBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },

  fastestText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "700",
  },
});
