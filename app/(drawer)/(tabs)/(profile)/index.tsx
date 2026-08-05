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
import { useColor } from "@/hooks/useColor";

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

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const iconColor = useColor("icon");

  const togglePreference = (id: string, value: boolean) => {
    setPreferences((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: value } : item)),
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.scrollContent}>
        {/* PROFILE HEADER */}
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>LM</Text>
          </View>

          <View style={styles.info}>
            <Text style={[styles.name, { color: textColor }]}>
              Lamine Yamal
            </Text>

            <Text style={[styles.major, { color: textMuted }]}>
              B.Sc. in Computer Science
            </Text>

            <Badge
              style={{
                ...styles.badge,
                backgroundColor: cardColor,
                borderColor,
              }}
            >
              <Text style={[styles.batch, { color: textColor }]}>
                Class of 2027
              </Text>
            </Badge>
          </View>
        </View>

        {/* MAP PREFERENCES */}
        <View style={styles.preferences}>
          <View
            style={[
              styles.preferencesCard,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
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
                          <Icon size={18} color={primaryColor} />
                        </View>

                        <View>
                          <Text
                            style={[
                              styles.preferenceTitle,
                              { color: textColor },
                            ]}
                          >
                            {item.title}
                          </Text>

                          <Text
                            style={[
                              styles.preferenceSubtitle,
                              { color: textMuted },
                            ]}
                          >
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
                  </View>
                );
              }}
            />
          </View>
        </View>

        {/* SETTINGS */}
        <View
          style={[
            styles.settingsCard,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/privacy-security")}
          >
            <View style={styles.settingLeft}>
              <ShieldCheck size={18} color={textColor} />
              <Text style={[styles.settingTitle, { color: textColor }]}>
                Privacy & Security
              </Text>
            </View>
            <ChevronRight size={18} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/help-support")}
          >
            <View style={styles.settingLeft}>
              <Info size={18} color={textColor} />
              <Text style={[styles.settingTitle, { color: textColor }]}>
                Help & Support
              </Text>
            </View>
            <ChevronRight size={18} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
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
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 400,
    backgroundColor: "#A855F7",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  info: {
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
  },

  major: {
    marginTop: 4,
    fontSize: 14,
  },

  badge: {
    marginTop: 12,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  batch: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  /* PREFERENCES */
  preferences: {
    marginTop: 22,
  },

  prefHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },

  preferencesCard: {
    padding: 10,
    borderRadius: 30,
    gap: 12,
    borderWidth: 1,
  },

  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  preferenceLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  preferenceTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  preferenceItemContainer: {
    gap: 12,
  },

  preferenceSubtitle: {
    marginTop: 2,
    fontSize: 12,
  },

  /* SETTINGS */
  settingsCard: {
    marginTop: 32,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
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
    fontSize: 14,
    fontWeight: "600",
  },
});
