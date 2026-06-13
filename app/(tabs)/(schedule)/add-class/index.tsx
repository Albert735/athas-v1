import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { AddClassForm } from "@/components/timetable/add-class/form";

const SPACING = 20;

export default function AddClassScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Add Class" showBack={true} />
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.sub}>TIMETABLE ENTRY</Text>
          <Text style={styles.title}>Build your Academic{"\n"}Schedule</Text>
        </View>
        <AddClassForm />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  main: {
    flex: 1,
    paddingHorizontal: SPACING,
    marginTop: 10,
  },
  titleContainer: {
    gap: 4,
  },

  sub: {
    fontFamily: "Bold",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.48,
    color: "rgba(102, 102, 102, 1)",
  },
  title: {
    fontWeight: 600,
    fontSize: 20,
  },
});
