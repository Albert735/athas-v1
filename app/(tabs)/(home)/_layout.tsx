import { Drawer } from "expo-router/drawer";
import { Platform, useColorScheme } from "react-native";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { useColor } from "@/hooks/useColor";
import { DrawerContent } from "@/components/drawer/drawer-content";

export default function HomeLayout() {
  const background = useColor("background");

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        drawerType: "slide",
        swipeEnabled: true,
        overlayColor: "rgba(0,0,0,0.3)",
        drawerStyle: {
          width: "82%",
          backgroundColor: isLiquidGlassAvailable()
            ? "transparent"
            : background,
        },
      }}
    >
      <Drawer.Screen name="index" />
      <Drawer.Screen name="popular-places/index" />
    </Drawer>
  );
}
