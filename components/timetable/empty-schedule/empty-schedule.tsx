import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react-native";

type Props = {
  onAddClass: () => void;
};

export function EmptySchedule({ onAddClass }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Classes Yet</Text>

      <Text style={styles.subtitle}>You do not have any schedule yet </Text>

      <Button style={styles.btn} icon={Plus} onPress={onAddClass}>
        Add Class
      </Button>
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
