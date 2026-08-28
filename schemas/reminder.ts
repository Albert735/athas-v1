import { z } from "zod";

export const reminderSchema = z.object({
  note: z.string().trim().min(1, "Please enter a reminder note"),

  building: z.string().min(1, "Please select a location"),

  latitude: z.number(),

  longitude: z.number(),

  dateTime: z.date({
    message: "Please select a date and time",
  }),

  alertNearby: z.boolean(),
});

export type ReminderFormData = z.infer<typeof reminderSchema>;
