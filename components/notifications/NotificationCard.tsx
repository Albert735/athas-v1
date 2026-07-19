import { View, Text, StyleSheet, Pressable } from "react-native";

import type { Notification } from "@/api/types/notification";

import { NotificationIcon } from "./notification-icon";

import { formatNotificationTime } from "@/utils/format-notification-time";
import { router } from "expo-router";

interface Props {
  notification: Notification;
}

export function NotificationCard({ notification }: Props) {
  return (
    <Pressable
      style={[styles.card, notification.status === "unread" && styles.unread]}
      onPress={() =>
        router.push({
          pathname: "/notifications/notification-details",
          params: {
            id: notification.id,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            status: notification.status,
            createdAt: notification.createdAt,
          },
        })
      }
    >
      <View style={styles.icon}>
        <NotificationIcon type={notification.type} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.time}>
            {formatNotificationTime(notification.createdAt)}
          </Text>
        </View>

        <Text style={styles.message}>{notification.message}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  unread: {
    backgroundColor: "#F9FAFB",
  },

  icon: {
    marginTop: 2,
    marginRight: 8,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },

  message: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  time: {
    // marginTop: 8,
    fontSize: 12,
    color: "#9CA3AF",
  },
});
