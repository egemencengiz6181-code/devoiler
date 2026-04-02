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
};

export type ProductCategory = {
  slug: string;
  label: string;
};

export const productCategories: ProductCategory[] = [
  { slug: "tumu", label: "Tümü" },
  { slug: "serumlar", label: "Serumlar" },
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
    tagline: "Sebum dengesini kurar. Cildi arındırır.",
    category: "Serumlar",
    activeIngredient: "Salisilik Asit + Niasinamid",
    activeConcentration: "%2 BHA",
    price: "₺590",
    skinNeeds: ["akne", "gozenek"],
    description:
      "Yüksek saflıkta %2 salisilik asit ve %4 niasinamid kombinasyonu; gözenek içi sebo birikimini çözerken inflamasyonu yatıştırır. Cildin doğal dengesini bozmadan akne döngüsünü kırmak için formüle edilmiştir.",
    image: "/assets/urunler/akne karşıtı serum/ana görsel.png",
    detailImages: [
      "/assets/urunler/akne karşıtı serum/detay 1.png",
      "/assets/urunler/akne karşıtı serum/detay 2.png",
      "/assets/urunler/akne karşıtı serum/detay 3.png",
      "/assets/urunler/akne karşıtı serum/detay 4.png",
    ],
    ingredients: [
      { name: "Salisilik Asit", inci: "Salicylic Acid", concentration: "%2", benefit: "Lipofilik yapısıyla gözenek içine nüfuz eder, komedonu çözer", icon: "S" },
      { name: "Niasinamid", inci: "Niacinamide", concentration: "%4", benefit: "Sebo regülasyonu ve anti-inflamatuar etki", icon: "N" },
      { name: "Çinko PCA", inci: "Zinc PCA", benefit: "Yağ üretimini dengeler, antibakteriyel destek", icon: "Z" },
      { name: "Centella Asiatica", inci: "Centella Asiatica Extract", benefit: "Yatıştırıcı ve bariyer destekleyici", icon: "C" },
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
    name: "Anti-Aging Tonic",
    tagline: "Yeniler. Sıkılaştırır. Hazırlar.",
    category: "Tonikler",
    activeIngredient: "Glikolik Asit + Peptid Kompleks",
    activeConcentration: "%5 AHA",
    price: "₺520",
    skinNeeds: ["cizgi", "leke", "gozenek"],
    description:
      "Düşük konsantrasyonda glikolik asit ile yumuşak eksfoliasyon sağlarken, peptid kompleksi kollajen sentezini destekler. Günlük kullanıma uygun, cildi serum adımına hazırlayan hafif formülasyon.",
    image: "/assets/urunler/anti-aging tonic/ana görsel.png",
    detailImages: [
      "/assets/urunler/anti-aging tonic/detay 1.png",
      "/assets/urunler/anti-aging tonic/detay 2.png",
      "/assets/urunler/anti-aging tonic/detay 3.png",
      "/assets/urunler/anti-aging tonic/detay 4.png",
    ],
    ingredients: [
      { name: "Glikolik Asit", inci: "Glycolic Acid", concentration: "%5", benefit: "Yüzeysel eksfoliasyon, cilt yenilenmesi", icon: "G" },
      { name: "Palmitoyl Tripeptid-1", inci: "Palmitoyl Tripeptide-1", benefit: "Kollajen sentezini uyarır", icon: "P" },
      { name: "Allantoin", inci: "Allantoin", benefit: "Yatıştırıcı ve hücre yenilenmesini destekler", icon: "A" },
      { name: "Panthenol", inci: "Panthenol", concentration: "%1", benefit: "Nemlendirir ve bariyeri onarır", icon: "B" },
    ],
    howToUse: [
      "Temizleme sonrası pamuk veya avuç içiyle uygulayın.",
      "Sabah ve akşam kullanıma uygundur.",
      "Serum adımından önce kullanın.",
      "Güneş koruyucu ile sonlandırın.",
    ],
    faqs: [
      { question: "Her gün kullanılabilir mi?", answer: "Evet, %5 glikolik asit günlük kullanım için uygun bir konsantrasyondur. Hassas ciltler günaşırı başlayabilir." },
      { question: "Vitamin C serumu ile birlikte kullanılabilir mi?", answer: "Her ikisi de düşük pH'da çalıştığı için aralarında 5-10 dakika beklemeniz önerilir." },
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
    name: "Güneş Kremi",
    tagline: "Korur. Nemlenir. Beyaz iz bırakmaz.",
    category: "Güneş Koruması",
    activeIngredient: "Geniş Spektrum UV Filtre",
    activeConcentration: "SPF 50+",
    price: "₺480",
    skinNeeds: ["hassas", "leke", "cizgi"],
    description:
      "Geniş spektrumlu UVA/UVB koruması sunan, hafif ve nemlendirici yapıda güneş kremi. Beyaz iz bırakmayan formülasyonu ve antioksidan desteği ile günlük kullanım için idealdir. Tüm cilt tipleri için uygundur.",
    image: "/assets/urunler/gunes kremi/ana görsel.png",
    detailImages: [
      "/assets/urunler/gunes kremi/detay 1 .png",
      "/assets/urunler/gunes kremi/detay 2.png",
      "/assets/urunler/gunes kremi/detay 3.png",
    ],
    ingredients: [
      { name: "Uvinul A Plus", inci: "Diethylamino Hydroxybenzoyl Hexyl Benzoate", benefit: "UVA koruması, fotostabil filtre", icon: "U" },
      { name: "Tinosorb S", inci: "Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine", benefit: "Geniş spektrum UVA/UVB koruması", icon: "T" },
      { name: "Vitamin E", inci: "Tocopherol", benefit: "Antioksidan koruma, UV hasarını azaltır", icon: "E" },
      { name: "Hyaluronik Asit", inci: "Sodium Hyaluronate", benefit: "Uzun süreli nemlendirme", icon: "H" },
    ],
    howToUse: [
      "Güneşe çıkmadan 15-20 dakika önce bol miktarda uygulayın.",
      "2 saatte bir yeniden uygulayın.",
      "Yüz, boyun ve dekolte bölgesine yayın.",
      "Makyaj üzerine de uygulanabilir.",
    ],
    faqs: [
      { question: "Yağlı ciltlere uygun mu?", answer: "Evet. Hafif jel-krem yapısı gözenekleri tıkamaz ve mat bir bitiriş sunar." },
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
    tagline: "Aydınlatır. Ton eşitler. Işık verir.",
    category: "Serumlar",
    activeIngredient: "Alfa Arbutin + Vitamin C",
    activeConcentration: "%2 Arbutin",
    price: "₺680",
    skinNeeds: ["leke"],
    description:
      "Alfa arbutin ve stabilize vitamin C kombinasyonu; melanin sentez yolunu çoklu noktadan hedefleyerek leke görünümünü azaltır ve cilt tonunu eşitler. Hassas ciltler dahil tüm cilt tipleri için uygundur.",
    image: "/assets/urunler/leke karşıtı serum/ana görsel.png",
    detailImages: [
      "/assets/urunler/leke karşıtı serum/detay 1.png",
      "/assets/urunler/leke karşıtı serum/detay 2.png",
    ],
    ingredients: [
      { name: "Alfa Arbutin", inci: "Alpha-Arbutin", concentration: "%2", benefit: "Tirozinaz inhibitörü, melanin sentezini yavaşlatır", icon: "A" },
      { name: "Vitamin C (SAP)", inci: "Sodium Ascorbyl Phosphate", concentration: "%3", benefit: "Stabil C vitamini, aydınlatıcı antioksidan", icon: "C" },
      { name: "Traneksamik Asit", inci: "Tranexamic Acid", benefit: "Leke oluşum mekanizmasını baskılar", icon: "T" },
      { name: "Meyan Kökü Ekstresi", inci: "Glycyrrhiza Glabra Root Extract", benefit: "Doğal aydınlatıcı, anti-inflamatuar", icon: "M" },
    ],
    howToUse: [
      "Sabah ve akşam temiz cilde uygulayın.",
      "Lekeli bölgelere odaklanarak 3-4 damla yayın.",
      "Nemlendirici ile devam edin.",
      "Gündüz mutlaka SPF 50+ koruma kullanın.",
    ],
    faqs: [
      { question: "Ne kadar sürede sonuç verir?", answer: "Tutarlı kullanımda 4-8 hafta içinde leke tonunda belirgin açılma gözlemlenir. 12 haftada optimum sonuç beklenir." },
      { question: "Hamilelikte kullanılabilir mi?", answer: "Alfa arbutin ve stabilize vitamin C hamilelikte güvenli kabul edilir ancak doktorunuza danışmanızı öneririz." },
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
    tagline: "Onarır. Yeniler. Gençleştirir.",
    category: "Serumlar",
    activeIngredient: "PDRN (Polideoksiribonükleotid)",
    activeConcentration: "%3 PDRN",
    price: "₺920",
    skinNeeds: ["cizgi", "nem", "hassas"],
    description:
      "Somon DNA'sından elde edilen PDRN (Polideoksiribonükleotid) ile hücresel yenilenmeyi destekler. Kollajen ve elastin sentezini uyararak cildin elastikiyetini artırır, ince çizgi görünümünü azaltır.",
    image: "/assets/urunler/somon dna serum/ana gorsel.png",
    detailImages: [
      "/assets/urunler/somon dna serum/detay 1.png",
      "/assets/urunler/somon dna serum/detay 2.png",
      "/assets/urunler/somon dna serum/detay 3.png",
      "/assets/urunler/somon dna serum/detay 4.png",
    ],
    ingredients: [
      { name: "PDRN", inci: "Polydeoxyribonucleotide", concentration: "%3", benefit: "Hücresel yenilenme, doku onarımı", icon: "P" },
      { name: "Hyaluronik Asit (Çoklu MW)", inci: "Sodium Hyaluronate", benefit: "Çok katmanlı nemlendirme", icon: "H" },
      { name: "Adenozin", inci: "Adenosine", benefit: "Anti-aging, kırışıklık giderici", icon: "A" },
      { name: "EGF Peptidi", inci: "sh-Oligopeptide-1", benefit: "Epidermal büyüme faktörü, yenilenme hızlandırıcı", icon: "E" },
    ],
    howToUse: [
      "Akşam rutininde temiz cilde uygulayın.",
      "3-5 damla alarak yüz ve boyun bölgesine masaj yaparak yayın.",
      "Nemlendirici ile kilit altına alın.",
      "Düzenli kullanımda 6-8 hafta sonunda belirgin fark gözlemlenir.",
    ],
    faqs: [
      { question: "PDRN nedir?", answer: "Somon DNA'sından elde edilen polideoksiribonükleotid, hücresel onarım mekanizmalarını aktive eden biyolojik bir moleküldür." },
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
    tagline: "Temizler. Dengeyi korur. Hazırlar.",
    category: "Temizleyiciler",
    activeIngredient: "Düşük pH Jel Formülasyon",
    activeConcentration: "pH 5.5",
    price: "₺380",
    skinNeeds: ["hassas", "akne", "nem"],
    description:
      "Cildin doğal pH dengesine uyumlu düşük pH'lı temizleme jeli. Sülfatsız formülasyonu ile bariyeri bozmadan derinlemesine temizler, cildi aktif içerikli bakım adımlarına hazırlar.",
    image: "/assets/urunler/yuz temizleme jeli/ana görsel.png",
    detailImages: [
      "/assets/urunler/yuz temizleme jeli/detay 1.png",
      "/assets/urunler/yuz temizleme jeli/detay 2.png",
      "/assets/urunler/yuz temizleme jeli/detay 3.png",
    ],
    ingredients: [
      { name: "Coco-Glucoside", inci: "Coco-Glucoside", benefit: "Doğal kökenli yumuşak yüzey aktif madde", icon: "C" },
      { name: "Centella Asiatica", inci: "Centella Asiatica Extract", benefit: "Yatıştırıcı ve bariyer destekleyici", icon: "A" },
      { name: "Panthenol", inci: "Panthenol", concentration: "%1", benefit: "Nem kaybını önler, bariyeri onarır", icon: "P" },
      { name: "Çay Ağacı Yağı", inci: "Melaleuca Alternifolia Leaf Oil", benefit: "Doğal antibakteriyel temizlik", icon: "T" },
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
];
