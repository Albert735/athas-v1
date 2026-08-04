import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { MapPin, Bell, Mic } from "lucide-react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Header } from "@/components/shared/screen/header";
import { DatePicker } from "@/components/ui/date-picker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addReminderSchema, type AddReminderData } from "@/schemas/reminder";

export default function AddReminderScreen() {
  const { building } = useLocalSearchParams<{ building?: string }>();
  const icon = useColor("icon");
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddReminderData>({
    resolver: zodResolver(addReminderSchema),
    defaultValues: {
      note: building ? `Visit ${building}` : "",
      building: building || "",
      dateTime: undefined,
      alertNearby: true,
    },
  });

  const showToast = () => {
    toast({
      title: "Success!",
      description: "Reminder has been created successfully!",
      variant: "success",
    });
  };

  const onSubmit = async (data: AddReminderData) => {
    console.log("Reminder data:", data);
    router.back();
    showToast();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reminder" variant="solid" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Campus Reminder</Text>
          <Text style={styles.subtitle}>
            Set a location based task for your day
          </Text>
        </View>

        {/* Reminder Note */}
        <View style={styles.field}>
          <Text style={styles.label}>Reminder Note</Text>
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.textArea, errors.note && styles.inputError]}
                placeholder="eg. Intro to Computer Science"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                textAlignVertical="top"
              />
            )}
          />
          {errors.note && (
            <Text style={styles.errorText}>{errors.note.message}</Text>
          )}
        </View>

        {/* Select Location */}
        <View style={styles.field}>
          <Text style={styles.label}>Select Location</Text>
          <Controller
            control={control}
            name="building"
            render={({ field: { onChange, value } }) => (
              <>
                <SearchBar
                  placeholder="Search campus buildings..."
                  onSearch={(query) => onChange(query)}
                  loading={false}
                  rightIcon={<Mic size={18} color={icon} />}
                />
                {errors.building && (
                  <Text style={styles.errorText}>
                    {errors.building.message}
                  </Text>
                )}
                <View style={styles.mapPreview}>
                  <View style={styles.mapPlaceholder} />
                  <View style={styles.locationPill}>
                    <MapPin size={13} color="#374151" />
                    <Text style={styles.locationText}>
                      {value || "No location selected"}
                    </Text>
                  </View>
                </View>
              </>
            )}
          />
        </View>

        {/* Set Alert */}
        <View style={styles.field}>
          <Controller
            control={control}
            name="dateTime"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Date"
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

        {/* Alert Nearby */}
        <View style={styles.field}>
          <Controller
            control={control}
            name="alertNearby"
            render={({ field: { onChange, value } }) => (
              <View style={styles.alertRow}>
                <View style={styles.alertLeft}>
                  <Bell size={18} color="#6B7280" />
                  <Text style={styles.alertValue}>Alert me when nearby</Text>
                </View>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  thumbColor="#FFFFFF"
                />
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.footer}>
        <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Reminder"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, gap: 24 },
  titleBlock: { gap: 4 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 14, color: "#6B7280" },
  field: { gap: 8 },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    letterSpacing: 0.1,
  },
  textArea: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    minHeight: 100,
  },
  inputError: { borderColor: "#EF4444" },
  errorText: { color: "#EF4444", fontSize: 13 },
  mapPreview: {
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 8,
  },
  mapPlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: "#E5E7EB",
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  alertLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  alertValue: { fontSize: 15, fontWeight: "500", color: "#111827" },
  footer: { padding: 20 },
});
