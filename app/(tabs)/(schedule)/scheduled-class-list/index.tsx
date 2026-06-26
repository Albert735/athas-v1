import { ActiveClassCard, UpcomingClassCard } from "@/components/timetable";
import { MOCK_UPCOMING_CLASS } from "@/data/upcoming-class";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge } from "@/components/ui/badge";
import { Dot } from "lucide-react-native";

export default function ScheduledClassListScreen() {
  const today = new Date();

  const day = today.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const date = today.getDate();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Date Card */}
        <View style={styles.dateCard}>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.date}>{date}</Text>
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
        <View style={styles.upcomingSection}>
          <View style={styles.upcomingHeader}>
            <Text style={styles.upcomingTitle}>Upcoming Schedule</Text>

            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.upcomingList}>
            {MOCK_UPCOMING_CLASS.map((item, index) => (
              <UpcomingClassCard key={index} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>
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

  dateCard: {
    width: 56,
    height: 72,
    borderRadius: 14,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  day: {
    fontSize: 11,
    color: "#fff",
    textTransform: "uppercase",
  },

  date: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
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
});

