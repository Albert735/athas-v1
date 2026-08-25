import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Mic, MapPinned, Trash2 } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { SearchBar } from "@/components/ui/searchbar";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { lectureHalls } from "@/data/lecture-halls";
import { useTimetable } from "@/hooks/useTimetable";
import type { ScheduledClass } from "@/types/class";

interface Props {
  classItem: ScheduledClass;
  onClose: () => void;
}

export function EditClass({ classItem, onClose }: Props) {
  const icon = useColor("icon");
  const mutedColor = useColor("textMuted");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");

  const { updateClass, deleteClass } = useTimetable();

  const [course, setCourse] = useState(classItem.course);
  const [code, setCode] = useState(classItem.code);
  const [building, setBuilding] = useState(classItem.building);
  const [hall, setHall] = useState(classItem.hall);
  const [day, setDay] = useState(classItem.day);
  const [startTime, setStartTime] = useState(classItem.startTime);
  const [endTime, setEndTime] = useState(classItem.endTime);
  const [repeatEnabled, setRepeatEnabled] = useState(classItem.repeatEnabled);
  const [repeatType, setRepeatType] = useState(classItem.repeatType);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCourse(classItem.course);
    setCode(classItem.code);
    setBuilding(classItem.building);
    setHall(classItem.hall);
    setDay(classItem.day);
    setStartTime(classItem.startTime);
    setEndTime(classItem.endTime);
    setRepeatEnabled(classItem.repeatEnabled);
    setRepeatType(classItem.repeatType);
  }, [classItem]);

  const handleSave = async () => {
    if (!course.trim()) {
      Alert.alert("Missing information", "Please enter the course name.");
      return;
    }

    if (!code.trim()) {
      Alert.alert("Missing information", "Please enter the course code.");
      return;
    }

    if (!building.trim()) {
      Alert.alert("Missing information", "Please select a building.");
      return;
    }

    if (!hall.trim()) {
      Alert.alert("Missing information", "Please select a room or hall.");
      return;
    }

    if (!day.trim()) {
      Alert.alert("Missing information", "Please select a day.");
      return;
    }

    if (!startTime.trim() || !endTime.trim()) {
      Alert.alert("Missing information", "Please select the class time.");
      return;
    }

    try {
      setSaving(true);

      await updateClass(classItem.id, {
        course: course.trim(),
        code: code.trim(),
        building: building.trim(),
        hall: hall.trim(),
        day,
        startTime,
        endTime,
        repeatEnabled,
        repeatType,
      });

      onClose();
    } catch (error) {
      console.error("Failed to update class:", error);
      Alert.alert(
        "Update failed",
        "Something went wrong while updating the class.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete class", `Are you sure you want to delete ${course}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteClass(classItem.id);
            onClose();
          } catch (error) {
            console.error("Failed to delete class:", error);
            Alert.alert(
              "Delete failed",
              "Something went wrong while deleting the class.",
            );
          }
        },
      },
    ]);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: mutedColor }]}>Course Name</Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor,
                color: textColor,
                borderColor,
              },
            ]}
            placeholder="e.g. Mathematics"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            value={course}
            onChangeText={setCourse}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: mutedColor }]}>Course Code</Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor,
                color: textColor,
                borderColor,
              },
            ]}
            placeholder="e.g. MATH 101"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
            value={code}
            onChangeText={setCode}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: mutedColor }]}>Building</Text>

          <SearchBar
            placeholder="Search for a building..."
            onSearch={setBuilding}
            loading={false}
            rightIcon={<Mic size={18} color={icon} />}
          />

          {building ? (
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/building-1.jpg")}
                style={styles.image}
              />

              <View style={styles.imageOverlay}>
                <MapPinned size={18} color="#FFFFFF" />

                <View>
                  <Text style={styles.buildingName}>{building}</Text>
                  <Text style={styles.buildingSubtitle}>Main Campus</Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: mutedColor }]}>Room / Hall</Text>

          <Combobox
            value={hall ? { value: hall, label: hall } : null}
            onValueChange={(option) => setHall(option?.value || "")}
          >
            <ComboboxTrigger>
              <ComboboxValue placeholder="Select room or hall" />
            </ComboboxTrigger>

            <ComboboxContent>
              <ComboboxInput placeholder="Search room or hall..." />

              <ComboboxList>
                <ComboboxEmpty>No room or hall found</ComboboxEmpty>

                {lectureHalls.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: mutedColor }]}>Day</Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor,
                color: textColor,
                borderColor,
              },
            ]}
            placeholder="e.g. Monday"
            placeholderTextColor="#9CA3AF"
            value={day}
            onChangeText={setDay}
          />
        </View>

        <View style={styles.timeRow}>
          <View style={styles.timeInput}>
            <Text style={[styles.label, { color: mutedColor }]}>
              Start Time
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor,
                  color: textColor,
                  borderColor,
                },
              ]}
              placeholder="9:00 AM"
              placeholderTextColor="#9CA3AF"
              value={startTime}
              onChangeText={setStartTime}
            />
          </View>

          <View style={styles.timeInput}>
            <Text style={[styles.label, { color: mutedColor }]}>End Time</Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor,
                  color: textColor,
                  borderColor,
                },
              ]}
              placeholder="10:00 AM"
              placeholderTextColor="#9CA3AF"
              value={endTime}
              onChangeText={setEndTime}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: mutedColor }]}>
            Repeat Pattern
          </Text>

          <Combobox
            value={repeatType ? { value: repeatType, label: repeatType } : null}
            onValueChange={(option) => setRepeatType(option?.value || "")}
          >
            <ComboboxTrigger>
              <ComboboxValue placeholder="Select repeat pattern" />
            </ComboboxTrigger>

            <ComboboxContent>
              <ComboboxInput placeholder="Search repeat pattern..." />

              <ComboboxList>
                <ComboboxEmpty>No repeat pattern found</ComboboxEmpty>

                <ComboboxItem value="Weekly">Weekly</ComboboxItem>

                <ComboboxItem value="Biweekly">Biweekly</ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setRepeatEnabled((value) => !value)}
          style={[
            styles.repeatToggle,
            {
              backgroundColor,
              borderColor,
            },
          ]}
        >
          <View
            style={[
              styles.checkbox,
              {
                borderColor,
                backgroundColor: repeatEnabled ? textColor : backgroundColor,
              },
            ]}
          >
            {repeatEnabled ? (
              <Text style={[styles.checkmark, { color: backgroundColor }]}>
                ✓
              </Text>
            ) : null}
          </View>

          <View style={styles.repeatText}>
            <Text style={[styles.repeatTitle, { color: textColor }]}>
              Repeat class
            </Text>

            <Text style={[styles.repeatDescription, { color: mutedColor }]}>
              Automatically repeat this class according to the selected pattern.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={saving}
          onPress={handleSave}
          style={[
            styles.saveButton,
            {
              backgroundColor: textColor,
              opacity: saving ? 0.6 : 1,
            },
          ]}
        >
          <Text style={[styles.saveButtonText, { color: backgroundColor }]}>
            {saving ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleDelete}
          style={styles.deleteButton}
        >
          <Trash2 size={18} color="#EF4444" />

          <Text style={styles.deleteText}>Delete Class</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },

  container: {
    gap: 18,
  },

  inputGroup: {
    gap: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.1,
  },

  input: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },

  imageContainer: {
    marginTop: 10,
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
  },

  imageOverlay: {
    position: "absolute",
    left: 16,
    bottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
  },

  buildingName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  buildingSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginTop: 2,
  },

  timeRow: {
    flexDirection: "row",
    gap: 12,
  },

  timeInput: {
    flex: 1,
    gap: 6,
  },

  repeatToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  checkmark: {
    fontSize: 14,
    fontWeight: "700",
  },

  repeatText: {
    flex: 1,
    gap: 3,
  },

  repeatTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  repeatDescription: {
    fontSize: 12,
    lineHeight: 17,
  },

  saveButton: {
    minHeight: 52,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  saveButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },

  deleteButton: {
    minHeight: 50,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  deleteText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "600",
  },
});
