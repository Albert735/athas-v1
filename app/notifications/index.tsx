import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { NotificationList } from "@/components/notifications/NotificationList";
import { useNotifications } from "@/hooks/useNotifications";
import { useColor } from "@/hooks/useColor";

const FILTERS = ["All", "Unread", "Security", "System"] as const;

export default function NotificationsScreen() {
  const { notifications, loading, filter, setFilter, refresh } =
    useNotifications();

  const backgroundColor = useColor("background");
  const activeColor = useColor("primary");
  const cardColor = useColor("card");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Notifications" showBack />

      <View style={styles.filters}>
        {FILTERS.map((item) => {
          const active = filter === item;

          return (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[
                styles.pill,
                {
                  backgroundColor: active ? activeColor : cardColor,
                  borderColor: active ? activeColor : borderColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  {
                    color: active ? "#FFFFFF" : mutedColor,
                  },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <NotificationList
        notifications={notifications}
        refreshing={loading}
        onRefresh={refresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filters: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },

  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },

  pillText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
