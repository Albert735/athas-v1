import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { NotificationList } from "@/components/notifications/NotificationList";
import { useNotifications } from "@/hooks/useNotifications";

const FILTERS = ["All", "Unread", "Security", "System"] as const;

export default function NotificationsScreen() {
  const { notifications, loading, filter, setFilter, refresh } =
    useNotifications();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notifications" showBack />

      {/* FILTER PILLS */}
      <View style={styles.filters}>
        {FILTERS.map((item) => {
          const active = filter === item;

          return (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[styles.pill, active && styles.activePill]}
            >
              <Text style={[styles.pillText, active && styles.activeText]}>
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
    backgroundColor: "#fff",
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
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  activePill: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  pillText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },

  activeText: {
    color: "#fff",
  },
});
