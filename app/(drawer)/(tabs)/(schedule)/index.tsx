import { View } from "react-native";
import { EmptySchedule } from "@/components/timetable/empty-schedule/empty-schedule";
import { useTimetable } from "@/hooks/useTimetable";
import { router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { Plus } from "lucide-react-native";
import { Pressable } from "react-native";

export default function ScheduleScreen() {
  const { classes } = useTimetable();

  const handleAddClass = () => {
    router.replace("/(drawer)/(tabs)/(schedule)/add-class");
  };

  // If there are classes, redirect to the scheduled-class-list route
  if (classes && classes.length > 0) {
    return <Redirect href="/(drawer)/(tabs)/(schedule)/scheduled-class-list" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="Schedule"
        showBack={false}
        rightAction={
          <Pressable onPress={handleAddClass}>
            <Plus size={22} color="#111" />
          </Pressable>
        }
      />
      <EmptySchedule />
    </SafeAreaView>
  );
}
