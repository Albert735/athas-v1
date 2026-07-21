import { Tabs } from "expo-router";
import { useColor } from "@/hooks/useColor";
import {
  House,
  CalendarDays,
  Map,
  Heart,
  CircleUser,
  Search,
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
        name="(schedule)"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => <CalendarDays size={24} color={color} />,
        }}
      />

      {/* Map - Tab icon shows on other tabs, but tab bar is hidden when on Map screen */}
      <Tabs.Screen
        name="(map)"
        options={{
          title: "Map",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="(nearby)"
        options={{
          title: "Nearby",
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <CircleUser size={24} color={color} />,
        }}
      />

      {/* Search tab exists as a route but is hidden from the tab bar */}
      <Tabs.Screen
        name="(search)"
        options={{
          title: "Search",
          href: null,
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
