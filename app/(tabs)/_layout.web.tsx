import { Tabs } from "expo-router";
import { useColor } from "@/hooks/useColor";
import {
  House,
  CalendarDays,
  Map,
  Heart,
  CircleUser,
} from "lucide-react-native";

export default function WebTabsLayout() {
  const primary = useColor("primary");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primary,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => <CalendarDays size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favourite",
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <CircleUser size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
