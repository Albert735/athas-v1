import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MapPin, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import type { ScheduledClass } from "@/types/class";

export type UpcomingClassCardProps = ScheduledClass & {
  onNavigate?: () => void;
};

export function UpcomingClassCard({
  id,
  course,
  time,
  room,
  building,
  onNavigate,
}: UpcomingClassCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push({
          pathname: "/(schedule)/[Id]",
          params: {
            Id: id,
          },
        });
      }}
    >
      <View style={styles.mainContent}>
        {/* Time Section */}
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{time}</Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>UPCOMING</Text>
          </View>
        </View>
        <View
          style={{
            height: 40,
            width: "0.5%",
            backgroundColor: "#E5E7EB", // light gray
            marginVertical: 6,
          }}
        />

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.course} numberOfLines={1}>
            {course}
          </Text>

          <View style={styles.locationContainer}>
            <MapPin size={14} color="#666" />

            <Text style={styles.location}>
              {room} • {building}
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Button */}
      <TouchableOpacity style={styles.navigationButton} onPress={onNavigate}>
        <ChevronRight size={22} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },

  mainContent: {
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },

  timeContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minWidth: 80,
  },

  time: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111",
    textAlign: "center",
  },

  statusBadge: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#666",
  },

  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },

  course: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  location: {
    fontSize: 13,
    color: "#666",
  },

  navigationButton: {
    padding: 8,
  },
});
