import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Mic, MapPin, X } from "lucide-react-native";
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

interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: string;
  image?: string;
}

interface Props {
  control: Control<AddClassData>;
  onBuildingSelect?: (
    place: {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
    } | null,
  ) => void;
}

export function AddClassForm({ control, onBuildingSelect }: Props) {
  const icon = useColor("icon");
  const mutedColor = useColor("textMuted");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");
  const cardColor = useColor("card");

  const { errors } = useFormState({ control });

  const [buildingQuery, setBuildingQuery] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState<Place | null>(null);

  const searchResults = usePlaceSearch(buildingQuery);

  const buildingResults = searchResults.filter((place) =>
    ["lecture-hall", "lab", "library", "office"].includes(place.category),
  );

  const handleBuildingSelect = (place: Place) => {
    setSelectedBuilding(place);
    setBuildingQuery("");

    onBuildingSelect?.({
      id: place.id,
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
    });
  };

  const handleClearBuilding = (onChange: (value: string) => void) => {
    setSelectedBuilding(null);
    setBuildingQuery("");
    onChange("");
    onBuildingSelect?.(null);
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
                {
                  backgroundColor,
                  color: textColor,
                  borderColor,
                },
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
                {
                  backgroundColor,
                  color: textColor,
                  borderColor,
                },
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
              {!selectedBuilding ? (
                <>
                  <SearchBar
                    placeholder="Search for a building..."
                    value={buildingQuery}
                    onChangeText={(text) => {
                      setBuildingQuery(text);
                    }}
                    onFocus={() => {
                      if (value) {
                        onChange("");
                        onBuildingSelect?.(null);
                      }
                    }}
                    onSearch={(query) => {
                      setBuildingQuery(query);
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
                </>
              ) : (
                <View
                  style={[
                    styles.selectedBuildingCard,
                    {
                      backgroundColor: cardColor,
                      borderColor,
                    },
                  ]}
                >
                  {selectedBuilding.image ? (
                    <Image
                      source={{ uri: selectedBuilding.image }}
                      style={styles.buildingImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={[
                        styles.buildingImageFallback,
                        { backgroundColor },
                      ]}
                    >
                      <MapPin size={24} color={icon} />
                    </View>
                  )}

                  <View style={styles.selectedBuildingContent}>
                    <Text
                      style={[styles.buildingName, { color: textColor }]}
                      numberOfLines={1}
                    >
                      {selectedBuilding.name}
                    </Text>

                    <Text
                      style={[styles.buildingSubtitle, { color: mutedColor }]}
                    >
                      {selectedBuilding.category
                        .replace("-", " ")
                        .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                    </Text>

                    <View style={styles.locationRow}>
                      <MapPin size={13} color={mutedColor} />

                      <Text
                        style={[styles.locationText, { color: mutedColor }]}
                      >
                        Building selected
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    style={[styles.clearBuildingButton, { backgroundColor }]}
                    onPress={() => handleClearBuilding(onChange)}
                  >
                    <X size={16} color={mutedColor} />
                  </Pressable>
                </View>
              )}

              {errors.building && (
                <Text style={styles.errorText}>{errors.building.message}</Text>
              )}

              {value && !selectedBuilding ? (
                <View
                  style={[
                    styles.selectedBuildingFallback,
                    {
                      backgroundColor: cardColor,
                      borderColor,
                    },
                  ]}
                >
                  <View style={[styles.fallbackIcon, { backgroundColor }]}>
                    <MapPin size={18} color={icon} />
                  </View>

                  <View style={styles.selectedBuildingText}>
                    <Text
                      style={[styles.buildingName, { color: textColor }]}
                      numberOfLines={1}
                    >
                      {value}
                    </Text>

                    <Text
                      style={[styles.buildingSubtitle, { color: mutedColor }]}
                    >
                      Selected building
                    </Text>
                  </View>

                  <Pressable
                    style={[styles.clearBuildingButton, { backgroundColor }]}
                    onPress={() => handleClearBuilding(onChange)}
                  >
                    <X size={16} color={mutedColor} />
                  </Pressable>
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

  selectedBuildingCard: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
  },

  buildingImage: {
    width: 62,
    height: 62,
    borderRadius: 12,
  },

  buildingImageFallback: {
    width: 62,
    height: 62,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedBuildingContent: {
    flex: 1,
    minWidth: 0,
  },

  buildingName: {
    fontSize: 15,
    fontWeight: "700",
  },

  buildingSubtitle: {
    fontSize: 12,
    marginTop: 3,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
  },

  locationText: {
    fontSize: 11,
  },

  clearBuildingButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedBuildingFallback: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
  },

  fallbackIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedBuildingText: {
    flex: 1,
    minWidth: 0,
  },
});
