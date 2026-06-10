import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ForgottenPasswordForm } from "@/components/authentication/forgotten-password/form/forgotten-password-form";

import { ShieldCheck } from "lucide-react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

const SPACING = 30;

export default function ForgottenPasswordScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View>
          {/* ── Header ─────────────────────────────────── */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Octicons name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Forgotten Access?</Text>

              <Text style={styles.subtitle}>
                Enter your institutional email address and we'll send a secure
                link to reset your credentials.
              </Text>
            </View>

            <ForgottenPasswordForm />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <ShieldCheck strokeWidth={1} size={12} />
          <Text style={styles.footer}>SSO PROTECTED</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    width: "100%",
    paddingHorizontal: SPACING,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    padding: 4,
  },

  content: {
    paddingHorizontal: SPACING,
    gap: 32,
    marginTop: "10%",
  },

  titleSection: {
    gap: 12,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    opacity: 0.7,
    maxWidth: 320,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: "5%",
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },

  footerContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginBottom: "5%",
  },

  footer: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    opacity: 0.5,
    marginBottom: "5%",
  },
});
