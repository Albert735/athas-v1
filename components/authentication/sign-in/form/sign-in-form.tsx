import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";

export function SignInForm() {
  return (
    <View style={styles.container}>
      <View style={{ gap: 16 }}>
        <View style={{ gap: 8 }}>
          <Text variant="caption" style={{ fontSize: 12, letterSpacing: 0.5 }}>
            INSTITUTIONAL EMAIL
          </Text>
          <Input placeholder="Email" />
        </View>

        <View style={{ gap: 8 }}>
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

      <Button style={styles.button} variant="default">
        Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 28,
    alignSelf: "center",
    width: "100%",
  },
  button: {
    height: 50,
  },
});
