export type NotificationType =
  | "warning"
  | "system"
  | "security"
  | "announcement"
  | "reminder";

export type NotificationStatus = "read" | "unread";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  createdAt: string;
}

export type NotificationFilter = "All" | "Unread" | "Security" | "System";
