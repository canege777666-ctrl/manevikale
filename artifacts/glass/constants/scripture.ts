export interface Verse {
  no: number;
  text: string;
}

export interface Chapter {
  no: number;
  title: string;
  verses: Verse[];
}

export interface ScriptureBook {
  id: string;
  shortName: string;
  fullName: string;
  testament: "Eski Ahit" | "Yeni Ahit";
  description: string;
  chapters: Chapter[];
}

export const INCIL_BOOKS: ScriptureBook[] = [
  {
    id: "matta",
    shortName: "Matta",
    fullName: "Matta'nın Müjdesi",
    testament: "Yeni Ahit",
    description: "İsa Mesih'in hayatını, öğretilerini ve mucizelerini anlatan müjde.",
    chapters: [
      {
        no: 5,
        title: "Dağdaki Vaaz - Mutluluklar",
        verses: [
          { no: 3, text: "Ne mutlu ruhta yoksul olanlara! Çünkü Göklerin Egemenliği onlarındır." },
          { no: 4, text: "Ne mutlu yaslı olanlara! Çünkü onlar teselli edilecekler." },
          { no: 5, text: "Ne mutlu yumuşak huylu olanlara! Çünkü onlar yeryüzünü miras alacaklar." },
          { no: 6, text: "Ne mutlu doğruluğa acıkıp susayanlara! Çünkü onlar doyurulacaklar." },
          { no: 7, text: "Ne mutlu merhametli olanlara! Çünkü onlar merhamet bulacaklar." },
          { no: 8, text: "Ne mutlu yüreği temiz olanlara! Çünkü onlar Tanrı'yı görecekler." },
          { no: 9, text: "Ne mutlu barışı sağlayanlara! Çünkü onlara Tanrı oğulları denecek." },
          { no: 10, text: "Ne mutlu doğruluk uğruna zulüm görenlere! Çünkü Göklerin Egemenliği onlarındır." },
          { no: 14, text: "Dünyanın ışığı sizsiniz. Tepenin üstüne kurulan kent gizlenemez." },
          { no: 16, text: "Sizin ışığınız insanların önünde öyle parlasın ki, iyi işlerinizi görerek göklerdeki Babanız'ı yüceltsinler." },
          { no: 44, text: "Ama ben size diyorum ki, düşmanlarınızı sevin, size zulmedenler için dua edin." },
        ],
      },
      {
        no: 6,
        title: "Rab'bin Duası ve Hazine",
        verses: [
          { no: 9, text: "Bunun için siz şöyle dua edin: 'Göklerdeki Babamız, adın kutsal kılınsın." },
          { no: 10, text: "Egemenliğin gelsin. Gökte olduğu gibi, yeryüzünde de senin istediğin olsun." },
          { no: 11, text: "Bugün bize gündelik ekmeğimizi ver." },
          { no: 12, text: "Bize karşı suç işleyenleri bağışladığımız gibi, sen de bizim suçlarımızı bağışla." },
          { no: 13, text: "Ayartılmamıza izin verme. Bizi kötü olandan kurtar.'" },
          { no: 19, text: "Yeryüzünde kendinize hazineler biriktirmeyin. Burada güve ve pas onları yiyip bitirir, hırsızlar da girip çalarlar." },
          { no: 20, text: "Bunun yerine kendinize gökte hazineler biriktirin. Orada ne güve ne pas onları yiyip bitirir, ne de hırsızlar girip çalar." },
          { no: 21, text: "Hazineniz neredeyse, yüreğiniz de orada olacaktır." },
          { no: 33, text: "Siz öncelikle O'nun egemenliğinin ve doğruluğunun ardından gidin, o zaman size bütün bunlar da verilecektir." },
          { no: 34, text: "O halde yarın için kaygılanmayın. Yarının kaygısı yarının olsun. Her günün derdi kendine yeter." },
        ],
      },
      {
        no: 7,
        title: "Yargılamayın",
        verses: [
          { no: 1, text: "Başkasını yargılamayın ki, siz de yargılanmayasınız." },
          { no: 2, text: "Çünkü nasıl yargılarsanız öyle yargılanacaksınız. Hangi ölçekle ölçerseniz, size de aynı ölçek uygulanacak." },
          { no: 7, text: "Dileyin, size verilecek; arayın, bulacaksınız; kapıyı çalın, size açılacaktır." },
          { no: 8, text: "Çünkü her dileyen alır, arayan bulur, kapı çalana açılır." },
          { no: 12, text: "İnsanların size nasıl davranmasını istiyorsanız, siz de onlara öyle davranın. Çünkü Kutsal Yasa'nın ve peygamberlerin söylediği budur." },
          { no: 24, text: "İşte bu sözlerimi duyup uygulayan herkes, evini kaya üzerine kuran akıllı adama benzer." },
          { no: 25, text: "Yağmur yağar, seller basar, yeller eser, eve saldırır; ama ev yıkılmaz. Çünkü kaya üzerine kurulmuştur." },
        ],
      },
      {
        no: 11,
        title: "Yorgun Olanlara Çağrı",
        verses: [
          { no: 28, text: "Ey bütün yorgunlar ve yükü ağır olanlar! Bana gelin, ben size rahat veririm." },
          { no: 29, text: "Boyunduruğumu yüklenin, benden öğrenin. Çünkü ben yumuşak huylu, alçakgönüllüyüm. Böylece canlarınız rahata kavuşur." },
          { no: 30, text: "Boyunduruğumu taşımak kolay, yüküm hafiftir." },
        ],
      },
      {
        no: 22,
        title: "En Büyük Buyruk",
        verses: [
          { no: 37, text: "İsa ona şu karşılığı verdi: 'Tanrın Rab'bi bütün yüreğinle, bütün canınla ve bütün aklınla seveceksin.'" },
          { no: 38, text: "İşte ilk ve en önemli buyruk budur." },
          { no: 39, text: "İlkine benzeyen ikinci buyruk da şudur: 'Komşunu kendin gibi seveceksin.'" },
          { no: 40, text: "Kutsal Yasa'nın tümü ve peygamberlerin sözleri bu iki buyruğa dayanır." },
        ],
      },
      {
        no: 28,
        title: "Diriliş ve Görev",
        verses: [
          { no: 5, text: "Melek kadınlara şöyle seslendi: 'Korkmayın! Çarmıha gerilen İsa'yı aradığınızı biliyorum." },
          { no: 6, text: "O burada yok; söylemiş olduğu gibi dirildi. Gelin, O'nun yattığı yeri görün." },
          { no: 18, text: "İsa yanlarına gelip onlara şunları söyledi: 'Gökte ve yeryüzünde bütün yetki bana verildi." },
          { no: 19, text: "Bu nedenle gidin, bütün ulusları öğrencilerim olarak yetiştirin." },
          { no: 20, text: "İşte ben, dünyanın sonuna dek her an sizinle birlikteyim.'" },
        ],
      },
    ],
  },
  {
    id: "yuhanna",
    shortName: "Yuhanna",
    fullName: "Yuhanna'nın Müjdesi",
    testament: "Yeni Ahit",
    description: "İsa'nın tanrısallığını ve kendisine iman edenlere bağışlanan sonsuz yaşamı vurgulayan müjde.",
    chapters: [
      {
        no: 1,
        title: "Söz İnsan Oldu",
        verses: [
          { no: 1, text: "Başlangıçta Söz vardı. Söz Tanrı'yla birlikteydi ve Söz Tanrı'ydı." },
          { no: 3, text: "Her şey O'nun aracılığıyla var oldu, var olan hiçbir şey O'nsuz olmadı." },
          { no: 4, text: "Yaşam O'ndaydı ve yaşam insanların ışığıydı." },
          { no: 5, text: "Işık karanlıkta parlar. Karanlık onu alt edemedi." },
          { no: 14, text: "Söz, insan olup aramızda yaşadı. O'nun yüceliğini -Baba'dan gelen, lütuf ve gerçekle dolu biricik Oğul'un yüceliğini- gördük." },
        ],
      },
      {
        no: 3,
        title: "Yeniden Doğuş",
        verses: [
          { no: 3, text: "İsa ona şu karşılığı verdi: 'Sana doğrusunu söyleyeyim, bir kimse yeniden doğmadıkça Tanrı'nın Egemenliği'ni göremez.'" },
          { no: 16, text: "Çünkü Tanrı dünyayı o kadar çok sevdi ki, biricik Oğlu'nu verdi. Öyle ki, O'na iman edenlerin hiçbiri mahvolmasın, ama hepsi sonsuz yaşama kavuşsun." },
          { no: 17, text: "Tanrı, Oğlu'nu dünyayı yargılamak için göndermedi, dünya O'nun aracılığıyla kurtulsun diye gönderdi." },
        ],
      },
      {
        no: 14,
        title: "Yol, Gerçek ve Yaşam",
        verses: [
          { no: 1, text: "Yüreğiniz sıkılmasın. Tanrı'ya iman edin, bana da iman edin." },
          { no: 2, text: "Babam'ın evinde kalacak çok yer var. Öyle olmasaydı size söylerdim. Çünkü size yer hazırlamaya gidiyorum." },
          { no: 6, text: "İsa, 'Yol, gerçek ve yaşam Ben'im' dedi. 'Benim aracılığım olmadan Baba'ya kimse gelemez.'" },
          { no: 27, text: "Size esenlik bırakıyorum, size kendi esenliğimi veriyorum. Ben size dünyanın verdiği gibi vermiyorum. Yüreğiniz sıkılmasın ve korkmasın." },
        ],
      },
      {
        no: 15,
        title: "Asma ve Çubukları",
        verses: [
          { no: 1, text: "Ben gerçek asmayım ve Babam bağcıdır." },
          { no: 5, text: "Ben asmayım, siz çubuklarsınız. Bende kalan ve benim kendisinde kaldığım kişi çok meyve verir. Bensiz hiçbir şey yapamazsınız." },
          { no: 12, text: "Benim buyruğum şudur: Sizi sevdiğim gibi birbirinizi sevin." },
          { no: 13, text: "Hiç kimsede, insanın, dostları uğruna canını vermesinden daha büyük bir sevgi yoktur." },
        ],
      },
    ],
  },
  {
    id: "korintliler-1",
    shortName: "1. Korintliler",
    fullName: "Pavlus'un Korintlilere Birinci Mektubu",
    testament: "Yeni Ahit",
    description: "Pavlus'un Korint kilisesine yazdığı birlik, sevgi ve diriliş üzerine mektubu.",
    chapters: [
      {
        no: 13,
        title: "Sevgi İlahisi",
        verses: [
          { no: 1, text: "İnsanların ve meleklerin diliyle konuşsam, ama sevgim olmasa, ses çıkaran bakırdan ya da çınlayan zilden farkım kalmaz." },
          { no: 2, text: "Peygamberlikte bulunabilsem, bütün sırları bilsem ve her bilgiye sahip olsam, dağları yerinden oynatacak kadar büyük imanım olsa, ama sevgim olmasa, bir hiçim." },
          { no: 4, text: "Sevgi sabırlıdır, sevgi şefkatlidir. Sevgi kıskanmaz, övünmez, böbürlenmez." },
          { no: 5, text: "Sevgi kaba davranmaz, kendi çıkarını aramaz, kolay kolay öfkelenmez, kötülüğün hesabını tutmaz." },
          { no: 6, text: "Sevgi haksızlığa sevinmez, gerçek olanla sevinir." },
          { no: 7, text: "Sevgi her şeye katlanır, her şeye inanır, her şeyi umut eder, her şeye dayanır." },
          { no: 8, text: "Sevgi asla son bulmaz." },
          { no: 13, text: "İşte böyle, kalıcı olan üç şey vardır: iman, umut ve sevgi. Bunların en üstünü sevgidir." },
        ],
      },
    ],
  },
  {
    id: "romalilar",
    shortName: "Romalılar",
    fullName: "Pavlus'un Romalılara Mektubu",
    testament: "Yeni Ahit",
    description: "Pavlus'un imanla aklanma öğretisini en sistematik biçimde sunduğu mektubu.",
    chapters: [
      {
        no: 8,
        title: "Ruh'un Yaşamı",
        verses: [
          { no: 1, text: "Böylece Mesih İsa'ya ait olanlara artık hiçbir mahkûmiyet yoktur." },
          { no: 28, text: "Tanrı'nın, kendisini sevenlerle, amacı uyarınca çağrılmış olanlarla birlikte her durumda iyilik için etkin olduğunu biliriz." },
          { no: 31, text: "Öyleyse buna ne diyelim? Tanrı bizden yanaysa, kim bize karşı olabilir?" },
          { no: 35, text: "Mesih'in sevgisinden bizi kim ayırabilir? Sıkıntı mı, elem mi, zulüm mü, açlık mı, çıplaklık mı, tehlike mi, kılıç mı?" },
          { no: 38, text: "Eminim ki, ne ölüm, ne yaşam, ne melekler, ne yönetimler, ne şimdiki, ne gelecek zaman, ne güçler, ne yükseklik, ne derinlik, ne de yaratılmış başka bir şey bizi Rabbimiz Mesih İsa'da olan Tanrı sevgisinden ayırmaya yetecektir." },
        ],
      },
      {
        no: 12,
        title: "Hizmette Sevgi",
        verses: [
          { no: 2, text: "Bu çağın gidişine uymayın; bunun yerine, Tanrı'nın iyi, beğenilir ve yetkin isteğinin ne olduğunu ayırt edebilmek için düşüncenizin yenilenmesiyle değişin." },
          { no: 9, text: "Sevginiz ikiyüzlü olmasın. Kötülükten tiksinin, iyiliğe bağlanın." },
          { no: 12, text: "Umudunuzla sevinin. Sıkıntıya dayanın. Kendinizi duaya verin." },
          { no: 18, text: "Mümkünse, elinizden geldiğince herkesle barış içinde yaşayın." },
          { no: 21, text: "Kötülüğe yenilme, kötülüğü iyilikle yen." },
        ],
      },
    ],
  },
  {
    id: "vahiy",
    shortName: "Vahiy",
    fullName: "Yuhanna'ya Gelen Vahiy",
    testament: "Yeni Ahit",
    description: "İsa Mesih'in Yuhanna'ya gösterdiği son zaman görümlerini içeren kitap.",
    chapters: [
      {
        no: 21,
        title: "Yeni Yeruşalim",
        verses: [
          { no: 1, text: "Bundan sonra yeni bir gökle yeni bir yeryüzü gördüm. Çünkü önceki gökle yeryüzü ortadan kalkmıştı." },
          { no: 3, text: "Tahttan yükselen gür bir sesin şöyle dediğini işittim: 'İşte, Tanrı'nın konutu insanların arasındadır.'" },
          { no: 4, text: "Onların gözlerinden bütün yaşları silecek. Artık ölüm olmayacak. Artık ne yas, ne ağlayış, ne de ıstırap olacak." },
          { no: 5, text: "Tahtta oturan, 'İşte her şeyi yeniliyorum' dedi." },
          { no: 6, text: "Ben susayana yaşam suyunun pınarından karşılıksız su vereceğim." },
        ],
      },
    ],
  },
];

export const TEVRAT_BOOKS: ScriptureBook[] = [
  {
    id: "tekvin",
    shortName: "Tekvin",
    fullName: "Yaratılış",
    testament: "Eski Ahit",
    description: "Dünyanın yaratılışı, ilk insanlar ve İsrail atalarının kıssaları.",
    chapters: [
      {
        no: 1,
        title: "Yaratılış",
        verses: [
          { no: 1, text: "Başlangıçta Tanrı göğü ve yeri yarattı." },
          { no: 2, text: "Yer boştu, yeryüzü şekilleri yoktu; engin karanlıklarla kaplıydı. Tanrı'nın Ruhu suların üzerinde dalgalanıyordu." },
          { no: 3, text: "Tanrı, 'Işık olsun' dedi ve ışık oldu." },
          { no: 4, text: "Tanrı ışığın iyi olduğunu gördü ve onu karanlıktan ayırdı." },
          { no: 26, text: "Tanrı, 'İnsanı kendi suretimizde, kendimize benzer yaratalım' dedi, 'Denizdeki balıklara, gökteki kuşlara, evcil hayvanlara, sürüngenlere, yeryüzünün tümüne egemen olsun.'" },
          { no: 27, text: "Tanrı insanı kendi suretinde yarattı. Böylece insan Tanrı suretinde yaratılmış oldu. İnsanları erkek ve dişi olarak yarattı." },
          { no: 31, text: "Tanrı yarattıklarına baktı ve her şeyin çok iyi olduğunu gördü." },
        ],
      },
      {
        no: 12,
        title: "Tanrı'nın İbrahim'i Çağırması",
        verses: [
          { no: 1, text: "RAB Avram'a, 'Ülkeni, akrabalarını, baba evini bırak, sana göstereceğim ülkeye git' dedi." },
          { no: 2, text: "'Seni büyük bir ulus yapacağım, seni kutsayacak, sana ün kazandıracağım, bereket kaynağı olacaksın.'" },
          { no: 3, text: "'Seni kutsayanları kutsayacak, seni lanetleyeni lanetleyeceğim. Yeryüzündeki bütün halklar senin aracılığınla kutsanacak.'" },
          { no: 4, text: "Avram RAB'bin buyurduğu gibi yola çıktı." },
        ],
      },
    ],
  },
  {
    id: "cikis",
    shortName: "Çıkış",
    fullName: "Mısır'dan Çıkış",
    testament: "Eski Ahit",
    description: "İsrailoğullarının Mısır'dan kurtuluşu ve On Emir'in verilişi.",
    chapters: [
      {
        no: 3,
        title: "Yanan Çalı",
        verses: [
          { no: 4, text: "RAB Musa'nın yaklaştığını görünce, çalının içinden, 'Musa, Musa!' diye seslendi. Musa, 'Buyur!' diye yanıtladı." },
          { no: 5, text: "Tanrı, 'Fazla yaklaşma' dedi, 'Çarıklarını çıkar. Çünkü bastığın yer kutsal topraktır.'" },
          { no: 14, text: "Tanrı, 'Ben Ben'im' dedi, 'İsraillilere de ki, Beni size Ben Ben'im diyen gönderdi.'" },
        ],
      },
      {
        no: 14,
        title: "Kızıldeniz'in Yarılması",
        verses: [
          { no: 14, text: "RAB sizin için savaşacak, siz sakin olun yeter." },
          { no: 21, text: "Musa elini denizin üzerine uzattı. RAB bütün gece güçlü doğu rüzgârıyla suları geri itti, denizi karaya çevirdi. Sular ikiye bölündü." },
          { no: 22, text: "İsrailliler kuru toprak üzerinde yürüyerek denizi geçtiler. Sular sağlarında, sollarında onlara duvar oluşturdu." },
        ],
      },
      {
        no: 20,
        title: "On Emir",
        verses: [
          { no: 2, text: "Seni Mısır'dan, köle olduğun ülkeden çıkaran Tanrın RAB benim." },
          { no: 3, text: "Benden başka tanrın olmayacak." },
          { no: 4, text: "Kendine yukarıda gökyüzünde, aşağıda yeryüzünde ya da yer altındaki sularda yaşayan herhangi bir canlıya benzer put yapmayacaksın." },
          { no: 7, text: "Tanrın RAB'bin adını boş yere ağzına almayacaksın." },
          { no: 8, text: "Şabat Günü'nü kutsal sayarak anımsa." },
          { no: 12, text: "Annene babana saygı göster. Öyle ki, Tanrın RAB'bin sana vereceği ülkede ömrün uzun olsun." },
          { no: 13, text: "Adam öldürmeyeceksin." },
          { no: 14, text: "Zina etmeyeceksin." },
          { no: 15, text: "Çalmayacaksın." },
          { no: 16, text: "Komşuna karşı yalan yere tanıklık etmeyeceksin." },
          { no: 17, text: "Komşunun evine, karısına, kölesine, hizmetçisine, öküzüne, eşeğine, hiçbir şeyine göz dikmeyeceksin." },
        ],
      },
    ],
  },
  {
    id: "tesniye",
    shortName: "Tesniye",
    fullName: "Yasanın Tekrarı",
    testament: "Eski Ahit",
    description: "Musa'nın İsrail halkına verilen yasayı yeniden anımsattığı kitap.",
    chapters: [
      {
        no: 6,
        title: "Şema",
        verses: [
          { no: 4, text: "Dinle, ey İsrail! Tanrımız RAB tek RAB'dir." },
          { no: 5, text: "Tanrın RAB'bi bütün yüreğinle, bütün canınla, bütün gücünle seveceksin." },
          { no: 6, text: "Bugün size verdiğim bu buyrukları aklınızda tutun." },
          { no: 7, text: "Çocuklarınıza belletin. Evinizde otururken, yolda yürürken, yatarken, kalkarken bunlardan söz edin." },
        ],
      },
      {
        no: 31,
        title: "Cesur Ol",
        verses: [
          { no: 6, text: "Güçlü ve yürekli olun! Onlardan korkmayın, yılmayın. Çünkü Tanrınız RAB sizinle birlikte gidiyor. Sizi terk etmeyecek, sizi yüzüstü bırakmayacak." },
          { no: 8, text: "RAB'bin kendisi önünüzden gidecek, seninle birlikte olacak. Seni terk etmeyecek, seni yüzüstü bırakmayacak. Korkma, yılma." },
        ],
      },
    ],
  },
  {
    id: "mezmurlar",
    shortName: "Mezmurlar",
    fullName: "Mezmurlar Kitabı",
    testament: "Eski Ahit",
    description: "Davut ve diğer ozanların yazdığı, Tanrı'ya yönelik 150 ilahiden oluşan kitap.",
    chapters: [
      {
        no: 1,
        title: "İki Yol",
        verses: [
          { no: 1, text: "Ne mutlu o insana ki, kötülerin öğüdüyle yürümez, günahkârların yolunda durmaz, alaycıların arasında oturmaz." },
          { no: 2, text: "Ancak zevkini RAB'bin Yasası'ndan alır ve gece gündüz onun üzerinde derin derin düşünür." },
          { no: 3, text: "Böylesi, akarsu kıyılarına dikilmiş ağaca benzer; meyvesini mevsiminde verir, yaprağı hiç solmaz. Yaptığı her işi başarır." },
        ],
      },
      {
        no: 23,
        title: "RAB Çobanımdır",
        verses: [
          { no: 1, text: "RAB çobanımdır, eksiğim olmaz." },
          { no: 2, text: "Beni yemyeşil çayırlarda yatırır, sakin suların kıyısına götürür." },
          { no: 3, text: "İçimi tazeler, adı uğruna bana doğru yollarda öncülük eder." },
          { no: 4, text: "Karanlık ölüm vadisinden geçsem bile, kötülükten korkmam. Çünkü sen benimlesin. Çomağın, değneğin güven verir bana." },
          { no: 5, text: "Düşmanlarımın önünde bana sofra kurarsın, başıma yağ sürersin, kâsem taşıyor." },
          { no: 6, text: "Ömrümün her günü iyilik ve sevgi izleyecek beni; hep RAB'bin evinde oturacağım." },
        ],
      },
      {
        no: 91,
        title: "Yüce Olan'ın Korunması",
        verses: [
          { no: 1, text: "Yüceler Yücesi'nin barınağında oturan, Her Şeye Gücü Yeten'in gölgesinde barınır." },
          { no: 2, text: "'O benim sığınağım, kalemdir' derim RAB için, 'Tanrım'dır, O'na güvenirim.'" },
          { no: 4, text: "Seni kanatlarının altına alır, onların altına sığınırsın. O'nun sadakati senin kalkanın, siperin olur." },
          { no: 11, text: "Çünkü Tanrı meleklerine buyruk verecek, gideceğin her yerde seni korusunlar diye." },
        ],
      },
      {
        no: 121,
        title: "Yardımım Nereden Gelir",
        verses: [
          { no: 1, text: "Gözlerimi dağlara kaldırıyorum, nereden yardım gelecek?" },
          { no: 2, text: "Yeri göğü yaratan RAB'den gelecek yardım." },
          { no: 7, text: "RAB her kötülükten seni korur, esirger canını." },
          { no: 8, text: "Şimdiden sonsuza dek RAB koruyacak gidişini, gelişini." },
        ],
      },
      {
        no: 139,
        title: "Tanrı Beni Bilir",
        verses: [
          { no: 1, text: "Ya RAB, sınayıp tanıdın beni." },
          { no: 7, text: "Nereye gidebilirim senin Ruhun'dan, nereye kaçabilirim huzurundan?" },
          { no: 14, text: "Sana övgüler sunarım, çünkü müthiş ve harika yaratılmışım. Ne harika işlerin var! Bunu çok iyi bilirim." },
          { no: 23, text: "Ey Tanrı, yokla beni, tanı yüreğimi, sına beni, öğren kaygılarımı." },
          { no: 24, text: "Bak, seni gücendiren bir yön var mı bende, öncülük et bana sonsuz yaşam yolunda!" },
        ],
      },
    ],
  },
  {
    id: "ozdeyisler",
    shortName: "Özdeyişler",
    fullName: "Süleyman'ın Özdeyişleri",
    testament: "Eski Ahit",
    description: "Süleyman'ın bilgelik üzerine kısa, öğretici sözlerini içeren kitap.",
    chapters: [
      {
        no: 3,
        title: "Bilgeliğin Bereketi",
        verses: [
          { no: 5, text: "RAB'be güven bütün yüreğinle, kendi aklına bel bağlama." },
          { no: 6, text: "Yaptığın her işte RAB'bi an, O senin yollarını düze çıkarır." },
          { no: 9, text: "Servetinle ve ürününün turfandasıyla RAB'bi onurlandır." },
          { no: 13, text: "Bilgeliğe erişen kişi mutludur, anlayış kazanan da." },
        ],
      },
      {
        no: 31,
        title: "Erdemli Kadın",
        verses: [
          { no: 25, text: "Güç ve onurla kuşanmıştır, geleceğe güvenle bakar." },
          { no: 26, text: "Ağzından bilgelik akar, dilinden sevgi öğretisi düşmez." },
          { no: 30, text: "Çekicilik aldatıcı, güzellik geçicidir; ama RAB'den korkan kadın övülmeye layıktır." },
        ],
      },
    ],
  },
  {
    id: "vaiz",
    shortName: "Vaiz",
    fullName: "Vaiz",
    testament: "Eski Ahit",
    description: "Hayatın anlamı, geçiciliği ve Tanrı'dan korkmanın bilgeliği üzerine düşünceler.",
    chapters: [
      {
        no: 3,
        title: "Her Şeyin Bir Vakti",
        verses: [
          { no: 1, text: "Her şeyin mevsimi, göklerin altındaki her etkinliğin zamanı vardır." },
          { no: 2, text: "Doğmanın zamanı var, ölmenin zamanı var. Dikmenin zamanı var, sökmenin zamanı var." },
          { no: 4, text: "Ağlamanın zamanı var, gülmenin zamanı var. Yas tutmanın zamanı var, oynamanın zamanı var." },
          { no: 11, text: "O her şeyi zamanında güzel yaptı. İnsanların yüreğine sonsuzluk kavramını koydu." },
        ],
      },
      {
        no: 12,
        title: "Yaratıcını Anımsa",
        verses: [
          { no: 1, text: "Bu nedenle, kötü günler gelmeden, gençlik yıllarında Yaratıcını anımsa." },
          { no: 13, text: "Her şey duyuldu, sonuç şu: Tanrı'dan kork ve buyruklarını yerine getir, çünkü her insanın görevi budur." },
        ],
      },
    ],
  },
  {
    id: "yesaya",
    shortName: "Yeşaya",
    fullName: "Yeşaya Peygamber",
    testament: "Eski Ahit",
    description: "Tanrı'nın merhameti, Mesih'in gelişi ve İsrail'in kurtuluşu üzerine peygamberlik.",
    chapters: [
      {
        no: 40,
        title: "Tanrı'nın Halkına Teselli",
        verses: [
          { no: 1, text: "'Avutun halkımı' diyor Tanrınız, 'Avutun!'" },
          { no: 28, text: "Bilmiyor musun, duymadın mı? Ebedi Tanrı, RAB, dünyanın dört bucağını yaratan, ne yorulur ne de zayıflar, O'nun bilgisi kavranamaz." },
          { no: 29, text: "Yorulanı güçlendirir, takati olmayanın gücünü artırır." },
          { no: 31, text: "RAB'be umut bağlayanlarsa taze güce kavuşur, kanat açıp kartal gibi yükselirler. Koşar ama zayıf düşmez, yürür ama yorulmazlar." },
        ],
      },
      {
        no: 53,
        title: "RAB'bin Acı Çeken Kulu",
        verses: [
          { no: 4, text: "Aslında hastalıklarımızı o üstlendi, acılarımızı o yüklendi." },
          { no: 5, text: "Oysa, bizim isyanlarımız yüzünden onun bedeni deşildi, bizim suçlarımız yüzünden o eziyet çekti. Esenliğimiz için gerekli olan ceza ona verildi. Onun yaralarıyla biz şifa bulduk." },
        ],
      },
    ],
  },
];

export function getIncilBook(id: string): ScriptureBook | undefined {
  return INCIL_BOOKS.find((b) => b.id === id);
}

export function getTevratBook(id: string): ScriptureBook | undefined {
  return TEVRAT_BOOKS.find((b) => b.id === id);
}
