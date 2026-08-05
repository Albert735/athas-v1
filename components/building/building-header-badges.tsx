import { View, Pressable, StyleSheet } from "react-native";
import { Heart, Share2 } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";

interface Props {
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

export function BuildingHeaderBadges({
  isFavorited,
  onToggleFavorite,
  onShare,
}: Props) {
  const cardColor = useColor("card");
  const iconColor = useColor("icon");

  return (
    <View style={styles.badgeRowActions}>
      <Pressable
        onPress={onToggleFavorite}
        hitSlop={8}
        style={({ pressed }) => [
          styles.actionButton,
          { backgroundColor: cardColor },
          pressed && styles.actionButtonPressed,
        ]}
      >
        <Heart
          size={20}
          color={isFavorited ? "#E23744" : iconColor}
          fill={isFavorited ? "#E23744" : "transparent"}
        />
      </Pressable>
      <Pressable
        onPress={onShare}
        hitSlop={8}
        style={({ pressed }) => [
          styles.actionButton,
          { backgroundColor: cardColor },
          pressed && styles.actionButtonPressed,
        ]}
      >
        <Share2 size={20} color={iconColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeRowActions: { flexDirection: "row", gap: 8 },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonPressed: { opacity: 0.6 },
});
