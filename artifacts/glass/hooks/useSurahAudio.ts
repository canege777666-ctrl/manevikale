import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { createAudioPlayer, AudioPlayer, setAudioModeAsync } from "expo-audio";

import { getSurahAudioUrl } from "@/constants/sureler";

export interface SurahAudioState {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
}

let audioModeConfigured = false;
async function ensureAudioMode() {
  if (audioModeConfigured) return;
  try {
    await setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: "duckOthers",
    });
    audioModeConfigured = true;
  } catch {
  }
}

export function useSurahAudio(surahNo: number): SurahAudioState {
  const playerRef = useRef<AudioPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      const p = playerRef.current;
      if (p) {
        try {
          p.pause();
          p.remove();
        } catch {
        }
        playerRef.current = null;
      }
    };
  }, [surahNo]);

  const play = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await ensureAudioMode();
      if (!playerRef.current) {
        const url = getSurahAudioUrl(surahNo);
        playerRef.current = createAudioPlayer({ uri: url });
        playerRef.current.addListener("playbackStatusUpdate", (status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      }
      playerRef.current.play();
      setIsPlaying(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Ses yüklenemedi";
      setError(msg);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const pause = () => {
    try {
      playerRef.current?.pause();
    } catch {
    }
    setIsPlaying(false);
  };

  const stop = () => {
    try {
      playerRef.current?.pause();
      playerRef.current?.seekTo(0);
    } catch {
    }
    setIsPlaying(false);
  };

  return { isPlaying, isLoading, error, play, pause, stop };
}

export const isAudioSupported = Platform.OS !== "web" || true;
