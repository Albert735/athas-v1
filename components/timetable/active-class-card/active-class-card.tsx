import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DoorOpen, School, Navigation } from "lucide-react-native";
import { Button } from "@/components/ui/button";

export function ActiveClassCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>9:30 AM - 11:20 AM</Text>

      <Text style={styles.title}>Advanced Web Programming</Text>

      <View style={styles.footer}>
        <View style={styles.row}>
          <DoorOpen size={18} color="#555" />
          <Text style={styles.meta}>Room 2</Text>
        </View>

        <View style={styles.row}>
          <School size={18} color="#555" />
          <Text style={styles.meta}>NNB</Text>
        </View>
      </View>

      <Button icon={Navigation} variant="default" size="sm">
        Start Navigation
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F7",
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },

  time: {
    fontSize: 13,
    color: "#666",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EDEDED",
    width: "45%",
    borderRadius: 10,
    padding: 5,
  },

  meta: {
    fontSize: 13,
    color: "#555",
    fontWeight: "bold",
  },
});
