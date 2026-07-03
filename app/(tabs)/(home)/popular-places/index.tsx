import { Header } from "@/components/shared";
import { Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Mic } from "lucide-react-native";
import { ScrollView } from "@/components/ui/scroll-view";

export default function PopularPlaces() {
  const icon = useColor("icon");
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Popular Places" showBack={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <SearchBar
            placeholder="Search for anything..."
            onSearch={(query) => console.log(query)}
            loading={false}
            rightIcon={<Mic size={18} color={icon} />}
          />
        </View>

        <View>{/*  */}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
});
