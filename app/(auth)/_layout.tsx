import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} animated />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="log-in" />
        <Stack.Screen name="sign-up" />
      </Stack>
    </>
  );
}
