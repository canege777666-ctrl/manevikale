import type { TKey } from "@/lib/i18n";

export type MoodId =
  | "sad"
  | "grateful"
  | "anxious"
  | "peaceful"
  | "tired"
  | "hopeful"
  | "angry"
  | "lost";

export interface Mood {
  id: MoodId;
  labelKey: TKey;
  emoji: string;
  accent: string;
}

export interface MoodSuggestion {
  arabic?: string;
  text: string;
  textEn?: string;
  reference: string;
  guidance: string;
  guidanceEn?: string;
}

export const MOODS: Mood[] = [
  { id: "sad", labelKey: "moodSad", emoji: "😔", accent: "#7BA9D9" },
  { id: "grateful", labelKey: "moodGrateful", emoji: "🤲", accent: "#F4C97A" },
  { id: "anxious", labelKey: "moodAnxious", emoji: "😟", accent: "#C29DD9" },
  { id: "peaceful", labelKey: "moodPeaceful", emoji: "😌", accent: "#9DD9C2" },
  { id: "tired", labelKey: "moodTired", emoji: "😩", accent: "#D9A87B" },
  { id: "hopeful", labelKey: "moodHopeful", emoji: "🌅", accent: "#F4A97A" },
  { id: "angry", labelKey: "moodAngry", emoji: "😤", accent: "#D97B7B" },
  { id: "lost", labelKey: "moodLost", emoji: "🧭", accent: "#A9B5D9" },
];

export const MOOD_CONTENT: Record<MoodId, MoodSuggestion[]> = {
  sad: [
    {
      arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ ٱلْأَعْلَوْنَ",
      text: "Gevşemeyin, üzülmeyin; eğer mü'min iseniz şüphesiz en üstün olanlarsınız.",
      textEn: "Do not weaken, do not grieve; if you are believers, you are the highest.",
      reference: "Âl-i İmrân, 139",
      guidance:
        "Hüzün geçer; Allah'ın senin üzerindeki ışığı sönmez. Bu an, kalbinin yumuşadığı bir andır.",
      guidanceEn:
        "Sadness passes; Allah's light upon you does not fade. This moment is when your heart softens.",
    },
    {
      text: "Allah, bir kimseye gücünün yettiğinden başkasını yüklemez.",
      reference: "Bakara, 286",
      guidance: "Taşıdığın yük, taşıyabileceğin kadardır. Sabret, sabah yakındır.",
      guidanceEn: "Your burden is what you can carry. Be patient, dawn is near.",
    },
  ],
  grateful: [
    {
      arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      text: "Andolsun ki şükrederseniz, elbette nimetimi artırırım.",
      textEn: "If you are grateful, I will surely increase you in favor.",
      reference: "İbrahim, 7",
      guidance:
        "Şükrün, kalbini genişletir. Bugün üç nimeti say ve sevgiyle hatırla.",
      guidanceEn:
        "Gratitude expands your heart. Name three blessings today and remember them with love.",
    },
    {
      text: "Hangi nimeti sayarsanız sayın, Allah'tandır.",
      reference: "Nahl, 53",
      guidance: "Her nefes bir hediye; her gün bir lütuf. Şükrünü dile getir.",
    },
  ],
  anxious: [
    {
      arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
      text: "Bilesiniz ki kalpler ancak Allah'ı anmakla huzur bulur.",
      textEn: "Verily, in the remembrance of Allah do hearts find rest.",
      reference: "Ra'd, 28",
      guidance:
        "Üç kez derin nefes al. Her nefeste 'Allah' de. Endişen yumuşayacak.",
      guidanceEn:
        "Take three deep breaths. Say 'Allah' with each. Your anxiety will soften.",
    },
    {
      text: "Allah bana yeter, O ne güzel vekildir.",
      reference: "Âl-i İmrân, 173",
      guidance:
        "Hasbunallahu ve nimel vekîl. Bu kelime, kaygının panzehiridir.",
    },
  ],
  peaceful: [
    {
      arabic: "ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ",
      text: "Allah, göklerin ve yerin nurudur.",
      textEn: "Allah is the Light of the heavens and the earth.",
      reference: "Nûr, 35",
      guidance: "Bu huzur Allah'tandır. Onu hatırla, koru, paylaş.",
      guidanceEn: "This peace is from Allah. Remember it, protect it, share it.",
    },
  ],
  tired: [
    {
      text: "Şüphesiz her zorlukla beraber bir kolaylık vardır.",
      arabic: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
      reference: "İnşirâh, 6",
      guidance: "Yorgunluğun, çabanın delilidir. Dinlen; yine ayağa kalkacaksın.",
      guidanceEn: "Your tiredness is proof of your effort. Rest; you will rise again.",
    },
  ],
  hopeful: [
    {
      arabic: "لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ",
      text: "Allah'ın rahmetinden ümit kesmeyin.",
      textEn: "Do not despair of the mercy of Allah.",
      reference: "Zümer, 53",
      guidance: "Umut, kalbin nuru. Dualarını taze tut.",
    },
  ],
  angry: [
    {
      text: "Öfkesini yenen, kuvvetli kişidir.",
      reference: "Hadis · Buhârî",
      guidance:
        "Ayaktaysan otur, oturuyorsan uzan. Bir bardak su iç. Öfke sönsün.",
      guidanceEn: "If standing, sit. If sitting, lie down. Drink water. Let anger fade.",
    },
  ],
  lost: [
    {
      arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
      text: "Bizi doğru yola ilet.",
      textEn: "Guide us to the straight path.",
      reference: "Fâtiha, 6",
      guidance:
        "Yön ararken Fâtiha'yı oku. Yol sana değil, sen yola yöneleceksin.",
      guidanceEn:
        "When seeking direction, recite Al-Fatiha. The path will turn to you.",
    },
  ],
};

export function getSuggestionForMood(
  moodId: MoodId,
  rotationSeed?: number,
): MoodSuggestion {
  const list = MOOD_CONTENT[moodId];
  if (!list || list.length === 0) {
    return {
      text: "Allah seninle.",
      reference: "—",
      guidance: "Kalbini bir an O'na ver.",
    };
  }
  const seed =
    rotationSeed ?? Math.floor(Date.now() / (1000 * 60 * 60));
  return list[seed % list.length]!;
}
