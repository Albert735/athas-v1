import { Stack } from "expo-router";
import { useColor } from "@/hooks/useColor";
import { Platform, useColorScheme } from "react-native";
import { Text } from "@/components/ui/text";
import { isLiquidGlassAvailable } from "expo-glass-effect";

export default function FavouriteLayout() {
  const theme = useColorScheme();
  const text = useColor("text");
  const background = useColor("background");

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerLargeTitle: false,
        headerLargeTitleShadowVisible: false,
        headerTintColor: text,
        headerBlurEffect: isLiquidGlassAvailable()
          ? undefined
          : theme === "dark"
            ? "systemMaterialDark"
            : "systemMaterialLight",
        headerStyle: {
          backgroundColor: isLiquidGlassAvailable()
            ? "transparent"
            : background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Near by",
          headerTitle: () =>
            Platform.OS === "android" ? (
              <Text variant="heading">Near by</Text>
            ) : undefined,
        }}
      />
      <Stack.Screen
        name="view-all"
        options={{
          title: "View All",
          headerTitle: () =>
            Platform.OS === "android" ? (
              <Text variant="heading">View All</Text>
            ) : undefined,
        }}
      />
    </Stack>
  );
}
