import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";

const FILTERS = ["All", "Upcoming", "Completed"];

const REMINDERS = [
  {
    id: "1",
    title: "Library books are due tomorrow",
    completed: false,
  },
  {
    id: "2",
    title: "Project presentation submitted",
    completed: true,
  },
  {
    id: "3",
    title: "Math assignment due Friday",
    completed: false,
  },
  {
    id: "4",
    title: "Registration completed successfully",
    completed: true,
  },
];

export default function NotificationsScreen() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = REMINDERS.filter((item) => {
    if (activeFilter === "Upcoming") return !item.completed;
    if (activeFilter === "Completed") return item.completed;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notifications" showBack />

      <View style={styles.filters}>
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
            >
              <Text
                style={[styles.filterText, isActive && styles.filterTextActive]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text
              style={[
                styles.status,
                item.completed ? styles.completed : styles.upcoming,
              ]}
            >
              {item.completed ? "Completed" : "Upcoming"}
            </Text>
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  filters: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },

  filterChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  filterChipActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#374151",
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },

  status: {
    fontSize: 13,
    fontWeight: "500",
  },

  upcoming: {
    color: "#2563EB",
  },

  completed: {
    color: "#16A34A",
  },
});
