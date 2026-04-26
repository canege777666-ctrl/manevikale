import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = "https://api.alquran.cloud/v1";
const CACHE_PREFIX = "@glass:quran-surah:v1:";

export interface QuranAyah {
  numberInSurah: number;
  arabic: string;
  turkish: string;
  audioUrl: string;
}

export interface QuranSurahPayload {
  no: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  ayahs: QuranAyah[];
}

interface RawAyah {
  number: number;
  audio?: string;
  audioSecondary?: string[];
  text: string;
  numberInSurah: number;
}

interface RawEdition {
  edition: { identifier: string };
  ayahs: RawAyah[];
  englishName?: string;
  name?: string;
  numberOfAyahs?: number;
}

interface RawResponse {
  code: number;
  status: string;
  data: RawEdition[];
}

async function readCache(no: number): Promise<QuranSurahPayload | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_PREFIX + no);
    if (!raw) return null;
    return JSON.parse(raw) as QuranSurahPayload;
  } catch {
    return null;
  }
}

async function writeCache(no: number, payload: QuranSurahPayload) {
  try {
    await AsyncStorage.setItem(CACHE_PREFIX + no, JSON.stringify(payload));
  } catch {
  }
}

export async function fetchSurah(no: number): Promise<QuranSurahPayload> {
  const cached = await readCache(no);
  if (cached) return cached;

  const url = `${API_BASE}/surah/${no}/editions/quran-uthmani,tr.diyanet,ar.alafasy`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Sure ${no} alınamadı (HTTP ${res.status})`);
  }
  const json = (await res.json()) as RawResponse;
  if (json.code !== 200 || !Array.isArray(json.data)) {
    throw new Error(`Sure ${no} verisi geçersiz`);
  }

  const arabicEd = json.data.find((d) => d.edition?.identifier === "quran-uthmani");
  const turkishEd = json.data.find((d) => d.edition?.identifier === "tr.diyanet");
  const audioEd = json.data.find((d) => d.edition?.identifier === "ar.alafasy");
  if (!arabicEd || !turkishEd || !audioEd) {
    throw new Error("Sure verisinde eksik bölümler var");
  }

  const ayahs: QuranAyah[] = arabicEd.ayahs.map((a, idx) => ({
    numberInSurah: a.numberInSurah,
    arabic: a.text,
    turkish: turkishEd.ayahs[idx]?.text ?? "",
    audioUrl: audioEd.ayahs[idx]?.audio ?? "",
  }));

  const payload: QuranSurahPayload = {
    no,
    name: arabicEd.name ?? "",
    englishName: arabicEd.englishName ?? "",
    numberOfAyahs: arabicEd.numberOfAyahs ?? ayahs.length,
    ayahs,
  };

  void writeCache(no, payload);
  return payload;
}
