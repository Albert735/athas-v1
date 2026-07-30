import { Drawer } from "expo-router/drawer";
import { DrawerContent } from "@/components/drawer/drawer-content";
import { useColor } from "@/hooks/useColor";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/colors";
import { Platform } from "react-native";

export default function DrawerLayout() {
  const colorScheme = useColorScheme() || "light";
  const glassAvailable = isLiquidGlassAvailable();

  const drawerBackground = glassAvailable
    ? "transparent"
    : colorScheme === "dark"
      ? Colors.dark.card
      : Colors.light.card;

  const overlayColor =
    colorScheme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)";

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        drawerType: Platform.OS === "ios" ? "slide" : "front",
        swipeEnabled: true,
        swipeEdgeWidth: 60,
        overlayColor,
        drawerStyle: {
          width: "82%",
          backgroundColor: drawerBackground,
        },
      }}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}
