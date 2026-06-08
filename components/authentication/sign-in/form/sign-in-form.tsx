import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StyleSheet, View } from "react-native";

export function SignInForm() {
  return (
    <View style={styles.container}>
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Button style={styles.button} variant="default">
        Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: 320,
    alignSelf: "center",
  },
  button: {
    height: 50,
  },
});
