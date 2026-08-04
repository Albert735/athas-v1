import { View, Text, StyleSheet, TextInput } from "react-native";
import { Image } from "expo-image";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Mic, MapPinned } from "lucide-react-native";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { Controller, Control, useFormState } from "react-hook-form";
import type { AddClassData } from "@/schemas/class";
import { lectureHalls } from "@/data/lecture-halls";

interface Props {
  control: Control<AddClassData>;
}

export function AddClassForm({ control }: Props) {
  const icon = useColor("icon");
  const mutedColor = useColor("textMuted");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");
  const { errors } = useFormState({ control });

  return (
    <View style={styles.container}>
      {/* Course Name */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: mutedColor }]}>Course Name</Text>
        <Controller
          control={control}
          name="courseName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                { backgroundColor, color: textColor, borderColor },
                errors.courseName && styles.inputError,
              ]}
              placeholder="e.g. Mathematics"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.courseName && (
          <Text style={styles.errorText}>{errors.courseName.message}</Text>
        )}
      </View>

      {/* Course Code */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: mutedColor }]}>Course Code</Text>
        <Controller
          control={control}
          name="courseCode"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                { backgroundColor, color: textColor, borderColor },
                errors.courseCode && styles.inputError,
              ]}
              placeholder="e.g. MATH 101"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="characters"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.courseCode && (
          <Text style={styles.errorText}>{errors.courseCode.message}</Text>
        )}
      </View>

      {/* Building */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: mutedColor }]}>Building</Text>
        <Controller
          control={control}
          name="building"
          render={({ field: { onChange, value } }) => (
            <>
              <SearchBar
                placeholder="Search for a building..."
                onSearch={(query) => onChange(query)}
                loading={false}
                rightIcon={<Mic size={18} color={icon} />}
              />
              {errors.building && (
                <Text style={styles.errorText}>{errors.building.message}</Text>
              )}
              {value ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={require("@/assets/images/building-1.jpg")}
                    style={styles.image}
                  />
                  <View style={styles.imageOverlay}>
                    <MapPinned size={18} color="#FFFFFF" />
                    <View>
                      <Text style={styles.buildingName}>{value}</Text>
                      <Text style={styles.buildingSubtitle}>Main Campus</Text>
                    </View>
                  </View>
                </View>
              ) : null}
            </>
          )}
        />
      </View>

      {/* Room / Hall */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: mutedColor }]}>Room / Hall</Text>
        <Controller
          control={control}
          name="hall"
          render={({ field: { onChange, value } }) => (
            <Combobox
              value={value ? { value, label: value } : null}
              onValueChange={(option) => onChange(option?.value || "")}
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
          )}
        />
        {errors.hall && (
          <Text style={styles.errorText}>{errors.hall.message}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 18 },
  inputGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: "500", letterSpacing: 0.1 },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: { borderColor: "#EF4444" },
  errorText: { color: "#EF4444", fontSize: 13 },
  imageContainer: {
    marginTop: 10,
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: { width: "100%", height: 220, borderRadius: 20 },
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
  buildingName: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  buildingSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginTop: 2,
  },
});
