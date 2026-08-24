import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MapPin, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import type { ScheduledClass } from "@/types/class";
import { useColor } from "@/hooks/useColor";

/**
 * UpcomingClassCard Component Props
 */
export type UpcomingClassCardProps = ScheduledClass & {
  /** Optional callback handler when navigation chevron is clicked */
  onNavigate?: () => void;
};

/**
 * UpcomingClassCard Component
 *
 * Renders an upcoming class card item on the timetable list showing course name,
 * scheduled time, room, and campus building details.
 */
export function UpcomingClassCard({
  id,
  course,
  startTime,
  endTime,
  room,
  building,
  onNavigate,
}: UpcomingClassCardProps) {
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const iconColor = useColor("icon");
  const cardColor = useColor("card");
  const borderColor = useColor("border");

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push({
          pathname: "/(schedule)/[Id]" as any,
          params: { Id: id },
        });
      }}
    >
      <View style={styles.mainContent}>
        {/* Time Section */}
        <View style={styles.timeContainer}>
          <Text style={[styles.time, { color: textColor }]}>
            {startTime} - {endTime}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: cardColor }]}>
            <Text style={[styles.statusText, { color: mutedColor }]}>
              UPCOMING
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={[styles.course, { color: textColor }]} numberOfLines={1}>
            {course}
          </Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={iconColor} />
            <Text style={[styles.location, { color: mutedColor }]}>
              {room} • {building}
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Button */}
      <TouchableOpacity style={styles.navigationButton} onPress={onNavigate}>
        <ChevronRight size={22} color={iconColor} />
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
    textAlign: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  divider: {
    height: 40,
    width: 1,
    marginVertical: 6,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  course: {
    fontSize: 15,
    fontWeight: "600",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 13,
  },
  navigationButton: {
    padding: 8,
  },
});
