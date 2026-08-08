import { z } from "zod";

export const reminderSchema = z
  .object({
    note: z.string().min(1, "Please enter a reminder note"),
    building: z.string().min(1, "Please select a location"),
    dateTime: z.date().optional(),
    alertNearby: z.boolean(),
  })
  .refine((data) => data.alertNearby || data.dateTime, {
    message: "Set a date/time or enable 'Alert me when nearby'",
    path: ["dateTime"],
  });

export type ReminderFormData = z.infer<typeof reminderSchema>;
