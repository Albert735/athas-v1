import { doc, onSnapshot, setDoc } from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { db } from "@/constants/firebase";
import { useAuth } from "@/providers/auth-context";
import type { ScheduledClass } from "@/types/class";

interface TimetableContextValue {
  classes: ScheduledClass[];
  loading: boolean;
  addClass: (newClasses: ScheduledClass[]) => Promise<void>;
  updateClass: (id: string, updates: Partial<ScheduledClass>) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
  clearClasses: () => Promise<void>;
}

const TimetableContext = createContext<TimetableContextValue | undefined>(
  undefined,
);

/**
 * The student's timetable lives in Firestore at users/{uid}/data/timetable,
 * so it follows their account instead of the phone.
 */
export function TimetableProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [classes, setClasses] = useState<ScheduledClass[]>([]);
  const [loading, setLoading] = useState(true);

  // Always holds the latest list so rapid edits never work from stale data.
  const classesRef = useRef<ScheduledClass[]>([]);

  useEffect(() => {
    classesRef.current = [];
    setClasses([]);

    if (!uid) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      doc(db, "users", uid, "data", "timetable"),
      (snapshot) => {
        const stored = snapshot.data()?.classes;
        const next: ScheduledClass[] = Array.isArray(stored) ? stored : [];

        classesRef.current = next;
        setClasses(next);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to load timetable:", error);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [uid]);

  const commit = useCallback(
    async (next: ScheduledClass[]) => {
      if (!uid) throw new Error("You must be signed in to edit your timetable.");

      // Show the change immediately; Firestore confirms in the background.
      classesRef.current = next;
      setClasses(next);

      // JSON round-trip drops `undefined` values, which Firestore rejects.
      const clean = JSON.parse(JSON.stringify(next));

      await setDoc(doc(db, "users", uid, "data", "timetable"), {
        classes: clean,
      });
    },
    [uid],
  );

  const addClass = useCallback(
    (newClasses: ScheduledClass[]) =>
      commit([...classesRef.current, ...newClasses]),
    [commit],
  );

  const updateClass = useCallback(
    (id: string, updates: Partial<ScheduledClass>) =>
      commit(
        classesRef.current.map((item) =>
          item.id === id ? { ...item, ...updates } : item,
        ),
      ),
    [commit],
  );

  const deleteClass = useCallback(
    (id: string) =>
      commit(classesRef.current.filter((item) => item.id !== id)),
    [commit],
  );

  const clearClasses = useCallback(() => commit([]), [commit]);

  const value = useMemo(
    () => ({
      classes,
      loading,
      addClass,
      updateClass,
      deleteClass,
      clearClasses,
    }),
    [classes, loading, addClass, updateClass, deleteClass, clearClasses],
  );

  return (
    <TimetableContext.Provider value={value}>
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetable() {
  const context = useContext(TimetableContext);

  if (!context) {
    throw new Error("useTimetable must be used inside a TimetableProvider");
  }

  return context;
}
