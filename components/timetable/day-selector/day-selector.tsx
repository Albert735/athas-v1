import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Switch } from "@/components/ui/switch";
import { Picker } from "@/components/ui/picker";
import { Calendar } from "lucide-react-native";

import { DAYS_OF_WEEK } from "@/data/days";
import { TIME_OPTIONS } from "@/data/time-options";
import { REPEAT_OPTIONS } from "@/data/repeat-options";

export function DaySelector() {
  const [isEnabled, setIsEnabled] = useState(false);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("10:00");

  const [repeatType, setRepeatType] = useState("weekly");

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  return (
    <View style={styles.container}>
      {/* Repeat Switch */}
      <View style={styles.switchRow}>
        <View style={styles.switchTextContainer}>
          <Calendar size={20} />
          <Text style={styles.label}>Repeat Schedule</Text>
        </View>

        <Switch value={isEnabled} onValueChange={setIsEnabled} />
      </View>

      {/* Days */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OCCURRENCE DAYS</Text>

        <View
          style={[styles.daysContainer, !isEnabled && styles.disabledContainer]}
        >
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDays.includes(day.value);

            return (
              <Pressable
                key={day.value}
                disabled={!isEnabled}
                onPress={() => toggleDay(day.value)}
                style={[
                  styles.dayButton,
                  isSelected && styles.selectedDayButton,
                ]}
              >
                <Text
                  style={[styles.dayText, isSelected && styles.selectedDayText]}
                >
                  {day.short}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.counter}>
          {selectedDays.length} day
          {selectedDays.length !== 1 ? "s" : ""} selected
        </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.pickerRow, styles.section]}>
          <Text style={styles.fieldLabel}>START TIME</Text>

          <Picker
            options={TIME_OPTIONS}
            value={startTime}
            onValueChange={setStartTime}
            placeholder="Select start time"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
            }}
          />
        </View>

        {/* End Time */}
        <View style={[styles.pickerRow, styles.section]}>
          <Text style={styles.fieldLabel}>END TIME</Text>

          <Picker
            options={TIME_OPTIONS}
            value={endTime}
            onValueChange={setEndTime}
            placeholder="Select end time"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
            }}
          />
        </View>
      </View>

      {/* Start Time */}

      {/* Repeat Pattern */}
      <View style={styles.section}>
        <Text style={styles.fieldLabel}>REPEAT PATTERN</Text>

        <Picker
          options={REPEAT_OPTIONS}
          value={repeatType}
          onValueChange={setRepeatType}
          placeholder="Select repeat pattern"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    backgroundColor: "#F4F4F4",
    padding: 15,
    borderRadius: 20,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  section: {
    gap: 8,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "#6b7280",
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
  },

  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchTextContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  disabledContainer: {
    opacity: 0.5,
  },

  dayButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  selectedDayButton: {
    backgroundColor: "black",
  },

  dayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
  },

  selectedDayText: {
    color: "#ffffff",
  },

  counter: {
    fontSize: 13,
    color: "#6b7280",
  },

  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pickerRow: {
    width: "48%",
  },
});
