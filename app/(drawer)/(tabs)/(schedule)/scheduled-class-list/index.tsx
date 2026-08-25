import { ActiveClassCard, UpcomingClassCard } from "@/components/timetable";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge } from "@/components/ui/badge";
import { Dot, Plus } from "lucide-react-native";
import { getWeekDates } from "@/utils/get-week-dates";
import { useState } from "react";
import { Header } from "@/components/shared/screen/header";
import { router } from "expo-router";
import { useColor } from "@/hooks/useColor";
import { useTimetable } from "@/providers/timetable-context";

export default function ScheduledClassListScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { classes, loading } = useTimetable();

  const getTimeInMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
  };

  const now = new Date();

  const currentDay = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const activeClass = classes.find((item) => {
    if (item.day.toLowerCase() !== currentDay.toLowerCase()) {
      return false;
    }

    const startMinutes = getTimeInMinutes(item.startTime);
    const endMinutes = getTimeInMinutes(item.endTime);

    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  });

  const weekDates = getWeekDates();

  const backgroundColor = useColor("background");
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const iconColor = useColor("icon");

  const selectedDayName = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const filteredClasses = classes.filter((item) => {
    if (item.day.toLowerCase() !== selectedDayName.toLowerCase()) {
      return false;
    }

    if (item.day.toLowerCase() !== currentDay.toLowerCase()) {
      return true;
    }

    const endMinutes = getTimeInMinutes(item.endTime);

    return endMinutes > currentMinutes;
  });

  if (loading) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor }]}>
        <Header title="My Schedule" showBack={false} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor }]}>
      <Header
        title="My Schedule"
        showBack={false}
        rightAction={
          <Pressable
            onPress={() =>
              router.replace("/(drawer)/(tabs)/(schedule)/add-class")
            }
          >
            <Plus size={22} color={iconColor} />
          </Pressable>
        }
      />
      <FlatList
        data={filteredClasses}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {/* Date Row */}
            <View style={styles.dateRow}>
              {weekDates.map((item) => {
                const isSelected =
                  item.fullDate.toDateString() === selectedDate.toDateString();

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setSelectedDate(item.fullDate)}
                    style={[
                      styles.dateCard,
                      { backgroundColor: cardColor },
                      isSelected && styles.dateCardActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.day,
                        { color: mutedColor },
                        isSelected && styles.textActive,
                      ]}
                    >
                      {item.day}
                    </Text>
                    <Text
                      style={[
                        styles.date,
                        { color: textColor },
                        isSelected && styles.textActive,
                      ]}
                    >
                      {item.date}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Active Class */}
            <View style={styles.activeClassCardContainer}>
              <View style={styles.activeClassCardHeader}>
                <Text style={[styles.sectionTitle, { color: textColor }]}>
                  Ongoing Now
                </Text>
                <Badge>
                  <View style={styles.badgeContainer}>
                    <Dot size={12} color="#fff" fill="#000" />
                    <Text style={styles.badgeText}>Live</Text>
                  </View>
                </Badge>
              </View>
              {activeClass ? (
                <ActiveClassCard class={activeClass} />
              ) : (
                <View
                  style={[styles.noActiveClass, { backgroundColor: cardColor }]}
                >
                  <Text
                    style={[styles.noActiveClassText, { color: mutedColor }]}
                  >
                    No class is currently ongoing
                  </Text>
                </View>
              )}
            </View>

            {/* Upcoming Header */}
            <View style={styles.upcomingHeader}>
              <TouchableOpacity>
                <Text style={[styles.seeAllText, { color: mutedColor }]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => <UpcomingClassCard {...item} />}
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
  content: {},
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
  upcomingHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 24,
  },
  seeAllText: {
    fontSize: 14,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dateCard: {
    width: 40,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  dateCardActive: {
    backgroundColor: "#111827",
  },
  textActive: {
    color: "#FFFFFF",
  },
  day: {
    fontSize: 10,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  date: {
    fontSize: 14,
    fontWeight: "600",
  },
  noActiveClass: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  noActiveClassText: {
    fontSize: 14,
  },
});
