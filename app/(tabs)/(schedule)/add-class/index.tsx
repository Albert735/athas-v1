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

const SPACING = 20;

export default function AddClassScreen() {
  const mutedColor = useColor("textMuted");

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

            <AddClassForm />

            <DaySelector />

            {/* <View style={{ height: 500, backgroundColor: "blue" }} /> */}

            <Button
              style={styles.btn}
              variant="default"
              icon={Plus}
              onPress={() => {
                router.replace("/(tabs)/(schedule)/scheduled-class-list");
              }}
            >
              Add Schedule
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
});
