import { Redirect } from "expo-router";

/**
 * Root Entry Redirect
 * 
 * Automatically redirects initial application route to main drawer tab structure.
 */
export default function Index() {
  return <Redirect href="/(drawer)" />;
}
