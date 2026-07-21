import { LucideIcon, Navigation } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

export function MiniCard({
  icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  const iconColor = useColor("icon");
  const primary = useColor("primary");

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log("pressed")}
      activeOpacity={0.5}
    >
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={22} color={primary} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>

      <View style={styles.actionButton}>
        <Navigation size={18} color={primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  left: {
    flexDirection: "row",
    gap: 16,
  },

  iconContainer: {
    // backgroundColor: "green",
  },

  textContainer: {
    gap: 2,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  description: {
    fontSize: 12,
    color: "#6B7280",
  },

  actionButton: {},
});
