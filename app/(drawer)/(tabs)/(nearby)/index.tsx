import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic, MapPin, Navigation } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { quickActions } from "@/data/quick-actions";
import { popularPlaces } from "@/data/popular-places";
import { useState } from "react";
import { router } from "expo-router";

export default function NearByScreen() {
  const icon = useColor("icon");
  const textColor = useColor("text");
  const primaryColor = useColor("primary");
  const primaryForeground = useColor("primaryForeground");
  const mutedColor = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const backgroundColor = useColor("background");

  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(
    null,
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Title */}
      <View style={styles.titleRow}>
        <Text style={[styles.titleText, { color: textColor }]}>
          Find Facilities
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <SearchBar
          placeholder="Search for buildings..."
          onSearch={(query) => console.log(query)}
          loading={false}
          rightIcon={<Mic size={18} color={icon} />}
        />
      </View>

      {/* Chips */}
      <View style={styles.chipsWrapper}>
        <FlatList
          horizontal
          data={quickActions}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}
          renderItem={({ item }) => {
            const isSelected = selectedQuickAction === item.id;
            const Icon = item.icon;
            return (
              <Pressable
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected ? primaryColor : cardColor,
                    borderColor: isSelected ? primaryColor : borderColor,
                  },
                ]}
                onPress={() =>
                  setSelectedQuickAction(isSelected ? null : item.id)
                }
              >
                <Icon size={14} color={isSelected ? "#FFFFFF" : icon} />
                <Text
                  style={[
                    styles.chipText,
                    { color: mutedColor },
                    isSelected && styles.chipTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* Places List */}
      <FlatList
        data={popularPlaces}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: cardColor, borderColor },
              pressed && { opacity: 0.95 },
            ]}
          >
            {/* Image + badge */}
            <View>
              <Image
                source={item.image}
                style={styles.cardImage}
                contentFit="cover"
              />
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
                <Text style={styles.statusText}>
                  {item.isOpen ? "Open Now" : "Closed"}
                </Text>
              </View>
            </View>

            {/* Card body */}
            <View style={styles.cardBody}>
              <View style={styles.cardInfo}>
                <Text style={[styles.cardName, { color: textColor }]}>
                  {item.name}
                </Text>
                <View style={styles.cardMeta}>
                  <MapPin size={12} color={icon} />
                  <Text style={[styles.cardLocation, { color: mutedColor }]}>
                    LOT 1
                  </Text>
                  <Text style={[styles.cardDot, { color: borderColor }]}>
                    •
                  </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
  },
  searchRow: {
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  chipsWrapper: {
    height: 52,
  },
  chipsContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  chipSelected: {
    backgroundColor: "#0099FF",
    borderColor: "#111827",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 100,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  cardImage: {
    width: "100%",
    height: 160,
  },
  statusBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusOpen: {
    backgroundColor: "#096c53ff",
  },
  statusClosed: {
    backgroundColor: "#111827",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotOpen: {
    backgroundColor: "#34D399",
  },
  statusDotClosed: {
    backgroundColor: "#F87171",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "#FFFFFF",
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    gap: 12,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardName: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardLocation: {
    fontSize: 12,
  },
  cardDot: {
    fontSize: 12,
  },
  cardDistance: {
    fontSize: 12,
  },
  goButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#0099FF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  goButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
