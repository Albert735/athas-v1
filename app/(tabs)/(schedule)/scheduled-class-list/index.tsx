import { ActiveClassCard } from "@/components/timetable";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge } from "@/components/ui/badge";
import { Dot } from "lucide-react-native";

export default function ScheduledClassListScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.day}>Mon</Text>
        <Text style={styles.date}>14</Text>
      </View>

      {/* active class card  */}

      <View style={styles.activeClassCardContainer}>
        <View style={styles.activeClassCardHeader}>
          <Text>Ongoing Now</Text>
          <Badge>
            <View style={styles.badgeContainer}>
              <Dot size={12} color="#fff" fill="#000" />
              <Text style={styles.badgeText}>Live</Text>
            </View>
          </Badge>
        </View>
        <ActiveClassCard />
      </View>

      {/* upcomiing schedule  */}
      <View>
        <View style={styles.upcomingHeader}>
          <Text style={styles.upcomingTitle}>Upcoming Schedule</Text>
          <TouchableOpacity>
            <Text>See All</Text>
          </TouchableOpacity>
        </View>

        {/* single upcoming class card  */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 65,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  day: {
    fontSize: 10,
    fontWeight: "normal",
    color: "#fff",
  },
  date: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#fff",
  },
  activeClassCardContainer: {
    marginTop: 20,
  },
  activeClassCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "normal",
    color: "#fff",
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  upcomingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
