import React, { useEffect } from "react";
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
import { DaySelector } from "@/components/timetable/day-selector";
import { useColor } from "@/hooks/useColor";
import { useToast } from "@/components/ui/toast";
import { useTimetable } from "@/hooks/useTimetable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addClassSchema, type AddClassData } from "@/schemas/class";
import { router, useLocalSearchParams } from "expo-router";

const SPACING = 20;

export default function EditClassScreen() {
  const mutedColor = useColor("textMuted");
  const { toast } = useToast();
  const { classes, updateClass } = useTimetable();

  const { id } = useLocalSearchParams<{ id: string }>();

  const selectedClass = classes.find((item) => item.id === id);

  const {
    control,
    handleSubmit,
    reset,
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

  useEffect(() => {
    if (!selectedClass) {
      return;
    }

    reset({
      courseName: selectedClass.course,
      courseCode: selectedClass.code,
      building: selectedClass.building,
      hall: selectedClass.hall,
      repeatEnabled: selectedClass.repeatEnabled,
      selectedDays: [selectedClass.day],
      startTime: selectedClass.startTime,
      endTime: selectedClass.endTime,
      repeatType: selectedClass.repeatType,
    });
  }, [selectedClass, reset]);

  const onSubmit = async (data: AddClassData) => {
    try {
      if (!selectedClass) {
        toast({
          title: "Class not found",
          description: "The class could not be found.",
          variant: "error",
        });
        return;
      }

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

      const primaryDay = days[0];

      await updateClass(selectedClass.id, {
        course: data.courseName.trim(),
        code: data.courseCode.trim().toUpperCase(),
        building: data.building,
        hall: data.hall,
        repeatEnabled: data.repeatEnabled,
        day: primaryDay,
        startTime: data.startTime,
        endTime: data.endTime,
        repeatType: data.repeatType,
      });

      toast({
        title: "Class updated",
        description: "Your class has been updated successfully.",
        variant: "success",
      });

      router.back();
    } catch (error) {
      console.error("Failed to update class:", error);

      toast({
        title: "Something went wrong",
        description: "The class could not be updated.",
        variant: "error",
      });
    }
  };

  if (!selectedClass) {
    return (
      <SafeAreaView style={styles.screen}>
        <Header title="Edit Class" showBack />

        <View style={styles.notFound}>
          <Text>Class not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <Header title="Edit Class" showBack />

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

              <Text variant="subtitle">Edit your Academic{"\n"}Schedule</Text>
            </View>

            <AddClassForm control={control} onBuildingSelect={() => {}} />

            <DaySelector control={control} />

            <Button
              style={styles.btn}
              variant="default"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 150,
  },

  main: {
    paddingHorizontal: SPACING,
    marginTop: 10,
    gap: 24,
  },

  titleContainer: {
    gap: 4,
  },

  sub: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.48,
  },

  btn: {
    width: "100%",
    marginTop: 10,
  },

  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
