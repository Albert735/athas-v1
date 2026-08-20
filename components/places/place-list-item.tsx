import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";
import { categoryImages } from "@/data/category-images";
import { Star, MapPin, Navigation } from "lucide-react-native";

export default function PlaceSheet() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const backgroundColor = useColor("background");
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const primaryColor = useColor("primary");

  const place = places.find((p) => p.id === id);

  if (!place) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={{ color: mutedColor, padding: 20 }}>Place not found.</Text>
      </View>
    );
  }

  const categoryLabel = place.category
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Title + category badge */}
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: textColor }]}>{place.name}</Text>
        <View style={[styles.badge, { backgroundColor }]}>
          <Text style={[styles.badgeText, { color: mutedColor }]}>
            {categoryLabel}
          </Text>
        </View>
      </View>

      {/* Rating */}
      <View style={styles.ratingRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />
        ))}
        <Text style={[styles.ratingText, { color: mutedColor }]}>
          4.8 rating
        </Text>
      </View>

      {/* Location */}
      <View style={styles.locationRow}>
        <MapPin size={14} color={mutedColor} />
        <Text style={[styles.locationText, { color: mutedColor }]}>
          {place.distance} away
        </Text>
      </View>

      {/* Image */}
      <Image
        source={categoryImages[place.category] ?? categoryImages.library}
        style={styles.image}
        contentFit="cover"
      />

      {/* Description */}
      <Text style={[styles.description, { color: textColor }]}>
        {place.description}
      </Text>

      {/* Stat pills */}
      <View style={styles.statsRow}>
        <View style={[styles.statPill, { backgroundColor: cardColor }]}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>Status</Text>
          <Text style={[styles.statValue, { color: textColor }]}>
            {place.isOpen ? "Open" : "Closed"}
          </Text>
        </View>
        <View style={[styles.statPill, { backgroundColor: cardColor }]}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>Hours</Text>
          <Text style={[styles.statValue, { color: textColor }]}>
            {place.hours}
          </Text>
        </View>
        <View style={[styles.statPill, { backgroundColor: cardColor }]}>
          <Text style={[styles.statLabel, { color: mutedColor }]}>Days</Text>
          <Text style={[styles.statValue, { color: textColor }]}>
            {place.days}
          </Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.aboutSection}>
        <Text style={[styles.aboutTitle, { color: textColor }]}>About</Text>
        <Text style={[styles.aboutText, { color: mutedColor }]}>
          {place.description} Check current hours before your visit as
          availability may vary.
        </Text>
      </View>

      {/* Get Directions */}
      <TouchableOpacity
        style={[styles.directionsButton, { backgroundColor: cardColor }]}
        activeOpacity={0.8}
        onPress={() => router.push(`/map?buildingId=${place.id}`)}
      >
        <Navigation size={16} color={primaryColor} />
        <Text style={[styles.directionsText, { color: primaryColor }]}>
          Get Directions
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40, gap: 4 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  title: { fontSize: 24, fontWeight: "800" },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, fontWeight: "600" },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  ratingText: { fontSize: 13, fontWeight: "500", marginLeft: 6 },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
  },
  locationText: { fontSize: 13 },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statPill: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  statLabel: { fontSize: 11, fontWeight: "500" },
  statValue: { fontSize: 14, fontWeight: "700" },
  aboutSection: {
    marginBottom: 20,
    gap: 8,
  },
  aboutTitle: { fontSize: 18, fontWeight: "700" },
  aboutText: { fontSize: 14, lineHeight: 21 },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: 26,
  },
  directionsText: { fontSize: 15, fontWeight: "700" },
});
