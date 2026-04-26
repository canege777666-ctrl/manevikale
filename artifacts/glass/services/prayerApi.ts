import { API_BASE } from "@/lib/apiBase";

export interface Prayer {
  id: string;
  text: string;
  amenCount: number;
  heartCount: number;
  hasAmened: boolean;
  hasHearted: boolean;
  createdAt: number;
}

interface PrayerListResponse {
  data: Prayer[];
}

interface PrayerCreateResponse {
  data: Prayer;
}

interface PrayerReactResponse {
  data: { amenCount: number; heartCount: number };
}

async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeoutMs = 6000,
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export async function listPrayers(anonId: string): Promise<Prayer[]> {
  const url = `${API_BASE}/prayers?anonId=${encodeURIComponent(anonId)}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) {
    throw new Error(`Dualar yüklenemedi (HTTP ${res.status})`);
  }
  const json = (await res.json()) as PrayerListResponse;
  return json.data;
}

export async function createPrayer(
  anonId: string,
  text: string,
): Promise<Prayer> {
  const res = await fetchWithTimeout(`${API_BASE}/prayers`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ anonId, text }),
  });
  if (!res.ok) {
    throw new Error(`Dua paylaşılamadı (HTTP ${res.status})`);
  }
  const json = (await res.json()) as PrayerCreateResponse;
  return json.data;
}

export async function reactToPrayer(
  anonId: string,
  prayerId: string,
  reaction: "amen" | "heart",
): Promise<{ amenCount: number; heartCount: number }> {
  const res = await fetchWithTimeout(
    `${API_BASE}/prayers/${encodeURIComponent(prayerId)}/react`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ anonId, reaction }),
    },
  );
  if (!res.ok) {
    throw new Error(`Tepki kaydedilemedi (HTTP ${res.status})`);
  }
  const json = (await res.json()) as PrayerReactResponse;
  return json.data;
}
