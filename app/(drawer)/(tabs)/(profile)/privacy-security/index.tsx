import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

export default function PrivacySecurity() {
  const [isLiveTrackingEnabled, setIsLiveTrackingEnabled] = useState(false);
  const [isRouteHistoryEnabled, setIsRouteHistoryEnabled] = useState(false);

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const iconColor = useColor("icon");
  const successColor = useColor("green");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Privacy & Security" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* INTRO */}
        <Text style={[styles.description, { color: textMuted }]}>
          Control your digital presence and safeguard your campus experience.
        </Text>

        {/* ── ACCOUNT SECURITY ── */}
        <View style={[styles.preferencesCard, { backgroundColor: cardColor, borderColor }]}>
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.cardLeft}>
              <View style={[styles.iconCircle, { backgroundColor: "rgba(0, 153, 255, 0.1)" }]}>
                <Lock size={20} color={primaryColor} />
              </View>

              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>Password & Security</Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>
                  Last updated 3 months ago
                </Text>
              </View>
            </View>

            <ChevronRight size={20} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.cardLeft}>
              <View style={[styles.iconCircle, { backgroundColor: "rgba(16, 185, 129, 0.1)" }]}>
                <ShieldCheck size={20} color={successColor} />
              </View>

              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>Two-Factor Authentication</Text>
                <Text style={[styles.cardSubtitle, { color: successColor }]}>
                  Currently Enabled
                </Text>
              </View>
            </View>

            <ChevronRight size={20} color={iconColor} />
          </TouchableOpacity>
        </View>

        {/* ── LOCATION PRIVACY ── */}

        <View style={styles.locationPreferences}>
          <View style={[styles.toggleCard, { backgroundColor: cardColor, borderColor }]}>
            <View style={styles.toggleRow}>
              <View style={styles.row}>
                <MapPin size={20} color={primaryColor} />
                <Switch
                  value={isLiveTrackingEnabled}
                  onValueChange={setIsLiveTrackingEnabled}
                />
              </View>

              <View style={styles.toggleTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>Live Campus Tracking</Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>
                  Share your location in real-time with authorized campus
                  security and friends
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.toggleCard, { backgroundColor: cardColor, borderColor }]}>
            <View style={styles.toggleRow}>
              <View style={styles.row}>
                <History size={20} color={useColor("orange") || "#EA580C"} />
                <Switch
                  value={isRouteHistoryEnabled}
                  onValueChange={setIsRouteHistoryEnabled}
                />
              </View>

              <View style={styles.toggleTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>Route History Storage</Text>
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

        <View style={[styles.permissionsCard, { backgroundColor: cardColor, borderColor }]}>
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.cardLeft}>
              <View style={[styles.iconCircle, { backgroundColor: "rgba(0, 153, 255, 0.1)" }]}>
                <LocateFixed size={20} color={primaryColor} />
              </View>

              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>Location</Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>Always allowed</Text>
              </View>
            </View>

            <ChevronRight size={20} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.cardLeft}>
              <View style={[styles.iconCircle, { backgroundColor: "rgba(0, 153, 255, 0.1)" }]}>
                <Bell size={20} color={primaryColor} />
              </View>

              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: textColor }]}>Notifications</Text>
                <Text style={[styles.cardSubtitle, { color: textMuted }]}>Alerts and Badges</Text>
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
