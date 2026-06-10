import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Menu, Mic } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { Icon } from "@/components/ui/icon";
import { useColor } from "@/hooks/useColor";

export default function HomeScreen() {
  const icon = useColor("icon");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingTop: 20 }}>
        {/** Header */}
        <View style={styles.header}>
          <View>
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 32, height: 32 }}
            />
          </View>

          <View>
            <Menu />
          </View>
        </View>
        {/** Search */}
        <View style={styles.search}>
          <SearchBar
            placeholder="Search for anything..."
            onSearch={(query) => console.log("Searching for:", query)}
            loading={false}
            rightIcon={<Icon name={Mic} size={16} color={icon} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  search: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
