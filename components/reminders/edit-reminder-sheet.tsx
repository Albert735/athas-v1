import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { X, MapPin, Bell, Check, Search } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BottomSheetModal } from "@/components/ui/bottom-sheet";
import { DatePicker } from "@/components/ui/date-picker";
import { reminderSchema, type ReminderFormData } from "@/schemas/reminder";
import type { Reminder } from "@/types/reminder";
import { places } from "@/data/places";

type EditReminderSheetProps = {
  visible: boolean;
  reminder: Reminder;
  onClose: () => void;
  onSave: (data: ReminderFormData) => void;
};

export function EditReminderSheet({
  visible,
  reminder,
  onClose,
  onSave,
}: EditReminderSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const initialPlace = useMemo(
    () =>
      places.find(
        (place) =>
          place.name === reminder.building &&
          place.latitude === reminder.latitude &&
          place.longitude === reminder.longitude,
      ) ??
      places.find((place) => place.name === reminder.building) ??
      null,
    [reminder],
  );

  const [selectedPlace, setSelectedPlace] = useState(initialPlace);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      note: reminder.note,
      building: reminder.building,
      latitude: reminder.latitude,
      longitude: reminder.longitude,
      dateTime: reminder.dateTime ?? new Date(),
      alertNearby: reminder.alertNearby,
    },
  });

  useEffect(() => {
    const place =
      places.find(
        (item) =>
          item.name === reminder.building &&
          item.latitude === reminder.latitude &&
          item.longitude === reminder.longitude,
      ) ??
      places.find((item) => item.name === reminder.building) ??
      null;

    setSelectedPlace(place);
    setSearchQuery("");

    reset({
      note: reminder.note,
      building: reminder.building,
      latitude: reminder.latitude,
      longitude: reminder.longitude,
      dateTime: reminder.dateTime ?? new Date(),
      alertNearby: reminder.alertNearby,
    });
  }, [reminder, reset]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return places.filter((place) => {
      return (
        place.name.toLowerCase().includes(query) ||
        place.category.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const selectPlace = (place: (typeof places)[number]) => {
    setSelectedPlace(place);
    setSearchQuery("");

    setValue("building", place.name, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("latitude", place.latitude, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("longitude", place.longitude, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const clearPlace = () => {
    setSelectedPlace(null);
    setSearchQuery("");

    setValue("building", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("latitude", 0, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("longitude", 0, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCancel = () => {
    const place =
      places.find(
        (item) =>
          item.name === reminder.building &&
          item.latitude === reminder.latitude &&
          item.longitude === reminder.longitude,
      ) ??
      places.find((item) => item.name === reminder.building) ??
      null;

    setSelectedPlace(place);
    setSearchQuery("");

    reset({
      note: reminder.note,
      building: reminder.building,
      latitude: reminder.latitude,
      longitude: reminder.longitude,
      dateTime: reminder.dateTime ?? new Date(),
      alertNearby: reminder.alertNearby,
    });

    onClose();
  };

  const handleSave = (data: ReminderFormData) => {
    onSave(data);
  };

  return (
    <BottomSheetModal isVisible={visible} onClose={handleCancel} showHandle>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Edit Reminder</Text>

            <Text style={styles.subtitle}>
              Update the details of this reminder
            </Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <X size={19} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <View style={styles.field}>
            <Text style={styles.label}>Reminder note</Text>

            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="What do you want to remember?"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  textAlignVertical="top"
                  style={[styles.textArea, errors.note && styles.inputError]}
                />
              )}
            />

            {errors.note && (
              <Text style={styles.errorText}>{errors.note.message}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Where do you need to go?</Text>

            {!selectedPlace ? (
              <>
                <View
                  style={[
                    styles.searchWrapper,
                    errors.building && styles.inputError,
                  ]}
                >
                  <Search size={17} color="#9CA3AF" />

                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search campus places..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.searchInput}
                    autoCorrect={false}
                  />
                </View>

                {searchQuery.trim().length > 0 && searchResults.length > 0 && (
                  <View style={styles.results}>
                    {searchResults.map((place) => (
                      <TouchableOpacity
                        key={place.id}
                        onPress={() => selectPlace(place)}
                        style={styles.result}
                        activeOpacity={0.7}
                      >
                        <View style={styles.resultIcon}>
                          <MapPin size={17} color="#0099FF" />
                        </View>

                        <View style={styles.resultInfo}>
                          <Text style={styles.resultName} numberOfLines={1}>
                            {place.name}
                          </Text>

                          <Text style={styles.resultMeta}>
                            {place.category} · {place.distance}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {searchQuery.trim().length > 0 &&
                  searchResults.length === 0 && (
                    <View style={styles.emptyResults}>
                      <Text style={styles.emptyResultsText}>
                        No campus places found
                      </Text>
                    </View>
                  )}
              </>
            ) : (
              <View style={styles.selectedPlace}>
                <View style={styles.selectedIcon}>
                  <MapPin size={19} color="#0099FF" />
                </View>

                <View style={styles.selectedInfo}>
                  <Text style={styles.selectedName} numberOfLines={1}>
                    {selectedPlace.name}
                  </Text>

                  <Text style={styles.selectedMeta}>
                    {selectedPlace.category} · {selectedPlace.distance}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={clearPlace}
                  style={styles.clearButton}
                  activeOpacity={0.7}
                >
                  <X size={17} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            )}

            {errors.building && (
              <Text style={styles.errorText}>{errors.building.message}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Date & time</Text>

            <Controller
              control={control}
              name="dateTime"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label=""
                  mode="datetime"
                  value={value}
                  onChange={onChange}
                  placeholder="Select date and time"
                  timeFormat="12"
                />
              )}
            />

            {errors.dateTime && (
              <Text style={styles.errorText}>{errors.dateTime.message}</Text>
            )}
          </View>

          <Controller
            control={control}
            name="alertNearby"
            render={({ field: { onChange, value } }) => (
              <View style={styles.alertRow}>
                <View style={styles.alertLeft}>
                  <View style={styles.alertIcon}>
                    <Bell size={17} color="#374151" />
                  </View>

                  <View style={styles.alertText}>
                    <Text style={styles.alertTitle}>Alert me when nearby</Text>

                    <Text style={styles.alertSubtitle}>
                      Notify me when you reach this location
                    </Text>
                  </View>
                </View>

                <Switch value={value} onValueChange={onChange} />
              </View>
            )}
          />
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <X size={17} color="#374151" />

            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(handleSave)}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Check size={17} color="#FFFFFF" />

            <Text style={styles.saveText}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: "88%",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: 4,
    paddingBottom: 18,
  },

  headerText: {
    flex: 1,
    paddingRight: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: "#9CA3AF",
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },

  content: {
    gap: 18,
    paddingBottom: 10,
  },

  field: {
    gap: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  textArea: {
    minHeight: 82,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 13,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    color: "#111827",
  },

  inputError: {
    borderColor: "#EF4444",
  },

  errorText: {
    fontSize: 12,
    color: "#EF4444",
  },

  searchWrapper: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 13,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  results: {
    marginTop: 8,
    borderRadius: 13,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  result: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  resultIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },

  resultInfo: {
    flex: 1,
  },

  resultName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },

  resultMeta: {
    marginTop: 2,
    fontSize: 10,
    color: "#9CA3AF",
    textTransform: "capitalize",
  },

  emptyResults: {
    marginTop: 8,
    padding: 14,
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  emptyResultsText: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  selectedPlace: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  selectedIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },

  selectedInfo: {
    flex: 1,
  },

  selectedName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },

  selectedMeta: {
    marginTop: 2,
    fontSize: 10,
    color: "#9CA3AF",
    textTransform: "capitalize",
  },

  clearButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 13,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  alertLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },

  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  alertText: {
    flex: 1,
  },

  alertTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },

  alertSubtitle: {
    marginTop: 2,
    fontSize: 11,
    color: "#9CA3AF",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 14,
  },

  cancelButton: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 13,
    backgroundColor: "#F3F4F6",
  },

  cancelText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  saveButton: {
    flex: 1.5,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 13,
    backgroundColor: "#111827",
  },

  saveText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
