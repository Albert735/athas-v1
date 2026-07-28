import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MapPin, Navigation } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";

type ClosestCardProps = {
  place: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  located: string;
  color?: string;
  onPress?: () => void;
};

export function ClosestCard({
  place,
  icon,
  located,
  color = "#000",
  onPress,
}: ClosestCardProps) {
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const cardColor = useColor("card");
  const iconColor = useColor("icon");

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <MaterialIcons name={icon} size={24} color="#000" />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.place, { color: textColor }]}>{place}</Text>
          <View style={styles.locationRow}>
            <MapPin size={14} color={mutedColor} />
            <Text
              style={[styles.located, { color: mutedColor }]}
              numberOfLines={1}
            >
              {located}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        style={[styles.navigationButton, { backgroundColor: cardColor }]}
        onPress={onPress}
      >
        <Navigation size={18} color={iconColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 18,
    padding: 10,
    marginRight: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
    gap: 6,
  },
  place: {
    fontSize: 16,
    fontWeight: "600",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  located: {
    marginLeft: 4,
    fontSize: 13,
    flexShrink: 1,
  },
  navigationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
});
