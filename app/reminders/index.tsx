import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Plus, Bell, MapPin, Clock } from "lucide-react-native";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/screen/header";
import { useColor } from "@/hooks/useColor";
import { useReminders } from "@/providers/reminders-provider";

const FILTERS = ["All", "Upcoming", "Completed"] as const;

export default function RemindersScreen() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>("All");

  const { reminders } = useReminders();

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const primaryForeground = useColor("primaryForeground");

  const filteredReminders = reminders.filter((reminder) => {
    if (activeFilter === "Upcoming") {
      return !reminder.completed;
    }

    if (activeFilter === "Completed") {
      return reminder.completed;
    }

    return true;
  });

  const isEmpty = filteredReminders.length === 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header
        title="Reminder"
        showBack
        onBack={() => router.back()}
        variant="solid"
      />

      {/* Filters */}
      <View style={styles.filters}>
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <Pressable
              key={filter}
              style={[
                styles.filterChip,
                {
                  backgroundColor: cardColor,
                  borderColor,
                },
                isActive && {
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: textColor },
                  isActive && {
                    color: primaryForeground,
                  },
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isEmpty ? (
        <View style={styles.empty}>
          <View style={[styles.emptyIcon, { backgroundColor: cardColor }]}>
            <Bell size={32} color={textMuted} />
          </View>

          <Text style={[styles.emptyText, { color: textMuted }]}>
            {activeFilter === "All"
              ? "No reminders added yet"
              : `No ${activeFilter.toLowerCase()} reminders`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredReminders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: cardColor,
                  borderColor,
                },
                pressed && {
                  opacity: 0.9,
                },
              ]}
              onPress={() => router.push(`/reminders/${item.id}`)}
            >
              <View
                style={[
                  styles.cardIcon,
                  {
                    backgroundColor,
                  },
                ]}
              >
                <Bell size={19} color={primaryColor} />
              </View>

              <View style={styles.cardInfo}>
                <Text
                  style={[styles.cardTitle, { color: textColor }]}
                  numberOfLines={1}
                >
                  {item.note}
                </Text>

                <View style={styles.cardMeta}>
                  <MapPin size={11} color={textMuted} />

                  <Text
                    style={[styles.cardMetaText, { color: textMuted }]}
                    numberOfLines={1}
                  >
                    {item.building}
                  </Text>

                  {item.dateTime && (
                    <>
                      <Clock size={11} color={textMuted} />

                      <Text style={[styles.cardMetaText, { color: textMuted }]}>
                        {item.dateTime.toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </Text>
                    </>
                  )}
                </View>
              </View>

              {item.completed && (
                <View
                  style={[
                    styles.completedBadge,
                    {
                      backgroundColor: backgroundColor,
                    },
                  ]}
                >
                  <Text style={[styles.completedText, { color: primaryColor }]}>
                    Done
                  </Text>
                </View>
              )}
            </Pressable>
          )}
        />
      )}

      {/* Add Button */}
      <View
        style={[
          styles.footer,
          {
            borderTopColor: borderColor,
          },
        ]}
      >
        <Button
          icon={Plus}
          onPress={() => router.push("/reminders/add-reminder")}
        >
          <Text style={styles.addButtonText}>Add to Reminder</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filters: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },

  filterText: {
    fontSize: 13,
    fontWeight: "500",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },

  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  cardInfo: {
    flex: 1,
    gap: 4,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  cardMetaText: {
    fontSize: 12,
    maxWidth: 110,
  },

  completedBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  completedText: {
    fontSize: 11,
    fontWeight: "700",
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 15,
    fontWeight: "500",
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
  },

  addButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
