import { z } from "zod";

export const profileSetupSchema = z.object({
  school: z.string().min(1, "Please select your school"),
  department: z.string().min(1, "Please select your department"),
  level: z.string().min(1, "Please select your academic level"),
});

export type ProfileSetupData = z.infer<typeof profileSetupSchema>;
