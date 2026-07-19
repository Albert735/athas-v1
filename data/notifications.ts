import type { Notification } from "@/api/types/notification";

export const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Library books due tomorrow",
    message: "Your borrowed books from Balme Library are due for return by 5:00 PM tomorrow. Avoid late fees by returning them on time.",
    type: "reminder",
    status: "unread",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
  },
  {
    id: "2",
    title: "Project presentation submitted",
    message: "Your CSCD 301 group project presentation has been successfully submitted to the department portal.",
    type: "reminder",
    status: "read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "3",
    title: "Math assignment due Friday",
    message: "MATH 251 Problem Set #4 is due this Friday at 11:59 PM. Submit via the online portal.",
    type: "reminder",
    status: "unread",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "4",
    title: "Course registration completed",
    message: "You have successfully registered for 5 courses for the 2025/2026 academic year, second semester.",
    type: "announcement",
    status: "read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "5",
    title: "Campus health screening",
    message: "Mandatory health screening at the University Hospital. Walk-ins accepted between 9 AM – 4 PM.",
    type: "announcement",
    status: "unread",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "6",
    title: "Hostel fees payment confirmed",
    message: "Your hostel accommodation fees for Mensah Sarbah Hall have been received and confirmed.",
    type: "announcement",
    status: "read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
];
