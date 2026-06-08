import { View, StyleSheet } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { GraduationCap, ShieldCheck, BadgeInfo } from "lucide-react-native";
import { router } from "expo-router";
import { Badge } from "@/components/ui/badge";

/** Props received from the parent SignUpForm orchestrator */
type Props = {
  data: any; // Current form data object
  setData: any; // State updater for the shared form data
  onNext: () => void; // Callback to advance to step 2
};

/**
 * StepOne — First step of the sign-up flow.
 *
 * Collects the user's personal and institutional details:
 *   - Full name
 *   - Institutional email (e.g. student@ug.edu.gh)
 *   - University student ID number
 *
 * Each field updates the shared formData via a functional
 * state update to avoid stale closures.
 */
export function StepOne({ data, setData, onNext }: Props) {
  return (
    <View style={styles.container}>
      {/* Full name field */}
      <View style={styles.field}>
        <Text style={styles.label}>FULL NAME</Text>

        <Input
          placeholder="Ama Ella"
          value={data.fullName}
          onChangeText={(text) =>
            setData((prev: any) => ({
              ...prev,
              fullName: text,
            }))
          }
        />
      </View>

      {/* Institutional email field */}
      <View style={styles.field}>
        <Text style={styles.label}>INSTITUTIONAL EMAIL</Text>

        <Input
          placeholder="student@ug.edu.gh"
          value={data.email}
          onChangeText={(text) =>
            setData((prev: any) => ({
              ...prev,
              email: text,
            }))
          }
        />
      </View>

      {/* University ID field */}
      <View style={styles.field}>
        <Text style={styles.label}>UNIVERSITY ID</Text>

        <Input
          placeholder="1119086"
          value={data.universityId}
          onChangeText={(text) =>
            setData((prev: any) => ({
              ...prev,
              universityId: text,
            }))
          }
        />
      </View>

      {/* Proceed to step 2 (password creation) */}
      <Button style={styles.button} onPress={onNext}>
        Next →
      </Button>

      {/* ── Footer ─────────────────────────────────── */}
      {/* Sign-up redirect, trust badges, and legal links */}
      <View style={styles.footer}>
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
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────── */

const styles = StyleSheet.create({
  /** Vertical stack with consistent spacing between fields */
  container: {
    gap: 20,
  },

  /** Individual field wrapper — label + input pair */
  field: {
    gap: 8,
  },

  /** Uppercase label styling for form field headers */
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  /** "Next" button — extra top margin separates it from the fields */
  button: {
    height: 50,
    marginTop: 12,
    marginBottom: 24,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    gap: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },
  /** Bold, underlined text used for tappable links (Sign Up, ToS, etc.) */
  signupText: {
    fontWeight: "700",
    textDecorationLine: "underline",
    fontSize: 12,
  },

  badgesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    flexWrap: "wrap",
  },
  badgeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  /** Fine-print legal text */
  termsText: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
    fontSize: 12,
  },
});
