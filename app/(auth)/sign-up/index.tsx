import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SignUpForm } from "@/components/authentication/sign-up/form";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useState } from "react";

/** Consistent horizontal padding used across all sections */
const SPACING = 30;

/**
 * SignUpScreen — Multi-step registration screen for the Athas app.
 *
 * Layout (top → bottom):
 *   1. Header  — Back arrow + "Guest" button
 *   2. Hero    — App logo, title, and tagline
 *   3. Form    — Two-step sign-up form via <SignUpForm />
 *
 * Step state is managed here (not inside SignUpForm) so the
 * back button can distinguish between "go to previous step"
 * and "leave the sign-up screen entirely."
 */
export default function SignUpScreen() {
  // Current form step (1 = personal info, 2 = password)
  const [step, setStep] = useState(1);

  /**
   * Smart back navigation:
   *   Step 2 → returns to step 1
   *   Step 1 → navigates back to the sign-in screen
   */
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Shifts content up when the keyboard opens on iOS */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── Header ─────────────────────────────────── */}
          {/* Back arrow (left) and Guest button (right) */}
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

          {/* ── Main Content ───────────────────────────── */}
          <View style={styles.content}>
            {/* Hero section — branding (logo, title, tagline) */}
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

            {/* Divider — currently disabled; uncomment to re-enable */}
            {/* <View style={styles.divider}>
              <View style={styles.line} />

              <Text style={styles.dividerText}>OR CONTINUE WITH EMAIL</Text>

              <View style={styles.line} />
            </View> */}

            {/* ── Registration Form ────────────────────── */}
            {/* Multi-step form: step state is passed down so the
                form can switch between StepOne and StepTwo */}
            <View style={styles.formCard}>
              <SignUpForm step={step} setStep={setStep} />
            </View>
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

  /** Top bar — back arrow on the left, guest button on the right */
  header: {
    width: "100%",
    paddingHorizontal: SPACING,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  /** Wrapper for hero + form — applies horizontal padding */
  content: {
    width: "100%",
    paddingHorizontal: SPACING,
    gap: 32,
  },

  /** Hero — centred branding stack */
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

  /** Tagline — slightly faded, capped width for readability */
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
    maxWidth: 260,
  },

  /** University ID login button (currently unused on this screen) */
  universityButton: {
    height: 50,
  },

  /** "OR CONTINUE WITH EMAIL" divider row (currently commented out in JSX) */
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

  /** Form container */
  formCard: {
    width: "100%",
  },

  /** Footer — sign-in redirect, badges, legal (reserved for future use) */
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: SPACING,
    gap: 16,
    paddingBottom: 20,
  },

  /** Bold, underlined text for tappable links */
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

  /** ScrollView inner content — grows to fill, with bottom padding and gap between header and content */
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    gap: 50,
  },

  /** Back arrow touch target — small padding for easier tapping */
  backButton: {
    padding: 4,
  },
});
