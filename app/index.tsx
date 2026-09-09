// File: index.tsx – purpose: Redirects initial application entry point to the main tab-based navigation layout.
import { Redirect } from "expo-router";

/**
 * Root Entry Redirect
 *
 * Automatically redirects initial application route to main drawer tab structure.
 */
export default function Index() {
  return <Redirect href="/(drawer)/(tabs)/(home)" />;
}
