import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Header } from "@/components/shared/screen/header";
import { NotificationIcon } from "@/components/notifications/notification-icon";
import { formatNotificationTime } from "@/utils/format-notification-time";
import type { Notification } from "@/api/types/notification";

export default function NotificationDetails() {
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    message?: string;
    type?: string;
    status?: string;
    createdAt?: string;
  }>();

  if (!params.title || !params.message) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Notification Details" showBack />
        <View style={styles.center}>
          <Text style={styles.errorText}>Notification details not found.</Text>
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
    <SafeAreaView style={styles.container}>
      <Header title="Notification Details" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.iconContainer}>
              <NotificationIcon type={notification.type} />
            </View>
            <View style={styles.meta}>
              <Text style={styles.typeText}>
                {notification.type.toUpperCase()}
              </Text>
              <Text style={styles.timeText}>
                {formatNotificationTime(notification.createdAt)}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.message}>{notification.message}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
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
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 24,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
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
    color: "#9CA3AF",
    letterSpacing: 1,
  },
  timeText: {
    fontSize: 13,
    color: "#6B7280",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 28,
  },
  message: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
  },
});
