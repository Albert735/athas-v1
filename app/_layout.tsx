// File: _layout.tsx – purpose: Configures the main application shell, including theme, navigation layout, and global providers (Toast, Mapbox, Timetable).
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/colors";
import { ThemeProvider } from "@/theme/theme-provider";
import { osName } from "expo-device";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as NavigationBar from "expo-navigation-bar";
import {
  Stack,
  router,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect } from "react";
import { Platform, LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { ToastProvider } from "@/components/ui/toast";
import MapboxGL from "@rnmapbox/maps";
import { MAPBOX_PUBLIC_TOKEN } from "@/constants/mapbox";
import { TimetableProvider } from "@/providers/timetable-context";
import { AuthProvider, useAuth } from "@/providers/auth-context";
import { AnimatedSplash } from "@/components/splash/animated-splash";

MapboxGL.setAccessToken(MAPBOX_PUBLIC_TOKEN!);

// Keep the splash screen up until Firebase has restored (or ruled out) a
// saved session, so signed-in students never see a flash of the sign-in screen.
SplashScreen.preventAutoHideAsync();

// Reloading the app in development tears down a map that is still starting up;
// @rnmapbox/maps then logs this harmless leftover retry. It never happens in a
// real build, so keep it out of the dev error overlay.
LogBox.ignoreLogs(["Could not find view with tag"]);

/**
 * Sends the user to the right place based on auth state:
 *
 *  - signed out                  → (auth) / (onboarding) screens only
 *  - signed in, setup incomplete → profile-setup
 *  - signed in, setup complete   → the app (drawer)
 *
 * Screens never navigate on sign-in / sign-up / sign-out themselves;
 * they just call useAuth() and this gate follows the state.
 */
function AuthGate() {
  const { user, profile, loading } = useAuth();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Wait for the navigator to mount and for auth to settle.
    if (loading || !navigationState?.key) return;

    const group = segments[0] as string | undefined;
    const inAuth = group === "(auth)";
    const inOnboarding = group === "(onboarding)";
    const onProfileSetup =
      inAuth && (segments as string[])[1] === "profile-setup";

    if (!user) {
      if (!inAuth && !inOnboarding) router.replace("/(auth)/sign-in");
      return;
    }

    // Signed in, but the profile document hasn't arrived yet (right after
    // sign-up). The snapshot listener will re-run this effect when it does.
    if (!profile) return;

    const setupComplete = !!profile.school && !!profile.department;

    if (!setupComplete) {
      if (!onProfileSetup) router.replace("/(auth)/profile-setup");
      return;
    }

    if (inAuth || inOnboarding) {
      router.replace("/(drawer)/(tabs)/(home)");
    }
  }, [user, profile, loading, segments, navigationState?.key]);

  // Animated launch screen; it hides the native splash itself and fades out
  // once Firebase has restored (or ruled out) a saved session.
  return <AnimatedSplash ready={!loading} />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme() || "light";

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync(
        colorScheme === "light" ? "dark" : "light",
      );
    }
  }, [colorScheme]);

  useEffect(() => {
    setBackgroundColorAsync(
      colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
    );
  }, [colorScheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
          <TimetableProvider>
            <AuthGate />
            <StatusBar
              style={colorScheme === "dark" ? "light" : "dark"}
              animated
            />

            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen name="map" options={{ headerShown: false }} />
              <Stack.Screen name="reminders" options={{ headerShown: false }} />
              <Stack.Screen
                name="building/[id]/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="notifications/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="place-sheet"
                options={{
                  headerShown: false,
                  sheetGrabberVisible: true,
                  sheetAllowedDetents: [0.35, 0.6],
                  contentStyle: {
                    backgroundColor: isLiquidGlassAvailable()
                      ? "transparent"
                      : colorScheme === "dark"
                        ? Colors.dark.card
                        : Colors.light.card,
                  },
                  headerTransparent: Platform.OS === "ios" ? true : false,
                  headerLargeTitle: false,
                  title: "",
                  presentation:
                    Platform.OS === "ios"
                      ? isLiquidGlassAvailable() && osName !== "iPadOS"
                        ? "formSheet"
                        : "modal"
                      : "modal",
                  sheetInitialDetentIndex: 0,
                  headerStyle: {
                    backgroundColor:
                      Platform.OS === "ios"
                        ? "transparent"
                        : colorScheme === "dark"
                          ? Colors.dark.card
                          : Colors.light.card,
                  },
                  headerBlurEffect: isLiquidGlassAvailable()
                    ? undefined
                    : colorScheme === "dark"
                      ? "dark"
                      : "light",
                }}
              />

              <Stack.Screen
                name="sheet"
                options={{
                  headerShown: false,
                  sheetGrabberVisible: true,
                  sheetAllowedDetents: [0.4, 0.7, 1],
                  contentStyle: {
                    backgroundColor: isLiquidGlassAvailable()
                      ? "transparent"
                      : colorScheme === "dark"
                        ? Colors.dark.card
                        : Colors.light.card,
                  },
                  headerTransparent: Platform.OS === "ios" ? true : false,
                  headerLargeTitle: false,
                  title: "",
                  presentation:
                    Platform.OS === "ios"
                      ? isLiquidGlassAvailable() && osName !== "iPadOS"
                        ? "formSheet"
                        : "modal"
                      : "modal",
                  sheetInitialDetentIndex: 0,
                  headerStyle: {
                    backgroundColor:
                      Platform.OS === "ios"
                        ? "transparent"
                        : colorScheme === "dark"
                          ? Colors.dark.card
                          : Colors.light.card,
                  },
                  headerBlurEffect: isLiquidGlassAvailable()
                    ? undefined
                    : colorScheme === "dark"
                      ? "dark"
                      : "light",
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </TimetableProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
