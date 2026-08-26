import { View, Text, StyleSheet, TextInput } from "react-native";
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
import { usePlaceSearch } from "@/hooks/usePlaceSearch";
import { PlaceSearchDropdown } from "@/components/map/place-search-dropdown";
import { useState } from "react";

interface Props {
  control: Control<AddClassData>;
  onBuildingSelect: (place: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}

export function AddClassForm({ control, onBuildingSelect }: Props) {
  const icon = useColor("icon");
  const mutedColor = useColor("textMuted");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");

  const { errors } = useFormState({ control });

  const [buildingQuery, setBuildingQuery] = useState("");

  const searchResults = usePlaceSearch(buildingQuery);

  const buildingResults = searchResults.filter((place) =>
    ["lecture-hall", "lab", "library", "office"].includes(place.category),
  );

  const handleBuildingSelect = (place: (typeof searchResults)[number]) => {
    setBuildingQuery(place.name);

    onBuildingSelect({
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
    });
  };

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
                onSearch={(query) => {
                  setBuildingQuery(query);
                  onChange(query);
                }}
                loading={false}
                rightIcon={<Mic size={18} color={icon} />}
              />

              {buildingQuery.trim().length > 0 && (
                <PlaceSearchDropdown
                  visible={true}
                  results={buildingResults}
                  onSelect={(place) => {
                    onChange(place.name);
                    handleBuildingSelect(place);
                  }}
                />
              )}

              {errors.building && (
                <Text style={styles.errorText}>{errors.building.message}</Text>
              )}

              {value ? (
                <View style={styles.selectedBuilding}>
                  <MapPinned size={18} color={icon} />

                  <View style={styles.selectedBuildingText}>
                    <Text style={[styles.buildingName, { color: textColor }]}>
                      {value}
                    </Text>

                    <Text
                      style={[styles.buildingSubtitle, { color: mutedColor }]}
                    >
                      Selected building
                    </Text>
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

  inputError: {
    borderColor: "#EF4444",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 13,
  },

  selectedBuilding: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
  },

  selectedBuildingText: {
    flex: 1,
  },

  buildingName: {
    fontSize: 15,
    fontWeight: "700",
  },

  buildingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});
