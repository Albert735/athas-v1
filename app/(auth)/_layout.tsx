import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} animated />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="sign-in/index" />
        <Stack.Screen name="sign-up/index" />
      </Stack>
    </>
  );
}
