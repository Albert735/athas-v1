// File: (drawer)/(tabs)/(profile)/privacy-security/index.tsx – purpose: Manages user privacy settings and security options.
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AppState,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import {
  ChevronRight,
  Lock,
  ShieldCheck,
  MapPin,
  History,
  Trash,
  LocateFixed,
  Bell,
  Download,
  X,
} from "lucide-react-native";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ScrollView } from "@/components/ui/scroll-view";
import { useColor } from "@/hooks/useColor";
import { useAuth } from "@/providers/auth-context";
import { useToast } from "@/components/ui/toast";
import { getAuthErrorMessage } from "@/services/auth-service";

/** Plain-English label for the app's real location permission. */
function describeLocationPermission(
  permission: Location.LocationPermissionResponse | null,
): string {
  if (!permission) return "Checking…";
  if (permission.granted) return "Allowed while using the app";
  if (permission.status === Location.PermissionStatus.UNDETERMINED) {
    return "Not set yet";
  }
  return "Not allowed";
}

export default function PrivacySecurity() {
  const [isLiveTrackingEnabled, setIsLiveTrackingEnabled] = useState(false);
  const [isRouteHistoryEnabled, setIsRouteHistoryEnabled] = useState(false);
  const [locationPermission, setLocationPermission] =
    useState<Location.LocationPermissionResponse | null>(null);

  const { user, profile, resetPassword } = useAuth();
  const { toast } = useToast();

  // Read the real permission now, and again whenever the student comes back
  // from the iOS/Android Settings app.
  const refreshLocationPermission = useCallback(async () => {
    try {
      setLocationPermission(await Location.getForegroundPermissionsAsync());
    } catch {
      setLocationPermission(null);
    }
  }, []);

  useEffect(() => {
    refreshLocationPermission();

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") refreshLocationPermission();
    });
    return () => subscription.remove();
  }, [refreshLocationPermission]);

  const openSystemSettings = () => {
    Linking.openSettings().catch(() => {
      toast({
        title: "Couldn't open Settings",
        description: "Open your phone's Settings app and find Raute.",
        variant: "error",
      });
    });
  };

  const accountEmail = profile?.email ?? user?.email ?? undefined;

  const handlePasswordReset = () => {
    if (!accountEmail) return;

    Alert.alert(
      "Reset your password",
      `We'll email a password reset link to ${accountEmail}.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send link",
          onPress: async () => {
            try {
              await resetPassword(accountEmail);
              toast({
                title: "Check your email",
                description: `A reset link is on its way to ${accountEmail}.`,
                variant: "success",
              });
            } catch (error) {
              toast({
                title: "Couldn't send reset link",
                description: getAuthErrorMessage(error),
                variant: "error",
              });
            }
          },
        },
      ],
    );
  };

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const iconColor = useColor("icon");
  const successColor = useColor("green");
  const orangeColor = useColor("orange");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Privacy & Security" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* INTRO */}
        <Text style={[styles.description, { color: textMuted }]}>
          Control your digital presence and safeguard your campus experience.
        </Text>

        {/* ── ACCOUNT SECURITY ── */}
        <View
          style={[
            styles.preferencesCard,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={handlePasswordReset}
            disabled={!accountEmail}
          >
            <View style={styles.cardLeft}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: "rgba(0, 153, 255, 0.1)" },
                ]}
              >
                <Lock size={20} color={primaryColor} />
              </View>

              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>
                  Change Password
                </Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>
                  We&apos;ll email you a reset link
                </Text>
              </View>
            </View>

            <ChevronRight size={20} color={iconColor} />
          </TouchableOpacity>

          {/* Two-factor sign-in isn't built yet, so don't claim it's on. */}
          <View style={[styles.card, { opacity: 0.6 }]}>
            <View style={styles.cardLeft}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: "rgba(16, 185, 129, 0.1)" },
                ]}
              >
                <ShieldCheck size={20} color={successColor} />
              </View>

              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>
                  Two-Factor Authentication
                </Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>
                  Coming soon
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── LOCATION PRIVACY ── */}

        <View style={styles.locationPreferences}>
          <View
            style={[
              styles.toggleCard,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            <View style={styles.toggleRow}>
              <View style={styles.row}>
                <MapPin size={20} color={primaryColor} />
                <Switch
                  value={isLiveTrackingEnabled}
                  onValueChange={setIsLiveTrackingEnabled}
                />
              </View>

              <View style={styles.toggleTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>
                  Live Campus Tracking
                </Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>
                  Share your location in real-time with authorized campus
                  security and friends
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.toggleCard,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            <View style={styles.toggleRow}>
              <View style={styles.row}>
                <History size={20} color={orangeColor} />
                <Switch
                  value={isRouteHistoryEnabled}
                  onValueChange={setIsRouteHistoryEnabled}
                />
              </View>

              <View style={styles.toggleTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>
                  Route History Storage
                </Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>
                  Save your frequent routes to optimize future pathfinding
                  suggestions
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Button
          variant="default"
          size="sm"
          icon={Trash}
          onPress={() => {}}
          style={{
            alignSelf: "flex-start",
            width: "100%",
            marginTop: 18,
            marginBottom: 18,
          }}
        >
          Clear Route History
        </Button>

        {/* ── APP PERMISSIONS ── */}

        <View
          style={[
            styles.permissionsCard,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={openSystemSettings}
          >
            <View style={styles.cardLeft}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: "rgba(0, 153, 255, 0.1)" },
                ]}
              >
                <LocateFixed size={20} color={primaryColor} />
              </View>

              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>
                  Location
                </Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>
                  {describeLocationPermission(locationPermission)}
                </Text>
              </View>
            </View>

            <ChevronRight size={20} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={openSystemSettings}
          >
            <View style={styles.cardLeft}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: "rgba(0, 153, 255, 0.1)" },
                ]}
              >
                <Bell size={20} color={primaryColor} />
              </View>

              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>
                  Notifications
                </Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>
                  Alerts and Badges
                </Text>
              </View>
            </View>

            <ChevronRight size={20} color={iconColor} />
          </TouchableOpacity>
        </View>

        {/* ── DATA MANAGEMENT ── */}
        <View style={styles.dataSection}>
          <Text style={[styles.dataCaption, { color: textMuted }]}>
            Request a full copy of your data or permanently deactivate your
            account.
          </Text>

          <View style={styles.dataActions}>
            <Button
              variant="outline"
              icon={Download}
              onPress={() => {}}
              style={{ flex: 1 }}
            >
              Export Data
            </Button>

            <Button
              variant="destructive"
              icon={X}
              onPress={() => {}}
              style={{ flex: 1 }}
            >
              Deactivate
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ────────────────── STYLES ────────────────── */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 28,
  },

  preferencesCard: {
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  cardTextWrap: {
    flex: 1,
  },

  locationPreferences: {
    marginTop: 18,
    flexDirection: "column",
    gap: 12,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  cardSubtitle: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 18,
  },

  toggleCard: {
    flexDirection: "column",
    borderWidth: 1,
    gap: 8,
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  toggleRow: {
    flexDirection: "column",
    gap: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },

  toggleTextWrap: {
    flex: 1,
    marginRight: 8,
  },

  permissionsCard: {
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },

  dataSection: {
    marginTop: 32,
    alignItems: "center",
  },

  dataCaption: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
  },

  dataActions: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
});
