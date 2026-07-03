import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { Header } from "@/components/shared";
import { closest } from "@/data/closest";
import { ClosestCard } from "@/components/near-by";
import { ScrollView } from "@/components/ui/scroll-view";

export default function ViewAll() {
  const icon = useColor("icon");

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Near By" showBack={true} />

      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Find Facilities</Text>

          <SearchBar
            placeholder="Search for anything..."
            onSearch={(query) => console.log(query)}
            loading={false}
            rightIcon={<Mic size={18} color={icon} />}
          />
        </View>

        <View style={styles.grid}>
          {closest.map((item, index) => (
            <ClosestCard
              key={index}
              place={item.place}
              icon={item.icon as any}
              located={item.located}
              color={item.color}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    gap: 16,
    marginTop: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },

  grid: {
    marginHorizontal: 16,
    gap: 16,
    marginTop: 20,
  },
});
