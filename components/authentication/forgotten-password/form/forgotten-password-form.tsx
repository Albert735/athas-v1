import { View, StyleSheet } from "react-native";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react-native";
import { router } from "expo-router";

export function ForgottenPasswordForm() {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>INSTITUTIONAL EMAIL</Text>

        <Input
          placeholder="student@ug.edu.gh"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button
          variant="default"
          icon={SendHorizontal}
          onPress={() => {
            router.push("/otp");
          }}
        >
          Send Reset Link
        </Button>
      </View>

      {/* <Text style={styles.helperText}>
        We'll send a password reset link to this email address.
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  field: {
    gap: 24,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  helperText: {
    fontSize: 12,
    opacity: 0.6,
    lineHeight: 18,
  },
});
