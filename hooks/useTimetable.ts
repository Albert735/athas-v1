import { useState } from "react";

export function useTimetable() {
  const [classes, setClasses] = useState<any[]>([]);

  return {
    classes,
    setClasses,
  };
}
