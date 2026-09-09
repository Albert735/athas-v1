// File: (auth)/_layout.tsx – purpose: (Handles authentication-related screens, providing a consistent layout and navigation structure for all authentication flows.)
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
        }}
      >
        <Stack.Screen name="sign-in/index" />
        <Stack.Screen name="sign-up/index" />
        <Stack.Screen name="forgotten-password/index" />
        <Stack.Screen name="otp/index" />
        <Stack.Screen name="reset-password/index" />
        <Stack.Screen name="profile-setup/index" />
        <Stack.Screen name="guest/index" />
      </Stack>
    </>
  );
}
