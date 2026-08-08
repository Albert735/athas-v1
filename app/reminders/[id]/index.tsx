import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  MapPin,
  Clock,
  Navigation,
  Trash2,
  Pencil,
  Check,
  X,
} from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/screen/header";
import { Brain, FlaskConical, BookOpen } from "lucide-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

const REMINDERS = [
  {
    id: "1",
    title: "Meeting at Student Hub",
    location: "NNB, Room 2",
    time: "10:45 AM",
    icon: <Brain size={22} color="#374151" />,
    completed: false,
  },
  {
    id: "2",
    title: "Pick up Lab Results",
    location: "GCB",
    time: "10:45 AM",
    icon: <FlaskConical size={22} color="#374151" />,
    completed: false,
  },
  {
    id: "3",
    title: "Study",
    location: "JQB",
    time: "10:45 AM",
    icon: <BookOpen size={22} color="#374151" />,
    completed: false,
  },
  {
    id: "4",
    title: "Meeting Course Rep",
    location: "LOT1",
    time: "10:45 AM",
    icon: <MaterialIcons name="directions-walk" size={24} color="#374151" />,
    completed: true,
  },
];

export default function ReminderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const reminder = REMINDERS.find((r) => r.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(reminder?.title ?? "");
  const [location, setLocation] = useState(reminder?.location ?? "");
  const [time, setTime] = useState(reminder?.time ?? "");

  if (!reminder) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFound}>Reminder not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSave = () => {
    // TODO:
    // Update the reminder in your backend / state management here.

    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(reminder.title);
    setLocation(reminder.location);
    setTime(reminder.time);
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete reminder?",
      "This reminder will be permanently removed.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // TODO:
            // Delete reminder from your backend / state management here.

            router.back();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reminder" variant="solid" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status */}
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusBadge,
              reminder.completed && styles.completedBadge,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                reminder.completed && styles.completedDot,
              ]}
            />

            <Text
              style={[
                styles.statusText,
                reminder.completed && styles.completedText,
              ]}
            >
              {reminder.completed ? "Completed" : "Upcoming"}
            </Text>
          </View>

          {!isEditing && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
              activeOpacity={0.7}
            >
              <Pencil size={16} color="#374151" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Reminder Overview */}
        {!isEditing ? (
          <View style={styles.infoCard}>
            <View style={styles.iconWrapper}>{reminder.icon}</View>

            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>{reminder.title}</Text>

              <View style={styles.infoMeta}>
                <View style={styles.metaItem}>
                  <MapPin size={14} color="#9CA3AF" />
                  <Text style={styles.infoMetaText}>{reminder.location}</Text>
                </View>

                <View style={styles.metaItem}>
                  <Clock size={14} color="#9CA3AF" />
                  <Text style={styles.infoMetaText}>{reminder.time}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          /* Edit Section */
          <View style={styles.editCard}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Edit Reminder</Text>
                <Text style={styles.sectionSubtitle}>
                  Update the details of this reminder
                </Text>
              </View>
            </View>

            {/* Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Reminder title</Text>

              <View style={styles.inputWrapper}>
                <Pencil size={17} color="#9CA3AF" />

                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter reminder title"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                />
              </View>
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>

              <View style={styles.inputWrapper}>
                <MapPin size={17} color="#9CA3AF" />

                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Enter location"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                />
              </View>
            </View>

            {/* Time */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Time</Text>

              <View style={styles.inputWrapper}>
                <Clock size={17} color="#9CA3AF" />

                <TextInput
                  value={time}
                  onChangeText={setTime}
                  placeholder="Enter time"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                />
              </View>
            </View>

            {/* Edit Actions */}
            <View style={styles.editActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <X size={17} color="#374151" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Check size={17} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Map Preview */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View>
              <Text style={styles.sectionTitle}>Location</Text>
              <Text style={styles.sectionSubtitle}>
                Where this reminder takes place
              </Text>
            </View>
          </View>

          <View style={styles.mapCard}>
            <View style={styles.mapPlaceholder}>
              <View style={styles.mapGrid}>
                <View style={styles.mapLine} />
                <View style={styles.mapLineVertical} />
              </View>

              <View style={styles.mapPin}>
                <MapPin size={20} color="#FFFFFF" fill="#111827" />
              </View>

              <View style={styles.mapLocationBadge}>
                <MapPin size={14} color="#374151" />
                <Text style={styles.mapLocationText}>{reminder.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delete Section */}
        <View style={styles.dangerSection}>
          <View style={styles.dangerIcon}>
            <Trash2 size={19} color="#DC2626" />
          </View>

          <View style={styles.dangerContent}>
            <Text style={styles.dangerTitle}>Delete reminder</Text>

            <Text style={styles.dangerDescription}>
              Remove this reminder permanently from your schedule.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      {!isEditing && (
        <View style={styles.footer}>
          <Button icon={Navigation} onPress={() => router.navigate("/map")}>
            <Text style={styles.navButtonText}>Start Navigation</Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notFound: {
    color: "#9CA3AF",
    fontSize: 15,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 32,
    gap: 20,
  },

  /* Status */

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
  },

  completedBadge: {
    backgroundColor: "#ECFDF5",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: "#6366F1",
  },

  completedDot: {
    backgroundColor: "#10B981",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4F46E5",
  },

  completedText: {
    color: "#047857",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  editButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  /* Reminder Card */

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 17,
  },

  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
    gap: 8,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  infoMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  infoMetaText: {
    fontSize: 12,
    color: "#6B7280",
  },

  /* Edit */

  editCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 18,
    gap: 18,
  },

  sectionHeader: {
    marginBottom: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  sectionSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: "#9CA3AF",
  },

  inputGroup: {
    gap: 8,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  inputWrapper: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  editActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 2,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },

  cancelButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  saveButton: {
    flex: 1.4,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 12,
    backgroundColor: "#111827",
  },

  saveButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  /* Location */

  section: {
    gap: 10,
  },

  sectionTitleRow: {
    paddingHorizontal: 2,
  },

  mapCard: {
    overflow: "hidden",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  mapPlaceholder: {
    height: 220,
    backgroundColor: "#E5E7EB",
    position: "relative",
    overflow: "hidden",
  },

  mapGrid: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },

  mapLine: {
    position: "absolute",
    width: "150%",
    height: 1,
    backgroundColor: "#D1D5DB",
    top: 75,
    left: -40,
    transform: [{ rotate: "-15deg" }],
  },

  mapLineVertical: {
    position: "absolute",
    width: 1,
    height: "150%",
    backgroundColor: "#D1D5DB",
    left: "48%",
    top: -40,
    transform: [{ rotate: "18deg" }],
  },

  mapPin: {
    position: "absolute",
    top: "42%",
    left: "50%",
    marginLeft: -22,
    marginTop: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  mapLocationBadge: {
    position: "absolute",
    left: 14,
    bottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  mapLocationText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  /* Delete */

  dangerSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  dangerIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
  },

  dangerContent: {
    flex: 1,
  },

  dangerTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#991B1B",
  },

  dangerDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    color: "#B91C1C",
  },

  deleteButton: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  deleteButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#DC2626",
  },

  /* Footer */

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: "#F9FAFB",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  navButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
