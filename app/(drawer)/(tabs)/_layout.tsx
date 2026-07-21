import { Tabs } from "expo-router";
import { useColor } from "@/hooks/useColor";
import Feather from "@expo/vector-icons/Feather";

export default function TabsLayout() {
  const red = useColor("red");
  const primary = useColor("primary");
  const foreground = useColor("foreground");
  const background = useColor("background");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: foreground,
        tabBarInactiveTintColor: primary,
        tabBarStyle: {
          backgroundColor: background,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />

      {/* Schedule */}
      <Tabs.Screen
        name="(schedule)"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={24} color={color} />
          ),
        }}
      />

      {/* Map - Tab icon shows on other tabs, but tab bar is hidden when on Map screen */}
      <Tabs.Screen
        name="(map)"
        options={{
          title: "Map",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <Feather name="map" size={24} color={color} />
          ),
        }}
      />

      {/* NearBy */}
      <Tabs.Screen
        name="(nearby)"
        options={{
          title: "Near",
          tabBarBadge: 1,
          tabBarBadgeStyle: { backgroundColor: red },
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={24} color={color} />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />

      {/* Search */}
      <Tabs.Screen
        name="(search)"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
