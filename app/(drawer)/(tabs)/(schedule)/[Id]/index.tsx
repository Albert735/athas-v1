import { Text, View, StyleSheet, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { Clock, MapPin, Navigation, User } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { MOCK_UPCOMING_CLASS } from "@/data/upcoming-class";
import { useColor } from "@/hooks/useColor";

export default function ScheduledClassDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const selectedClass = MOCK_UPCOMING_CLASS.find((item) => item.id === id);

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const primaryForeground = useColor("primaryForeground");
  const redColor = useColor("red");

  if (!selectedClass) {
    return (
      <SafeAreaView
        style={[styles.screen, { backgroundColor }]}
        edges={["top", "bottom"]}
      >
        <Header title="Class Details" />
        <View style={styles.container}>
          <Text style={[styles.error, { color: redColor }]}>
            Class not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor }]}
      edges={["top", "bottom"]}
    >
      <Header title="Class Details" />

      <View style={styles.container}>
        {/* Course Header */}
        <View
          style={[styles.heroCard, { backgroundColor: cardColor, borderColor }]}
        >
          <Text style={[styles.course, { color: textColor }]}>
            {selectedClass.course}
          </Text>

          <Text style={[styles.code, { color: textMuted }]}>
            {selectedClass.code}
          </Text>

          <View style={[styles.status, { backgroundColor: primaryColor }]}>
            <Text style={[styles.statusText, { color: primaryForeground }]}>
              UPCOMING
            </Text>
          </View>
        </View>

        {/* Time */}
        <View style={[styles.infoCard, { backgroundColor: cardColor }]}>
          <Clock size={22} color={primaryColor} />

          <View>
            <Text style={[styles.label, { color: textMuted }]}>Time</Text>

            <Text style={[styles.value, { color: textColor }]}>
              {selectedClass.time}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View style={[styles.infoCard, { backgroundColor: cardColor }]}>
          <MapPin size={22} color={primaryColor} />

          <View>
            <Text style={[styles.label, { color: textMuted }]}>Location</Text>

            <Text style={[styles.value, { color: textColor }]}>
              {selectedClass.room} • {selectedClass.building}
            </Text>
          </View>
        </View>

        {/* Lecturer */}
        {selectedClass.lecturer && (
          <View style={[styles.infoCard, { backgroundColor: cardColor }]}>
            <User size={22} color={primaryColor} />

            <View>
              <Text style={[styles.label, { color: textMuted }]}>Lecturer</Text>

              <Text style={[styles.value, { color: textColor }]}>
                {selectedClass.lecturer}
              </Text>
            </View>
          </View>
        )}

        {/* Navigation Action */}
        <Pressable
          style={({ pressed }) => [
            styles.navigateButton,
            { backgroundColor: primaryColor, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Navigation size={20} color={primaryForeground} />

          <Text style={[styles.navigateText, { color: primaryForeground }]}>
            Navigate to Class
          </Text>
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
    paddingHorizontal: 20,
    gap: 16,
  },

  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    marginTop: 10,
  },

  course: {
    fontSize: 22,
    fontWeight: "800",
  },

  code: {
    marginTop: 6,
    fontSize: 14,
  },

  status: {
    alignSelf: "flex-start",
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
    borderRadius: 18,
  },

  label: {
    fontSize: 12,
  },

  value: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "600",
  },

  navigateButton: {
    marginTop: 20,
    height: 54,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  navigateText: {
    fontWeight: "700",
    fontSize: 15,
  },

  error: {
    fontSize: 16,
    fontWeight: "600",
  },
});
