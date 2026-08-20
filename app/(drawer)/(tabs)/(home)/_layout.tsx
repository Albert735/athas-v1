import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="popular-places/index" />
      <Stack.Screen
        name="place-sheet"
        options={{
          presentation: "formSheet",
          headerShown: false,
          sheetAllowedDetents: [0.85, 1],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
