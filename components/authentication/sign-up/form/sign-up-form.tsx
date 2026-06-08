import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";

export function SignUpForm() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        {/* header  */}
        <View>
          <Text>FULLNAME </Text>
          <Input placeholder="Enter your full name" />
        </View>

        <View>
          <Text>INSTITUTIONAL EMAIL</Text>
          <Input placeholder="student@university.edu" />
        </View>

        <View>
          <Text>UNIVERSITY ID</Text>
          <Input placeholder="11119086" />
        </View>
      </View>

      {/* form footer  */}
      <View style={styles.footer}>
        <Button variant="default" size="lg" style={{ width: "100%" }}>
          Continue
        </Button>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.footerLink}
            onPress={() => router.push("/sign-in")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F9FAFB",
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 28,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
  },
  fields: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    letterSpacing: 0.1,
  },
  input: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111827",
  },
  button: {
    height: 54,
    backgroundColor: "#111827",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#6B7280",
  },
  footerLink: {
    color: "#111827",
    fontWeight: "600",
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 16,
  },
});
