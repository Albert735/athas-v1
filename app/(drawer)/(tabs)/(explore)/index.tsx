import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mic, MapPin, Navigation, ArrowLeft } from "lucide-react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";
import { categoryImages } from "@/data/category-images";
import { Image } from "expo-image";
import { useState, useMemo } from "react";
import { router } from "expo-router";
import { CATEGORIES } from "@/data/categories";
import { COLLECTIONS } from "@/data/collections";
import { Header } from "@/components/shared";

export default function ExploreScreen() {
  const icon = useColor("icon");
  const textColor = useColor("text");
  const primaryColor = useColor("primary");
  const mutedColor = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPlaces = useMemo(() => {
    let result = places;
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (query.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
    }
    return result;
  }, [query, selectedCategory]);

  const isBrowsing = !!query.trim() || !!selectedCategory;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Title */}
      {/* <View style={styles.titleRow}>
        <Text style={[styles.titleText, { color: textColor }]}>Explore</Text>
        <Text style={[styles.subtitleText, { color: mutedColor }]}>
          Discover everything campus has to offer
        </Text>
      </View> */}
      <View style={styles.titleRow}>
        {isBrowsing ? (
          <Pressable
            onPress={() => {
              setQuery("");
              setSelectedCategory(null);
            }}
            hitSlop={8}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <ArrowLeft size={20} color={textColor} />
              <Text style={[styles.titleText, { color: textColor }]}>
                {query.trim()
                  ? "Results"
                  : (CATEGORIES.find((c) => c.id === selectedCategory)?.label ??
                    "Explore")}
              </Text>
            </View>
          </Pressable>
        ) : (
          <View style={{ flexDirection: "column", gap: 4 }}>
            <Text style={[styles.titleText, { color: textColor }]}>
              Explore
            </Text>
            <Text style={[styles.subtitleText, { color: mutedColor }]}>
              Discover everything campus has to offer
            </Text>
          </View>
        )}
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <SearchBar
          placeholder="Search buildings, facilities..."
          onSearch={setQuery}
          loading={false}
          rightIcon={<Mic size={18} color={icon} />}
        />
      </View>

      {isBrowsing ? (
        /* ── Directory mode — full filtered list ── */
        <FlatList
          data={filteredPlaces}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.chipsWrapper}>
              <FlatList
                horizontal
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsContent}
                renderItem={({ item }) => {
                  const isSelected = selectedCategory === item.id;
                  return (
                    <Pressable
                      style={[
                        styles.chip,
                        {
                          backgroundColor: isSelected
                            ? primaryColor
                            : cardColor,
                          borderColor: isSelected ? primaryColor : borderColor,
                        },
                      ]}
                      onPress={() =>
                        setSelectedCategory(isSelected ? null : item.id)
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          { color: isSelected ? "#FFFFFF" : mutedColor },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            </View>
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: mutedColor }]}>
                No places found
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: cardColor, borderColor },
                pressed && { opacity: 0.95 },
              ]}
              onPress={() => router.push(`/building/${item.id}`)}
            >
              <Image
                source={categoryImages[item.category] ?? categoryImages.library}
                style={styles.cardImage}
                contentFit="cover"
              />
              <View style={styles.cardBody}>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardName, { color: textColor }]}>
                    {item.name}
                  </Text>
                  <View style={styles.cardMeta}>
                    <MapPin size={12} color={icon} />
                    <Text style={[styles.cardDistance, { color: mutedColor }]}>
                      {item.distance}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.goButton}
                  activeOpacity={0.85}
                  onPress={() => router.push("/map")}
                >
                  <Navigation size={14} color="#FFFFFF" />
                  <Text style={styles.goButtonText}>Go</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          )}
        />
      ) : (
        /* ── Discovery mode — collections + category grid ── */
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Curated Collections */}
          {COLLECTIONS.map((collection) => {
            const items = places.filter((p) =>
              collection.categories.includes(p.category),
            );
            if (items.length === 0) return null;

            return (
              <View key={collection.id} style={styles.section}>
                <Text style={[styles.sectionTitle, { color: textColor }]}>
                  {collection.title}
                </Text>
                <FlatList
                  horizontal
                  data={items}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.collectionContent}
                  renderItem={({ item }) => (
                    <Pressable
                      style={[
                        styles.collectionCard,
                        { backgroundColor: cardColor, borderColor },
                      ]}
                      onPress={() => router.push(`/building/${item.id}`)}
                    >
                      <Image
                        source={
                          categoryImages[item.category] ??
                          categoryImages.library
                        }
                        style={styles.collectionImage}
                        contentFit="cover"
                      />
                      <View style={styles.collectionBody}>
                        <Text
                          style={[styles.collectionName, { color: textColor }]}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.collectionDistance,
                            { color: mutedColor },
                          ]}
                        >
                          {item.distance}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                />
              </View>
            );
          })}

          {/* Browse by Category grid */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Browse by Category
            </Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[
                    styles.categoryTile,
                    { backgroundColor: cardColor, borderColor },
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Image
                    source={categoryImages[cat.id] ?? categoryImages.library}
                    style={styles.categoryTileImage}
                    contentFit="cover"
                  />
                  <Text
                    style={[styles.categoryTileLabel, { color: textColor }]}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleRow: { paddingHorizontal: 20, paddingVertical: 10, gap: 2 },
  titleText: { fontSize: 22, fontWeight: "700" },
  subtitleText: { fontSize: 13 },
  searchRow: { paddingHorizontal: 20, marginBottom: 4 },
  chipsWrapper: { height: 52 },
  chipsContent: { paddingHorizontal: 20, paddingVertical: 10, gap: 8 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: { fontSize: 13, fontWeight: "500" },
  listContent: { paddingBottom: 100 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyText: { fontSize: 14 },
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  cardImage: { width: "100%", height: 160 },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    gap: 12,
  },
  cardInfo: { flex: 1, gap: 4 },
  cardName: { fontSize: 15, fontWeight: "600" },
  cardMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  cardDistance: { fontSize: 12 },
  goButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#0099FF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  goButtonText: { fontSize: 14, fontWeight: "600", color: "#FFFFFF" },

  // Discovery mode
  scrollContent: { paddingBottom: 100 },
  section: { marginTop: 20 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  collectionContent: { paddingHorizontal: 20, gap: 12 },
  collectionCard: {
    width: 160,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
  },
  collectionImage: { width: "100%", height: 100 },
  collectionBody: { padding: 10, gap: 2 },
  collectionName: { fontSize: 13, fontWeight: "600" },
  collectionDistance: { fontSize: 11 },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryTile: {
    width: "31%",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
  },
  categoryTileImage: { width: "100%", height: 70 },
  categoryTileLabel: {
    fontSize: 12,
    fontWeight: "600",
    padding: 8,
    textAlign: "center",
  },
});
