import { View, StyleSheet } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";

/** Props received from the parent SignUpForm orchestrator */
type Props = {
  data: any; // Current form data object
  setData: any; // State updater for the shared form data
  onBack: () => void; // Callback to return to step 1
};

/**
 * StepTwo — Second (final) step of the sign-up flow.
 *
 * Collects the user's password and a confirmation entry.
 * Both inputs use `secureTextEntry` to mask characters.
 *
 * TODO: Add password validation (min length, matching check)
 * before allowing the "Create Account" submission.
 */
export function StepTwo({ data, setData, onBack }: Props) {
  return (
    <View style={styles.container}>
      {/* Password field */}
      <View style={styles.field}>
        <Text style={styles.label}>PASSWORD</Text>

        <Input
          placeholder="Password"
          secureTextEntry
          value={data.password}
          onChangeText={(text) =>
            setData((prev: any) => ({
              ...prev,
              password: text,
            }))
          }
        />
      </View>

      {/* Password confirmation field */}
      <View style={styles.field}>
        <Text style={styles.label}>CONFIRM PASSWORD</Text>

        <Input
          placeholder="Confirm Password"
          secureTextEntry
          value={data.confirmPassword}
          onChangeText={(text) =>
            setData((prev: any) => ({
              ...prev,
              confirmPassword: text,
            }))
          }
        />
      </View>

      {/* Submit button — triggers account creation */}
      <Button
        style={styles.button}
        onPress={() => {
          router.push("/profile-setup");
        }}
      >
        Create Account
      </Button>
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

  /** "Create Account" button — extra bottom margin for scroll padding */
  button: {
    height: 50,
    marginTop: 12,
    marginBottom: 32,
  },
});
