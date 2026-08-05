import { View, Text, StyleSheet } from "react-native";
import { Star } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";

interface Props {
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
}

export function BuildingNameBlock({
  name,
  rating,
  reviewCount,
  distance,
}: Props) {
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");

  return (
    <View style={styles.nameBlock}>
      <Text style={[styles.placeName, { color: textColor }]}>{name}</Text>
      <View style={styles.ratingRow}>
        <Star size={14} color="#F59E0B" fill="#F59E0B" />
        <Text style={[styles.ratingText, { color: mutedColor }]}>
          {rating} · {reviewCount} reviews · {distance}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameBlock: { gap: 4 },
  placeName: { fontSize: 24, fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  ratingText: { fontSize: 13 },
});
