import { StyleSheet, View } from "react-native";

import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Badge } from "@/components/ui/badge";

interface PasswordRequirement {
  label: string;
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { label: "8+ Characters" },
  { label: "Capital Letter" },
  { label: "Number" },
  { label: "One Symbol" },
];

export function ResetPasswordForm() {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>NEW PASSWORD</Text>

        <Input placeholder="••••••••" />
      </View>

      <View style={styles.passwordRequirements}>
        {PASSWORD_REQUIREMENTS.map((req) => (
          <Badge
            key={req.label}
            variant="outline"
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            textStyle={{ fontSize: 12 }}
          >
            {req.label}
          </Badge>
        ))}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CONFIRM PASSWORD</Text>

        <Input placeholder="••••••••" />
      </View>

      <Button
        variant="default"
        // icon={SendHorizontal}
        onPress={() => {
          router.push("/sign-in");
        }}
      >
        Update Password
      </Button>

      <Text style={styles.footerText}>
        Having trouble?{" "}
        <Text style={styles.footerLinkText}>Contact Support</Text>
      </Text>
    </View>
  );
}

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
