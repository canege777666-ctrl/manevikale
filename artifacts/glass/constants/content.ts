export type { DailyAyet } from "./dailyVerses";
export { DAILY_AYETLER, getDailyAyet, getAyetForSlot } from "./dailyVerses";

export type { ManeviSoz } from "./maneviSozler";
export { MANEVI_SOZLER, getManeviSozForSlot, getManeviSozOfNow } from "./maneviSozler";

export type { Dua } from "./dualar";
export { DUALAR } from "./dualar";

export type { SurahMeta } from "./sureler";
export { SURELER_META, getSurahMeta, getSurahAudioUrl } from "./sureler";

import type { SurahMeta } from "./sureler";
import { SURELER_META, getSurahMeta as _getSurahMeta } from "./sureler";

export type Sure = SurahMeta;
export const SURELER: SurahMeta[] = SURELER_META;
export function getSureByNo(no: number): SurahMeta | undefined {
  return _getSurahMeta(no);
}

export type { Verse, Chapter, ScriptureBook } from "./scripture";
export {
  INCIL_BOOKS,
  TEVRAT_BOOKS,
  getIncilBook,
  getTevratBook,
} from "./scripture";

import type { DailyAyet } from "./dailyVerses";
import { getDailyAyet } from "./dailyVerses";

export type Ayet = DailyAyet;
export const getAyetOfTheDay = getDailyAyet;
