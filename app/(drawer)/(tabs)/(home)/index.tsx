import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Menu, Mic, MapPin } from "lucide-react-native";
import { SearchBarWithSuggestions } from "@/components/ui/searchbar";
import { places } from "@/data/places";
import { useColor } from "@/hooks/useColor";
import { popularPlaces } from "@/data/popular-places";
import { quickActions } from "@/data/quick-actions";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { categoryImages } from "@/data/category-images";

/**
 * HomeScreen Component
 *
 * Main landing dashboard of Athas.
 * Features top navigation drawer toggle, live search bar with suggestions, quick action chips,
 * and cards for popular campus destinations.
 */
export default function HomeScreen() {
  const [selectedQuickAction, setSelectedQuickAction] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const suggestions = places.map((place) => place.name);
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    if (query.trim()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        console.log("Search completed for:", query);
      }, 2000);
    }
  };
  const handleSuggestionPress = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };
  const icon = useColor("icon");
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom + 60;

  const { height } = Dimensions.get("window");
  const MAP_HEIGHT = height * 0.56;

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const primaryForeground = useColor("primaryForeground");

  const filteredPlaces =
    selectedQuickAction === "all"
      ? places
      : places.filter((place) => place.category === selectedQuickAction);

  const selectedCategoryLabel = quickActions.find(
    (item) => item.category === selectedQuickAction,
  )?.label;

  return (
    <View style={[styles.root, { backgroundColor }]}>
      {/* Map — top half, sits behind everything */}
      <View
        style={[
          styles.mapContainer,
          { height: MAP_HEIGHT, backgroundColor: cardColor },
        ]}
      >
        {/* Replace with your Mapbox component */}
      </View>

      {/* Overlay: search + chips float over the map */}
      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Menu size={22} color={textColor} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <SearchBarWithSuggestions
            placeholder="Search for anything..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={handleSearch}
            suggestions={suggestions}
            onSuggestionPress={handleSuggestionPress}
            loading={loading}
            rightIcon={<Mic size={18} color={icon} />}
          />
        </View>

        {/* Quick Actions — horizontal FlatList #1 */}
        <FlatList
          horizontal
          data={quickActions}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsContent}
          renderItem={({ item }) => {
            const isSelected = selectedQuickAction === item.category;
            const Icon = item.icon;
            return (
              <Pressable
                style={[
                  styles.chip,
                  { backgroundColor: cardColor, borderColor },
                  isSelected && {
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                  },
                ]}
                onPress={() => {
                  setSelectedQuickAction(item.category);
                }}
              >
                <Icon size={14} color={isSelected ? primaryForeground : icon} />
                <Text
                  style={[
                    styles.chipText,
                    { color: textColor },
                    isSelected && { color: primaryForeground },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />
      </SafeAreaView>

      {/* Bottom sheet area */}
      <View
        style={[
          styles.sheet,
          { top: MAP_HEIGHT - 20, backgroundColor: backgroundColor },
        ]}
      >
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            {selectedCategoryLabel
              ? `${selectedCategoryLabel} near you`
              : "Popular places on campus"}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/popular-places")}
          >
            <Text style={[styles.seeAll, { color: textMuted }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Places — horizontal FlatList #2 */}
        <FlatList
          horizontal
          data={filteredPlaces}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.placesContent,
            { paddingBottom: bottomInset },
          ]}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, { backgroundColor: cardColor, borderColor }]}
              onPress={() => router.push(`/building/${item.id}`)}
            >
              <Image
                source={categoryImages[item.category]}
                style={styles.cardImage}
                contentFit="cover"
              />
              <View style={styles.cardBody}>
                <Text style={[styles.cardName, { color: textColor }]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.cardDescription, { color: textMuted }]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
                <View style={styles.cardFooter}>
                  <MapPin size={12} color={primaryColor} />
                  <Text style={[styles.cardDistance, { color: textMuted }]}>
                    {item.distance}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  // Map fills top half
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },

  // Search + chips float over the map
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },

  searchRow: {
    paddingHorizontal: 20,
    marginTop: 12,
  },

  quickActionsContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },

  chipInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  chipText: {
    fontSize: 13,
    fontWeight: "500",
  },

  // Bottom sheet sits on top of lower half
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  seeAll: {
    fontSize: 13,
    fontWeight: "500",
  },

  placesContent: {
    paddingHorizontal: 20,
    gap: 16,
  },

  card: {
    width: 220,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },

  cardImage: {
    width: "100%",
    height: 120,
  },
  statusBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusOpen: {
    backgroundColor: "rgba(209, 250, 229, 0.95)",
  },
  statusClosed: {
    backgroundColor: "rgba(254, 226, 226, 0.95)",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotOpen: {
    backgroundColor: "#059669",
  },
  statusDotClosed: {
    backgroundColor: "#DC2626",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  statusTextOpen: {
    color: "#065F46",
  },
  statusTextClosed: {
    color: "#991B1B",
  },

  cardBody: {
    padding: 12,
    gap: 4,
  },

  cardName: {
    fontSize: 14,
    fontWeight: "600",
  },

  cardDescription: {
    fontSize: 12,
    lineHeight: 17,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },

  cardDistance: {
    fontSize: 12,
  },
});
