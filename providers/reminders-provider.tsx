import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Reminder } from "@/types/reminder";
import type { ReminderFormData } from "@/schemas/reminder";

const STORAGE_KEY = "@athas_reminders";

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

export function RemindersProvider({ children }: { children: ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        if (!stored) {
          setHydrated(true);
          return;
        }

        const parsed: StoredReminder[] = JSON.parse(stored);

        const restored: Reminder[] = parsed.map((reminder) => ({
          ...reminder,
          dateTime: new Date(reminder.dateTime),
          createdAt: new Date(reminder.createdAt),
        }));

        setReminders(restored);
      } catch (error) {
        console.error("Failed to load reminders:", error);
      } finally {
        setHydrated(true);
      }
    };

    loadReminders();
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const saveReminders = async () => {
      try {
        const serialized: StoredReminder[] = reminders.map((reminder) => ({
          ...reminder,
          dateTime: reminder.dateTime ? reminder.dateTime.toISOString() : new Date().toISOString(),
          createdAt: reminder.createdAt.toISOString(),
        }));

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
      } catch (error) {
        console.error("Failed to save reminders:", error);
      }
    };

    saveReminders();
  }, [reminders, hydrated]);

  const getReminder = (id: string) => {
    return reminders.find((reminder) => reminder.id === id);
  };

  const addReminder = (data: ReminderFormData) => {
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

    setReminders((current) => [newReminder, ...current]);

    return newReminder;
  };

  const updateReminder = (id: string, data: ReminderFormData) => {
    setReminders((current) =>
      current.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              note: data.note,
              building: data.building,
              latitude: data.latitude,
              longitude: data.longitude,
              dateTime: data.dateTime,
              alertNearby: data.alertNearby,
            }
          : reminder,
      ),
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((current) => current.filter((reminder) => reminder.id !== id));
  };

  const toggleReminder = (id: string) => {
    setReminders((current) =>
      current.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              completed: !reminder.completed,
            }
          : reminder,
      ),
    );
  };

  const value = useMemo(
    () => ({
      reminders,
      getReminder,
      addReminder,
      updateReminder,
      deleteReminder,
      toggleReminder,
    }),
    [reminders],
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
