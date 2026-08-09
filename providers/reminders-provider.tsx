import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Reminder } from "@/types/reminder";
import type { ReminderFormData } from "@/schemas/reminder";
import { reminders as initialReminders } from "@/data/reminders";

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
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const getReminder = (id: string) => {
    return reminders.find((reminder) => reminder.id === id);
  };

  const addReminder = (data: ReminderFormData) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      note: data.note,
      building: data.building,
      dateTime: data.dateTime,
      alertNearby: data.alertNearby,
      completed: false,
      createdAt: new Date(),
    };

    setReminders((current) => [newReminder, ...current]);

    return newReminder;
  };

  const updateReminder = (id: string, data: ReminderFormData) => {
    setReminders((currentReminders) =>
      currentReminders.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              ...data,
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
