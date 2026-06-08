import { View, StyleSheet } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

type Props = {
  data: any;
  setData: any;
  onBack: () => void;
};

export function StepTwo({ data, setData, onBack }: Props) {
  return (
    <View style={styles.container}>
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

      <Button style={styles.button}>Create Account</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  field: {
    gap: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  button: {
    height: 50,
    marginTop: 12,
    marginBottom: 32,
  },
});
