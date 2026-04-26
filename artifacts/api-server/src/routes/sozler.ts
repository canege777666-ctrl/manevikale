import { Router, type IRouter } from "express";

interface ManeviSoz {
  id: string;
  text: string;
  attribution?: string;
  category?: string;
}

const SOZLER: ManeviSoz[] = [
  { id: "s1", text: "Allah bizledir.", category: "trust" },
  { id: "s2", text: "Zafer inananlarındır.", category: "hope" },
  { id: "s3", text: "Sabreden derviş muradına erer.", category: "patience" },
  { id: "s4", text: "Allah, sabredenlerle beraberdir.", category: "patience" },
  { id: "s5", text: "İnanç, dağları yerinden oynatır.", category: "trust" },
  {
    id: "s6",
    text: "En zor an, sabaha en yakın olduğun andır.",
    category: "hope",
  },
  { id: "s7", text: "Şükreden, daha çoğunu bulur.", category: "gratitude" },
  {
    id: "s8",
    text: "Kalbini Allah'a açan, kapıların da açıldığını görür.",
    category: "trust",
  },
  { id: "s9", text: "Düşeni kaldırmak, en yüce ibadettir.", category: "trust" },
  {
    id: "s10",
    text: "Niyetin halis olsun; yol kendiliğinden açılır.",
    category: "success",
  },
  { id: "s11", text: "Affeden, kazanır.", category: "patience" },
  { id: "s12", text: "Tevekkül, kalbin huzurudur.", category: "trust" },
  {
    id: "s13",
    text: "Her zorlukla beraber bir kolaylık vardır.",
    category: "hope",
  },
  { id: "s14", text: "Edep, akıldan bir parçadır.", category: "patience" },
  {
    id: "s15",
    text: "İnsanın değeri, niyeti ve sabrıyla ölçülür.",
    category: "patience",
  },
  { id: "s16", text: "Dua, mü'minin silahıdır.", category: "trust" },
  { id: "s17", text: "Kalp temizse, dünya da temizdir.", category: "patience" },
  {
    id: "s18",
    text: "Yol uzun, hedef yakın; sabrını koru.",
    category: "patience",
  },
  { id: "s19", text: "Gönül kırmamak, dağları aşmaktır.", category: "patience" },
  { id: "s20", text: "Şükür, nimetin bekçisidir.", category: "gratitude" },
  {
    id: "s21",
    text: "İhlas olmadan amel, gölge gibidir.",
    category: "success",
  },
  { id: "s22", text: "Tevbe, kalbin yenilenmesidir.", category: "trust" },
  { id: "s23", text: "Sabır, acı tohumun tatlı meyvesidir.", category: "patience" },
  {
    id: "s24",
    text: "Allah'a güvenen, hiç kimseye muhtaç olmaz.",
    category: "trust",
  },
  { id: "s25", text: "Az ye, az uyu, az konuş; çok düşün.", category: "success" },
  {
    id: "s26",
    text: "Kalp, Allah'ı hatırladıkça aydınlanır.",
    category: "trust",
  },
  { id: "s27", text: "Dünya bir köprüdür, üzerine ev kurma.", category: "patience" },
  { id: "s28", text: "Niyetin pak olsun, yol açılır.", category: "success" },
  {
    id: "s29",
    text: "Acı sözler, tatlı dilden geri dönmez.",
    category: "patience",
  },
  { id: "s30", text: "Allah'ın takdirine teslim olan, huzur bulur.", category: "trust" },
  { id: "s31", text: "İlim, kalbin nurudur.", category: "success" },
  { id: "s32", text: "Tövbe kapısı, son nefese kadar açıktır.", category: "hope" },
  {
    id: "s33",
    text: "Veren el, alan elden üstündür.",
    category: "gratitude",
  },
  { id: "s34", text: "Komşuna iyi davranmak, imandandır.", category: "patience" },
  { id: "s35", text: "Sabır, anahtarı altındır.", category: "patience" },
  { id: "s36", text: "Hak söyle, doğru söyle, az söyle.", category: "success" },
  {
    id: "s37",
    text: "Gönlün geniş olsun; rızkın da geniş olur.",
    category: "gratitude",
  },
  { id: "s38", text: "Allah'tan ümidini kesme.", category: "hope" },
  { id: "s39", text: "Selam, kalpleri birleştirir.", category: "patience" },
  {
    id: "s40",
    text: "Dünyanın derdi, kalbin pasıdır; zikir cilasıdır.",
    category: "trust",
  },
  { id: "s41", text: "İyi düşün, iyi konuş, iyi yap.", category: "success" },
  { id: "s42", text: "Kanaat, tükenmez bir hazinedir.", category: "gratitude" },
  {
    id: "s43",
    text: "Kalbin kapısı tevazu ile açılır.",
    category: "patience",
  },
  { id: "s44", text: "Hak, sabreden ile beraberdir.", category: "patience" },
  { id: "s45", text: "Şükret ki çoğalsın, sabret ki güçlensin.", category: "gratitude" },
  {
    id: "s46",
    text: "Allah, niyete bakar; suretine değil.",
    category: "trust",
  },
  { id: "s47", text: "Öfkeni yenen, kuvvetlidir.", category: "patience" },
  { id: "s48", text: "Dünya emanet; ahiret hakikat.", category: "trust" },
  { id: "s49", text: "Hayır söyle ya da sus.", category: "patience" },
  {
    id: "s50",
    text: "Allah'a yakınlaşan, kendine de yakınlaşır.",
    category: "trust",
  },
];

const router: IRouter = Router();

router.get("/sozler", (req, res) => {
  const category = req.query["category"];
  let data = SOZLER;
  if (typeof category === "string" && category !== "all" && category !== "") {
    data = SOZLER.filter((s) => s.category === category);
    if (data.length === 0) data = SOZLER;
  }
  res.json({ data });
});

export default router;
