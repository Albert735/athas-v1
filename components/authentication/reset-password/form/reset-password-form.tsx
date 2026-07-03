/**
 * Reset Password Form Component
 * Renders new-password and confirm-password fields, password requirement
 * badges, an update button, and a support link.
 * On submit, navigates back to the sign-in screen.
 */
import { StyleSheet, View, FlatList } from "react-native";

import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Badge } from "@/components/ui/badge";

/** Shape of each password validation rule displayed as a badge */
interface PasswordRequirement {
  label: string;
}

/** List of password rules shown below the new-password input */
const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { label: "8+ Characters" },
  { label: "Capital Letter" },
  { label: "Number" },
  { label: "One Symbol" },
];

export function ResetPasswordForm() {
  return (
    <View style={styles.container}>
      {/* New password input */}
      <View style={styles.field}>
        <Text style={styles.label}>NEW PASSWORD</Text>
        <Input placeholder="••••••••" />
      </View>

      {/* Password requirement badges — rendered from the typed array */}
      <FlatList
        horizontal
        data={PASSWORD_REQUIREMENTS}
        keyExtractor={(item) => item.label}
        scrollEnabled={false}
        contentContainerStyle={styles.passwordRequirements}
        renderItem={({ item: req }) => (
          <Badge
            variant="outline"
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            textStyle={{ fontSize: 12 }}
          >
            {req.label}
          </Badge>
        )}
      />

      {/* Confirm password input */}
      <View style={styles.field}>
        <Text style={styles.label}>CONFIRM PASSWORD</Text>
        <Input placeholder="••••••••" />
      </View>

      {/* Submit button — navigates to sign-in on success */}
      <Button
        variant="default"
        onPress={() => {
          router.push("/sign-in");
        }}
      >
        Update Password
      </Button>

      {/* Support link for users having trouble */}
      <Text style={styles.footerText}>
        Having trouble?{" "}
        <Text style={styles.footerLinkText}>Contact Support</Text>
      </Text>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 24,
  },

  field: {
    gap: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  passwordRequirements: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  footerText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#333",
  },
  footerLinkText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#333",
    textDecorationLine: "underline",
  },
});
