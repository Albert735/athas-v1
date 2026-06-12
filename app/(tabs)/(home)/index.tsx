import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Menu, Mic, MapPin } from "lucide-react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { popularPlaces } from "@/data/popular-places";
import { quickActions } from "@/data/quick-actions";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(
    null,
  );
  const icon = useColor("icon");

  // inside component — remove useBottomTabBarHeight entirely:
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom + 100;
  return (
    <View style={styles.root}>
      {/* Map — top half, sits behind everything */}
      <View style={styles.mapContainer}>
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
          <TouchableOpacity activeOpacity={0.7}>
            <Menu size={22} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <SearchBar
            placeholder="Search for anything..."
            onSearch={(query) => console.log(query)}
            loading={false}
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
            const isSelected = selectedQuickAction === item.id;
            const Icon = item.icon;
            return (
              <Pressable
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() =>
                  setSelectedQuickAction(isSelected ? null : item.id)
                }
              >
                <Icon size={14} color={isSelected ? "#FFFFFF" : "#374151"} />
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextSelected,
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
      <View style={[styles.sheet, { bottom: bottomInset }]}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular places on campus</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Places — horizontal FlatList #2 */}
        <FlatList
          horizontal
          data={popularPlaces}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.placesContent}
          snapToInterval={220 + 16}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && { opacity: 0.9 },
              ]}
            >
              <Image
                source={item.image}
                style={styles.cardImage}
                contentFit="cover"
              />
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  // Map fills top half
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "56%",
    backgroundColor: "#D1D5DB", // placeholder until Mapbox is in
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
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  chipSelected: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  chipInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  chipText: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
  },

  chipTextSelected: {
    color: "#FFFFFF",
  },

  // Bottom sheet sits on top of lower half
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    marginTop: 30,
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
    color: "#111827",
  },

  seeAll: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },

  placesContent: {
    paddingHorizontal: 20,
    gap: 16,
  },

  card: {
    width: 220,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardImage: {
    width: "100%",
    height: 120,
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
