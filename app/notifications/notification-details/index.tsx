import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Header } from "@/components/shared/screen/header";
import { NotificationIcon } from "@/components/notifications/notification-icon";
import { formatNotificationTime } from "@/utils/format-notification-time";
import { useColor } from "@/hooks/useColor";

export default function NotificationDetails() {
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    message?: string;
    type?: string;
    status?: string;
    createdAt?: string;
  }>();

  const backgroundColor = useColor("background");
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");
  const iconColor = useColor("icon");

  if (!params.title || !params.message) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <Header title="Notification Details" showBack />
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: mutedColor }]}>
            Notification details not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const notification = {
    id: params.id || "",
    title: params.title,
    message: params.message,
    type: (params.type as any) || "system",
    status: (params.status as any) || "read",
    createdAt: params.createdAt || new Date().toISOString(),
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Notification Details" showBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={[styles.card, { backgroundColor: cardColor, borderColor }]}
        >
          <View style={[styles.headerRow, { borderBottomColor: borderColor }]}>
            <View style={[styles.iconContainer, { backgroundColor }]}>
              <NotificationIcon type={notification.type} />
            </View>
            <View style={styles.meta}>
              <Text style={[styles.typeText, { color: mutedColor }]}>
                {notification.type.toUpperCase()}
              </Text>
              <Text style={[styles.timeText, { color: mutedColor }]}>
                {formatNotificationTime(notification.createdAt)}
              </Text>
            </View>
          </View>

          <Text style={[styles.title, { color: textColor }]}>
            {notification.title}
          </Text>
          <Text style={[styles.message, { color: mutedColor }]}>
            {notification.message}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  timeText: {
    fontSize: 13,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  message: {
    fontSize: 15,
    lineHeight: 24,
  },
});
