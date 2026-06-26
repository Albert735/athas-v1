import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MapPin, Navigation } from "lucide-react-native";

export type UpcomingClassCardProps = {
  course: string;
  time: string;
  room: string;
  building: string;
  onNavigate?: () => void;
};

export function UpcomingClassCard({
  course,
  time,
  room,
  building,
  onNavigate,
}: UpcomingClassCardProps) {
  return (
    <View style={styles.container}>
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
        <Navigation size={22} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F7F7F7",
  },

  mainContent: {
    flexDirection: "row",
    flex: 1,
    gap: 14,
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
