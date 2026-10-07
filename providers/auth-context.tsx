import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/constants/firebase";
import {
  logOut,
  resetPassword,
  signIn,
  signUp,
  subscribeToAuthState,
  updateUserProfile,
  type SignUpInput,
  type UserProfile,
} from "@/services/auth-service";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  /** True until Firebase has restored (or ruled out) a saved session. */
  loading: boolean;
  signUp: (input: SignUpInput) => Promise<void>;
  signIn: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (
    data: Parameters<typeof updateUserProfile>[1],
  ) => Promise<void>;
}

/** "false" means: end the session the next time the app is opened. */
const REMEMBER_ME_KEY = "@raute/remember-me";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Track the signed-in user.
  useEffect(() => {
    let firstEvent = true;

    const unsubscribe = subscribeToAuthState(async (nextUser) => {
      // On app launch, honour an unticked "Remember me" from the last sign-in
      // by ending the restored session.
      if (firstEvent) {
        firstEvent = false;

        if (nextUser) {
          try {
            const remember = await AsyncStorage.getItem(REMEMBER_ME_KEY);

            if (remember === "false") {
              await logOut();
              return; // the null auth event that follows updates the state
            }
          } catch {
            // If the flag can't be read, keep the session.
          }
        }
      }

      setUser(nextUser);
      if (!nextUser) {
        setProfile(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // 2. Live-subscribe to the user's Firestore profile. A snapshot listener
  //    (instead of a one-off read) handles sign-up, where the auth event
  //    fires before the profile document has been written.
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snapshot) => {
        setProfile(snapshot.exists() ? (snapshot.data() as UserProfile) : null);
        setLoading(false);
      },
      (error) => {
        console.warn("Failed to load profile:", error);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [user]);

  const handleUpdateProfile = useCallback(
    async (data: Parameters<typeof updateUserProfile>[1]) => {
      if (!user) throw new Error("Not signed in");
      await updateUserProfile(user.uid, data);
    },
    [user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      signUp: async (input) => {
        await signUp(input);
        AsyncStorage.setItem(REMEMBER_ME_KEY, "true").catch(() => {});
      },
      signIn: async (email, password, rememberMe = true) => {
        await signIn(email, password);
        AsyncStorage.setItem(REMEMBER_ME_KEY, String(rememberMe)).catch(
          () => {},
        );
      },
      resetPassword,
      signOut: logOut,
      updateProfile: handleUpdateProfile,
    }),
    [user, profile, loading, handleUpdateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
