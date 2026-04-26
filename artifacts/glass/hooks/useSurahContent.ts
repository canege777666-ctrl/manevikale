import { useEffect, useState } from "react";

import { fetchSurah, QuranSurahPayload } from "@/services/quranApi";

export interface SurahContentState {
  data: QuranSurahPayload | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSurahContent(surahNo: number): SurahContentState {
  const [data, setData] = useState<QuranSurahPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchSurah(surahNo)
      .then((res) => {
        if (cancelled) return;
        setData(res);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Yüklenemedi");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [surahNo, version]);

  return {
    data,
    loading,
    error,
    refetch: () => setVersion((v) => v + 1),
  };
}
