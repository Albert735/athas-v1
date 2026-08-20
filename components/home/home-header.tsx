import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Menu } from "lucide-react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useColor } from "@/hooks/useColor";

export function HomeHeader() {
  const navigation = useNavigation();
  const textColor = useColor("text");

  return (
    <View style={styles.header}>
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.logo}
        contentFit="contain"
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuButton}
      >
        <Menu size={22} color={textColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  logo: { width: 34, height: 34, borderRadius: 9 },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
