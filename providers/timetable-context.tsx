import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ScheduledClass } from "@/types/class";

const TIMETABLE_STORAGE_KEY = "@athas/timetable";

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

export function TimetableProvider({ children }: { children: React.ReactNode }) {
  const [classes, setClasses] = useState<ScheduledClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const storedClasses = await AsyncStorage.getItem(TIMETABLE_STORAGE_KEY);

        if (storedClasses) {
          setClasses(JSON.parse(storedClasses));
        }
      } catch (error) {
        console.error("Failed to load timetable:", error);
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  const persistClasses = useCallback(
    async (updatedClasses: ScheduledClass[]) => {
      try {
        await AsyncStorage.setItem(
          TIMETABLE_STORAGE_KEY,
          JSON.stringify(updatedClasses),
        );
      } catch (error) {
        console.error("Failed to save timetable:", error);
        throw error;
      }
    },
    [],
  );

  const addClass = useCallback(
    async (newClasses: ScheduledClass[]) => {
      setClasses((currentClasses) => {
        const updatedClasses = [...currentClasses, ...newClasses];

        persistClasses(updatedClasses).catch((error) => {
          console.error("Failed to persist new classes:", error);
        });

        return updatedClasses;
      });
    },
    [persistClasses],
  );

  const updateClass = useCallback(
    async (id: string, updates: Partial<ScheduledClass>) => {
      setClasses((currentClasses) => {
        const updatedClasses = currentClasses.map((item) =>
          item.id === id ? { ...item, ...updates } : item,
        );

        persistClasses(updatedClasses).catch((error) => {
          console.error("Failed to persist updated class:", error);
        });

        return updatedClasses;
      });
    },
    [persistClasses],
  );

  const deleteClass = useCallback(
    async (id: string) => {
      setClasses((currentClasses) => {
        const updatedClasses = currentClasses.filter((item) => item.id !== id);

        persistClasses(updatedClasses).catch((error) => {
          console.error("Failed to persist deleted class:", error);
        });

        return updatedClasses;
      });
    },
    [persistClasses],
  );

  const clearClasses = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(TIMETABLE_STORAGE_KEY);
      setClasses([]);
    } catch (error) {
      console.error("Failed to clear timetable:", error);
      throw error;
    }
  }, []);

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
