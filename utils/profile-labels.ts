import { schools } from "@/data/school";
import { departmentsBySchool } from "@/data/department";

/**
 * Profiles store stable IDs (e.g. school "ug", department "computer_science").
 * These helpers turn them back into the labels shown in the UI.
 */

export function getSchoolLabel(school?: string): string | undefined {
  if (!school) return undefined;
  return schools.find((item) => item.value === school)?.label;
}

export function getDepartmentLabel(
  school?: string,
  department?: string,
): string | undefined {
  if (!school || !department) return undefined;
  return departmentsBySchool[school]?.find((item) => item.value === department)
    ?.label;
}

/** "Quaye Andrews Albert" → "QA" (first + last name), "Albert" → "AL". */
export function getInitials(name?: string | null): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
