import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="popular-places/index" />
      <Stack.Screen
        name="maps-sheet/index"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.5, 1],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
