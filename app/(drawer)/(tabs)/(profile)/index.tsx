// File: (drawer)/(tabs)/(profile)/index.tsx – purpose: Displays user profile information, settings, and support options.
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  BookOpen,
  Coffee,
  Toilet,
  ShieldCheck,
  Info,
  ChevronRight,
  LogOut,
} from "lucide-react-native";

import { Badge } from "@/components/ui/badge";
import { IDCard } from "@/components/profile";
import { Checkbox } from "@/components/ui/checkbox";
import { router } from "expo-router";
import { ScrollView } from "@/components/ui/scroll-view";
import { useToast } from "@/components/ui/toast";
import { useColor } from "@/hooks/useColor";
import { useAuth } from "@/providers/auth-context";
import { getAuthErrorMessage } from "@/services/auth-service";
import {
  getDepartmentLabel,
  getInitials,
  getSchoolLabel,
} from "@/utils/profile-labels";

/**
 * Map-category preferences. `key` is what gets saved on the user's profile
 * (users/{uid}.preferences.<key>); `defaultChecked` applies until they change it.
 */
const PREFERENCES = [
  {
    key: "studySpots",
    title: "Study Spots",
    subtitle: "Libraries and quiet spaces",
    icon: BookOpen,
    defaultChecked: true,
  },
  {
    key: "food",
    title: "Food & Cafeterias",
    subtitle: "Restaurants and cafés",
    icon: Coffee,
    defaultChecked: true,
  },
  {
    key: "restrooms",
    title: "Restrooms",
    subtitle: "Ease your mind",
    icon: Toilet,
    defaultChecked: false,
  },
] as const;

/**
 * Profile Screen
 *
 * Renders the signed-in student's profile: name, department and level,
 * student ID card, saved map preferences, settings and log out.
 */
export default function Profile() {
  const { user, profile, updateProfile, signOut } = useAuth();
  const { toast } = useToast();

  const backgroundColor = useColor("background");

  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const iconColor = useColor("icon");
  const redColor = useColor("red");

  const fullName = profile?.fullName ?? user?.displayName ?? "Student";
  const email = profile?.email ?? user?.email ?? undefined;
  const schoolLabel = getSchoolLabel(profile?.school);
  const departmentLabel =
    getDepartmentLabel(profile?.school, profile?.department) ?? schoolLabel;

  // Saved value if the student has changed it, otherwise the default.
  const currentPreferences = Object.fromEntries(
    PREFERENCES.map((item) => [
      item.key,
      profile?.preferences?.[item.key] ?? item.defaultChecked,
    ]),
  ) as Record<string, boolean>;

  const togglePreference = async (key: string, value: boolean) => {
    try {
      await updateProfile({
        preferences: { ...currentPreferences, [key]: value },
      });
    } catch (error) {
      toast({
        title: "Couldn't save preference",
        description: getAuthErrorMessage(error),
        variant: "error",
      });
    }
  };

  const handleLogout = async () => {
    try {
      // The auth gate in app/_layout.tsx sends the user back to sign-in.
      await signOut();
    } catch (error) {
      toast({
        title: "Couldn't log out",
        description: getAuthErrorMessage(error),
        variant: "error",
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* PROFILE HEADER */}
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(fullName)}</Text>
          </View>

          <View style={styles.info}>
            <Text style={[styles.name, { color: textColor }]}>{fullName}</Text>

            {departmentLabel ? (
              <Text style={[styles.major, { color: textMuted }]}>
                {departmentLabel}
              </Text>
            ) : null}

            {profile?.level ? (
              <Badge
                style={{
                  ...styles.badge,
                  backgroundColor: cardColor,
                  borderColor,
                }}
              >
                <Text style={[styles.batch, { color: textColor }]}>
                  {profile.level}
                </Text>
              </Badge>
            ) : null}
          </View>
        </View>

        {/* STUDENT ID */}
        <View style={styles.idCard}>
          <IDCard
            school={schoolLabel}
            universityId={profile?.universityId}
            email={email}
          />
        </View>

        {/* MAP PREFERENCES */}
        <View style={styles.preferences}>
          <View
            style={[
              styles.preferencesCard,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            {PREFERENCES.map((item) => {
              const Icon = item.icon;

              return (
                <View key={item.key} style={styles.preferenceItemContainer}>
                  <View style={styles.preferenceItem}>
                    <View style={styles.preferenceLeft}>
                      <View style={styles.iconContainer}>
                        <Icon size={18} color={primaryColor} />
                      </View>

                      <View>
                        <Text
                          style={[styles.preferenceTitle, { color: textColor }]}
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
                      checked={currentPreferences[item.key]}
                      onCheckedChange={(value) =>
                        togglePreference(item.key, value as boolean)
                      }
                    />
                  </View>
                </View>
              );
            })}
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

          <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <LogOut size={18} color={redColor} />
              <Text style={[styles.settingTitle, { color: redColor }]}>
                Log Out
              </Text>
            </View>
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
    textAlign: "center",
  },

  major: {
    marginTop: 4,
    fontSize: 14,
    textAlign: "center",
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

  /* STUDENT ID */
  idCard: {
    marginTop: 24,
  },

  /* PREFERENCES */
  preferences: {
    marginTop: 22,
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
