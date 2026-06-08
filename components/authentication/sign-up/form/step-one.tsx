import { View, StyleSheet } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

type Props = {
  data: any;
  setData: any;
  onNext: () => void;
};

export function StepOne({ data, setData, onNext }: Props) {
  return (
    <View style={styles.container}>
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

      <Button style={styles.button} onPress={onNext}>
        Next →
      </Button>
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
    marginBottom: 24,
  },
});
