import { Text, View, StyleSheet, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { Clock, MapPin, Navigation, User } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { MOCK_UPCOMING_CLASS } from "@/data/upcoming-class";

export default function ScheduledClassDetails() {
  const { Id } = useLocalSearchParams();

  const selectedClass = MOCK_UPCOMING_CLASS.find((item) => item.id === Id);

  if (!selectedClass) {
    return (
      <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
        <Header title="Class Details" />
        <View style={styles.container}>
          <Text style={styles.error}>Class not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <Header title="Class Details" />

      <View style={styles.container}>
        {/* Course Header */}
        <View style={styles.heroCard}>
          <Text style={styles.course}>{selectedClass.course}</Text>

          <Text style={styles.code}>{selectedClass.code}</Text>

          <View style={styles.status}>
            <Text style={styles.statusText}>UPCOMING</Text>
          </View>
        </View>

        {/* Time */}
        <View style={styles.infoCard}>
          <Clock size={22} color="#2563EB" />

          <View>
            <Text style={styles.label}>Time</Text>

            <Text style={styles.value}>{selectedClass.time}</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.infoCard}>
          <MapPin size={22} color="#2563EB" />

          <View>
            <Text style={styles.label}>Location</Text>

            <Text style={styles.value}>
              {selectedClass.room} • {selectedClass.building}
            </Text>
          </View>
        </View>

        {/* Instructor */}
        <View style={styles.infoCard}>
          <User size={22} color="#2563EB" />

          <View>
            <Text style={styles.label}>Instructor</Text>

            <Text style={styles.value}>{selectedClass.lecturer}</Text>
          </View>
        </View>

        {/* Navigate */}
        <Pressable style={styles.navigateButton}>
          <Navigation size={22} color="#fff" />

          <Text style={styles.navigateText}>Navigate to Class</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 1,

    paddingHorizontal: 20,

    gap: 16,
  },

  heroCard: {
    backgroundColor: "#111827",

    borderRadius: 24,

    padding: 24,

    marginTop: 10,
  },

  course: {
    fontSize: 22,

    fontWeight: "800",

    color: "#fff",
  },

  code: {
    marginTop: 6,

    color: "#D1D5DB",

    fontSize: 14,
  },

  status: {
    alignSelf: "flex-start",

    marginTop: 18,

    backgroundColor: "#2563EB",

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 20,
  },

  statusText: {
    color: "#fff",

    fontSize: 11,

    fontWeight: "700",
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#F9FAFB",
    padding: 18,
    borderRadius: 18,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
  },

  value: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  navigateButton: {
    marginTop: 20,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  navigateText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  error: {
    fontSize: 16,
    color: "#FF0000",
    fontWeight: "600",
  },
});
