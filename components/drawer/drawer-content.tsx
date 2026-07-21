import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { router } from "expo-router";
import { isLiquidGlassAvailable, GlassView } from "expo-glass-effect";
import { useColorScheme } from "react-native";
import {
  Bell,
  CalendarClock,
  BookMarked,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  User,
  MapPin,
} from "lucide-react-native";
import { usePathname } from "expo-router";
import { ModeToggle } from "../ui/mode-toggle";

const MENU_ITEMS = [
  {
    section: "Activity",
    items: [
      { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
      { id: "reminders", label: "Reminders", icon: CalendarClock },
      { id: "saved", label: "Saved Places", icon: BookMarked },
    ],
  },
  {
    section: "Account",
    items: [
      { id: "profile", label: "My Profile", icon: User },
      { id: "settings", label: "Settings", icon: Settings },
      { id: "help", label: "Help & Support", icon: HelpCircle },
    ],
  },
];

export function DrawerContent(props: DrawerContentComponentProps) {
  const theme = useColorScheme();
  const glassAvailable = isLiquidGlassAvailable();

  const handlePress = (id: string) => {
    props.navigation.closeDrawer();
    switch (id) {
      case "saved":
        router.push("/(drawer)/(tabs)/(nearby)");
        break;
      case "notifications":
        router.push("/notifications");
        break;
      case "profile":
        router.push("/(drawer)/(tabs)/(profile)");
        break;
      case "reminders":
        router.push("/reminders");
        break;
      case "help":
        router.push("/(drawer)/(tabs)/(profile)/help-support");
        break;
    }
  };

  const pathname = usePathname();
  // console.log("current path:", pathname);

  const handleLogout = () => {
    props.navigation.closeDrawer();
    router.replace("/(auth)/sign-in");
  };

  const content = (
    <SafeAreaView style={styles.container}>
      {/* Profile */}
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <User size={24} color="#FFFFFF" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Lamine Yamal</Text>
          <Text style={styles.profileSub}>University of Ghana</Text>
        </View>
        <View style={styles.profileBadge}>
          <MapPin size={11} color="#6B7280" />
          <Text style={styles.profileBadgeText}>On Campus</Text>
        </View>
        <View style={styles.modeToggle}>
          <Text style={styles.menuLabel}>Toggle mode</Text>
          <ModeToggle />
        </View>
      </View>

      {/* Menu */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {MENU_ITEMS.map((section) => (
          <View key={section.section} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.section}</Text>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={() => handlePress(item.id)}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <Icon size={18} color="#374151" />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.badge ? (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    ) : null}
                    <ChevronRight size={16} color="#D1D5DB" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logout}
        activeOpacity={0.7}
        onPress={handleLogout}
      >
        <LogOut size={18} color="#EF4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  if (glassAvailable) {
    return (
      <GlassView
        style={styles.glass}
        colorScheme={theme === "dark" ? "dark" : "light"}
      >
        {content}
      </GlassView>
    );
  }

  return (
    <View style={[styles.glass, { backgroundColor: "#F9FAFB" }]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  glass: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  profile: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(229,231,235,0.6)",
    gap: 10,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    gap: 3,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  profileSub: {
    fontSize: 13,
    color: "#6B7280",
  },
  profileBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  profileBadgeText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  modeToggle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,

    width: "100%",
    justifyContent: "space-between",
  },
  scroll: {
    flex: 1,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(243,244,246,0.8)",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "rgba(243,244,246,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badge: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 20,
    padding: 16,
    backgroundColor: "rgba(254,242,242,0.8)",
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "rgba(254,202,202,0.8)",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#EF4444",
  },
});
