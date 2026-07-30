import { View, Text, StyleSheet, Pressable } from "react-native";
import type { Notification } from "@/api/types/notification";
import { NotificationIcon } from "./notification-icon";
import { formatNotificationTime } from "@/utils/format-notification-time";
import { router } from "expo-router";
import { useColor } from "@/hooks/useColor";

interface Props {
  notification: Notification;
}

export function NotificationCard({ notification }: Props) {
  const cardColor = useColor("card");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: cardColor, borderColor },
        // notification.status === "unread" && {
        //   backgroundColor: "#",
        //   borderColor: "#BFDBFE",
        // },
      ]}
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
          <Text style={[styles.title, { color: textColor }]}>
            {notification.title}
          </Text>
          <Text style={[styles.time, { color: mutedColor }]}>
            {formatNotificationTime(notification.createdAt)}
          </Text>
        </View>
        <Text style={[styles.message, { color: mutedColor }]}>
          {notification.message}
        </Text>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  message: {
    marginTop: 4,
    fontSize: 14,
  },
  time: {
    fontSize: 12,
  },
});
