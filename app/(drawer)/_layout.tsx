import { Drawer } from "expo-router/drawer";
import { DrawerContent } from "@/components/drawer/drawer-content";
import { useColor } from "@/hooks/useColor";
import { isLiquidGlassAvailable } from "expo-glass-effect";

export default function DrawerLayout() {
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
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}
