export interface Dua {
  id: string;
  turkishTitle: string;
  arabic: string;
  turkish: string;
  occasion: string;
}

export const DUALAR: Dua[] = [
  {
    id: "yemek-oncesi",
    turkishTitle: "Yemek Öncesi Duası",
    arabic: "بِسْمِ ٱللَّهِ وَعَلَىٰ بَرَكَةِ ٱللَّه",
    turkish: "Allah'ın adıyla ve Allah'ın bereketi üzerine.",
    occasion: "Yemekten önce okunur",
  },
  {
    id: "yemek-sonrasi",
    turkishTitle: "Yemek Sonrası Duası",
    arabic: "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِين",
    turkish: "Bizi yedirip içiren ve Müslümanlardan kılan Allah'a hamd olsun.",
    occasion: "Yemekten sonra okunur",
  },
  {
    id: "uyku",
    turkishTitle: "Yatmadan Önce Okunan Dua",
    arabic: "بِٱسْمِكَ ٱللَّهُمَّ أَمُوتُ وَأَحْيَا",
    turkish: "Allah'ım, senin adınla ölür ve senin adınla dirilirim.",
    occasion: "Uyumadan önce okunur",
  },
  {
    id: "sabah",
    turkishTitle: "Sabah Duası",
    arabic: "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَحْيَانَا بَعْدَ مَآ أَمَاتَنَا وَإِلَيْهِ ٱلنُّشُور",
    turkish: "Bizi öldürdükten sonra dirilten Allah'a hamd olsun. Dönüş O'nadır.",
    occasion: "Uyandıktan sonra okunur",
  },
  {
    id: "sikinti",
    turkishTitle: "Sıkıntı Anında Okunan Dua",
    arabic: "لَآ إِلَٰهَ إِلَّآ أَنتَ سُبْحَٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِين",
    turkish: "Senden başka ilah yoktur. Seni tüm noksanlıklardan tenzih ederim. Şüphesiz ben kendine zulmedenlerden oldum.",
    occasion: "Üzüntü ve sıkıntı anında",
  },
  {
    id: "sukur",
    turkishTitle: "Şükür Duası",
    arabic: "ٱللَّهُمَّ مَآ أَصْبَحَ بِى مِن نِعْمَةٍ فَمِنكَ وَحْدَكَ لَا شَرِيكَ لَك",
    turkish: "Allah'ım, sabah erişen her nimet, ortağı olmayan yalnız sendendir.",
    occasion: "Nimetlere karşılık",
  },
  {
    id: "yolculuk",
    turkishTitle: "Yolculuk Duası",
    arabic: "سُبْحَـٰنَ ٱلَّذِى سَخَّرَ لَنَا هَـٰذَا وَمَا كُنَّا لَهُۥ مُقْرِنِين",
    turkish: "Bunu hizmetimize veren Allah'ı tesbih ederiz. Yoksa biz buna güç yetiremezdik.",
    occasion: "Yola çıkarken okunur",
  },
  {
    id: "hastalik",
    turkishTitle: "Hastalık İçin Dua",
    arabic: "ٱللَّهُمَّ رَبَّ ٱلنَّاسِ أَذْهِبِ ٱلْبَأْسَ ٱشْفِ أَنتَ ٱلشَّافِى",
    turkish: "Ey insanların Rabbi olan Allah'ım, sıkıntıyı gider. Şifa veren sensin.",
    occasion: "Hasta ziyaretinde",
  },
  {
    id: "evden-cikarken",
    turkishTitle: "Evden Çıkarken Okunan Dua",
    arabic: "بِسْمِ ٱللَّهِ تَوَكَّلْتُ عَلَى ٱللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّه",
    turkish: "Allah'ın adıyla, Allah'a tevekkül ettim. Güç ve kuvvet yalnız Allah'a aittir.",
    occasion: "Evden ayrılırken",
  },
  {
    id: "ana-baba",
    turkishTitle: "Anne Baba İçin Dua",
    arabic: "رَّبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى صَغِيرًا",
    turkish: "Rabbim, beni küçükken yetiştirdikleri gibi sen de onlara merhamet et.",
    occasion: "Anne baba için",
  },
];
