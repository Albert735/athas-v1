import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function ActiveClassCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Class</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
    padding: 15,
    borderRadius: 20,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
