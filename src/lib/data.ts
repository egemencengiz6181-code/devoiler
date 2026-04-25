// Shared data types and mock data for Devoiler

export type Review = {
  text: string;
  author: string;
};

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
  image?: string;
  detailImages?: string[];
  reviews?: Review[];
  soldOut?: boolean;
};

export type ProductCategory = {
  slug: string;
  label: string;
};

export const productCategories: ProductCategory[] = [
  { slug: "tumu", label: "Tümü" },
  { slug: "serumlar", label: "Serumlar" },
  { slug: "kremler", label: "Kremler" },
  { slug: "tonikler", label: "Tonikler" },
  { slug: "gunes-korumasi", label: "Güneş Koruması" },
  { slug: "temizleyiciler", label: "Temizleyiciler" },
];

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
    slug: "akne-karsiti-serum",
    name: "Akne Karşıtı Serum",
    tagline: "Siyah nokta ve sivilce karşıtı. Yağ dengesi. Parfümsüz.",
    category: "Serumlar",
    activeIngredient: "Niacinamide + Salisilik Asit + Azelaik Asit",
    activeConcentration: "30 ml",
    price: "₺590",    soldOut: true,    skinNeeds: ["akne", "gozenek", "leke"],
    description:
      "Siyah nokta ve sivilce oluşumuna karşı etkili koruma sağlar. Yağ dengesini sağlayarak aşırı sebum üretimini kontrol altına alır. Cilt tonu eşitsizliklerini gidermeye yardımcı olur. Parfüm içermez, Vegandır ve Gluten Free formüle sahiptir.",
    image: "/assets/urunler/akne karşıtı serum/ana görseller.png",
    detailImages: [
      "/assets/urunler/akne karşıtı serum/detay 1.png",
      "/assets/urunler/akne karşıtı serum/detay 2.png",
      "/assets/urunler/akne karşıtı serum/detay 3.png",
      "/assets/urunler/akne karşıtı serum/detay 4.png",
    ],
    ingredients: [
      { name: "Niacinamide", inci: "Niacinamide", benefit: "Sebo regülasyonu, gözenek sıkılaştırma ve anti-inflamatuar etki", icon: "N" },
      { name: "Zinc PCA (Çinko)", inci: "Zinc PCA", benefit: "Yağ üretimini dengeler, antibakteriyel destek", icon: "Z" },
      { name: "Salisilik Asit (BHA)", inci: "Salicylic Acid", benefit: "Lipofilik yapısıyla gözenek içine nüfuz eder, komedonu çözer", icon: "S" },
      { name: "Azelaik Asit", inci: "Azelaic Acid", benefit: "Akne izlerini ve cilt tonu eşitsizliklerini giderir", icon: "A" },
      { name: "Centella Asiatica Özü", inci: "Centella Asiatica Extract", benefit: "Yatıştırıcı ve bariyer destekleyici", icon: "C" },
    ],
    howToUse: [
      "Temiz ve kuru cilde akşam rutininde uygulayın.",
      "3-4 damla alarak yüze hafifçe yayın.",
      "İlk 2 hafta günaşırı kullanın, ardından her akşam uygulayabilirsiniz.",
      "Gündüz mutlaka güneş koruyucu kullanın.",
    ],
    faqs: [
      { question: "Hassas ciltler kullanabilir mi?", answer: "İlk kullanımda hafif bir karıncalanma normaldir. Hassas ciltler haftada 2-3 kez ile başlamalıdır." },
      { question: "Retinol ile birlikte kullanılabilir mi?", answer: "Aynı akşam kullanılmaması önerilir. Salisilik asit ve retinol farklı gecelerde uygulanmalıdır." },
    ],
    reviews: [
      { text: "Salisilik asit oranı tam kıvamında. Aktif sivilcelerimi söndürürken cildimi hiç kurutmadı.", author: "Gizem L." },
      { text: "Gözenek görünümündeki küçülmeyi 2 haftada fark ettim. Yağ dengesini bozmadan temizliyor.", author: "Dr. Mert Y." },
      { text: "Kimyager formülü farkı burada; iritasyon yapmayan bir akne serumu bulmak zordu.", author: "Selin T." },
      { text: "Cildim ilk kez bu kadar sakin. Kızarıklık ve kaşıntı olmadan akne bakımı yapabiliyorum.", author: "Ayşe N." },
      { text: "BHA'yı daha önce denedim ama hepsi kurutuyordu. Bu formül niasinamid sayesinde dengeyi koruyor.", author: "Berna K." },
      { text: "Adet dönemi aknelerimde bile fark yarattı. 3. haftadan itibaren yeni çıkan sivilce sayısı azaldı.", author: "Ece D." },
      { text: "Dermatolojistim de onayladı. Formülasyondaki konsantrasyonlar klinik çalışmalarla uyumlu.", author: "Prof. Dr. Zeynep A." },
      { text: "Gözeneklerim ilk defa bu kadar temiz görünüyor. Günlük makyaj ihtiyacım bile azaldı.", author: "Melis R." },
      { text: "pH dengesi mükemmel ayarlanmış; ciltte yanma veya soyulma yaşamadım.", author: "Dilan F." },
      { text: "Ankara'nın kuru havasında bile cildimi yağlandırmadan temiz tutuyor. Tam bir denge formülü.", author: "Cansu B." },
    ],
  },
  {
    slug: "anti-aging-tonic",
    name: "Anti-Aging Tonic Youth Aqua",
    tagline: "Nemlendirir. Ferahlatır. Gözenekleri sıkılaştırır.",
    category: "Tonikler",
    activeIngredient: "Centella Asiatica + Niacinamide + Sodyum Hyaluronat",
    activeConcentration: "150 ml",
    price: "₺520",
    soldOut: true,
    skinNeeds: ["nem", "gozenek", "leke"],
    description:
      "Cildi derinlemesine nemlendirir ve ferahlatıcı etkisiyle yatıştırır. Gözenekleri sıkılaştırır ve sebum dengesini sağlar. Cilt tonunu eşitlemeye yardımcı olur. Tüm cilt tipleri için uygundur, özellikle nem ihtiyacı olan ciltler için tavsiye edilir.",
    image: "/assets/urunler/anti-aging tonic/ana görseller.png",
    detailImages: [
      "/assets/urunler/anti-aging tonic/detay 1.png",
      "/assets/urunler/anti-aging tonic/detay2.png",
      "/assets/urunler/anti-aging tonic/detay 3.png",
      "/assets/urunler/anti-aging tonic/detay 4.png",
    ],
    ingredients: [
      { name: "Centella Asiatica", inci: "Centella Asiatica Extract", benefit: "Yatıştırıcı, bariyer destekleyici ve onarıcı", icon: "C" },
      { name: "Aloe Vera", inci: "Aloe Barbadensis Leaf Extract", benefit: "Derin nemlendirme ve ferahlatıcı etki", icon: "A" },
      { name: "Niacinamide", inci: "Niacinamide", benefit: "Gözenek sıkılaştırma ve cilt tonu eşitleme", icon: "N" },
      { name: "Sodyum Hyaluronat", inci: "Sodium Hyaluronate", benefit: "Uzun süreli nemlendirme ve nem bariyeri", icon: "H" },
      { name: "Salatalık Özü", inci: "Cucumis Sativus Fruit Extract", benefit: "Canlandırıcı ve ferahlatıcı etki", icon: "S" },
    ],
    howToUse: [
      "Temizleme sonrası pamuk veya avuç içiyle uygulayın.",
      "Sabah ve akşam kullanıma uygundur.",
      "Serum adımından önce kullanın.",
      "Güneş koruyucu ile sonlandırın.",
    ],
    faqs: [
      { question: "Her gün kullanılabilir mi?", answer: "Evet, günlük kullanım için formüle edilmiştir. Sabah ve akşam rahatlıkla uygulanabilir." },
      { question: "Yağlı ciltler kullanabilir mi?", answer: "Evet, hafif yapısı ve sebum dengeleyici etkisiyle yağlı ciltler için de idealdir." },
    ],
    reviews: [
      { text: "Temizlik sonrası cildimi germeden canlandırıyor. İnce çizgilerde dolgunluk etkisi hissettim.", author: "Arzu H." },
      { text: "Ankara'nın kireçli suyunun cildimdeki sertliğini anında kırıyor, pH'ı harika dengeliyor.", author: "Esra B." },
      { text: "Formüldeki aktiflerin emilimi için harika bir hazırlayıcı. Sabah akşam vazgeçilmezim.", author: "Ceren K." },
      { text: "Glikolik asit konsantrasyonu tam doğru; eksfoliasyon yapıyor ama tahriş etmiyor.", author: "Nehir S." },
      { text: "Cilt dokum 3 haftada gözle görülür şekilde düzeldi. Makyajım artık çok daha pürüzsüz oturuyor.", author: "Aslı T." },
      { text: "Peptid kompleksi sayesinde sıkılaşma hissi var. Anti-aging toniğin bu kadar etkili olacağını beklemiyordum.", author: "Derya M." },
      { text: "Kış aylarında cildim çok matlaşıyordu. Bu tonikle sabah kalktığımda bile ışıltılı görünüyorum.", author: "İpek Y." },
      { text: "Kimyager eli değmiş bir formül. İçerik listesi kısa ama her biri amacına hizmet ediyor.", author: "Füsun Ö." },
      { text: "Serum öncesi hazırlayıcı olarak kullandığımda diğer ürünlerin etkinliği bile arttı.", author: "Gülşah E." },
    ],
  },
  {
    slug: "gunes-kremi",
    name: "Güneş Kremi SPF 50+ PA+++",
    tagline: "UVA/UVB + Mavi ışık koruması. Mat bitiş. Sebum dengeleyici.",
    category: "Güneş Koruması",
    activeIngredient: "Titanyum Dioksit + Spirulina + Niacinamide",
    activeConcentration: "50 ml",
    price: "₺480",
    soldOut: true,
    skinNeeds: ["hassas", "leke", "cizgi"],
    description:
      "Yüksek düzeyde UVA ve UVB koruması sağlar; mavi ışık koruması içerir. Antioksidan özelliğiyle cildi korurken hızlı emilen mat bir bitiş sunar. Sebum dengeleyici ve ton eşitleyici etkisiyle cildi besler. Tüm cilt tipleri için uygundur.",
    image: "/assets/urunler/gunes kremi/ana görseller.png",
    detailImages: [
      "/assets/urunler/gunes kremi/detay 1 .png",
      "/assets/urunler/gunes kremi/detay 2.png",
      "/assets/urunler/gunes kremi/detay 3.png",
    ],
    ingredients: [
      { name: "Titanyum Dioksit", inci: "Titanium Dioxide", benefit: "Fiziksel UVA/UVB filtre, geniş spektrum koruma", icon: "T" },
      { name: "Spirulina", inci: "Spirulina Platensis Extract", benefit: "Antioksidan, mavi ışık koruması ve canlandırıcı", icon: "S" },
      { name: "Panthenol", inci: "Panthenol", benefit: "Nem bariyerini güçlendirir, yatıştırıcı", icon: "P" },
      { name: "Niacinamide", inci: "Niacinamide", benefit: "Sebum dengeleyici, ton eşitleyici", icon: "N" },
      { name: "Kolajen", inci: "Hydrolyzed Collagen", benefit: "Cilt elastikiyetini destekler, dolgunlaştırıcı", icon: "K" },
      { name: "Centella Asiatica", inci: "Centella Asiatica Extract", benefit: "Yatıştırıcı ve bariyer onarıcı", icon: "C" },
    ],
    howToUse: [
      "Güneşe çıkmadan 15-20 dakika önce bol miktarda uygulayın.",
      "2 saatte bir yeniden uygulayın.",
      "Yüz, boyun ve dekolte bölgesine yayın.",
      "Makyaj üzerine de uygulanabilir.",
    ],
    faqs: [
      { question: "Yağlı ciltlere uygun mu?", answer: "Evet. Mat bitiş ve sebum dengeleyici formülasyonuyla yağlı ciltler için idealdir." },
      { question: "Makyaj altına kullanılabilir mi?", answer: "Beyaz iz bırakmayan formülasyonu sayesinde makyaj bazı olarak idealdir." },
    ],
    reviews: [
      { text: "Asla beyazlık bırakmıyor ve yağlı his hissettirmiyor. Makyaj altına sürdüğüm en iyi güneş kremi.", author: "Nazlı E." },
      { text: "Güneş korumasının yanı sıra cildi nemli tutması çok başarılı. Formülasyonu çok hafif.", author: "İrem G." },
      { text: "Ciltte ağırlık yapmayan, gözenek tıkamayan bir koruyucu. Kimyager titizliği belli oluyor.", author: "Ebru S." },
      { text: "SPF 50+ olmasına rağmen bu kadar hafif bir doku beklemiyordum. Gün boyu konforlu.", author: "Pelin A." },
      { text: "Antioksidan desteği bir bonus. Hem koruyor hem bakım yapıyor.", author: "Buse Ç." },
      { text: "Hassas cildimde hiçbir reaksiyon yaşamadım. Dermatolojik testlerden geçtiğini bilmek güven veriyor.", author: "Zehra D." },
      { text: "Ankara güneşi çok yakıcı, bu krem her gün yanımda. Yeniden uygulama da çok pratik.", author: "Merve K." },
      { text: "Fondöten altında topaklanma sıfır. Primer gibi düzgün bir baz oluşturuyor.", author: "Seda N." },
      { text: "Son 5 yıldır denediğim en stabil güneş kremi formülasyonu. Terlemeyle bile etkisi azalmıyor.", author: "Dr. Elif T." },
      { text: "Çocuklarıma da gönül rahatlığıyla sürüyorum. Temiz içerik listesi bir anne olarak çok önemli.", author: "Handan B." },
    ],
  },
  {
    slug: "leke-karsiti-serum",
    name: "Leke Karşıtı Serum",
    tagline: "Leke giderici. Ton eşitleyici. Aydınlatıcı.",
    category: "Serumlar",
    activeIngredient: "Arbutin + Kolajen + Moringa Özü",
    activeConcentration: "30 ml",
    price: "₺680",
    soldOut: true,
    skinNeeds: ["leke", "cizgi"],
    description:
      "Koyu leke görünümünü azaltmaya ve cilt tonunu eşitlemeye yardımcı olur. Cilde daha parlak ve canlı bir görünüm kazandırarak donukluğu giderir. Yaşlanma karşıtı ve sıkılaştırıcı bakım sunar. Leke sorunu olan, donuk ve yaşlanma karşıtı bakım isteyen tüm cilt tipleri için uygundur.",
    image: "/assets/urunler/leke karşıtı serum/ana görseller.png",
    detailImages: [
      "/assets/urunler/leke karşıtı serum/detay 1.png",
      "/assets/urunler/leke karşıtı serum/detay 2.png",
    ],
    ingredients: [
      { name: "Arbutin", inci: "Alpha-Arbutin", benefit: "Tirozinaz inhibitörü, melanin sentezini yavaşlatarak leke görünümünü azaltır", icon: "A" },
      { name: "Kolajen", inci: "Hydrolyzed Collagen", benefit: "Yaşlanma karşıtı, cilt elastikiyetini destekler ve sıkılaştırır", icon: "K" },
      { name: "Moringa Özü", inci: "Moringa Oleifera Seed Extract", benefit: "Aydınlatıcı, antioksidan ve canlandırıcı etki", icon: "M" },
    ],
    howToUse: [
      "Sabah ve akşam temiz cilde uygulayın.",
      "Lekeli bölgelere odaklanarak 3-4 damla yayın.",
      "Nemlendirici ile devam edin.",
      "Gündüz mutlaka SPF 50+ koruma kullanın.",
    ],
    faqs: [
      { question: "Ne kadar sürede sonuç verir?", answer: "Tutarlı kullanımda 4-8 hafta içinde leke tonunda belirgin açılma gözlemlenir. 12 haftada optimum sonuç beklenir." },
      { question: "Hamilelikte kullanılabilir mi?", answer: "Arbutin hamilelikte güvenli kabul edilir ancak doktorunuza danışmanızı öneririz." },
    ],
    reviews: [
      { text: "Güneş lekelerimdeki açılma gözle görülür seviyede. Cilt tonum sonunda eşitlendi.", author: "Funda D." },
      { text: "C Vitamini ve Niasinamid dengesi çok başarılı. Aydınlık bir görünüm veriyor.", author: "Sibel A." },
      { text: "Donuk cildime 10 günde ışıltı geldi. Şeffaf ve dürüst içerik listesi için teşekkürler.", author: "Damla Ç." },
      { text: "Alfa arbutin ile traneksamik asit kombinasyonu muhteşem. Lekelerim her hafta biraz daha açılıyor.", author: "Nurgül K." },
      { text: "Hamilelik maskesi için dermatolojistim önerdi. 6 haftada belirgin iyileşme gördüm.", author: "Yasemin E." },
      { text: "Daha önce C vitamini ürünleri oksitleniyordu. Bu stabilize form renk bile değiştirmedi.", author: "Burcu T." },
      { text: "Akne sonrası izlerimde büyük fark var. Cilt tonum artık çok daha homojen.", author: "Elif S." },
      { text: "ODTÜ Kimya bilgisiyle hazırlanmış olması güven veriyor. Formülasyondaki her aktif bilimsel temelli.", author: "Özge M." },
      { text: "Gece serumu olarak kullanıyorum, sabah aynaya baktığımda cildim çok daha parlak.", author: "Aylin R." },
      { text: "4 aydır düzenli kullanıyorum. Güneş lekelerim yüzde 70 oranında açıldı.", author: "Sevgi H." },
    ],
  },
  {
    slug: "somon-dna-serum",
    name: "Somon DNA Serum",
    tagline: "Yaşlanma karşıtı. Sıkılaştırıcı. Yoğun besleyici.",
    category: "Serumlar",
    activeIngredient: "Somon DNA + Argireline + Kolajen",
    activeConcentration: "30 ml",
    price: "₺920",
    soldOut: true,
    skinNeeds: ["cizgi", "nem", "hassas"],
    description:
      "Yaşlanma karşıtı bakım sunarak ince çizgilerin ve kırışıklıkların görünümünü azaltır. Cildi sıkılaştırır ve daha genç bir görünüm kazandırır. Yoğun besleyici ve canlandırıcı etkisiyle nem ihtiyacını karşılar. Tüm cilt tipleri, özellikle olgun ve nemsiz ciltler için uygundur.",
    image: "/assets/urunler/somon dna serum/ana görseller.png",
    detailImages: [
      "/assets/urunler/somon dna serum/detay 1.png",
      "/assets/urunler/somon dna serum/detay 2.png",
      "/assets/urunler/somon dna serum/detay 3.png",
      "/assets/urunler/somon dna serum/detay4.png",
    ],
    ingredients: [
      { name: "Somon DNA", inci: "Polydeoxyribonucleotide (PDRN)", benefit: "Hücresel yenilenme ve doku onarımı", icon: "D" },
      { name: "Argireline", inci: "Acetyl Hexapeptide-8", benefit: "Mimik çizgilerini azaltır, botoks benzeri etki", icon: "A" },
      { name: "Kolajen", inci: "Hydrolyzed Collagen", benefit: "Cilt elastikiyetini artırır, sıkılaştırır", icon: "K" },
      { name: "Centella Asiatica", inci: "Centella Asiatica Extract", benefit: "Yatıştırıcı ve bariyer destekleyici", icon: "C" },
      { name: "Helichrysum Italicum", inci: "Helichrysum Italicum Flower Extract", benefit: "Canlandırıcı, antioksidan ve onarıcı", icon: "H" },
    ],
    howToUse: [
      "Akşam rutininde temiz cilde uygulayın.",
      "3-5 damla alarak yüz ve boyun bölgesine masaj yaparak yayın.",
      "Nemlendirici ile kilit altına alın.",
      "Düzenli kullanımda 6-8 hafta sonunda belirgin fark gözlemlenir.",
    ],
    faqs: [
      { question: "Somon DNA nedir?", answer: "Somon balığının DNA'sından elde edilen polideoksiribonükleotid (PDRN), hücresel onarım mekanizmalarını aktive eden biyolojik bir moleküldür." },
      { question: "Vegan mıdır?", answer: "Hayır. PDRN somon balığı kaynaklıdır. Bu konuda şeffaflığı ön planda tutuyoruz." },
    ],
    reviews: [
      { text: "Hücre yenilenmesini hissedebiliyorsunuz. Cildim daha elastik ve sağlıklı görünüyor.", author: "Pınar U." },
      { text: "Profesyonel bakımın evdeki karşılığı. Moleküler yapısı cilde anında nüfuz ediyor.", author: "Ece F." },
      { text: "ODTÜ Kimya vizyonuyla hazırlanmış gerçek bir onarıcı. Yorgun cildimi resmen uyandırdı.", author: "Banu K." },
      { text: "Klinik prosedür sonrası dermatolojistimin tavsiyesiyle kullanmaya başladım. İyileşme süreci hızlandı.", author: "Deniz Ö." },
      { text: "PDRN teknolojisinin topikal formda bu kadar etkili olacağını düşünmezdim. Çizgilerim belirgin azaldı.", author: "Nil S." },
      { text: "Kollajen desteği gerçekten hissediliyor. Cildim dolgun ve gergin görünüyor.", author: "Ayla B." },
      { text: "40 yaş sonrası anti-aging rutinimin en değerli ürünü. Bilimsel formülasyona güveniyorum.", author: "Serpil G." },
      { text: "Adenozin ve PDRN birlikteliği ciltteki sarkma hissini azalttı. Çene hattım daha belirgin.", author: "Filiz E." },
      { text: "Gece uyguladığımda sabah cildimde bambaşka bir canlılık görüyorum. Gerçek bir yenilenme serumu.", author: "Hale T." },
      { text: "Bilimsel literatürle uyumlu konsantrasyonlar kullanılmış. Bir kimyager markasından beklenen titizlik.", author: "Dr. Canan M." },
    ],
  },
  {
    slug: "yuz-temizleme-jeli",
    name: "Yüz Temizleme Jeli",
    tagline: "Glikolik asitli. Arındırıcı. Hücre yenileyici.",
    category: "Temizleyiciler",
    activeIngredient: "Glikolik Asit + Tea Tree + Centella Asiatica",
    activeConcentration: "200 ml",
    price: "₺380",
    soldOut: true,
    skinNeeds: ["akne", "leke", "gozenek"],
    description:
      "Cildi arındırırken hücre yenilenmesini destekler ve derinlemesine temizlik sağlar. Siyah nokta ve akne karşıtı bakım sunar, sebumu dengeler. Donuk cilt görünümünü azaltır ve daha eşit bir cilt tonu sağlar. Tüm cilt tipleri, özellikle akneye eğilimli ve koyu leke sorunu olan ciltler için uygundur.",
    image: "/assets/urunler/yuz temizleme jeli/ana görseller.png",
    detailImages: [
      "/assets/urunler/yuz temizleme jeli/detay 1.png",
      "/assets/urunler/yuz temizleme jeli/detay 2.png",
      "/assets/urunler/yuz temizleme jeli/detay 3.png",
    ],
    ingredients: [
      { name: "Glikolik Asit", inci: "Glycolic Acid", benefit: "Hücre yenilenmesini destekler, ölü deriyi arındırır", icon: "G" },
      { name: "Tea Tree (Çay Ağacı) Özü", inci: "Melaleuca Alternifolia Leaf Oil", benefit: "Doğal antibakteriyel, akne karşıtı temizlik", icon: "T" },
      { name: "Centella Asiatica Özü", inci: "Centella Asiatica Extract", benefit: "Yatıştırıcı ve bariyer destekleyici", icon: "C" },
      { name: "Helichrysum Italicum Çiçek Özü", inci: "Helichrysum Italicum Flower Extract", benefit: "Canlandırıcı, antioksidan ve onarıcı", icon: "H" },
    ],
    howToUse: [
      "Islak yüze küçük bir miktar uygulayın.",
      "Dairesel hareketlerle 30-60 saniye masaj yapın.",
      "Ilık su ile durulayın.",
      "Sabah ve akşam kullanıma uygundur.",
    ],
    faqs: [
      { question: "Makyaj temizler mi?", answer: "Günlük makyaj ve güneş kremini etkili şekilde temizler. Ağır makyaj için öncesinde çift temizleme (yağ bazlı + jel) önerilir." },
      { question: "Göz çevresinde kullanılabilir mi?", answer: "Göz bölgesinden kaçınarak kullanmanızı öneririz. Göz makyajı için ayrı bir temizleyici tercih edin." },
    ],
    reviews: [
      { text: "Cildi temizlerken o klasik 'gerilme' hissini yaşatmayan tek jel. Bariyer dostu.", author: "Hülya O." },
      { text: "Derinlemesine temizlik ve nem dengesi bir arada. Hassas cildim için kurtarıcı oldu.", author: "Zeynep R." },
      { text: "Formülasyonu o kadar saf ki, cildimin nefes aldığını hissediyorum. Ankara ayazında bile kurutmadı.", author: "Nilgün S." },
      { text: "Sülfatsız formül cildi yormadan temizliyor. Sabah akşam gönül rahatlığıyla kullanıyorum.", author: "Tuğçe A." },
      { text: "Çay ağacı yağı sayesinde gözeneklerim artık çok daha temiz. Siyah noktalarım azaldı.", author: "Meltem D." },
      { text: "pH 5.5 dengesi gerçekten ciltteki farkı hissettiriyor. Temizlik sonrası sıkılık yok.", author: "Beyza K." },
      { text: "Centella asiatica içermesi kızarıklık sorunum için ekstra fayda sağlıyor.", author: "Şule M." },
      { text: "Panthenol desteği temizleme jelinde nadir bulunan bir özellik. Cilt bariyerim bu ürünle güçlendi.", author: "Gülay E." },
      { text: "Devoiler'in tüm ürünlerini denedim, rutinimin vazgeçilmez ilk adımı bu jel.", author: "Reyhan T." },
      { text: "Hassas ve rozasea eğilimli cildimde hiç kızarıklık yapmadı. Yumuşak ama etkili bir temizlik.", author: "Dr. Ayşen V." },
    ],
  },
  {
    slug: "yaslanma-krisiklik-karsiti-bakim-kremi",
    name: "Yaşlanma Ve Kırışıklık Karşıtı Bakım Kremi (%0,06 RETİNAL)",
    tagline: "Hücre yenileyici. Sıkılaştırıcı. Anti-aging gece bakımı.",
    category: "Kremler",
    activeIngredient: "Retinal + Niasinamid + Argireline",
    activeConcentration: "50 ml",
    price: "₺420",
    skinNeeds: ["cizgi", "nem", "hassas"],
    description:
      "Retinal, Niasinamid ve Argireline peptidi içeren bu ileri formül; ince çizgilerin ve kırışıklıkların görünümünü hedefler, cilt elastikiyetini artırır. Hyaluronik asit ve Pentavitin ile derin nemlendirme sağlarken Centella Asiatica cildi sakinleştirir ve doğal iyileşme sürecini destekler. Kararlı C vitamini türevi 3-O-etil askorbik asit, cilt tonunu aydınlatır ve canlandırır. Gece boyunca cilde yoğun bakım sunarak sabah daha genç ve sağlıklı bir görünüm elde etmenize yardımcı olur.",
    image: "/assets/urunler/Yaşlanma Ve Kırışıklık Karşıtı Bakım Kremi/1.png",
    detailImages: [
      "/assets/urunler/Yaşlanma Ve Kırışıklık Karşıtı Bakım Kremi/2.png",
      "/assets/urunler/Yaşlanma Ve Kırışıklık Karşıtı Bakım Kremi/3.png",
      "/assets/urunler/Yaşlanma Ve Kırışıklık Karşıtı Bakım Kremi/4.png",
      "/assets/urunler/Yaşlanma Ve Kırışıklık Karşıtı Bakım Kremi/5.png",
      "/assets/urunler/Yaşlanma Ve Kırışıklık Karşıtı Bakım Kremi/6.png",
    ],
    ingredients: [
      { name: "Retinal (%0,06)", inci: "Retinaldehyde", benefit: "Hücre yenilenmesini teşvik eder, ince çizgileri ve kırışıklıkları azaltır, cilt elastikiyetini artırır", icon: "R" },
      { name: "Niasinamid", inci: "Niacinamide", benefit: "Cilt tonunu eşitler, cildi sıkılaştırır ve epidermal bariyer fonksiyonunu güçlendirir", icon: "N" },
      { name: "Hyaluronik Asit", inci: "Sodium Hyaluronate", benefit: "Derinlemesine nemlendirme sağlar, su tutma kapasitesini artırarak cilt dolgunluğunu destekler", icon: "H" },
      { name: "Argireline", inci: "Acetyl Hexapeptide-8", benefit: "Mimik çizgilerinin görünümünü azaltır, kas aktivitesini hafifletir", icon: "A" },
      { name: "Pentavitin", inci: "Saccharide Isomerate", benefit: "Derinlemesine nemlendirme sağlar, cildin su dengesini korur ve esnekliği destekler", icon: "P" },
      { name: "Centella Asiatica", inci: "Centella Asiatica Extract", benefit: "Cildi sakinleştirir, doğal iyileşme sürecini destekler ve yaşlanma belirtilerini azaltmaya katkı sağlar", icon: "C" },
      { name: "3-O-Etil Askorbik Asit", inci: "3-O-Ethyl Ascorbic Acid", benefit: "Kararlı C vitamini türevi; cilt tonunu aydınlatır, ince çizgileri azaltır ve cildi canlandırır", icon: "V" },
    ],
    howToUse: [
      "Akşam rutininin son adımı olarak temiz cilde uygulayın.",
      "Yüz ve boyun bölgesine ince bir tabaka halinde yayın.",
      "Hafif masaj hareketleriyle absorbe edin.",
      "Retinal içerdiğinden gündüz kullanımından kaçının.",
      "Gündüz mutlaka SPF 50+ güneş koruyucu kullanın.",
    ],
    faqs: [
      { question: "Retinal nedir ve retinoldan farkı nedir?", answer: "Retinal (retinaldehyde), A vitamini türevleri arasında retinoik asite en yakın formüldür. Retinole kıyasla daha hızlı ve etkili çalışır; aynı zamanda iritasyon riski görece daha düşüktür." },
      { question: "Hassas ciltler kullanabilir mi?", answer: "Retinal içerdiğinden hassas ciltler ilk 2 haftada haftada 2-3 uygulama ile başlamalı, ardından her gece kullanıma geçebilir. Hafif bir adaptasyon süreci yaşanabilir." },
      { question: "Hamilelikte kullanılabilir mi?", answer: "Retinal ve A vitamini türevleri hamilelikte önerilmez. Lütfen doktorunuza danışın." },
      { question: "Diğer aktif serumlarla birlikte kullanılabilir mi?", answer: "AHA/BHA veya yüksek konsantrasyonlu C vitamini serumuyla aynı gece kullanılmaması önerilir. Niasinamid içeren tonik veya serumlarla uyumludur." },
    ],
    reviews: [
      { text: "Retinal içeren ürünlerden korkuyordum ama bu krem adaptasyon sürecini çok kolay atlattırdı. 3 haftada çizgilerim belirgin azaldı.", author: "Ayşe K." },
      { text: "Formülasyondaki aktif denge mükemmel. Retinal ve niasinamid birlikteliği hem etkili hem de irite etmiyor.", author: "Dr. Selin A." },
      { text: "Sabah aynaya baktığımda cildim dolgun ve ışıltılı görünüyor. Anti-aging kremlerden ilk defa bu kadar sonuç aldım.", author: "Pınar D." },
      { text: "Argireline etkisini gerçekten hissediyorum. Alın çizgilerim belirgin şekilde yumuşadı.", author: "Derya T." },
      { text: "Hyaluronik asit ve Pentavitin kombinasyonu muhteşem. Kış aylarında bile cildim asla kuru hissetmiyor.", author: "Merve B." },
      { text: "Kimyager titizliğiyle hazırlanmış bir formül. %0,06 retinal konsantrasyonu başlangıç için ideal.", author: "Prof. Dr. Zeynep Ö." },
      { text: "Centella asiatica sayesinde retinalin adaptasyon sürecinde cildim hiç kızarmadı.", author: "Gülşen M." },
      { text: "Stabilize C vitamini formu gerçekten fark yaratıyor. Cilt tonum hem aydınlandı hem de çizgilerim azaldı.", author: "Ceren Y." },
      { text: "40 yaş üstü ciltler için birebir. 6 hafta sonunda dermatolojistim de farkı fark etti.", author: "Nuran E." },
      { text: "Bu kadar zengin bir formülü bu fiyata bulmak neredeyse imkansız. Devoiler'in en iyi ürünü bence.", author: "Fatma S." },
    ],
  },
];
