import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";

export default function AddClassScreen() {
  return (
    <SafeAreaView>
      <Header title="Add Class" showBack={true} />
      <View>
        <Text>TIMETABLE ENTRY</Text>
        <Text>
          Build your Academic
          {"\n"}
          Schedule
        </Text>
      </View>
    </SafeAreaView>
  );
}
