import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { OTPForm } from "@/components/authentication/OTP/form/OTP-form";

export default function OTPScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Verify Your Identity</Text>

              <Text style={styles.subtitle}>
                We've sent a 6-digit verification code to your registered
                academic email
              </Text>
            </View>

            <OTPForm />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <ShieldCheck strokeWidth={1} size={12} />
          <Text style={styles.footer}>
            SECURED BY ATHAS IDENTITY {`\n`} MANAGEMENT
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
