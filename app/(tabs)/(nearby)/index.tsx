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
import { Mic, MapPin, Navigation, Plus } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { quickActions } from "@/data/quick-actions";
import { popularPlaces } from "@/data/popular-places";
import { useState } from "react";
import { router } from "expo-router";

export default function NearByScreen() {
  const icon = useColor("icon");
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(
    null,
  );

  return (
    <SafeAreaView style={styles.container}>
      <>
        {/* Header */}
        {/* <View style={styles.header}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
          />
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.menuButton}>
              <View style={styles.menuLine} />
              <View style={[styles.menuLine, { width: 16 }]} />
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={{ padding: 20, paddingBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
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
        </View>
      </>
      <FlatList
        data={popularPlaces}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        // ListHeaderComponent={}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.95 }]}
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
                <Text
                  style={[
                    styles.statusText,
                    item.isOpen
                      ? styles.statusTextOpen
                      : styles.statusTextClosed,
                  ]}
                >
                  {item.isOpen ? "Open Now" : "Closed"}
                </Text>
              </View>
            </View>

            {/* Card body */}
            <View style={styles.cardBody}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <View style={styles.cardMeta}>
                  <MapPin size={12} color="#9CA3AF" />
                  <Text style={styles.cardLocation}>LOT 1</Text>
                  <Text style={styles.cardDot}>•</Text>
                  <Text style={styles.cardDistance}>{item.distance}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.goButton}
                activeOpacity={0.85}
                onPress={() => router.push("/(tabs)/(map)")}
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
    // backgroundColor: "#F9FAFB",
  },
  listContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    marginBottom: 14,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  menuButton: {
    gap: 5,
    alignItems: "flex-end",
  },
  menuLine: {
    width: 22,
    height: 2,
    borderRadius: 2,
    backgroundColor: "#111827",
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
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  chipSelected: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
  },
  chipTextSelected: {
    color: "#FFFFFF",
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
  },
  statusTextOpen: {
    color: "#FFFFFF",
  },
  statusTextClosed: {
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
    color: "#111827",
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardLocation: {
    fontSize: 12,
    color: "#6B7280",
  },
  cardDot: {
    fontSize: 12,
    color: "#D1D5DB",
  },
  cardDistance: {
    fontSize: 12,
    color: "#6B7280",
  },
  goButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#111827",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  goButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#F9FAFB",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 54,
    backgroundColor: "#111827",
    borderRadius: 14,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
