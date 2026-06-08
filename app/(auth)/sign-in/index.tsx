import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GraduationCap } from "lucide-react-native";
import { router, type Href } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInForm } from "@/components/authentication/sign-in/form";

export default function LogInScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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

        {/* Hero Section */}
        <View style={styles.hero}>
          <GraduationCap size={64} />

          <Text variant="subtitle" style={{ fontSize: 24, fontWeight: "600" }}>
            Athas
          </Text>

          <Text
            variant="caption"
            style={{
              opacity: 0.7,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Navigating your academic journey
          </Text>

          <Button
            icon={GraduationCap}
            variant="default"
            size="lg"
            style={{ marginTop: 8, height: 50, width: 320 }}
          >
            Log in with University ID
          </Button>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text variant="caption">OR USE CREDENTIALS</Text>
          <View style={styles.line} />
        </View>

        {/* Inputs */}
        <SignInForm />

        {/* Footer */}
        <View style={styles.footer}>
          <Text variant="caption">
            Don't have an account?{" "}
            <Text
              variant="caption"
              onPress={() => router.push("/(auth)/sign-up")}
              style={styles.signupText}
            >
              Sign Up
            </Text>
          </Text>
        </View>
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
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  hero: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 40,
    gap: 16,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  inputs: {
    paddingHorizontal: 20,
    gap: 16,
  },

  inputContainer: {
    gap: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },

  forgotContainer: {
    alignItems: "flex-end",
  },

  footer: {
    marginTop: 32,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  signupText: {
    fontWeight: "600",
  },
});
