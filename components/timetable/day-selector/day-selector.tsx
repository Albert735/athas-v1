import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { Switch } from "@/components/ui/switch";
import { Picker } from "@/components/ui/picker";
import { Calendar } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { Controller, Control, useFormState } from "react-hook-form";
import type { AddClassData } from "@/schemas/class";
import { DAYS_OF_WEEK } from "@/data/days";
import { TIME_OPTIONS } from "@/data/time-options";
import { REPEAT_OPTIONS } from "@/data/repeat-options";

interface Props {
  control: Control<AddClassData>;
}

export function DaySelector({ control }: Props) {
  const backgroundColor = useColor("background");
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const iconColor = useColor("icon");
  const { errors } = useFormState({ control });

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      {/* Repeat Switch */}
      <Controller
        control={control}
        name="repeatEnabled"
        render={({ field: { onChange, value } }) => (
          <View style={styles.switchRow}>
            <View style={styles.switchTextContainer}>
              <Calendar size={20} color={iconColor} />
              <Text style={[styles.label, { color: textColor }]}>
                Repeat Schedule
              </Text>
            </View>
            <Switch value={value} onValueChange={onChange} />
          </View>
        )}
      />

      {/* Days */}
      <Controller
        control={control}
        name="selectedDays"
        render={({ field: { onChange, value: selectedDays } }) => (
          <Controller
            control={control}
            name="repeatEnabled"
            render={({ field: { value: isEnabled } }) => {
              const toggleDay = (day: string) => {
                onChange(
                  selectedDays.includes(day)
                    ? selectedDays.filter((d) => d !== day)
                    : [...selectedDays, day],
                );
              };

              return (
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
                  {errors.selectedDays && (
                    <Text style={styles.errorText}>
                      {errors.selectedDays.message}
                    </Text>
                  )}
                </View>
              );
            }}
          />
        )}
      />

      {/* Start & End Time */}
      <View style={styles.row}>
        <View style={[styles.pickerRow, styles.section]}>
          <Text style={[styles.fieldLabel, { color: mutedColor }]}>
            START TIME
          </Text>
          <Controller
            control={control}
            name="startTime"
            render={({ field: { onChange, value } }) => (
              <Picker
                options={TIME_OPTIONS}
                value={value}
                onValueChange={onChange}
                placeholder="Select start time"
                style={{ backgroundColor, borderRadius: 30 }}
              />
            )}
          />
        </View>

        <View style={[styles.pickerRow, styles.section]}>
          <Text style={[styles.fieldLabel, { color: mutedColor }]}>
            END TIME
          </Text>
          <Controller
            control={control}
            name="endTime"
            render={({ field: { onChange, value } }) => (
              <Picker
                options={TIME_OPTIONS}
                value={value}
                onValueChange={onChange}
                placeholder="Select end time"
                style={{ backgroundColor, borderRadius: 30 }}
              />
            )}
          />
          {errors.endTime && (
            <Text style={styles.errorText}>{errors.endTime.message}</Text>
          )}
        </View>
      </View>

      {/* Repeat Pattern */}
      <View style={styles.section}>
        <Text style={[styles.fieldLabel, { color: mutedColor }]}>
          REPEAT PATTERN
        </Text>
        <Controller
          control={control}
          name="repeatType"
          render={({ field: { onChange, value } }) => (
            <Picker
              options={REPEAT_OPTIONS}
              value={value}
              onValueChange={onChange}
              placeholder="Select repeat pattern"
              style={{ backgroundColor, borderRadius: 30 }}
            />
          )}
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
  switchTextContainer: { flexDirection: "row", gap: 8, alignItems: "center" },
  label: { fontSize: 16, fontWeight: "600" },
  section: { gap: 8 },
  sectionTitle: { fontSize: 12, fontWeight: "700", letterSpacing: 0.5 },
  fieldLabel: { fontSize: 13, fontWeight: "600" },
  daysContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  disabledContainer: { opacity: 0.5 },
  dayButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  selectedDayButton: { backgroundColor: "#111827", borderColor: "#111827" },
  dayText: { fontSize: 12, fontWeight: "600" },
  selectedDayText: { color: "#FFFFFF" },
  counter: { fontSize: 13 },
  errorText: { color: "#EF4444", fontSize: 13 },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerRow: { width: "48%" },
});
