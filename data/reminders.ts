import type { Reminder } from "@/types/reminder";

export const reminders: Reminder[] = [
  {
    id: "1",
    note: "Meeting at Student Hub",
    building: "NNB, Room 2",
    dateTime: new Date("2026-08-08T10:45:00"),
    alertNearby: true,
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    note: "Pick up Lab Results",
    building: "GCB",
    dateTime: new Date("2026-08-08T10:45:00"),
    alertNearby: true,
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "3",
    note: "Study",
    building: "JQB",
    dateTime: new Date("2026-08-08T10:45:00"),
    alertNearby: false,
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "4",
    note: "Meeting Course Rep",
    building: "LOT1",
    dateTime: new Date("2026-08-08T10:45:00"),
    alertNearby: false,
    completed: true,
    createdAt: new Date(),
  },
];
