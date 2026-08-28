import { z } from "zod";

export const reminderSchema = z.object({
  note: z.string().min(1, "Please enter a reminder note"),

  placeId: z.string().min(1, "Please select a location"),

  building: z.string().min(1, "Please select a location"),

  buildingLatitude: z.number(),

  buildingLongitude: z.number(),

  dateTime: z.date({
    message: "Please select a date and time",
  }),

  alertNearby: z.boolean(),
});

export type ReminderFormData = z.infer<typeof reminderSchema>;
