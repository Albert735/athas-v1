import { View } from "react-native";
import { EmptySchedule } from "@/components/timetable/empty-schedule/empty-schedule";
import { useTimetable } from "@/hooks/useTimetable";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ScheduledClassListScreen from "./scheduled-class-list";

export default function ScheduleScreen() {
  const { classes } = useTimetable();

  const handleAddClass = () => {
    router.replace("/add-class");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!classes || classes.length === 0 ? (
        <EmptySchedule onAddClass={handleAddClass} />
      ) : (
        <View>
          <ScheduledClassListScreen />
        </View>
      )}
    </SafeAreaView>
  );
}
