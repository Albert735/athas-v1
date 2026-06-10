/**
 * Reset Password Screen
 * Allows the user to set a new password after OTP verification.
 * Contains the new-password form with validation requirement badges.
 */
import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/text";
import { ShieldCheck } from "lucide-react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { ResetPasswordForm } from "@/components/authentication/reset-password/form";

export default function ResetPasswordScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* KeyboardAvoidingView pushes content up when the keyboard opens */}
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View>
          {/* App logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          {/* Header text + reset password form */}
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Reset Password</Text>

              <Text style={styles.subtitle}>
                Enter your new credentials below to regain access.
              </Text>
            </View>

            {/* New password + confirm password fields with requirement badges */}
            <ResetPasswordForm />
          </View>
        </View>

        {/* Security trust badge pinned to bottom */}
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
  content: {
    paddingHorizontal: 30,
    gap: 32,
    marginTop: "10%",
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
