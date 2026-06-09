import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ForgottenPasswordForm } from "@/components/authentication/forgotten-password/form/forgotten-password-form";

import { SendHorizontal } from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

const SPACING = 30;

export default function ForgottenPasswordScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Forgotten Access?</Text>

            <Text style={styles.subtitle}>
              Enter your institutional email address and we'll send a secure
              link to reset your credentials.
            </Text>
          </View>

          <ForgottenPasswordForm />
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
    justifyContent: "flex-start",
  },

  content: {
    paddingHorizontal: SPACING,
    gap: 32,
  },

  header: {
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
});
