import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";

/**
 * SignInForm — Email/password login form.
 *
 * Renders two input fields (email + password) with uppercase
 * labels and a "Forgot Password?" link beside the password label.
 * The form submits via a full-width "Sign In" button.
 */
export function SignInForm() {
  return (
    <View style={styles.container}>
      {/* Input fields group */}
      <View style={{ gap: 16 }}>
        {/* Email field */}
        <View style={{ gap: 8 }}>
          <Text variant="caption" style={{ fontSize: 12, letterSpacing: 0.5 }}>
            INSTITUTIONAL EMAIL
          </Text>
          <Input placeholder="Email" />
        </View>

        {/* Password field with "Forgot Password?" link */}
        <View style={{ gap: 8 }}>
          {/* Label row — password label on the left, reset link on the right */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="caption"
              style={{ fontSize: 12, letterSpacing: 0.5 }}
            >
              PASSWORD
            </Text>
            <Text
              variant="caption"
              style={{ fontSize: 12, textDecorationLine: "underline" }}
            >
              Forgot Password?
            </Text>
          </View>
          <Input placeholder="Password" secureTextEntry />
        </View>
      </View>

      {/* Submit button */}
      <Button style={styles.button} variant="default">
        Sign In
      </Button>
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────── */

const styles = StyleSheet.create({
  /** Outer wrapper — 28px gap separates the fields group from the button */
  container: {
    gap: 28,
    alignSelf: "center",
    width: "100%",
  },

  /** Sign-in button — taller than the default for emphasis */
  button: {
    height: 50,
  },
});
