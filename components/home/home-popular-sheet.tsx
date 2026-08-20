import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { MapPin, ChevronRight } from "lucide-react-native";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";
import { quickActions } from "@/data/quick-actions";
import { categoryImages } from "@/data/category-images";

interface Props {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onPlacePress: (place: (typeof places)[0]) => void;
  visible?: boolean;
}

export function HomePopularSheet({
  selectedCategory,
  onCategoryChange,
  onPlacePress,
  visible = true,
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
      : places.filter((place) => place.category === selectedCategory);

  const selectedLabel = quickActions.find(
    (action) => action.category === selectedCategory,
  )?.label;

  const title = selectedLabel ? `${selectedLabel} nearby` : "Popular places";

  if (!visible) {
    return null;
  }

  return (
    <BottomSheet isVisible={visible} style={styles.sheet}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: textColor,
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: mutedColor,
            },
          ]}
        >
          {filteredPlaces.length}{" "}
          {filteredPlaces.length === 1 ? "place" : "places"}
        </Text>
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        data={quickActions}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryContent}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item.category;

          const Icon = item.icon;

          return (
            <Pressable
              onPress={() => onCategoryChange(item.category)}
              style={[
                styles.category,
                {
                  backgroundColor: cardColor,
                  borderColor,
                },
                isSelected && {
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                },
              ]}
            >
              <Icon
                size={14}
                color={isSelected ? primaryForeground : iconColor}
                strokeWidth={2}
              />

              <Text
                style={[
                  styles.categoryText,
                  {
                    color: isSelected ? primaryForeground : textColor,
                  },
                ]}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Places */}
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.placesList}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPlacePress(item)}
            style={({ pressed }) => [
              styles.placeCard,
              {
                backgroundColor: cardColor,
                borderColor,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Image
              source={categoryImages[item.category] ?? categoryImages.library}
              style={styles.placeImage}
              contentFit="cover"
            />

            <View style={styles.placeInfo}>
              <Text
                style={[
                  styles.placeName,
                  {
                    color: textColor,
                  },
                ]}
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text
                style={[
                  styles.placeDescription,
                  {
                    color: mutedColor,
                  },
                ]}
                numberOfLines={1}
              >
                {item.description}
              </Text>

              <View style={styles.placeMeta}>
                <MapPin size={12} color={primaryColor} strokeWidth={2.5} />

                <Text
                  style={[
                    styles.distance,
                    {
                      color: mutedColor,
                    },
                  ]}
                >
                  {item.distance}
                </Text>

                <View style={styles.metaDot} />

                <Text
                  style={[
                    styles.openStatus,
                    {
                      color: item.isOpen ? "#16A34A" : "#DC2626",
                    },
                  ]}
                >
                  {item.isOpen ? "Open" : "Closed"}
                </Text>
              </View>
            </View>

            <ChevronRight size={18} color={mutedColor} strokeWidth={1.8} />
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text
              style={[
                styles.emptyTitle,
                {
                  color: textColor,
                },
              ]}
            >
              No places found
            </Text>

            <Text
              style={[
                styles.emptyText,
                {
                  color: mutedColor,
                },
              ]}
            >
              Try another category.
            </Text>
          </View>
        }
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    height: "48%",
    paddingHorizontal: 16,
    paddingTop: 4,
  },

  header: {
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },

  categoryList: {
    flexGrow: 0,
    marginHorizontal: -16,
    marginBottom: 4,
  },

  categoryContent: {
    paddingHorizontal: 16,
    gap: 8,
  },

  category: {
    height: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    borderRadius: 17,
    borderWidth: 1,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },

  placesList: {
    flex: 1,
  },

  listContent: {
    paddingTop: 12,
    paddingBottom: 20,
  },

  separator: {
    height: 8,
  },

  placeCard: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    padding: 8,
  },

  placeImage: {
    width: 68,
    height: 68,
    borderRadius: 11,
  },

  placeInfo: {
    flex: 1,
    marginLeft: 11,
    marginRight: 8,
  },

  placeName: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 3,
  },

  placeDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 6,
  },

  placeMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  distance: {
    fontSize: 11,
    fontWeight: "500",
  },

  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#9CA3AF",
    marginHorizontal: 2,
  },

  openStatus: {
    fontSize: 11,
    fontWeight: "600",
  },

  empty: {
    alignItems: "center",
    paddingVertical: 30,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },

  emptyText: {
    fontSize: 12,
  },
});
