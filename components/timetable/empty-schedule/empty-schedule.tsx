import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react-native";

export function EmptySchedule() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Classes Yet</Text>

      <Text style={styles.subtitle}>You do not have any schedule yet </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
  },
  btn: {
    marginTop: 20,
    width: 350,
  },
});
