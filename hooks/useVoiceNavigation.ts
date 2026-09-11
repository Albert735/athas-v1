import { useCallback } from "react";
import * as Speech from "expo-speech";

export function useVoiceNavigation() {
  const speak = useCallback((text: string) => {
    if (!text) return;

    Speech.stop();

    Speech.speak(text, {
      language: "en-US",
      rate: 0.95,
      pitch: 1,
      volume: 1,
    });
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
  }, []);

  return {
    speak,
    stop,
  };
}
