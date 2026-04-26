import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Lang, TKey, translate } from "@/lib/i18n";

const STORAGE_KEY = "@glass:lang:v1";

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
  ready: boolean;
}

const I18nContext = createContext<I18nValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((v) => {
        if (v === "tr" || v === "en") {
          setLangState(v);
        }
      })
      .finally(() => setReady(true));
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    void AsyncStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback((key: TKey) => translate(lang, key), [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t, ready }),
    [lang, setLang, t, ready],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
