# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Glass artifact (Hidayet / Manevî Kale)

Turkish religious mobile app (Expo SDK 54) with dark spiritual liquid-glass UI. Tabs: Kur'an / İncil / Tevrat / Dualar / Daha.

Premium gating: PayTR-style card checkout (name/expiry/CVV with brand detection) simulates payment, unlocks all books, and removes the 2-play free audio limit. Premium state, audio counter, language (TR/EN), 24h clock, and widget prefs (theme/font/category) persist via AsyncStorage (`@glass:religious-prefs:v3`). An anonymous device ID is stored under `@glass:anonId:v1` for the prayer wall.

### Elite features (Daha tab hub)
- **Manevî Koç (`/koc`)** — pick a mood (8 options), get a contextual verse + guidance from `constants/moods.ts`, with TTS playback via `expo-speech` (`hooks/useTTS.ts`).
- **Dua Duvarı (`/topluluk`)** — anonymous prayer wall. Posts and Âmin/Kalp reactions are persisted server-side via the shared API; UI is optimistic with offline error fallback.
- **Widget Stüdyosu (`/widget-studio`)** — live preview of Manevî Söz card with 5 themes, 3 font styles, 6 categories. Premium themes are gated.
- **Ayarlar (`/ayarlar`)** — language toggle (TR/EN), 12/24h clock, premium status.
- **i18n** — `lib/i18n.ts` + `context/I18nContext.tsx` provide ~120 keys in Turkish and English; switched live from Settings.

Content sources:
- `constants/sureler.ts` — all 114 Quran surahs (metadata) + `getSurahAudioUrl` (Mishary Alafasy via cdn.islamic.network)
- `services/quranApi.ts` — fetches per-surah Arabic + Turkish (Diyanet) text from alquran.cloud (`/surah/{n}/editions/quran-uthmani,tr.diyanet,ar.alafasy`); cached in AsyncStorage `@glass:quran-surah:v1:{no}`
- `constants/scripture.ts` — substantial Turkish Bible (`INCIL_BOOKS`) and Torah (`TEVRAT_BOOKS`) with chapter+verse structure
- `constants/dualar.ts` — 10 daily prayers
- `constants/dailyVerses.ts` — ~110 verses cycled by day-of-year via `getAyetOfTheDay()`
- `constants/maneviSozler.ts` — 50 spiritual quotes for the home-screen widget card; rotates every ~6 hours via `getManeviSozOfNow()`

Audio: real Quran recitation via `expo-audio` (`createAudioPlayer` + `setAudioModeAsync`) in `hooks/useSurahAudio.ts`. Native home-screen widgets require an EAS dev build (Expo Go cannot register them); the in-app `ManeviSozCard` previews the widget content.
