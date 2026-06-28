import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { FacilityCard } from "@/components/near-by/facility-card";
import { facilities } from "@/data/facility";

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
        <View style={styles.grid}>
          {facilities.map((item, index) => (
            <FacilityCard
              key={index}
              label={item.label}
              icon={item.icon as any}
              color={item.color}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
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
    flex: 1,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
});
