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

export default function PrivacySecurity() {
  const [isLiveTrackingEnabled, setIsLiveTrackingEnabled] = useState(false);
  const [isRouteHistoryEnabled, setIsRouteHistoryEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Privacy & Security" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* INTRO */}
        <Text style={styles.description}>
          Control your digital presence and safeguard your campus experience.
        </Text>

        {/* ── ACCOUNT SECURITY ── */}
        <Text style={styles.sectionTitle}>Account Security</Text>

        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          <View style={styles.cardLeft}>
            <View style={[styles.iconCircle, { backgroundColor: "#EFF6FF" }]}>
              <Lock size={20} color="#2563EB" />
            </View>

            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Password & Security</Text>
              <Text style={styles.cardSubtitle}>Last updated 3 months ago</Text>
            </View>
          </View>

          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          <View style={styles.cardLeft}>
            <View style={[styles.iconCircle, { backgroundColor: "#F0FDF4" }]}>
              <ShieldCheck size={20} color="#16A34A" />
            </View>

            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Two-Factor Authentication</Text>
              <Text style={[styles.cardSubtitle, { color: "#16A34A" }]}>
                Currently Enabled
              </Text>
            </View>
          </View>

          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* ── LOCATION PRIVACY ── */}
        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>
          Location Privacy
        </Text>

        <View style={styles.toggleCard}>
          <View style={styles.toggleRow}>
            <View style={styles.row}>
              <MapPin size={20} color="#2563EB" />{" "}
              <Switch
                value={isLiveTrackingEnabled}
                onValueChange={setIsLiveTrackingEnabled}
              />
            </View>

            <View style={styles.toggleTextWrap}>
              <Text style={styles.cardTitle}>Live Campus Tracking</Text>
              <Text style={styles.cardSubtitle}>
                Share your location in real-time with authorized campus security
                and friends
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.toggleCard}>
          <View style={styles.toggleRow}>
            <View style={styles.row}>
              <History size={20} color="#EA580C" />
              <Switch
                value={isRouteHistoryEnabled}
                onValueChange={setIsRouteHistoryEnabled}
              />
            </View>

            <View style={styles.toggleTextWrap}>
              <Text style={styles.cardTitle}>Route History Storage</Text>
              <Text style={styles.cardSubtitle}>
                Save your frequent routes to optimize future pathfinding
                suggestions
              </Text>
            </View>
          </View>
        </View>

        <Button
          variant="default"
          size="sm"
          icon={Trash}
          onPress={() => {}}
          style={{ alignSelf: "flex-start", width: "100%" }}
        >
          Clear Route History
        </Button>

        {/* ── APP PERMISSIONS ── */}
        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>
          App Permissions
        </Text>

        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          <View style={styles.cardLeft}>
            <View style={[styles.iconCircle, { backgroundColor: "#EFF6FF" }]}>
              <LocateFixed size={20} color="#2563EB" />
            </View>

            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Location</Text>
              <Text style={styles.cardSubtitle}>Always allowed</Text>
            </View>
          </View>

          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          <View style={styles.cardLeft}>
            <View style={[styles.iconCircle, { backgroundColor: "#EFF6FF" }]}>
              <Bell size={20} color="#2563EB" />
            </View>

            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Notifications</Text>
              <Text style={styles.cardSubtitle}>Alerts and Badges</Text>
            </View>
          </View>

          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* ── DATA MANAGEMENT ── */}
        <View style={styles.dataSection}>
          <Text style={styles.dataCaption}>
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
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 28,
  },

  /* Section headings */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },

  /* Tappable row cards (Account Security & Permissions) */
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
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

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    lineHeight: 18,
  },

  /* Toggle cards (Location Privacy) */
  toggleCard: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#F7F7F7",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
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

  /* Data Management footer */
  dataSection: {
    marginTop: 32,
    alignItems: "center",
  },

  dataCaption: {
    fontSize: 13,
    color: "#9CA3AF",
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
