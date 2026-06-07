import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} animated />

      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
