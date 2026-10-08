import { useSyncExternalStore } from "react";

import {
  getSimulatedLocation,
  subscribeSimulatedLocation,
} from "@/utils/simulated-walk";

/** The fake position while a simulated walk is running, otherwise null. */
export function useSimulatedLocation() {
  return useSyncExternalStore(
    subscribeSimulatedLocation,
    getSimulatedLocation,
    getSimulatedLocation,
  );
}
