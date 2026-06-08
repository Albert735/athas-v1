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

const SPACING = 30;

export default function LogInScreen() {
  return (
    <SafeAreaView style={styles.container}>
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
          {/* Header */}
          <View style={styles.header}>
            <Button
              variant="outline"
              size="sm"
              onPress={() => router.push("/guest")}
            >
              Guest
            </Button>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Hero */}
            <View style={styles.hero}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.logo}
              />

              <Text style={styles.title}>Athas</Text>

              <Text style={styles.subtitle}>
                Navigating your academic journey
              </Text>

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

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />

              <Text style={styles.dividerText}>OR CONTINUE WITH EMAIL</Text>

              <View style={styles.line} />
            </View>

            {/* Form */}
            <View style={styles.formCard}>
              <SignInForm />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: "100%",
    paddingHorizontal: SPACING,
    paddingTop: 10,
    alignItems: "flex-end",
  },

  content: {
    width: "100%",
    paddingHorizontal: SPACING,
  },

  hero: {
    alignItems: "center",
    gap: 14,
  },

  logo: {
    width: 50,
    height: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
    maxWidth: 260,
  },

  universityButton: {
    height: 50,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 28,
  },

  dividerText: {
    marginHorizontal: 12,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.6,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },

  formCard: {
    width: "100%",
  },

  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: SPACING,
    gap: 16,
    paddingBottom: 20,
  },

  signupText: {
    fontWeight: "700",
    textDecorationLine: "underline",
    fontSize: 12,
  },

  badgesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  badgeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  termsText: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
    fontSize: 12,
  },
});
