import { View, Text, StyleSheet } from "react-native";
import { Star } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Props {
  reviews: Review[];
}

export function BuildingReviewsTab({ reviews }: Props) {
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");

  return (
    <View style={{ gap: 12 }}>
      {reviews.map((review) => (
        <View
          key={review.id}
          style={[styles.reviewCard, { backgroundColor: cardColor }]}
        >
          <View style={styles.reviewHeader}>
            <Text style={[styles.reviewName, { color: textColor }]}>
              {review.name}
            </Text>
            <Text style={[styles.reviewDate, { color: mutedColor }]}>
              {review.date}
            </Text>
          </View>
          <View style={styles.reviewStars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                color="#F59E0B"
                fill={i < review.rating ? "#F59E0B" : "transparent"}
              />
            ))}
          </View>
          <Text style={[styles.reviewComment, { color: mutedColor }]}>
            {review.comment}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  reviewCard: { padding: 16, borderRadius: 16, gap: 6 },
  reviewHeader: { flexDirection: "row", justifyContent: "space-between" },
  reviewName: { fontSize: 14, fontWeight: "600" },
  reviewDate: { fontSize: 12 },
  reviewStars: { flexDirection: "row", gap: 2 },
  reviewComment: { fontSize: 13, lineHeight: 19 },
});
