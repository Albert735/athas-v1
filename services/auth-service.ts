import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/constants/firebase";

export type UserRole = "student" | "guest";

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  universityId: string;
  role: UserRole;
  createdAt?: unknown;
  // Filled in during profile-setup. Empty until the student completes it.
  school?: string;
  department?: string;
  level?: string;
  // Map-category preferences from the Profile tab, keyed by preference id.
  preferences?: Record<string, boolean>;
}

export interface SignUpInput {
  fullName: string;
  email: string;
  universityId: string;
  password: string;
}

/** Turns Firebase error codes into messages a student can act on. */
export function getAuthErrorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code ?? "";

  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 8 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "No internet connection. Check your network and try again.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export async function signUp({
  fullName,
  email,
  universityId,
  password,
}: SignUpInput): Promise<User> {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );

  try {
    await updateProfile(credential.user, { displayName: fullName.trim() });

    const profile: Omit<UserProfile, "createdAt"> = {
      uid: credential.user.uid,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      universityId,
      role: "student",
    };

    await setDoc(doc(db, "users", credential.user.uid), {
      ...profile,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    // Don't leave an account behind that has no profile document
    // (e.g. Firestore rules not published yet, or the network dropped).
    await credential.user.delete().catch(() => {});
    throw error;
  }

  return credential.user;
}

export async function signIn(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );
  return credential.user;
}

/** Firebase emails a reset link. It does not use a numeric OTP. */
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email.trim().toLowerCase());
}

export async function logOut(): Promise<void> {
  await signOut(auth);
}

/** Merges extra fields (programme, level, hall) into the user's profile. */
export async function updateUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, "uid" | "role" | "createdAt">>,
): Promise<void> {
  await setDoc(doc(db, "users", uid), data, { merge: true });
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
