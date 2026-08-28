import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
  Bell,
} from "lucide-react-native";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/screen/header";
import { useReminders } from "@/providers/reminders-provider";
import { EditReminderSheet } from "@/components/reminders/edit-reminder-sheet";
import type { ReminderFormData } from "@/schemas/reminder";

export default function ReminderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [editVisible, setEditVisible] = useState(false);

  const { reminders, deleteReminder, updateReminder } = useReminders();

  const reminder = reminders.find((item) => item.id === id);

  if (!reminder) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFound}>Reminder not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete reminder?",
      "This reminder will be permanently removed from your schedule.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteReminder(reminder.id);
            router.back();
          },
        },
      ],
    );
  };

  const handleEditSave = (data: ReminderFormData) => {
    updateReminder(reminder.id, data);
    setEditVisible(false);
  };

  const formattedDate = reminder.dateTime
    ? reminder.dateTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No date";

  const formattedTime = reminder.dateTime
    ? reminder.dateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "No time";

  const dateTimeText = reminder.dateTime
    ? `${formattedDate} · ${formattedTime}`
    : "No date or time";

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reminder" variant="solid" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditVisible(true)}
            activeOpacity={0.7}
          >
            <Pencil size={16} color="#374151" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.iconWrapper}>
            <Bell size={23} color="#0099FF" />
          </View>

          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>{reminder.note}</Text>

            <View style={styles.infoMeta}>
              <View style={styles.metaItem}>
                <MapPin size={14} color="#9CA3AF" />

                <Text style={styles.infoMetaText} numberOfLines={1}>
                  {reminder.building}
                </Text>
              </View>

              {reminder.dateTime && (
                <View style={styles.metaItem}>
                  <Clock size={14} color="#9CA3AF" />

                  <Text style={styles.infoMetaText}>{formattedTime}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View>
              <Text style={styles.sectionTitle}>Reminder Details</Text>

              <Text style={styles.sectionSubtitle}>
                Information about this reminder
              </Text>
            </View>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <MapPin size={17} color="#374151" />
              </View>

              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{reminder.building}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Clock size={17} color="#374151" />
              </View>

              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date & time</Text>

                <Text style={styles.detailValue}>{dateTimeText}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Bell size={17} color="#374151" />
              </View>

              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Nearby alert</Text>

                <Text style={styles.detailValue}>
                  {reminder.alertNearby ? "Enabled" : "Disabled"}
                </Text>
              </View>
            </View>
          </View>
        </View>

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
              <View style={styles.mapLineOne} />
              <View style={styles.mapLineTwo} />

              <View style={styles.mapPin}>
                <MapPin size={20} color="#FFFFFF" fill="#111827" />
              </View>

              <View style={styles.mapLocationBadge}>
                <MapPin size={14} color="#374151" />

                <Text style={styles.mapLocationText} numberOfLines={1}>
                  {reminder.building}
                </Text>
              </View>
            </View>
          </View>
        </View>

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

      <View style={styles.footer}>
        <Button
          icon={Navigation}
          onPress={() =>
            router.push({
              pathname: "/map",
              params: {
                latitude: String(reminder.latitude),
                longitude: String(reminder.longitude),
                placeName: reminder.building,
                source: "reminder",
              },
            })
          }
        >
          <Text style={styles.navButtonText}>Start Navigation</Text>
        </Button>
      </View>

      <EditReminderSheet
        visible={editVisible}
        reminder={reminder}
        onClose={() => setEditVisible(false)}
        onSave={handleEditSave}
      />
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
    backgroundColor: "#EFF6FF",
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
    flexWrap: "wrap",
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    maxWidth: "100%",
  },

  infoMetaText: {
    fontSize: 12,
    color: "#6B7280",
    flexShrink: 1,
  },

  section: {
    gap: 10,
  },

  sectionTitleRow: {
    paddingHorizontal: 2,
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

  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 12,
  },

  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 3,
  },

  detailValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
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

  mapLineOne: {
    position: "absolute",
    width: "150%",
    height: 1,
    backgroundColor: "#D1D5DB",
    top: 75,
    left: -40,
    transform: [{ rotate: "-15deg" }],
  },

  mapLineTwo: {
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
    right: 14,
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
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

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
