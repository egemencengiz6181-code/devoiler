// Shared data types and mock data for Devoiler

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  activeIngredient: string;
  activeConcentration: string;
  price: string;
  skinNeeds: string[];
  description: string;
  ingredients: Ingredient[];
  howToUse: string[];
  faqs: FAQ[];
};

export type Ingredient = {
  name: string;
  inci: string;
  concentration?: string;
  benefit: string;
  icon: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type SkinNeed = {
  slug: string;
  label: string;
  description: string;
  icon: string;
};

export type ActiveIngredient = {
  slug: string;
  label: string;
  description: string;
  science: string;
};

export const skinNeeds: SkinNeed[] = [
  {
    slug: "leke",
    label: "Leke & Ton Eşitsizliği",
    description: "Melanin sentezini düzenleyen kanıta dayalı aktif içeriklerle cilt tonunu eşitleyin.",
    icon: "◐",
  },
  {
    slug: "akne",
    label: "Akne & Siyah Nokta",
    description: "Komedon ve inflamatuar akneye karşı; seboregülasyon odaklı protokoller.",
    icon: "◎",
  },
  {
    slug: "gozenek",
    label: "Gözenek Sıkılaştırma",
    description: "Genişlemiş gözenekleri görsel olarak küçülten, ince yüzey dokusunu düzenleyen formülasyonlar.",
    icon: "⊡",
  },
  {
    slug: "nem",
    label: "Nem & Bariyer Onarımı",
    description: "Epidermal bariyer fonksiyonunu destekleyen, transepidermal su kaybını azaltan aktifler.",
    icon: "◈",
  },
  {
    slug: "cizgi",
    label: "Çizgi & Kırışıklık",
    description: "Kollajen sentezini uyaran ve cilt yoğunluğunu artıran klinik olarak değerlendirilmiş bileşenler.",
    icon: "≋",
  },
  {
    slug: "hassas",
    label: "Hassas & Kızarık Cilt",
    description: "İnflamasyonu yatıştıran, reaksiyon riskini minimize eden hypoallerjenik formüller.",
    icon: "◇",
  },
];

export const activeIngredients: ActiveIngredient[] = [
  {
    slug: "retinol",
    label: "Retinol",
    description: "A vitaminin en kapsamlı araştırılmış türevi. Hücre yenilenmesini artırır, ince çizgileri ve leke görünümünü hedefler.",
    science: "Retinol, retinoik asite dönüşerek RAR reseptörlerine bağlanır ve gen ekspresyonunu düzenler.",
  },
  {
    slug: "vitamin-c",
    label: "Vitamin C",
    description: "Güçlü antioksidan etkisi ve melanin inhibisyonu ile aydınlatma protokollerinin temel bileşeni.",
    science: "L-askorbik asit tirozinaz enzimini inhibe eder; serbest radikalleri nötralize eder.",
  },
  {
    slug: "hyaluronik-asit",
    label: "Hyaluronik Asit",
    description: "Kendi ağırlığının 1000 katı su tutabilen humektan. Dermal matrisi destekler.",
    science: "Farklı moleküler ağırlık kombinasyonları epidermal ve dermal hidratasyonu hedefler.",
  },
  {
    slug: "niasinamid",
    label: "Niasinamid",
    description: "Çok yönlü B3 vitamini türevi. Leke, gözenek, nem bariyeri için kanıtlanmış çoklu etki.",
    science: "%4–10 konsantrasyonda melanozom transferini inhibe eder; ceramid sentezini destekler.",
  },
  {
    slug: "asitler",
    label: "AHA & BHA",
    description: "Kimyasal eksfoliasyon için glikolik, laktik (AHA) ve salisilik asit (BHA) protokolleri.",
    science: "AHA'lar korniositler arası bağları çözer, BHA lipofilik yapısıyla gözenek içine nüfuz eder.",
  },
  {
    slug: "peptidler",
    label: "Peptidler",
    description: "Kollajen ve elastin sentezini sinyalizasyon yoluyla uyaran aminoasit zincirleri.",
    science: "Matrikin peptidler fibroblastları aktive ederek ECM yeniden yapılanmasını destekler.",
  },
];

export const products: Product[] = [
  {
    slug: "02-purity-serum",
    name: "02 Purity Serum",
    tagline: "Gözenekleri hedef alır. Dokuyu yeniler.",
    category: "Serum",
    activeIngredient: "Niasinamid",
    activeConcentration: "%10",
    price: "₺620",
    skinNeeds: ["akne", "gozenek", "leke"],
    description:
      "Bilimsel olarak değerlendirilmiş %10 niasinamid konsantrasyonu; sebo üretimini dengeler, gözenek görünümünü rafine eder ve ton eşitsizliklerini düzenler. Fragman, alkol ve yapay renklendirici içermez.",
    ingredients: [
      {
        name: "Niasinamid",
        inci: "Niacinamide",
        concentration: "%10",
        benefit: "Gözenek ve ton eşitlemede klinik referans bileşen",
        icon: "N",
      },
      {
        name: "Çinko PCA",
        inci: "Zinc PCA",
        concentration: "%1",
        benefit: "Sebo üretimini düzenler, anti-inflamatuar",
        icon: "Z",
      },
      {
        name: "Panthenol",
        inci: "Panthenol",
        concentration: "%0.5",
        benefit: "Epidermal bariyeri onarır, nemlendirir",
        icon: "P",
      },
      {
        name: "Hyaluronik Asit (MW: Düşük)",
        inci: "Sodium Hyaluronate",
        benefit: "Dermal hidrasyonu destekler",
        icon: "H",
      },
    ],
    howToUse: [
      "Temizlenmiş ve kurulanmış cilde birkaç damla uygulayın.",
      "Sabah ve akşam kullanım için uygundur.",
      "Güneş koruyucu ile sonlandırın (gündüz protokolü).",
      "İlk 4 haftada günde bir kez, ardından sabah-akşam kullanabilirsiniz.",
    ],
    faqs: [
      {
        question: "Retinol ile aynı anda kullanabilir miyim?",
        answer:
          "Niasinamid, retinol ile kombine edilebilen nadir aktiflerden biridir. Sabah niasinamid, akşam retinol protokolü önerilir.",
      },
      {
        question: "Hassas ciltlere uygun mu?",
        answer:
          "Evet. Formülasyon fragman, alkol ve irritan içermediklerinden hassas ve reaktif ciltler için uygundur.",
      },
      {
        question: "Sonuçları ne zaman görmeye başlarım?",
        answer:
          "Gözenek görünümünde ilk 2-3 haftada, ton eşitlemede 4-8 haftalık tutarlı kullanım sonrasında değişim gözlemlenir.",
      },
    ],
  },
  {
    slug: "08-radiance-serum",
    name: "08 Radiance Serum",
    tagline: "Koruyan. Aydınlatan. Destekleyen.",
    category: "Serum",
    activeIngredient: "Vitamin C (Askorbik Asit)",
    activeConcentration: "%15",
    price: "₺780",
    skinNeeds: ["leke"],
    description:
      "Kararlı %15 L-askorbik asit formülasyonu; güçlü antioksidan koruma sağlarken melanin sentez yolunu hedefler. pH dengeli yapısı maksimum biyoyararlanımı destekler.",
    ingredients: [
      {
        name: "L-Askorbik Asit",
        inci: "Ascorbic Acid",
        concentration: "%15",
        benefit: "Antioksidan koruma ve melanin inhibisyonu",
        icon: "C",
      },
      {
        name: "Ferülik Asit",
        inci: "Ferulic Acid",
        concentration: "%0.5",
        benefit: "Vitamin C stabilitesini artırır, sinerjistik antioksidan",
        icon: "F",
      },
      {
        name: "Vitamin E",
        inci: "Tocopherol",
        benefit: "Lipit peroksidasyonu önler, destekleyici antioksidan",
        icon: "E",
      },
    ],
    howToUse: [
      "Sabah rutinine, toner sonrasına ekleyin.",
      "Temiz parmak uçlarıyla yüz ve boyun bölgesine uygulayın.",
      "Güneş koruyucu ile sonlandırın — Vitamin C fotokoruyucu değildir.",
      "Renk değişimi formülasyonun bozulduğunu göstermez, etkinliği korunur.",
    ],
    faqs: [
      {
        question: "Neden sarardı?",
        answer:
          "L-askorbik asit oksidasyona yatkındır. Hafif renk değişimi normal bir fenolindir ve etkinliği etkilemez. Koyu kahverengi ise değiştirme sinyalidir.",
      },
      {
        question: "AHA ile birlikte kullanılabilir mi?",
        answer:
          "Her ikisi de asidik pH gerektirir, ancak kombinasyon irritasyon riskini artırabilir. Aralarında en az 30 dakika bırakmanız önerilir.",
      },
    ],
  },
  {
    slug: "01-renewal-serum",
    name: "01 Renewal Serum",
    tagline: "Hücre yenilenmesini destekler. Zamanla çalışır.",
    category: "Serum",
    activeIngredient: "Retinol",
    activeConcentration: "%0.5",
    price: "₺850",
    skinNeeds: ["cizgi", "leke", "gozenek"],
    description:
      "Kademeli adaptasyon için tasarlanmış %0.5 retinol formülasyonu, squalene ve ceramid gibi destekleyici bileşenlerle dengede tutulur. İnce çizgiler, leke ve doku iyileştirmesini hedefler.",
    ingredients: [
      {
        name: "Retinol",
        inci: "Retinol",
        concentration: "%0.5",
        benefit: "Hücre döngüsünü hızlandırır, kollajen sentezi destekler",
        icon: "R",
      },
      {
        name: "Skualen",
        inci: "Squalane",
        benefit: "Retinol adaptasyon döneminde bariyeri güçlendirir",
        icon: "S",
      },
      {
        name: "Ceramid NP",
        inci: "Ceramide NP",
        benefit: "Epidermal lipitleri tamamlar, bütünlüğü korur",
        icon: "C",
      },
    ],
    howToUse: [
      "Yalnızca akşam protokolünde kullanın.",
      "İlk 4 hafta haftada 2-3 gece uygulayın.",
      "Tolerans gelişince günlük akşam kullanımına geçin.",
      "Kesinlikle güneş koruyucu ile kombinleyin.",
    ],
    faqs: [
      {
        question: "Peeling (purging) nedir ve normal mi?",
        answer:
          "Retinol kullanımının ilk 4-8 haftasında hücre döngüsünün hızlanmasıyla geçici döküntü yaşanabilir. Bu purging sürecidir ve formülasyona yanıt olarak kabul edilir.",
      },
      {
        question: "Hamilelikte kullanılabilir mi?",
        answer:
          "Hayır. Tüm retinoid formları hamilelik ve emzirme sürecinde kullanılmamalıdır. Doktorunuza danışın.",
      },
    ],
  },
  {
    slug: "05-barrier-cream",
    name: "05 Barrier Cream",
    tagline: "Onarır. Korur. Destekler.",
    category: "Nemlendirici",
    activeIngredient: "Ceramid + Hyaluronik Asit",
    activeConcentration: "%5 Ceramid",
    price: "₺540",
    skinNeeds: ["nem", "hassas"],
    description:
      "Çok katmanlı bariyer onarımı için tasarlanan bu formülasyon; ceramidler, kolesterol ve serbest yağ asitleri ile fizyolojik lipid dengesini yeniden kurar.",
    ingredients: [
      {
        name: "Ceramid NP + AP + EOP",
        inci: "Ceramide NP, Ceramide AP, Ceramide EOP",
        concentration: "%5 total",
        benefit: "Stratum korneumun lipid matrisi yenilenir",
        icon: "C",
      },
      {
        name: "Kolesterol",
        inci: "Cholesterol",
        benefit: "Fizyolojik lipid oranını tamamlar",
        icon: "K",
      },
      {
        name: "Hyaluronik Asit (3 MW)",
        inci: "Sodium Hyaluronate",
        benefit: "Çoklu yaş nemlendiricisi",
        icon: "H",
      },
      {
        name: "Madecassoside",
        inci: "Madecassoside",
        benefit: "Yatıştırıcı, sükunet sağlayıcı",
        icon: "M",
      },
    ],
    howToUse: [
      "Sabah ve akşam serumun üzerine uygulayın.",
      "Yüz, boyun ve göz çevresi için kullanılabilir.",
      "Nemlendirici olarak son adım katmanıdır.",
    ],
    faqs: [
      {
        question: "Yağlı ciltler için uygun mu?",
        answer:
          "Evet. Hafif ve nefes alabilen formülasyonu yağlı ve karma ciltlerde de kullanılabilir. Seramid eksikliği her cilt tipinde görülebilir.",
      },
    ],
  },
];
