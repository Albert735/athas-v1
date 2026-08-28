import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Bell, MapPin, Mic, Check } from "lucide-react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SearchBar } from "@/components/ui/searchbar";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/screen/header";
import { DatePicker } from "@/components/ui/date-picker";
import { useColor } from "@/hooks/useColor";
import { useToast } from "@/components/ui/toast";
import { useReminders } from "@/providers/reminders-provider";
import { reminderSchema, type ReminderFormData } from "@/schemas/reminder";
import { places } from "@/data/places";

type Place = (typeof places)[number];

export default function AddReminderScreen() {
  const icon = useColor("icon");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const primaryForeground = useColor("primaryForeground");

  const { toast } = useToast();
  const { addReminder } = useReminders();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      note: "",
      placeId: "",
      building: "",
      buildingLatitude: 0,
      buildingLongitude: 0,
      dateTime: undefined,
      alertNearby: true,
    },
  });

  const searchResults =
    searchQuery.trim().length > 0
      ? places.filter((place) =>
          place.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
        )
      : [];

  const handleSelectPlace = (place: Place) => {
    setSelectedPlace(place);

    setValue("placeId", place.id, {
      shouldValidate: true,
    });

    setValue("building", place.name, {
      shouldValidate: true,
    });

    setValue("buildingLatitude", place.latitude);

    setValue("buildingLongitude", place.longitude);

    setSearchQuery("");
    setSearchFocused(false);
  };

  const onSubmit = async (data: ReminderFormData) => {
    await addReminder(data);

    toast({
      title: "Success!",
      description: "Reminder has been created successfully!",
      variant: "success",
    });

    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Reminder" variant="solid" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { color: textColor }]}>
            Campus Reminder
          </Text>

          <Text style={[styles.subtitle, { color: textMuted }]}>
            Create a task for a specific place and time
          </Text>
        </View>

        {/* Note */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: textColor }]}>
            What do you need to do?
          </Text>

          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g. Go see my friend"
                placeholderTextColor={textMuted}
                multiline
                textAlignVertical="top"
                style={[
                  styles.textArea,
                  {
                    backgroundColor: cardColor,
                    borderColor,
                    color: textColor,
                  },
                  errors.note && styles.inputError,
                ]}
              />
            )}
          />

          {errors.note && (
            <Text style={styles.errorText}>{errors.note.message}</Text>
          )}
        </View>

        {/* Location */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: textColor }]}>
            Where do you need to go?
          </Text>

          {selectedPlace ? (
            <View
              style={[
                styles.selectedPlace,
                {
                  backgroundColor: cardColor,
                  borderColor,
                },
              ]}
            >
              <View style={[styles.placeIcon, { backgroundColor }]}>
                <MapPin size={18} color={primaryColor} />
              </View>

              <View style={styles.placeInfo}>
                <Text
                  style={[styles.placeName, { color: textColor }]}
                  numberOfLines={1}
                >
                  {selectedPlace.name}
                </Text>

                <Text style={[styles.placeMeta, { color: textMuted }]}>
                  {selectedPlace.category} · {selectedPlace.distance}
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  setSelectedPlace(null);
                  setValue("placeId", "");
                  setValue("building", "");
                  setValue("buildingLatitude", 0);
                  setValue("buildingLongitude", 0);
                  setSearchFocused(true);
                }}
              >
                <Text style={[styles.changeText, { color: primaryColor }]}>
                  Change
                </Text>
              </Pressable>
            </View>
          ) : (
            <>
              <SearchBar
                placeholder="Search campus places..."
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                onSearch={() => {}}
                loading={false}
                rightIcon={<Mic size={18} color={icon} />}
              />

              {searchFocused && searchResults.length > 0 && (
                <View
                  style={[
                    styles.results,
                    {
                      backgroundColor: cardColor,
                      borderColor,
                    },
                  ]}
                >
                  {searchResults.map((place) => (
                    <Pressable
                      key={place.id}
                      style={({ pressed }) => [
                        styles.resultItem,
                        pressed && { opacity: 0.7 },
                      ]}
                      onPress={() => handleSelectPlace(place)}
                    >
                      <View style={[styles.resultIcon, { backgroundColor }]}>
                        <MapPin size={16} color={primaryColor} />
                      </View>

                      <View style={styles.resultInfo}>
                        <Text style={[styles.resultName, { color: textColor }]}>
                          {place.name}
                        </Text>

                        <Text style={[styles.resultMeta, { color: textMuted }]}>
                          {place.category} · {place.distance}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}

              {errors.placeId && (
                <Text style={styles.errorText}>{errors.placeId.message}</Text>
              )}
            </>
          )}
        </View>

        {/* Date and Time */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: textColor }]}>When?</Text>

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

        {/* Nearby Alert */}
        <Controller
          control={control}
          name="alertNearby"
          render={({ field: { onChange, value } }) => (
            <View
              style={[
                styles.alertRow,
                {
                  backgroundColor: cardColor,
                  borderColor,
                },
              ]}
            >
              <View style={styles.alertLeft}>
                <View style={[styles.alertIcon, { backgroundColor }]}>
                  <Bell size={17} color={primaryColor} />
                </View>

                <View style={styles.alertText}>
                  <Text style={[styles.alertTitle, { color: textColor }]}>
                    Alert me when nearby
                  </Text>

                  <Text style={[styles.alertSubtitle, { color: textMuted }]}>
                    Notify me when you reach this location
                  </Text>
                </View>
              </View>

              <Switch value={value} onValueChange={onChange} />
            </View>
          )}
        />
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor,
            borderTopColor: borderColor,
          },
        ]}
      >
        <Button
          icon={Check}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={[styles.createButtonText, { color: primaryForeground }]}>
            {isSubmitting ? "Creating..." : "Create Reminder"}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    gap: 24,
    paddingBottom: 30,
  },

  titleBlock: {
    gap: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
  },

  field: {
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
  },

  textArea: {
    minHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    fontSize: 15,
  },

  inputError: {
    borderColor: "#EF4444",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 12,
  },

  results: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },

  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },

  resultIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  resultInfo: {
    flex: 1,
    gap: 3,
  },

  resultName: {
    fontSize: 14,
    fontWeight: "600",
  },

  resultMeta: {
    fontSize: 11,
    textTransform: "capitalize",
  },

  selectedPlace: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },

  placeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  placeInfo: {
    flex: 1,
    gap: 3,
  },

  placeName: {
    fontSize: 14,
    fontWeight: "600",
  },

  placeMeta: {
    fontSize: 11,
    textTransform: "capitalize",
  },

  changeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 13,
    borderRadius: 16,
    borderWidth: 1,
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
  },

  alertText: {
    flex: 1,
  },

  alertTitle: {
    fontSize: 13,
    fontWeight: "600",
  },

  alertSubtitle: {
    marginTop: 2,
    fontSize: 11,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
  },

  createButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
