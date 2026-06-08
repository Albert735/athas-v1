import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SignUpForm } from "@/components/authentication/sign-up/form";
import { GraduationCap } from "lucide-react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useState } from "react";

const SPACING = 30;

export default function SignUpScreen() {
  const [step, setStep] = useState(1);
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Octicons name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
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
            </View>

            {/* Divider */}
            {/* <View style={styles.divider}>
              <View style={styles.line} />

              <Text style={styles.dividerText}>OR CONTINUE WITH EMAIL</Text>

              <View style={styles.line} />
            </View> */}

            {/* Form */}
            <View style={styles.formCard}>
              <SignUpForm step={step} setStep={setStep} />
            </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  content: {
    width: "100%",
    paddingHorizontal: SPACING,
    gap: 32,
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

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    gap: 50,
  },

  backButton: {
    padding: 4,
  },
});
