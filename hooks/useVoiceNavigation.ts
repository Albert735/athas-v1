import { useCallback } from "react";

type SpeechModule = typeof import("expo-speech");

let speech: SpeechModule | null | undefined;

// Loaded lazily so the app still runs if the installed dev build
// doesn't include the ExpoSpeech native module (voice is then disabled).
function getSpeech(): SpeechModule | null {
  if (speech !== undefined) return speech;
  try {
    speech = require("expo-speech") as SpeechModule;
  } catch {
    speech = null;
    if (__DEV__) {
      console.warn("expo-speech native module missing — rebuild the dev client to enable voice.");
    }
  }
  return speech;
}

export function useVoiceNavigation() {
  const speak = useCallback((text: string) => {
    const Speech = getSpeech();
    if (!text || !Speech) return;
    Speech.stop();
    Speech.speak(text, { language: "en-US", rate: 0.95, pitch: 1, volume: 1 });
  }, []);

  const stop = useCallback(() => {
    getSpeech()?.stop();
  }, []);

  return { speak, stop };
}
