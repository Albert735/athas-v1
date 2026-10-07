import { doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { db } from "@/constants/firebase";
import { useAuth } from "@/providers/auth-context";
import type { Reminder } from "@/types/reminder";
import type { ReminderFormData } from "@/schemas/reminder";

type StoredReminder = Omit<Reminder, "dateTime" | "createdAt"> & {
  dateTime: string;
  createdAt: string;
};

type RemindersContextValue = {
  reminders: Reminder[];
  getReminder: (id: string) => Reminder | undefined;
  addReminder: (data: ReminderFormData) => Reminder;
  updateReminder: (id: string, data: ReminderFormData) => void;
  deleteReminder: (id: string) => void;
  toggleReminder: (id: string) => void;
};

const RemindersContext = createContext<RemindersContextValue | undefined>(
  undefined,
);

function toStored(reminder: Reminder): StoredReminder {
  return {
    ...reminder,
    dateTime: (reminder.dateTime ?? new Date()).toISOString(),
    createdAt: reminder.createdAt.toISOString(),
  };
}

function fromStored(reminder: StoredReminder): Reminder {
  return {
    ...reminder,
    dateTime: new Date(reminder.dateTime),
    createdAt: new Date(reminder.createdAt),
  };
}

/**
 * Reminders live in Firestore at users/{uid}/data/reminders, so they follow
 * the student's account instead of the phone.
 */
export function RemindersProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const remindersRef = useRef<Reminder[]>([]);

  useEffect(() => {
    remindersRef.current = [];
    setReminders([]);

    if (!uid) return;

    return onSnapshot(
      doc(db, "users", uid, "data", "reminders"),
      (snapshot) => {
        const stored = snapshot.data()?.items;
        const next: Reminder[] = Array.isArray(stored)
          ? (stored as StoredReminder[]).map(fromStored)
          : [];

        remindersRef.current = next;
        setReminders(next);
      },
      (error) => console.error("Failed to load reminders:", error),
    );
  }, [uid]);

  const commit = useCallback(
    (next: Reminder[]) => {
      remindersRef.current = next;
      setReminders(next);

      if (!uid) return;

      const items = JSON.parse(JSON.stringify(next.map(toStored)));

      setDoc(doc(db, "users", uid, "data", "reminders"), { items }).catch(
        (error) => console.error("Failed to save reminders:", error),
      );
    },
    [uid],
  );

  const getReminder = useCallback(
    (id: string) => remindersRef.current.find((item) => item.id === id),
    [],
  );

  const addReminder = useCallback(
    (data: ReminderFormData) => {
      const newReminder: Reminder = {
        id: Date.now().toString(),
        note: data.note,
        building: data.building,
        latitude: data.latitude,
        longitude: data.longitude,
        dateTime: data.dateTime,
        alertNearby: data.alertNearby,
        completed: false,
        createdAt: new Date(),
      };

      commit([newReminder, ...remindersRef.current]);

      return newReminder;
    },
    [commit],
  );

  const updateReminder = useCallback(
    (id: string, data: ReminderFormData) => {
      commit(
        remindersRef.current.map((item) =>
          item.id === id
            ? {
                ...item,
                note: data.note,
                building: data.building,
                latitude: data.latitude,
                longitude: data.longitude,
                dateTime: data.dateTime,
                alertNearby: data.alertNearby,
              }
            : item,
        ),
      );
    },
    [commit],
  );

  const deleteReminder = useCallback(
    (id: string) => {
      commit(remindersRef.current.filter((item) => item.id !== id));
    },
    [commit],
  );

  const toggleReminder = useCallback(
    (id: string) => {
      commit(
        remindersRef.current.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item,
        ),
      );
    },
    [commit],
  );

  const value = useMemo(
    () => ({
      reminders,
      getReminder,
      addReminder,
      updateReminder,
      deleteReminder,
      toggleReminder,
    }),
    [
      reminders,
      getReminder,
      addReminder,
      updateReminder,
      deleteReminder,
      toggleReminder,
    ],
  );

  return (
    <RemindersContext.Provider value={value}>
      {children}
    </RemindersContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(RemindersContext);

  if (!context) {
    throw new Error("useReminders must be used inside RemindersProvider");
  }

  return context;
}
