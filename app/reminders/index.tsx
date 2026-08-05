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
import { Plus, Bell, MapPin, Clock } from "lucide-react-native";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/screen/header";
import { Brain, FlaskConical, BookOpen } from "lucide-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColor } from "@/hooks/useColor";

const FILTERS = ["All", "Upcoming", "Completed"];

const REMINDERS = [
  {
    id: "1",
    title: "Meeting at Student Hub",
    location: "NNB, Room 2",
    time: "10:45 AM",
    icon: <Brain size={20} color="#0099FF" />,
    completed: false,
  },
  {
    id: "2",
    title: "Pick up Lab Results",
    location: "GCB",
    time: "10:45 AM",
    icon: <FlaskConical size={20} color="#0099FF" />,
    completed: false,
  },
  {
    id: "3",
    title: "Study",
    location: "JQB",
    time: "10:45 AM",
    icon: <BookOpen size={20} color="#0099FF" />,
    completed: false,
  },
  {
    id: "4",
    title: "Meeting Course Rep",
    location: "LOT1",
    time: "10:45 AM",
    icon: <MaterialIcons name="directions-walk" size={24} color="#0099FF" />,
    completed: true,
  },
];

/**
 * RemindersScreen Component
 *
 * Displays campus reminders with filter options (All, Upcoming, Completed),
 * reminder status details (location, time), empty state placeholder, and "Add to Reminder" action button.
 */
export default function RemindersScreen() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = REMINDERS.filter((r) => {
    if (activeFilter === "Upcoming") return !r.completed;
    if (activeFilter === "Completed") return r.completed;
    return true;
  });

  const isEmpty = REMINDERS.length === 0;

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const primaryForeground = useColor("primaryForeground");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header
        title="Reminder"
        showBack={true}
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
                { backgroundColor: cardColor, borderColor },
                isActive && { backgroundColor: primaryColor, borderColor: primaryColor }
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: textColor },
                  isActive && { color: primaryForeground }
                ]}
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
          <View style={[styles.emptyIcon, { backgroundColor: cardColor }]}>
            <Bell size={32} color={textMuted} />
          </View>
          <Text style={[styles.emptyText, { color: textMuted }]}>No reminder added yet</Text>
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
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: cardColor, borderColor },
                pressed && { opacity: 0.9 },
              ]}
              onPress={() => router.push(`/reminders/${item.id}`)}
            >
              <View style={[styles.cardIcon, { backgroundColor: backgroundColor }]}>
                <Text style={styles.cardIconText}>{item.icon}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={[styles.cardTitle, { color: textColor }]}>{item.title}</Text>
                <View style={styles.cardMeta}>
                  <MapPin size={11} color={textMuted} />
                  <Text style={[styles.cardMetaText, { color: textMuted }]}>{item.location}</Text>
                  <Clock size={11} color={textMuted} />
                  <Text style={[styles.cardMetaText, { color: textMuted }]}>{item.time}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      )}

      {/* Add Button */}
      <View style={[styles.footer, { borderTopColor: borderColor }]}>
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
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardMetaText: {
    fontSize: 12,
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
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
