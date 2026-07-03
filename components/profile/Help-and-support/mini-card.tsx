import { LucideIcon, Navigation } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { Pressable, StyleSheet, View } from "react-native";
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
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    borderRadius: 18,
    padding: 10,
    marginTop: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 14,
  },

  iconContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F3F8FF",
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
    gap: 4,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },

  description: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },

  actionButton: {
    width: 34,
    height: 34,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
