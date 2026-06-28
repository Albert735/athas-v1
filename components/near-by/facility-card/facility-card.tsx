import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type FacilityCardProps = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color?: string;
};

export function FacilityCard({
  label,
  icon,
  color = "#000",
}: FacilityCardProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={24} color="white" />
      </View>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#F3F3F7",
    width: 100,
    height: 100,
    borderRadius: 16,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111",
  },
});
