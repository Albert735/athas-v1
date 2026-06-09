import { StyleSheet, View } from "react-native";

import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Lock, SendHorizontal } from "lucide-react-native";

export function ResetPasswordForm() {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>NEW PASSWORD</Text>

        <Input placeholder="••••••••" icon={Lock} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CONFIRM PASSWORD</Text>

        <Input placeholder="••••••••" icon={Lock} />
      </View>

      <Button variant="default" icon={SendHorizontal}>
        Reset Password
      </Button>
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
});
