import { useCallback, useEffect, useState } from "react";
import type {
  Notification,
  NotificationFilter,
} from "@/api/types/notification";
import { getNotifications } from "@/api/services/notification.service";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<NotificationFilter>("All");

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const filtered = notifications.filter((item) => {
    if (filter === "Unread") return item.status === "unread";
    if (filter === "Security") return item.type === "security";
    if (filter === "System") return item.type === "system";
    return true;
  });

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" as const } : n)),
    );
  }, []);

  return {
    notifications: filtered,
    allNotifications: notifications,
    loading,
    filter,
    setFilter,
    refresh: loadNotifications,
    markAsRead,
  };
}
