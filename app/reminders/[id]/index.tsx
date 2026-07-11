import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { MapPin, Clock, Navigation } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/screen/header";
import { Brain, FlaskConical, BookOpen } from "lucide-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const REMINDERS = [
  {
    id: "1",
    title: "Meeting at Student Hub",
    location: "NNB, Room 2",
    time: "10:45 AM",
    icon: <Brain size={20} color="#374151" />,
    completed: false,
  },
  {
    id: "2",
    title: "Pick up Lab Results",
    location: "GCB",
    time: "10:45 AM",
    icon: <FlaskConical size={20} color="#374151" />,
    completed: false,
  },
  {
    id: "3",
    title: "Study",
    location: "JQB",
    time: "10:45 AM",
    icon: <BookOpen size={20} color="#374151" />,
    completed: false,
  },
  {
    id: "4",
    title: "Meeting Course Rep",
    location: "LOT1",
    time: "10:45 AM",
    icon: <MaterialIcons name="directions-walk" size={24} color="black" />,
    completed: true,
  },
];

export default function ReminderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reminder = REMINDERS.find((r) => r.id === id);

  if (!reminder) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Reminder not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="Reminder" variant="solid" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Reminder Info */}
        <View style={styles.infoCard}>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>{reminder.icon}</Text>
          </View>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>{reminder.title}</Text>
            <View style={styles.infoMeta}>
              <MapPin size={12} color="#9CA3AF" />
              <Text style={styles.infoMetaText}>{reminder.location}</Text>
              <Clock size={12} color="#9CA3AF" />
              <Text style={styles.infoMetaText}>{reminder.time}</Text>
            </View>
          </View>
        </View>

        {/* Map Preview */}
        <View style={styles.mapCard}>
          <View style={styles.mapPlaceholder} />
          <View style={styles.locationPill}>
            <MapPin size={13} color="#374151" />
            <Text style={styles.locationText}>{reminder.location}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Start Navigation */}
      <View style={styles.footer}>
        <Button
          icon={Navigation}
          onPress={() => router.navigate("/(drawer)/(tabs)/(map)")}
        >
          <Text style={styles.navButtonText}>Start Navigation</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notFound: {
    textAlign: "center",
    marginTop: 40,
    color: "#9CA3AF",
    fontSize: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 22,
  },
  infoText: {
    flex: 1,
    gap: 6,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  infoMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoMetaText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  mapCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  mapPlaceholder: {
    width: "100%",
    height: 220,
    backgroundColor: "#E5E7EB",
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  footer: {
    padding: 20,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 54,
    backgroundColor: "#111827",
    borderRadius: 14,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
