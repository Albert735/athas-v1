import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Reminder } from "@/types/reminder";
import type { ReminderFormData } from "@/schemas/reminder";

const REMINDERS_STORAGE_KEY = "@athas/reminders";

type StoredReminder = Omit<Reminder, "dateTime" | "createdAt"> & {
  dateTime: string;
  createdAt: string;
};

type RemindersContextValue = {
  reminders: Reminder[];
  loading: boolean;
  getReminder: (id: string) => Reminder | undefined;
  addReminder: (data: ReminderFormData) => Promise<Reminder>;
  updateReminder: (id: string, data: ReminderFormData) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
  toggleReminder: (id: string) => Promise<void>;
};

const RemindersContext = createContext<RemindersContextValue | undefined>(
  undefined,
);

export function RemindersProvider({ children }: { children: ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const stored = await AsyncStorage.getItem(REMINDERS_STORAGE_KEY);

        if (!stored) {
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
        setLoading(false);
      }
    };

    loadReminders();
  }, []);

  const persistReminders = useCallback(async (items: Reminder[]) => {
    await AsyncStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(items));
  }, []);

  const getReminder = useCallback(
    (id: string) => {
      return reminders.find((reminder) => reminder.id === id);
    },
    [reminders],
  );

  const addReminder = useCallback(
    async (data: ReminderFormData) => {
      const reminder: Reminder = {
        id: Date.now().toString(),
        note: data.note,
        placeId: data.placeId,
        building: data.building,
        buildingLatitude: data.buildingLatitude,
        buildingLongitude: data.buildingLongitude,
        dateTime: data.dateTime,
        alertNearby: data.alertNearby,
        completed: false,
        createdAt: new Date(),
      };

      const updated = [reminder, ...reminders];

      setReminders(updated);
      await persistReminders(updated);

      return reminder;
    },
    [reminders, persistReminders],
  );

  const updateReminder = useCallback(
    async (id: string, data: ReminderFormData) => {
      const updated = reminders.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              ...data,
            }
          : reminder,
      );

      setReminders(updated);
      await persistReminders(updated);
    },
    [reminders, persistReminders],
  );

  const deleteReminder = useCallback(
    async (id: string) => {
      const updated = reminders.filter((reminder) => reminder.id !== id);

      setReminders(updated);
      await persistReminders(updated);
    },
    [reminders, persistReminders],
  );

  const toggleReminder = useCallback(
    async (id: string) => {
      const updated = reminders.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              completed: !reminder.completed,
            }
          : reminder,
      );

      setReminders(updated);
      await persistReminders(updated);
    },
    [reminders, persistReminders],
  );

  const value = useMemo(
    () => ({
      reminders,
      loading,
      getReminder,
      addReminder,
      updateReminder,
      deleteReminder,
      toggleReminder,
    }),
    [
      reminders,
      loading,
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
