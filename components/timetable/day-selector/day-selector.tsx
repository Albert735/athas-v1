import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { Switch } from "@/components/ui/switch";
import { Picker } from "@/components/ui/picker";
import { Calendar } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";

import { DAYS_OF_WEEK } from "@/data/days";
import { TIME_OPTIONS } from "@/data/time-options";
import { REPEAT_OPTIONS } from "@/data/repeat-options";

export function DaySelector() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("10:00");
  const [repeatType, setRepeatType] = useState("weekly");

  const backgroundColor = useColor("background");
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const iconColor = useColor("icon");

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      {/* Repeat Switch */}
      <View style={styles.switchRow}>
        <View style={styles.switchTextContainer}>
          <Calendar size={20} color={iconColor} />
          <Text style={[styles.label, { color: textColor }]}>
            Repeat Schedule
          </Text>
        </View>
        <Switch value={isEnabled} onValueChange={setIsEnabled} />
      </View>

      {/* Days */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: mutedColor }]}>
          OCCURRENCE DAYS
        </Text>

        <FlatList
          horizontal
          data={DAYS_OF_WEEK}
          keyExtractor={(item) => item.value}
          scrollEnabled={false}
          contentContainerStyle={[
            styles.daysContainer,
            !isEnabled && styles.disabledContainer,
          ]}
          renderItem={({ item: day }) => {
            const isSelected = selectedDays.includes(day.value);
            return (
              <Pressable
                disabled={!isEnabled}
                onPress={() => toggleDay(day.value)}
                style={[
                  styles.dayButton,
                  { backgroundColor: cardColor, borderColor },
                  isSelected && styles.selectedDayButton,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    { color: textColor },
                    isSelected && styles.selectedDayText,
                  ]}
                >
                  {day.short}
                </Text>
              </Pressable>
            );
          }}
        />

        <Text style={[styles.counter, { color: mutedColor }]}>
          {selectedDays.length} day
          {selectedDays.length !== 1 ? "s" : ""} selected
        </Text>
      </View>

      {/* Start & End Time */}
      <View style={styles.row}>
        <View style={[styles.pickerRow, styles.section]}>
          <Text style={[styles.fieldLabel, { color: mutedColor }]}>
            START TIME
          </Text>
          <Picker
            options={TIME_OPTIONS}
            value={startTime}
            onValueChange={setStartTime}
            placeholder="Select start time"
            style={{ backgroundColor, borderRadius: 30 }}
          />
        </View>

        <View style={[styles.pickerRow, styles.section]}>
          <Text style={[styles.fieldLabel, { color: mutedColor }]}>
            END TIME
          </Text>
          <Picker
            options={TIME_OPTIONS}
            value={endTime}
            onValueChange={setEndTime}
            placeholder="Select end time"
            style={{ backgroundColor, borderRadius: 30 }}
          />
        </View>
      </View>

      {/* Repeat Pattern */}
      <View style={styles.section}>
        <Text style={[styles.fieldLabel, { color: mutedColor }]}>
          REPEAT PATTERN
        </Text>
        <Picker
          options={REPEAT_OPTIONS}
          value={repeatType}
          onValueChange={setRepeatType}
          placeholder="Select repeat pattern"
          style={{ backgroundColor, borderRadius: 30 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchTextContainer: {
    flexDirection: "row",
    gap: 8,
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
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  daysContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
    borderWidth: 1,
  },
  selectedDayButton: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "600",
  },
  selectedDayText: {
    color: "#FFFFFF",
  },
  counter: {
    fontSize: 13,
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
