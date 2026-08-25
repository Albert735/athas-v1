import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Header } from "@/components/shared/screen/header";
import { AddClassForm } from "@/components/timetable/add-class/form";
import { useColor } from "@/hooks/useColor";
import { DaySelector } from "@/components/timetable/day-selector";
import { Plus } from "lucide-react-native";
import { router } from "expo-router";
import { useToast } from "@/components/ui/toast";
import { useTimetable } from "@/hooks/useTimetable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addClassSchema, type AddClassData } from "@/schemas/class";
import type { ScheduledClass } from "@/types/class";

const SPACING = 20;

export default function AddClassScreen() {
  const mutedColor = useColor("textMuted");
  const { toast } = useToast();
  const { addClass } = useTimetable();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AddClassData>({
    resolver: zodResolver(addClassSchema),
    defaultValues: {
      courseName: "",
      courseCode: "",
      building: "",
      hall: "",
      repeatEnabled: false,
      selectedDays: [],
      startTime: "08:00",
      endTime: "10:00",
      repeatType: "weekly",
    },
  });

  const showToast = () => {
    toast({
      title: "Success!",
      description: "Class has been created successfully!",
      variant: "success",
    });
  };
  const onSubmit = async (data: AddClassData) => {
    try {
      const days = data.repeatEnabled
        ? data.selectedDays
        : data.selectedDays.slice(0, 1);

      if (days.length === 0) {
        toast({
          title: "Select a day",
          description: "Please select at least one day for the class.",
          variant: "error",
        });
        return;
      }

      const newClasses: ScheduledClass[] = days.map((day) => ({
        id: `${Date.now()}-${day}-${Math.random().toString(36).slice(2, 8)}`,
        course: data.courseName.trim(),
        code: data.courseCode.trim().toUpperCase(),
        startTime: data.startTime,
        endTime: data.endTime,
        hall: data.hall,
        building: data.building,
        lecturer: "",
        day,
        repeatEnabled: data.repeatEnabled,
        repeatType: data.repeatType,
      }));

      await addClass(newClasses);

      showToast();

      router.replace("/(drawer)/(tabs)/(schedule)/scheduled-class-list");
    } catch (error) {
      console.error("Failed to create class:", error);

      toast({
        title: "Something went wrong",
        description: "The class could not be saved.",
        variant: "error",
      });
    }
  };
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <Header title="Add Class" showBack />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.main}>
            <View style={styles.titleContainer}>
              <Text style={[styles.sub, { color: mutedColor }]}>
                TIMETABLE ENTRY
              </Text>
              <Text variant="subtitle">Build your Academic{"\n"}Schedule</Text>
            </View>

            <AddClassForm control={control} />
            <DaySelector control={control} />

            <Button
              style={styles.btn}
              variant="default"
              icon={Plus}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Schedule"}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  keyboardContainer: {},
  scrollContent: { paddingBottom: 150 },
  main: { paddingHorizontal: SPACING, marginTop: 10, gap: 24 },
  titleContainer: { gap: 4 },
  sub: { fontSize: 14, fontWeight: "500", letterSpacing: 0.48 },
  btn: { width: "100%", marginTop: 10 },
});
