import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { MapPin } from "lucide-react-native";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";
import { quickActions } from "@/data/quick-actions";
import { categoryImages } from "@/data/category-images";

interface Props {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onPlacePress: (place: (typeof places)[0]) => void;
}

export function HomePopularSheet({
  selectedCategory,
  onCategoryChange,
  onPlacePress,
}: Props) {
  const cardColor = useColor("card");
  const backgroundColor = useColor("background");
  const borderColor = useColor("border");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const primaryColor = useColor("primary");
  const primaryForeground = useColor("primaryForeground");
  const iconColor = useColor("icon");

  const filteredPlaces =
    selectedCategory === "all"
      ? places
      : places.filter((p) => p.category === selectedCategory);

  const selectedLabel = quickActions.find(
    (a) => a.category === selectedCategory,
  )?.label;

  return (
    <BottomSheet style={styles.sheet}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          {selectedLabel
            ? `${selectedLabel} near you`
            : "Popular places on campus"}
        </Text>
      </View>

      {/* Category pills */}
      <FlatList
        horizontal
        data={quickActions}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsContent}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item.category;
          const Icon = item.icon;
          return (
            <Pressable
              style={[
                styles.pill,
                { backgroundColor, borderColor },
                isSelected && {
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                },
              ]}
              onPress={() => onCategoryChange(item.category)}
            >
              <Icon
                size={14}
                color={isSelected ? primaryForeground : iconColor}
              />
              <Text
                style={[
                  styles.pillText,
                  { color: isSelected ? primaryForeground : textColor },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Place list */}
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: cardColor, borderColor }]}
            onPress={() => onPlacePress(item)}
          >
            <Image
              source={categoryImages[item.category] ?? categoryImages.library}
              style={styles.cardImage}
              contentFit="cover"
            />
            <View style={styles.cardBody}>
              <Text
                style={[styles.cardName, { color: textColor }]}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text
                style={[styles.cardDescription, { color: mutedColor }]}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <View style={styles.cardFooter}>
                <MapPin size={12} color={primaryColor} />
                <Text style={[styles.cardDistance, { color: mutedColor }]}>
                  {item.distance}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    maxHeight: "60%",
  },
  sectionHeader: { paddingHorizontal: 4, marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  pillsContent: { gap: 8, paddingVertical: 8 },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: { fontSize: 13, fontWeight: "500" },
  listContent: { gap: 12, paddingTop: 8, paddingBottom: 20 },
  card: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardImage: { width: 90, height: 90 },
  cardBody: { flex: 1, padding: 10, gap: 3, justifyContent: "center" },
  cardName: { fontSize: 14, fontWeight: "600" },
  cardDescription: { fontSize: 12, lineHeight: 16 },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  cardDistance: { fontSize: 11 },
});
