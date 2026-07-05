import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Plus, ChevronLeft, Bell, MapPin, Clock } from "lucide-react-native";
import { useState } from "react";

const FILTERS = ["All", "Upcoming", "Completed"];

const REMINDERS = [
  {
    id: "1",
    title: "Meeting at Student Hub",
    location: "NNB, Room 2",
    time: "10:45 AM",
    icon: "⚙",
    completed: false,
  },
  {
    id: "2",
    title: "Pick up Lab Results",
    location: "GCB",
    time: "10:45 AM",
    icon: "🧪",
    completed: false,
  },
  {
    id: "3",
    title: "Study",
    location: "JQB",
    time: "10:45 AM",
    icon: "📖",
    completed: false,
  },
  {
    id: "4",
    title: "Meeting Course Rep",
    location: "LOT1",
    time: "10:45 AM",
    icon: "🚶",
    completed: true,
  },
];

export default function RemindersScreen() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = REMINDERS.filter((r) => {
    if (activeFilter === "Upcoming") return !r.completed;
    if (activeFilter === "Completed") return r.completed;
    return true;
  });

  const isEmpty = REMINDERS.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)/(home)")}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminder</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <Pressable
              key={filter}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
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

      {isEmpty ? (
        /* Empty State */
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Bell size={32} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyText}>No reminder added yet</Text>
        </View>
      ) : (
        /* List */
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
              onPress={() =>
                router.push(`/reminders/${item.id}`)
              }
            >
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>{item.icon}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardMeta}>
                  <MapPin size={11} color="#9CA3AF" />
                  <Text style={styles.cardMetaText}>{item.location}</Text>
                  <Clock size={11} color="#9CA3AF" />
                  <Text style={styles.cardMetaText}>{item.time}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      )}

      {/* Add Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.85}
          onPress={() =>
            router.push("/reminders/add-reminder")
          }
        >
          <Plus size={18} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add to Reminder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
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
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  filterChipActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
  },
  filterTextActive: {
    color: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconText: {
    fontSize: 18,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardMetaText: {
    fontSize: 12,
    color: "#9CA3AF",
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
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 15,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 54,
    backgroundColor: "#111827",
    borderRadius: 14,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
