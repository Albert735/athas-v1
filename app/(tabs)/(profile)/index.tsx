import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { BookOpen, Coffee, Bus, ShieldCheck, Info } from "lucide-react-native";

import { Badge } from "@/components/ui/badge";
import { IDCard } from "@/components/profile";
import { Checkbox } from "@/components/ui/checkbox";

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
    title: "Shuttle Stops",
    subtitle: "Campus transportation",
    icon: Bus,
    checked: false,
  },
];

export default function Profile() {
  const [preferences, setPreferences] = useState(initialPreferences);

  const togglePreference = (id: string, value: boolean) => {
    setPreferences((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: value } : item)),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
          {preferences.map((item, index) => {
            const Icon = item.icon;

            return (
              <View key={item.id}>
                <View style={styles.preferenceItem}>
                  <View style={styles.preferenceLeft}>
                    <View style={styles.iconContainer}>
                      <Icon size={20} color="#2563EB" />
                    </View>

                    <View>
                      <Text style={styles.preferenceTitle}>{item.title}</Text>

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
          })}
        </View>
      </View>

      {/* SETTINGS */}
      <View style={styles.settingsCard}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <ShieldCheck size={22} color="#111827" />
            <Text style={styles.settingTitle}>Privacy & Security</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Info size={22} color="#111827" />
            <Text style={styles.settingTitle}>Help & Support</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 20,
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
    color: "#9CA3AF",
    fontWeight: "700",
    letterSpacing: 1,
  },

  preferencesCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },

  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
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
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  preferenceTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
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
    marginTop: 24,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },

  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
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
