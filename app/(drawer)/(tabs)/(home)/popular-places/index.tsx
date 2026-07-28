import { Header } from "@/components/shared";
import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Mic, MapPin } from "lucide-react-native";
import { popularPlaces } from "@/data/popular-places";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function PopularPlaces() {
  const icon = useColor("icon");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Popular Places" showBack={true} />
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search for anything..."
          onSearch={(query) => console.log(query)}
          loading={false}
          rightIcon={<Mic size={18} color={icon} />}
        />
      </View>
      <FlatList
        data={popularPlaces}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/building/${item.id}`)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: cardColor, borderColor },
              pressed && { opacity: 0.9 },
            ]}
          >
            <View>
              <Image
                source={item.image}
                style={styles.cardImage}
                contentFit="cover"
              />
              {/* Open/Closed badge */}
              <View
                style={[
                  styles.statusBadge,
                  item.isOpen ? styles.statusOpen : styles.statusClosed,
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    item.isOpen ? styles.statusDotOpen : styles.statusDotClosed,
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    item.isOpen
                      ? styles.statusTextOpen
                      : styles.statusTextClosed,
                  ]}
                >
                  {item.isOpen ? "Open" : "Closed"}
                </Text>
              </View>
            </View>

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
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 16,
  },
  searchContainer: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  cardImage: {
    width: "100%",
    height: 110,
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
