import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useColor } from "@/hooks/useColor";
import { CORNERS } from "@/theme/globals";

const DAYS = [
  { key: "Mon", label: "M" },
  { key: "Tue", label: "T" },
  { key: "Wed", label: "W" },
  { key: "Thu", label: "T" },
  { key: "Fri", label: "F" },
  { key: "Sat", label: "S" },
  { key: "Sun", label: "S" },
];

interface DaySelectorProps {
  selectedDays: string[];
  onDaysChange: (days: string[]) => void;
}

export function DaySelector({ selectedDays, onDaysChange }: DaySelectorProps) {
  const cardColor = useColor("card");
  const primaryColor = useColor("primary");
  const primaryFg = useColor("primaryForeground");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      onDaysChange(selectedDays.filter((d) => d !== day));
    } else {
      onDaysChange([...selectedDays, day]);
    }
  };

  return (
    <View style={styles.container}>
      {DAYS.map((day) => {
        const isSelected = selectedDays.includes(day.key);

        return (
          <Pressable
            key={day.key}
            onPress={() => toggleDay(day.key)}
            style={[
              styles.dayButton,
              {
                backgroundColor: isSelected ? primaryColor : cardColor,
              },
            ]}
          >
            <Text
              style={[
                styles.dayLabel,
                {
                  color: isSelected ? primaryFg : mutedColor,
                  fontWeight: isSelected ? "700" : "500",
                },
              ]}
            >
              {day.label}
            </Text>

            <Text
              style={[
                styles.dayName,
                {
                  color: isSelected
                    ? primaryFg + "CC"
                    : mutedColor,
                  fontWeight: isSelected ? "600" : "400",
                },
              ]}
            >
              {day.key}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
  dayButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 14,
    gap: 2,
  },
  dayLabel: {
    fontSize: 16,
  },
  dayName: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
});
