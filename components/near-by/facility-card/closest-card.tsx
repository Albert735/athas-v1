import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MapPin, Navigation } from "lucide-react-native";

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
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <MaterialIcons name={icon} size={24} color="#fff" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.place}>{place}</Text>

          <View style={styles.locationRow}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.located} numberOfLines={1}>
              {located}
            </Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.navigationButton} onPress={onPress}>
        <Navigation size={18} color="#2563EB" />
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
    backgroundColor: "#F3F3F7",
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
    borderRadius: 24,
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
    color: "#111827",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  located: {
    marginLeft: 4,
    fontSize: 13,
    color: "#6B7280",
    flexShrink: 1,
  },

  navigationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8F1FF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
});
