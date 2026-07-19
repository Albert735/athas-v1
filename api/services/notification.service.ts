import type { Notification } from "../types/notification";

export async function getNotifications(): Promise<Notification[]> {
  return [
    {
      id: "1",
      title: "Payment failed",
      message:
        "Your payment could not be completed. Try again. Do not use vpn when using this application",
      type: "warning",
      status: "unread",
      createdAt: "2026-07-18T14:20:00",
    },
    {
      id: "2",
      title: "System maintenance",
      message: "The app will be unavailable at 12:00 AM.",
      type: "system",
      status: "read",
      createdAt: "2026-07-17T10:00:00",
    },
    {
      id: "3",
      title: "New login detected",
      message: "A new device logged into your account.",
      type: "security",
      status: "unread",
      createdAt: "2026-07-18T14:20:00",
    },
  ];
}
