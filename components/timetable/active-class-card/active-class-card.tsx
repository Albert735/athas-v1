import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DoorOpen, School, Navigation } from "lucide-react-native";
import { router } from "expo-router";
import { useColor } from "@/hooks/useColor";

export function ActiveClassCard() {
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const iconColor = useColor("icon");
  const backgroundColor = useColor("background");

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <Text style={[styles.time, { color: mutedColor }]}>
        9:30 AM - 11:20 AM
      </Text>

      <Text style={[styles.title, { color: textColor }]}>
        Advanced Web Programming
      </Text>

      <View style={styles.footer}>
        <View style={[styles.row, { backgroundColor }]}>
          <DoorOpen size={18} color={iconColor} />
          <Text style={[styles.meta, { color: textColor }]}>Room 2</Text>
        </View>

        <View style={[styles.row, { backgroundColor }]}>
          <School size={18} color={iconColor} />
          <Text style={[styles.meta, { color: textColor }]}>NNB</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        activeOpacity={0.85}
        onPress={() => router.push("/(drawer)/(tabs)/(map)")}
      >
        <Navigation size={16} color="#FFFFFF" />
        <Text style={styles.navButtonText}>Start Navigation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 30,
    gap: 16,
  },
  time: {
    fontSize: 13,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
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
    width: "45%",
    borderRadius: 10,
    padding: 8,
  },
  meta: {
    fontSize: 13,
    fontWeight: "600",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 42,
    backgroundColor: "#111827",
    borderRadius: 30,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
