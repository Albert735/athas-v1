import { Header } from "@/components/shared";
import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Mic, MapPin } from "lucide-react-native";
import { places } from "@/data/places";
import { categoryImages } from "@/data/category-images";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState, useMemo } from "react";

export default function PopularPlaces() {
  const icon = useColor("icon");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return places;
    return places.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Popular Places" showBack={true} />
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search for anything..."
          onSearch={setQuery}
          loading={false}
          rightIcon={<Mic size={18} color={icon} />}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: mutedColor }]}>
              No places found
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/building/${item.id}`)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: cardColor, borderColor },
              pressed && { opacity: 0.9 },
            ]}
          >
            <Image
              source={categoryImages[item.category] ?? categoryImages.library}
              style={styles.cardImage}
              contentFit="cover"
            />

            <View style={styles.cardBody}>
              <Text style={[styles.cardName, { color: textColor }]}>
                {item.name}
              </Text>
              <Text
                style={[styles.cardDescription, { color: mutedColor }]}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <View style={styles.cardFooter}>
                <MapPin size={12} color={icon} />
                <Text style={[styles.cardDistance, { color: mutedColor }]}>
                  {item.distance}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingBottom: 80,
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 120, gap: 16 },
  searchContainer: { marginBottom: 16, paddingHorizontal: 20 },
  row: { justifyContent: "space-between", gap: 12 },
  empty: { flex: 1, alignItems: "center", paddingTop: 60 },
  emptyText: { fontSize: 14 },
  card: { flex: 1, borderRadius: 16, overflow: "hidden", borderWidth: 1 },
  cardImage: { width: "100%", height: 110 },
  cardBody: { padding: 12, gap: 4 },
  cardName: { fontSize: 14, fontWeight: "600" },
  cardDescription: { fontSize: 12, lineHeight: 17 },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  cardDistance: { fontSize: 12 },
});
