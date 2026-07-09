import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import {
  BookOpen,
  Coffee,
  Toilet,
  ShieldCheck,
  Info,
  ChevronRight,
} from "lucide-react-native";

import { Badge } from "@/components/ui/badge";
import { IDCard } from "@/components/profile";
import { Checkbox } from "@/components/ui/checkbox";
import { router } from "expo-router";
import { ScrollView } from "@/components/ui/scroll-view";

const initialPreferences = [
  {
    id: "1",
    title: "Study Spots",
    subtitle: "Libraries and quiet spaces",
    icon: BookOpen,
    checked: true,
  },
  {
    id: "2",
    title: "Food & Cafeterias",
    subtitle: "Restaurants and cafés",
    icon: Coffee,
    checked: true,
  },
  {
    id: "3",
    title: "Restrooms",
    subtitle: "Ease your mind",
    icon: Toilet,
    checked: false,
  },
];

/**
 * Profile Screen
 *
 * Renders the user profile page containing the student ID card,
 * search preferences, privacy & security settings, and support links.
 */
export default function Profile() {
  const [preferences, setPreferences] = useState(initialPreferences);

  const togglePreference = (id: string, value: boolean) => {
    setPreferences((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: value } : item)),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* PROFILE HEADER */}
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>LM</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>Lamine Yamal</Text>

            <Text style={styles.major}>Computer Science Student</Text>

            <Badge style={styles.badge}>
              <Text style={styles.batch}>Class of 2027</Text>
            </Badge>
          </View>
        </View>

        {/* ID CARD */}
        <View style={styles.spacing}>
          <IDCard />
        </View>

        {/* MAP PREFERENCES */}
        <View style={styles.preferences}>
          <View style={styles.prefHeader}>
            <Text style={styles.prefTitle}>Map Preferences</Text>
            <Text style={styles.prefSubtitle}>ONBOARDING CHOICES</Text>
          </View>

          <View style={styles.preferencesCard}>
            <FlatList
              data={preferences}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => {
                const Icon = item.icon;

                return (
                  <View style={styles.preferenceItemContainer}>
                    <View style={styles.preferenceItem}>
                      <View style={styles.preferenceLeft}>
                        <View style={styles.iconContainer}>
                          <Icon size={20} />
                        </View>

                        <View>
                          <Text style={styles.preferenceTitle}>
                            {item.title}
                          </Text>

                          <Text style={styles.preferenceSubtitle}>
                            {item.subtitle}
                          </Text>
                        </View>
                      </View>

                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={(value) =>
                          togglePreference(item.id, value as boolean)
                        }
                      />
                    </View>

                    {index !== preferences.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                );
              }}
            />
          </View>
        </View>

        {/* SETTINGS */}
        <View style={styles.settingsCard}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/privacy-security")}
          >
            <View style={styles.settingLeft}>
              <ShieldCheck size={22} color="#111827" />
              <Text style={styles.settingTitle}>Privacy & Security</Text>
            </View>
            <ChevronRight />
          </TouchableOpacity>

          {/* <View style={styles.divider} /> */}

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/help-support")}
          >
            <View style={styles.settingLeft}>
              <Info size={22} color="#111827" />
              <Text style={styles.settingTitle}>Help & Support</Text>
            </View>
            <ChevronRight />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },

  spacing: {
    marginTop: 24,
  },

  /* HEADER */
  card: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  info: {
    marginLeft: 18,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  major: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  badge: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  batch: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  /* PREFERENCES */
  preferences: {
    marginTop: 28,
  },

  prefHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },

  prefTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  prefSubtitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    backgroundColor: "#EDEDED",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  preferencesCard: {
    backgroundColor: "#F7F7F7",
    padding: 10,
    borderRadius: 20,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    gap: 12,
  },

  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
  },

  preferenceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  preferenceTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  preferenceItemContainer: {
    gap: 12,
    // marginBottom: 12,
  },

  preferenceSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E7EB",
    marginLeft: 76,
  },

  /* SETTINGS */
  settingsCard: {
    marginTop: 32,
    gap: 12,
  },

  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
  },

  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
});
