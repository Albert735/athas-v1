import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColor } from "@/hooks/useColor";

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
  const textColor = useColor("text");
  const cardColor = useColor("card");

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={24} color="white" />
      </View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
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
  },
});
