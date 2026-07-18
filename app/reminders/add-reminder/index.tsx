import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  HelpCircle,
  MapPin,
  Calendar,
  Bell,
  Mic,
} from "lucide-react-native";
import { useState } from "react";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function AddReminderScreen() {
  const { building } = useLocalSearchParams<{ building?: string }>();
  const [note, setNote] = useState(building ? `Visit ${building}` : "");
  const [alertNearby, setAlertNearby] = useState(true);
  const icon = useColor("icon");
  const selectedBuilding = building || "Mensah Sarbah Hall";
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Success!",
      description: "Your changes have been saved.",
      variant: "success",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminder</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <HelpCircle size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

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
          <TextInput
            style={styles.textArea}
            placeholder="eg. Intro to Computer Science"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
            textAlignVertical="top"
          />
        </View>

        {/* Select Location */}
        <View style={styles.field}>
          <Text style={styles.label}>Select Location</Text>
          <SearchBar
            placeholder="Search campus buildings..."
            onSearch={(query) => console.log(query)}
            loading={false}
            rightIcon={<Mic size={18} color={icon} />}
          />

          {/* Map Preview */}
          <View style={styles.mapPreview}>
            <View style={styles.mapPlaceholder} />
            <View style={styles.locationPill}>
              <MapPin size={13} color="#374151" />
              <Text style={styles.locationText}>{selectedBuilding}</Text>
            </View>
          </View>
        </View>

        {/* Set Alert */}
        <View style={styles.field}>
          <View style={styles.alertRow}>
            <View style={styles.alertLeft}>
              <Calendar size={18} color="#6B7280" />
              <View>
                <Text style={styles.alertLabel}>SET ALERT</Text>
                <Text style={styles.alertValue}>Today, 2:30 PM</Text>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Alert Nearby */}
        <View style={styles.field}>
          <View style={styles.alertRow}>
            <View style={styles.alertLeft}>
              <Bell size={18} color="#6B7280" />
              <Text style={styles.alertValue}>Alert me when nearby</Text>
            </View>
            <Switch
              value={alertNearby}
              onValueChange={setAlertNearby}
              trackColor={{ false: "#E5E7EB", true: "#111827" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.footer}>
        <Button
          onPress={() => {
            router.back();
            showToast();
          }}
        >
          Create Reminder
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 24,
  },
  titleBlock: {
    gap: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  field: {
    gap: 8,
  },
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
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    minHeight: 100,
  },
  mapPreview: {
    borderRadius: 14,
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
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  alertLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  alertLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: 0.8,
  },
  alertValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  editText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B82F6",
  },
  footer: {
    padding: 20,
  },
  createButton: {
    height: 54,
    backgroundColor: "#111827",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
