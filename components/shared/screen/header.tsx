import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

type Props = {
  title: string;
  showBack?: boolean;
};

export function Header({ title, showBack = true }: Props) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable onPress={() => router.back()} style={styles.icon}>
          <ArrowLeft size={22} color="#111" />
        </Pressable>
      ) : (
        <View style={styles.icon} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightSpace} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    width: 40,
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  rightSpace: {
    width: 40,
  },
});
