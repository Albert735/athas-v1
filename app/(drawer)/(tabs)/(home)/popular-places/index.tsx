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

  return (
    <SafeAreaView style={styles.container}>
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
        // ListHeaderComponent={}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/building/${item.id}`)}
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
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
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.cardFooter}>
                <MapPin size={12} color={icon} />
                <Text style={styles.cardDistance}>{item.distance}</Text>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
    color: "#111827",
  },

  cardDescription: {
    fontSize: 12,
    color: "#6B7280",
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
    color: "#9CA3AF",
  },
});
