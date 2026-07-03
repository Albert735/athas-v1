import { ActiveClassCard, UpcomingClassCard } from "@/components/timetable";
import { MOCK_UPCOMING_CLASS } from "@/data/upcoming-class";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge } from "@/components/ui/badge";
import { Dot } from "lucide-react-native";
import { getWeekDates } from "@/utils/get-week-dates";
import { useState } from "react";
import { Pressable } from "react-native";

export default function ScheduledClassListScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekDates = getWeekDates();

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={MOCK_UPCOMING_CLASS}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {/* Date Card */}
            <View style={styles.dateRow}>
              {weekDates.map((item) => {
                const isSelected =
                  item.fullDate.toDateString() === selectedDate.toDateString();

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setSelectedDate(item.fullDate)}
                    style={[styles.dateCard, isSelected && styles.dateCardActive]}
                  >
                    <Text style={[styles.day, isSelected && styles.textActive]}>
                      {item.day}
                    </Text>

                    <Text style={[styles.date, isSelected && styles.textActive]}>
                      {item.date}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Active Class */}
            <View style={styles.activeClassCardContainer}>
              <View style={styles.activeClassCardHeader}>
                <Text style={styles.sectionTitle}>Ongoing Now</Text>

                <Badge>
                  <View style={styles.badgeContainer}>
                    <Dot size={12} color="#fff" fill="#000" />
                    <Text style={styles.badgeText}>Live</Text>
                  </View>
                </Badge>
              </View>

              <ActiveClassCard />
            </View>

            {/* Upcoming Schedule */}
            <View style={styles.upcomingHeader}>
              <Text style={styles.upcomingTitle}>Upcoming Schedule</Text>

              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <UpcomingClassCard {...item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },

  content: {
    paddingBottom: 40,
  },

  activeClassCardContainer: {
    marginTop: 24,
  },

  activeClassCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  badgeText: {
    fontSize: 10,
    color: "#fff",
  },

  upcomingSection: {
    marginTop: 28,
  },

  upcomingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  upcomingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  seeAllText: {
    fontSize: 14,
    color: "#666",
  },

  upcomingList: {
    marginTop: 16,
    gap: 12,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateCardActive: {
    backgroundColor: "#000",
  },
  textActive: {
    color: "#fff",
  },

  dateCard: {
    width: 40,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  day: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 4,
    textTransform: "uppercase",
  },

  date: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});
