import { Stack } from "expo-router";
import { useColor } from "@/hooks/useColor";

export default function RemindersLayout() {
  const background = useColor("background");

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="add-reminder/index"
        options={{ presentation: "modal" }}
      />

      <Stack.Screen name="[id]/index" />
    </Stack>
  );
}
