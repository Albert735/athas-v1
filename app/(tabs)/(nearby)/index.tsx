import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { ClosestCard, FacilityCard } from "@/components/near-by/facility-card";
import { facilities } from "@/data/facility";
import { closest } from "@/data/closest";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function NearByScreen() {
  const icon = useColor("icon");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Facilities</Text>

        <SearchBar
          placeholder="Search for anything..."
          onSearch={(query) => console.log(query)}
          loading={false}
          rightIcon={<Mic size={18} color={icon} />}
        />
      </View>

      <View style={styles.gridContainer}>
        <FlatList
          data={facilities}
          keyExtractor={(_, index) => index.toString()}
          numColumns={4}
          scrollEnabled={false}
          columnWrapperStyle={styles.grid}
          renderItem={({ item }) => (
            <FacilityCard
              label={item.label}
              icon={item.icon as any}
              color={item.color}
            />
          )}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Closest to you</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/(nearby)/view-all")}
          >
            <Text style={styles.subHeaderSeeAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={closest}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.closestList}
          renderItem={({ item }) => (
            <ClosestCard
              place={item.place}
              icon={item.icon as any}
              located={item.located}
              color={item.color}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 10,
    gap: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },

  gridContainer: {
    marginTop: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sectionContainer: {
    marginTop: 20,
    gap: 12,
  },
  closestList: {
    gap: 16,
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
  subHeaderSeeAll: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
});
