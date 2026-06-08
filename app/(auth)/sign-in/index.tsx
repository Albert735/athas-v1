import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { SignInForm } from "@/components/authentication/sign-in/form";

import { GraduationCap, ShieldCheck, BadgeInfo } from "lucide-react-native";

import { router } from "expo-router";
import React from "react";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

/** Consistent horizontal padding used across all sections */
const SPACING = 30;

/**
 * LogInScreen — Main sign-in screen for the Athas app.
 *
 * Layout (top → bottom):
 *   1. Header — "Guest" button aligned right
 *   2. Hero   — App logo, title, tagline, and University ID login button
 *   3. Divider — "OR CONTINUE WITH EMAIL" separator
 *   4. Form   — Email + password fields via <SignInForm />
 *   5. Footer — Sign-up link, trust badges, and legal text
 *
 * The ScrollView uses `justifyContent: "space-between"` so the
 * footer is pushed to the bottom on taller screens.
 */
export default function LogInScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Shifts content up when the keyboard opens on iOS */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header ─────────────────────────────────── */}
          {/* Guest mode entry point — aligned to the right */}
          <View style={styles.header}>
            <Button
              variant="outline"
              size="sm"
              onPress={() => router.push("/guest")}
            >
              Guest
            </Button>
          </View>

          {/* ── Main Content ───────────────────────────── */}
          <View style={styles.content}>
            {/* Hero section — branding & primary CTA */}
            <View style={styles.hero}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.logo}
              />

              <Text style={styles.title}>Athas</Text>

              <Text style={styles.subtitle}>
                Navigating your academic journey
              </Text>

              {/* Primary login option — SSO via University ID */}
              <View style={{ width: "100%" }}>
                <Button
                  icon={GraduationCap}
                  variant="default"
                  size="lg"
                  style={styles.universityButton}
                >
                  Log in with University ID
                </Button>
              </View>
            </View>

            {/* ── Divider ──────────────────────────────── */}
            {/* Horizontal rule with centred label */}
            <View style={styles.divider}>
              <View style={styles.line} />

              <Text style={styles.dividerText}>OR CONTINUE WITH EMAIL</Text>

              <View style={styles.line} />
            </View>

            {/* ── Email / Password Form ────────────────── */}
            <View style={styles.formCard}>
              <SignInForm />
            </View>
          </View>

          {/* ── Footer ─────────────────────────────────── */}
          {/* Sign-up redirect, trust badges, and legal links */}
          <View style={styles.footer}>
            {/* Sign-up prompt */}
            <Text variant="caption" style={{ fontSize: 12 }}>
              Don't have an account?{" "}
              <Text
                variant="caption"
                style={styles.signupText}
                onPress={() => router.push("/(auth)/sign-up")}
              >
                Sign Up
              </Text>
            </Text>

            {/* Trust / info badges */}
            <View style={styles.badgesContainer}>
              <Badge variant="outline">
                <View style={styles.badgeContent}>
                  <ShieldCheck size={14} />
                  <Text variant="caption" style={{ fontSize: 12 }}>
                    Encrypted Sessions
                  </Text>
                </View>
              </Badge>

              <Badge variant="outline">
                <View style={styles.badgeContent}>
                  <BadgeInfo size={14} />
                  <Text variant="caption" style={{ fontSize: 12 }}>
                    v0.01
                  </Text>
                </View>
              </Badge>
            </View>

            {/* Legal — Terms of Service & Privacy Policy */}
            <Text variant="caption" style={styles.termsText}>
              By logging in, you agree to the Athas{" "}
              <Text style={styles.signupText}>Terms of Service</Text> and{" "}
              <Text style={styles.signupText}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ─── Styles ─────────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  /** Root container — fills the safe area */
  container: {
    flex: 1,
  },

  /** Top bar — "Guest" button pushed to the right */
  header: {
    width: "100%",
    paddingHorizontal: SPACING,
    paddingTop: 10,
    alignItems: "flex-end",
  },

  /** Wrapper for hero + divider + form — applies horizontal padding */
  content: {
    width: "100%",
    paddingHorizontal: SPACING,
  },

  /** Hero — centred branding stack with logo, title, tagline */
  hero: {
    alignItems: "center",
    gap: 14,
  },

  /** App icon */
  logo: {
    width: 50,
    height: 50,
  },

  /** App name heading */
  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  /** Tagline text — slightly faded, capped width for readability */
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
    maxWidth: 260,
  },

  /** "Log in with University ID" button */
  universityButton: {
    height: 50,
  },

  /** "OR CONTINUE WITH EMAIL" divider row */
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 28,
  },

  /** Divider label */
  dividerText: {
    marginHorizontal: 12,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.6,
  },

  /** Horizontal hairline on either side of the divider text */
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },

  /** Email/password form wrapper */
  formCard: {
    width: "100%",
  },

  /** Footer — sign-up link, badges, and legal copy */
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: SPACING,
    gap: 16,
    paddingBottom: 20,
  },

  /** Bold, underlined text used for tappable links (Sign Up, ToS, etc.) */
  signupText: {
    fontWeight: "700",
    textDecorationLine: "underline",
    fontSize: 12,
  },

  /** Row of trust/info badges — wraps on narrow screens */
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  /** Icon + label row inside each badge */
  badgeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  /** Fine-print legal text */
  termsText: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
    fontSize: 12,
  },
});
