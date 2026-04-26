export interface ManeviSoz {
  id: string;
  text: string;
  attribution?: string;
}

export const MANEVI_SOZLER: ManeviSoz[] = [
  { id: "1", text: "Allah bizledir." },
  { id: "2", text: "Zafer inananlarındır." },
  { id: "3", text: "Sabreden derviş muradına erer." },
  { id: "4", text: "Allah, sabredenlerle beraberdir." },
  { id: "5", text: "Tevekkül eden, asla yenilmez." },
  { id: "6", text: "Her zorlukla beraber bir kolaylık vardır." },
  { id: "7", text: "Hayat, bir imtihandır; sabır, en güzel cevaptır." },
  { id: "8", text: "Allah'a sığınanın korkusu olmaz." },
  { id: "9", text: "Niyet hayır, akıbet hayır." },
  { id: "10", text: "Kalbi temiz olanın yolu açıktır." },
  { id: "11", text: "Şükreden çoğalır, isyan eden azalır." },
  { id: "12", text: "Affedebilen güçlüdür." },
  { id: "13", text: "Dua, mü'minin silahıdır." },
  { id: "14", text: "İlim, en hayırlı miras." },
  { id: "15", text: "Komşusu açken tok yatan bizden değildir." },
  { id: "16", text: "Selam vermek sünnettir, almak farzdır." },
  { id: "17", text: "Allah, niyetlere bakar." },
  { id: "18", text: "Helal lokma, helal hayat." },
  { id: "19", text: "Edep, en büyük zenginliktir." },
  { id: "20", text: "Tövbe kapısı her zaman açıktır." },
  { id: "21", text: "İyilik et, denize at; balık bilmezse Hâlık bilir." },
  { id: "22", text: "Hak yol, sabır yoludur." },
  { id: "23", text: "Bir gönle girmek, bin Kâbe'ye bedeldir.", attribution: "Yunus Emre" },
  { id: "24", text: "Yaratılanı severiz, Yaratan'dan ötürü.", attribution: "Yunus Emre" },
  { id: "25", text: "Sevgi, en büyük ibadettir." },
  { id: "26", text: "Hiçbir gece, sabahsız değildir." },
  { id: "27", text: "Allah'ın takdirine razı olan, huzur bulur." },
  { id: "28", text: "İyiyle yürü; yol senin olur." },
  { id: "29", text: "Söz tohum, amel hasattır." },
  { id: "30", text: "Tevazu, makamların en yücesidir." },
  { id: "31", text: "Allah, kalplerin Rabbidir." },
  { id: "32", text: "İnanan ne kaybeder ki?" },
  { id: "33", text: "Helal kazanç, bereketin anahtarıdır." },
  { id: "34", text: "Sessizlik, en güzel cevaptır." },
  { id: "35", text: "Niyet halis ise, yol kolay olur." },
  { id: "36", text: "Gönlün varsa, yolun da vardır." },
  { id: "37", text: "Allah'ı zikret, kalbin huzur bulsun." },
  { id: "38", text: "Verdiğin şey, kalanın aslıdır." },
  { id: "39", text: "Doğruluk, kurtuluşun aynasıdır." },
  { id: "40", text: "Mütevazi olan yükselir." },
  { id: "41", text: "Bir mum başka bir mumu yakmakla ışığını kaybetmez.", attribution: "Mevlana" },
  { id: "42", text: "Ne olursan ol, yine gel.", attribution: "Mevlana" },
  { id: "43", text: "Sabır acıdır, meyvesi tatlıdır." },
  { id: "44", text: "Hak söz, dilden çıkar gönle ulaşır." },
  { id: "45", text: "Allah'tan ümit kesilmez." },
  { id: "46", text: "Az sözle çok şey anlatılır." },
  { id: "47", text: "Mü'min, ayna gibidir; arkadaşının ayıbını yüzüne vurmaz." },
  { id: "48", text: "Hayır kapısı, hiçbir zaman kapanmaz." },
  { id: "49", text: "İnanç, dağları yerinden oynatır." },
  { id: "50", text: "Şükür, nimeti çoğaltır." },
];

export function getManeviSozForSlot(slot: number): ManeviSoz {
  return MANEVI_SOZLER[Math.abs(slot) % MANEVI_SOZLER.length]!;
}

export function getManeviSozOfNow(date: Date = new Date()): ManeviSoz {
  const slot =
    date.getFullYear() * 1000 + date.getMonth() * 32 + date.getDate() * 4 +
    Math.floor(date.getHours() / 6);
  return getManeviSozForSlot(slot);
}
