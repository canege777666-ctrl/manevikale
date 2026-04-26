import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_BASE } from "@/lib/apiBase";
import { MANEVI_SOZLER, type ManeviSoz } from "@/constants/maneviSozler";

const CACHE_PREFIX = "@glass:content:v1:";

export interface ContentResult<T> {
  data: T;
  source: "online" | "cache" | "fallback";
  fetchedAt?: number;
}

async function readCache<T>(key: string): Promise<{ data: T; ts: number } | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw) as { data: T; ts: number };
  } catch {
    return null;
  }
}

async function writeCache<T>(key: string, data: T) {
  try {
    await AsyncStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, ts: Date.now() }),
    );
  } catch {
  }
}

async function fetchWithTimeout(
  url: string,
  timeoutMs = 5000,
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export async function fetchManeviSozler(): Promise<ContentResult<ManeviSoz[]>> {
  const cacheKey = "manevi-sozler";
  try {
    const res = await fetchWithTimeout(`${API_BASE}/sozler`);
    if (res.ok) {
      const json = (await res.json()) as { data: ManeviSoz[] };
      if (Array.isArray(json.data) && json.data.length > 0) {
        void writeCache(cacheKey, json.data);
        return { data: json.data, source: "online", fetchedAt: Date.now() };
      }
    }
  } catch {
  }

  const cached = await readCache<ManeviSoz[]>(cacheKey);
  if (cached && cached.data.length > 0) {
    return { data: cached.data, source: "cache", fetchedAt: cached.ts };
  }

  return { data: MANEVI_SOZLER, source: "fallback" };
}
