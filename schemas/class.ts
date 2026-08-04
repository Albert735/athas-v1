import { z } from "zod";

export const addClassSchema = z
  .object({
    courseName: z.string().min(1, "Course name is required"),
    courseCode: z
      .string()
      .min(1, "Course code is required")
      .regex(/^[A-Z]+ ?\d+$/i, "Enter a valid course code (e.g. MATH 101)"),
    building: z.string().min(1, "Please select a building"),
    hall: z.string().min(1, "Please select a room or hall"),
    repeatEnabled: z.boolean(),
    selectedDays: z.array(z.string()),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    repeatType: z.string().min(1, "Repeat pattern is required"),
  })
  .refine((data) => !data.repeatEnabled || data.selectedDays.length > 0, {
    message: "Select at least one day",
    path: ["selectedDays"],
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export type AddClassData = z.infer<typeof addClassSchema>;
