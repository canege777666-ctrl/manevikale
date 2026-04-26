import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ThemeName = "spiritual" | "aurora" | "ocean" | "sunrise";

export const FREE_AUDIO_LIMIT = 2;

interface WidgetPrefs {
  themeId: string;
  fontId: string;
  categoryId: string;
}

interface ReligiousState {
  isPremium: boolean;
  setPremium: (v: boolean) => void;
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  use24Hour: boolean;
  setUse24Hour: (v: boolean) => void;
  audioPlaysUsed: number;
  audioRemaining: number;
  audioLocked: boolean;
  consumeAudioPlay: () => boolean;
  resetAudioPlays: () => void;
  widget: WidgetPrefs;
  setWidget: (w: Partial<WidgetPrefs>) => void;
}

const ReligiousContext = createContext<ReligiousState | null>(null);

const STORAGE_KEY = "@glass:religious-prefs:v3";

interface PersistedPrefs {
  isPremium: boolean;
  theme: ThemeName;
  use24Hour: boolean;
  audioPlaysUsed: number;
  widget: WidgetPrefs;
}

const DEFAULTS: PersistedPrefs = {
  isPremium: false,
  theme: "spiritual",
  use24Hour: true,
  audioPlaysUsed: 0,
  widget: { themeId: "midnight", fontId: "inter", categoryId: "all" },
};

export function ReligiousProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<PersistedPrefs>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<PersistedPrefs>;
          setPrefs({ ...DEFAULTS, ...parsed });
        }
      } catch {
      }
      setHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)).catch(() => {});
  }, [prefs, hydrated]);

  const setPremium = useCallback(
    (v: boolean) => setPrefs((p) => ({ ...p, isPremium: v })),
    [],
  );
  const setTheme = useCallback(
    (t: ThemeName) => setPrefs((p) => ({ ...p, theme: t })),
    [],
  );
  const setUse24Hour = useCallback(
    (v: boolean) => setPrefs((p) => ({ ...p, use24Hour: v })),
    [],
  );
  const setWidget = useCallback(
    (w: Partial<WidgetPrefs>) =>
      setPrefs((p) => ({ ...p, widget: { ...p.widget, ...w } })),
    [],
  );

  const consumeAudioPlay = useCallback((): boolean => {
    if (prefs.isPremium) return true;
    if (prefs.audioPlaysUsed >= FREE_AUDIO_LIMIT) return false;
    setPrefs((p) => ({ ...p, audioPlaysUsed: p.audioPlaysUsed + 1 }));
    return true;
  }, [prefs.isPremium, prefs.audioPlaysUsed]);

  const resetAudioPlays = useCallback(
    () => setPrefs((p) => ({ ...p, audioPlaysUsed: 0 })),
    [],
  );

  const audioLocked = !prefs.isPremium && prefs.audioPlaysUsed >= FREE_AUDIO_LIMIT;
  const audioRemaining = prefs.isPremium
    ? Infinity
    : Math.max(0, FREE_AUDIO_LIMIT - prefs.audioPlaysUsed);

  const value = useMemo<ReligiousState>(
    () => ({
      isPremium: prefs.isPremium,
      setPremium,
      theme: prefs.theme,
      setTheme,
      use24Hour: prefs.use24Hour,
      setUse24Hour,
      audioPlaysUsed: prefs.audioPlaysUsed,
      audioRemaining,
      audioLocked,
      consumeAudioPlay,
      resetAudioPlays,
      widget: prefs.widget,
      setWidget,
    }),
    [
      prefs,
      setPremium,
      setTheme,
      setUse24Hour,
      consumeAudioPlay,
      resetAudioPlays,
      audioLocked,
      audioRemaining,
      setWidget,
    ],
  );

  return (
    <ReligiousContext.Provider value={value}>
      {children}
    </ReligiousContext.Provider>
  );
}

export function useReligious() {
  const ctx = useContext(ReligiousContext);
  if (!ctx) {
    throw new Error("useReligious must be used inside ReligiousProvider");
  }
  return ctx;
}
