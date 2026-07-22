import { Stack } from "expo-router";

export default function ScheduleLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="add-class/index" />
      <Stack.Screen name="scheduled-class-list/index" />
      <Stack.Screen name="[Id]/index" />
    </Stack>
  );
}
