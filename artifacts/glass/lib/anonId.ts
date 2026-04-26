import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@glass:anon-id:v1";

function generateId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `anon_${ts}_${rand}`;
}

let cached: string | null = null;

export async function getAnonId(): Promise<string> {
  if (cached) return cached;
  try {
    const existing = await AsyncStorage.getItem(KEY);
    if (existing) {
      cached = existing;
      return existing;
    }
  } catch {
  }
  const fresh = generateId();
  cached = fresh;
  try {
    await AsyncStorage.setItem(KEY, fresh);
  } catch {
  }
  return fresh;
}
