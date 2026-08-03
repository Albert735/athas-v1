import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
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
import { ModeToggle } from "../ui/mode-toggle";
import { useColor } from "@/hooks/useColor";

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

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const iconColor = useColor("icon");

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

  const handleLogout = () => {
    props.navigation.closeDrawer();
    router.replace("/(auth)/sign-in");
  };

  const content = (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Profile */}
      <View style={[styles.profile, { borderBottomColor: borderColor }]}>
        <View style={[styles.avatar, { backgroundColor: cardColor }]}>
          <User size={24} color={textColor} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: textColor }]}>
            Lamine Yamal
          </Text>
          <Text style={[styles.profileSub, { color: iconColor }]}>
            University of Ghana
          </Text>
        </View>

        {/* On Campus badge */}
        <View
          style={[
            styles.profileBadge,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <MapPin size={11} color={iconColor} />
          <Text style={[styles.profileBadgeText, { color: iconColor }]}>
            On Campus
          </Text>
        </View>

        {/* Mode toggle */}
        <View style={styles.modeToggle}>
          <Text style={[styles.menuLabel, { color: iconColor }]}>
            Toggle mode
          </Text>
          <ModeToggle />
        </View>
      </View>

      {/* Menu */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {MENU_ITEMS.map((section) => (
          <View key={section.section} style={styles.section}>
            <Text style={[styles.sectionLabel, { color: iconColor }]}>
              {section.section}
            </Text>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuItem, { borderBottomColor: borderColor }]}
                  activeOpacity={0.7}
                  onPress={() => handlePress(item.id)}
                >
                  <View style={styles.menuItemLeft}>
                    <View
                      style={[styles.menuIcon, { backgroundColor: cardColor }]}
                    >
                      <Icon size={18} color={textColor} />
                    </View>
                    <Text style={[styles.menuLabel, { color: textColor }]}>
                      {item.label}
                    </Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.badge ? (
                      <View style={styles.notifBadge}>
                        <Text style={styles.notifBadgeText}>{item.badge}</Text>
                      </View>
                    ) : null}
                    <ChevronRight size={16} color={iconColor} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.logout, { backgroundColor: cardColor, borderColor }]}
        activeOpacity={0.7}
        onPress={handleLogout}
      >
        <LogOut size={18} color="#EF4444" />
        <Text style={[styles.logoutText, { color: textColor }]}>Log Out</Text>
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

  return <View style={[styles.glass, { backgroundColor }]}>{content}</View>;
}

const styles = StyleSheet.create({
  glass: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  profile: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 10,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    gap: 3,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "700",
  },
  profileSub: {
    fontSize: 13,
  },
  profileBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  profileBadgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  modeToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 8,
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
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
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
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  notifBadge: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  notifBadgeText: {
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
    borderWidth: 1,
    borderRadius: 200,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
