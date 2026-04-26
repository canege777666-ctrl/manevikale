import { useCallback, useEffect, useRef, useState } from "react";
import * as Speech from "expo-speech";

export interface TTSState {
  isSpeaking: boolean;
  speak: (text: string, opts?: { language?: string }) => void;
  stop: () => void;
}

export function useTTS(): TTSState {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      try {
        Speech.stop();
      } catch {
      }
    };
  }, []);

  const speak = useCallback(
    (text: string, opts?: { language?: string }) => {
      if (!text || !text.trim()) return;
      try {
        Speech.stop();
      } catch {
      }
      const language = opts?.language ?? "tr-TR";
      setIsSpeaking(true);
      Speech.speak(text, {
        language,
        rate: 0.95,
        pitch: 1.0,
        onDone: () => {
          if (mountedRef.current) setIsSpeaking(false);
        },
        onStopped: () => {
          if (mountedRef.current) setIsSpeaking(false);
        },
        onError: () => {
          if (mountedRef.current) setIsSpeaking(false);
        },
      });
    },
    [],
  );

  const stop = useCallback(() => {
    try {
      Speech.stop();
    } catch {
    }
    setIsSpeaking(false);
  }, []);

  return { isSpeaking, speak, stop };
}
