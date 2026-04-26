import Constants from "expo-constants";

function deriveApiBase(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_BASE;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  if (domain) {
    return `https://${domain}/api`;
  }

  const hostUri =
    (Constants.expoConfig as { hostUri?: string } | null)?.hostUri ??
    (Constants as unknown as { manifest?: { hostUri?: string } }).manifest
      ?.hostUri;
  if (hostUri) {
    const host = hostUri.split(":")[0];
    return `http://${host}:5000/api`;
  }

  return "http://localhost:5000/api";
}

export const API_BASE = deriveApiBase();
