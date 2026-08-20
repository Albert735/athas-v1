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

import { Star, MapPin, Navigation, Clock3 } from "lucide-react-native";

export default function PlaceSheet() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const backgroundColor = useColor("background");

  const cardColor = useColor("card");

  const textColor = useColor("text");

  const mutedColor = useColor("textMuted");

  const primaryColor = useColor("primary");

  const place = places.find((item) => item.id === id);

  if (!place) {
    return (
      <View
        style={[
          styles.empty,
          {
            backgroundColor,
          },
        ]}
      >
        <Text
          style={[
            styles.emptyText,
            {
              color: mutedColor,
            },
          ]}
        >
          Place not found.
        </Text>
      </View>
    );
  }

  const categoryLabel = place.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleGetDirections = () => {
    router.dismissTo(`/map?buildingId=${place.id}&startDirections=true`);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Image
          source={categoryImages[place.category] ?? categoryImages.library}
          style={styles.heroImage}
          contentFit="cover"
        />

        <View style={styles.heroOverlay} />

        <View style={styles.heroContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{categoryLabel}</Text>
          </View>

          <Text style={styles.heroTitle}>{place.name}</Text>

          <View style={styles.heroLocation}>
            <MapPin size={15} color="#FFFFFF" />

            <Text style={styles.heroLocationText}>{place.distance} away</Text>
          </View>
        </View>
      </View>

      <View style={styles.ratingSection}>
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <Star key={index} size={16} color="#F59E0B" fill="#F59E0B" />
            ))}
          </View>

          <Text
            style={[
              styles.rating,
              {
                color: textColor,
              },
            ]}
          >
            4.8
          </Text>

          <Text
            style={[
              styles.ratingLabel,
              {
                color: mutedColor,
              },
            ]}
          >
            Excellent
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: place.isOpen
                ? "rgba(34,197,94,0.12)"
                : "rgba(239,68,68,0.12)",
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: place.isOpen ? "#22C55E" : "#EF4444",
              },
            ]}
          />

          <Text
            style={[
              styles.statusText,
              {
                color: place.isOpen ? "#16A34A" : "#DC2626",
              },
            ]}
          >
            {place.isOpen ? "Open now" : "Closed"}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: cardColor,
            },
          ]}
        >
          <View
            style={[
              styles.infoIcon,
              {
                backgroundColor,
              },
            ]}
          >
            <Clock3 size={17} color={primaryColor} />
          </View>

          <View style={styles.infoText}>
            <Text
              style={[
                styles.infoLabel,
                {
                  color: mutedColor,
                },
              ]}
            >
              Hours
            </Text>

            <Text
              style={[
                styles.infoValue,
                {
                  color: textColor,
                },
              ]}
              numberOfLines={1}
            >
              {place.hours}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: cardColor,
            },
          ]}
        >
          <View
            style={[
              styles.infoIcon,
              {
                backgroundColor,
              },
            ]}
          >
            <MapPin size={17} color={primaryColor} />
          </View>

          <View style={styles.infoText}>
            <Text
              style={[
                styles.infoLabel,
                {
                  color: mutedColor,
                },
              ]}
            >
              Distance
            </Text>

            <Text
              style={[
                styles.infoValue,
                {
                  color: textColor,
                },
              ]}
              numberOfLines={1}
            >
              {place.distance}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: textColor,
            },
          ]}
        >
          About
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: mutedColor,
            },
          ]}
        >
          {place.description}
        </Text>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: textColor,
            },
          ]}
        >
          Opening hours
        </Text>

        <View
          style={[
            styles.hoursCard,
            {
              backgroundColor: cardColor,
            },
          ]}
        >
          <View style={styles.hoursRow}>
            <Text
              style={[
                styles.hoursLabel,
                {
                  color: mutedColor,
                },
              ]}
            >
              Days
            </Text>

            <Text
              style={[
                styles.hoursValue,
                {
                  color: textColor,
                },
              ]}
            >
              {place.days}
            </Text>
          </View>

          <View
            style={[
              styles.divider,
              {
                backgroundColor,
              },
            ]}
          />

          <View style={styles.hoursRow}>
            <Text
              style={[
                styles.hoursLabel,
                {
                  color: mutedColor,
                },
              ]}
            >
              Hours
            </Text>

            <Text
              style={[
                styles.hoursValue,
                {
                  color: textColor,
                },
              ]}
            >
              {place.hours}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.directionsButton, { backgroundColor: primaryColor }]}
        onPress={() => {
          router.dismissTo(`/map?buildingId=${place.id}&startNavigation=true`);
        }}
      >
        <Navigation size={18} color="#FFFFFF" />

        <Text style={styles.directionsText}>Get Directions</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 15,
  },

  hero: {
    height: 220,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 18,
  },

  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 18,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.94)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 9,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111827",
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 7,
  },

  heroLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  heroLocationText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },

  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  stars: {
    flexDirection: "row",
    gap: 2,
    marginRight: 8,
  },

  rating: {
    fontSize: 15,
    fontWeight: "800",
  },

  ratingLabel: {
    fontSize: 13,
    marginLeft: 6,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 26,
  },

  infoCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 12,
    gap: 10,
  },

  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "700",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 9,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
  },

  hoursCard: {
    borderRadius: 16,
    paddingHorizontal: 15,
  },

  hoursRow: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  hoursLabel: {
    fontSize: 13,
    fontWeight: "500",
  },

  hoursValue: {
    fontSize: 13,
    fontWeight: "700",
    maxWidth: "65%",
    textAlign: "right",
  },

  divider: {
    height: StyleSheet.hairlineWidth,
  },

  directionsButton: {
    height: 54,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 2,
  },

  directionsText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  bottomSpace: {
    height: 10,
  },
});
