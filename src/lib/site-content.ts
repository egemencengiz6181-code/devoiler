// Devoiler — Site içerik modeli.
// Buradaki `defaultSiteContent` sitenin "fabrika ayarı" metinleridir.
// Admin panelinden yapılan değişiklikler Supabase'te (cms_content) saklanır ve
// okurken bu varsayılanların üzerine derin birleştirme (deep merge) ile biner.
// Böylece yeni bir alan eklendiğinde veritabanı boş olsa bile site çalışmaya devam eder.

import type { SkinNeed, ActiveIngredient, ProductCategory } from "@/lib/data";
import { skinNeeds, activeIngredients, productCategories } from "@/lib/data";

export type LinkItem = { label: string; href: string };

/** Cilt ihtiyacı + /solutions/[slug] sayfasındaki "Neden oluşur?" metni. */
export type SkinNeedContent = SkinNeed & { mechanism?: string };

export type SiteContent = {
  general: {
    siteTitle: string;
    siteDescription: string;
    email: string;
    instagram: string;
    phone: string;
    address: string;
    logo: string;
  };
  home: {
    heroLabel: string;
    heroTitle1: string;
    heroTitleAccent: string;
    heroTitle3: string;
    heroDescription: string;
    heroPrimaryLabel: string;
    heroPrimaryHref: string;
    heroSecondaryLabel: string;
    heroSecondaryHref: string;
    metrics: { num: string; label: string }[];
    manifestoLabel: string;
    manifestoQuote: string;
    solutionsLabel: string;
    solutionsTitle: string;
    solutionsTitleAccent: string;
    solutionsLinkLabel: string;
    productsLabel: string;
    productsTitle: string;
    productsTitleAccent: string;
    productsLinkLabel: string;
    comingSoonEnabled: boolean;
    comingSoonBadge: string;
    comingSoonTitle: string;
    comingSoonText: string;
    scienceItems: { icon: string; title: string; text: string }[];
    ticker: string[];
  };
  productsPage: {
    label: string;
    title: string;
    description: string;
    emptyText: string;
  };
  solutionsPage: {
    label: string;
    title1: string;
    titleAccent: string;
    description: string;
  };
  ingredientsPage: {
    label: string;
    title1: string;
    titleAccent: string;
    description: string;
  };
  productDetail: {
    activeLabel: string;
    freeShippingNote: string;
    returnNote: string;
    infoButtonLabel: string;
    infoButtonHref: string;
    scienceNoteLabel: string;
    scienceNoteText: string;
    ingredientsLabel: string;
    ingredientsTitle: string;
    ingredientsText: string;
    howToLabel: string;
    howToTitle: string;
    howToText: string;
    compatLabel: string;
    compatText: string;
  };
  about: {
    heroLabel: string;
    heroTitle1: string;
    heroTitleAccent: string;
    founderImage: string;
    founderLabel: string;
    founderName: string;
    founderRole: string;
    founderParagraphs: string[];
    valuesLabel: string;
    valuesTitle: string;
    values: { title: string; text: string }[];
    manifestoParagraphs: string[];
    principleLabel: string;
    principleQuote: string;
    slogansLabel: string;
    slogansTitle: string;
    slogans: { product: string; slogan: string; sub: string }[];
    ctaLabel: string;
    ctaTitle: string;
    ctaButtonLabel: string;
    ctaButtonHref: string;
  };
  footer: {
    brandText: string;
    solutionsTitle: string;
    solutionsLinks: LinkItem[];
    ingredientsTitle: string;
    ingredientsLinks: LinkItem[];
    infoTitle: string;
    infoLinks: LinkItem[];
    copyright: string;
    location: string;
    tagline: string;
  };
  skinNeeds: SkinNeedContent[];
  activeIngredients: ActiveIngredient[];
  productCategories: ProductCategory[];
};

// /solutions/[slug] sayfasındaki bilimsel arka plan metinleri.
// Paragraflar boş satırla ayrılır.
const skinNeedMechanisms: Record<string, string> = {
  leke: [
    "Hiperpigmentasyon; UV hasarı, hormonal değişimler veya inflamasyon sonrası melanin üretiminin dengesizleşmesiyle ortaya çıkar.",
    "Tirozinaz enzimi, tirozin aminoasidini melanin pigmentine dönüştürür. Bu yolağı hedefleyen aktifler (Vitamin C, niasinamid, alfa-arbutin) melanin sentezini ve melanozom transferini inhibe eder.",
    "Etkinliği klinik araştırmalarla desteklenen bu aktifler, tutarlı kullanımda 8–12 hafta içinde ton eşitlemede ölçülebilir değişim sağlar.",
  ].join("\n\n"),
  akne: [
    "Aknede dört temel mekanizma iç içe geçer: aşırı sebum üretimi, komedon oluşumu, Cutibacterium acnes kolonizasyonu ve inflamatuar yanıt.",
    "Bilimsel olarak değerlendirilmiş aktifler her aşamayı hedefler: salisilik asit (BHA) lipofilik yapısıyla gözenek içine girerek komedon sıkışmasını önler; niasinamid sebum üretimini düzenler; benzoil peroksit ise bakteri yükünü azaltır.",
    "İrritan formülasyonlardan kaçınmak inflamatuar döngüyü kırmak için kritiktir.",
  ].join("\n\n"),
  gozenek: [
    "Gözenek boyutu genetik olarak belirlenir; tamamen 'kapanmaz'. Ancak aşırı sebum, keratin birikmesi ve cilt elastikiyetinin azalması gözeneklerin görsel olarak genişlemesine neden olur.",
    "AHA'larla kimyasal eksfoliasyon ve niasinamid ile sebo regülasyonu; gözenek içini temizleyerek ve çevre dokusunu sıkılaştırarak görünümü minimize eder.",
    "Retinol uzun vadede hücre döngüsünü hızlandırarak gözenek tıkanıklıklarını önler.",
  ].join("\n\n"),
  nem: [
    "Sağlıklı bir epidermal bariyer üç bileşen gerektirir: keratinosit proteinleri, ceramid başta olmak üzere lipidler ve doğal nemlendiriciler (NMF).",
    "Bariyer hasarında transepidermal su kaybı (TEWL) artar; cildin nem tutma kapasitesi düşer. Ceramid + kolesterol + serbest yağ asidi kombinasyonu fizyolojik lipid oranını yeniden oluşturur.",
    "Hyaluronik asit gibi humektanlar ise farklı moleküler ağırlıklarda epidermal ve dermal katmanı nemlendirir.",
  ].join("\n\n"),
  cizgi: [
    "Kırışıklıklar; kollajen ve elastin liflerinin UV, oksidatif stres ve hücresel yaşlanmayla yıpranmasıyla gelişir. Dermal matriksin yeniden yapılanması yavaşlar.",
    "Retinoidler (retinol → retinal → retinoik asit) RAR reseptörlerine bağlanarak kollajen sentezini artırır ve matriks metalloproteinaz (MMP) aktivitesini baskılar.",
    "Peptidler fibroblastları sinyalizasyon yoluyla aktive eder; A vitamini türevleriyle sinerji yaratır.",
  ].join("\n\n"),
  hassas: [
    "Hassas cilt; bozulmuş epidermal bariyer, artmış nörosensöriyal reaktivite ve düşük inflamasyon eşiğinin birleşimidir.",
    "Fragman, alkol ve yüksek konsantrasyonlu aktifler bu mekanizmayı tetikler. Hypoallerjenik formülasyon; yalnızca güvenlik profili geniş değerlendirilmiş bileşenleri içerir.",
    "Ceramid ve madecassoside gibi yatıştırıcı aktifler bariyer bütünlüğünü destekler ve kızarıklık görünümünü azaltır.",
  ].join("\n\n"),
};

export const defaultSiteContent: SiteContent = {
  general: {
    siteTitle: "Devoiler — Bilimsel Formülasyon, Sade Etkinlik",
    siteDescription:
      "Kanıta dayalı dermo-kozmetik formülasyonlar. Cildinizin ihtiyacına göre kişiselleştirilmiş aktif içerik protokolleri.",
    email: "info@devoiler.com.tr",
    instagram: "https://www.instagram.com/devoiler.tr/",
    phone: "",
    address: "Ankara, Türkiye",
    logo: "/logo/logo.webp",
  },
  home: {
    heroLabel: "Dermo-Cosmetics — Ankara",
    heroTitle1: "Cildinize gerçekten",
    heroTitleAccent: "ne yaptığını",
    heroTitle3: "biliyor musunuz?",
    heroDescription:
      "Mucizevi vaatler değil. Kanıt. Her formülasyonumuz, aktif bileşen konsantrasyonları ve klinik referanslarıyla şeffaf biçimde sunulur.",
    heroPrimaryLabel: "Çözümleri Keşfet",
    heroPrimaryHref: "/solutions",
    heroSecondaryLabel: "Aktif İçerikler",
    heroSecondaryHref: "/ingredients",
    metrics: [
      { num: "100%", label: "Şeffaf Formülasyon" },
      { num: "6", label: "Aktif Bileşen Ailesi" },
      { num: "≤ 15", label: "İçerik / Ürün" },
    ],
    manifestoLabel: "Felsefemiz",
    manifestoQuote:
      "“Daha az ama daha etkili. Her bileşen bir işlev taşır; dolgu veya süs değil.”",
    solutionsLabel: "Cilt İhtiyacına Göre",
    solutionsTitle: "Probleminizi seçin.",
    solutionsTitleAccent: "Çözümünüzü bulun.",
    solutionsLinkLabel: "Tüm çözümler",
    productsLabel: "Formülasyonlar",
    productsTitle: "Aktif içerikler,",
    productsTitleAccent: "doğru konsantrasyonda.",
    productsLinkLabel: "Tüm ürünler",
    comingSoonEnabled: true,
    comingSoonBadge: "Yakında",
    comingSoonTitle: "Tester Kit",
    comingSoonText: "Devoiler deneyimini başlatmak için özel set. Yakında.",
    scienceItems: [
      {
        icon: "⬡",
        title: "Şeffaf Formülasyon",
        text: "Her ürünümüzün tam içerik listesi, bileşen işlevleri ve konsantrasyonları kamuya açıktır. Sırları olmayan bir kozmetik firmasıyız.",
      },
      {
        icon: "≋",
        title: "Kanıt Önce",
        text: "Yalnızca klinik araştırmalarda güvenlik ve etkinliği değerlendirilmiş aktif bileşenleri kullanıyoruz. Trend değil, veri belirler.",
      },
      {
        icon: "◎",
        title: "Minimal, Etkili",
        text: "Her formülasyon 15 veya daha az içerik barındırır. Birbirileriyle etkileşime girebilecek gereksiz bileşenlerden arındırılmıştır.",
      },
    ],
    ticker: [
      "Retinol",
      "Vitamin C",
      "Niasinamid",
      "Hyaluronik Asit",
      "Glikolik Asit",
      "Salisilik Asit",
      "Peptidler",
      "Ceramidler",
      "Skualen",
      "Ferülik Asit",
      "Panthenol",
      "Madecassoside",
    ],
  },
  productsPage: {
    label: "Bilimsel Formülasyonlar",
    title: "Ürünlerimiz",
    description:
      "Her biri bir kimyagerin titizliğiyle formüle edilmiş, klinik verilerle desteklenen dermo-kozmetik ürün ailemiz.",
    emptyText: "Bu kategoride henüz ürün bulunmamaktadır.",
  },
  solutionsPage: {
    label: "Cilt İhtiyacına Göre",
    title1: "Probleminizi seçin.",
    titleAccent: "Çözümünüzü bulun.",
    description:
      "Ürün isimleri değil cilt ihtiyaçları üzerinden düşünüyoruz. Her protokol, o ihtiyaç için bilimsel olarak desteklenen aktif bileşenleri sunar.",
  },
  ingredientsPage: {
    label: "Aktif İçeriğe Göre",
    title1: "İçeriği tanıyın.",
    titleAccent: "Bilinçli seçin.",
    description:
      "Her aktif bileşen farklı bir mekanizma üzerinden çalışır. Hangi bileşenin ne yaptığını anlamak, doğru protokolü inşa etmenin temelidir.",
  },
  productDetail: {
    activeLabel: "Birincil Aktif Bileşen",
    freeShippingNote: "Ücretsiz Kargo",
    returnNote: "30 Gün İade Garantisi",
    infoButtonLabel: "Bilgi Al",
    infoButtonHref: "https://www.instagram.com/devoiler.tr/",
    scienceNoteLabel: "Bilimsel Formül",
    scienceNoteText:
      "Her Devoiler ürünü, ODTÜ Kimya mezunu Yüksek Kimyager Pelin Şölen'in uzmanlığıyla, klinik verilerle desteklenen konsantrasyonlarda formüle edilmiştir.",
    ingredientsLabel: "Şeffaf Formülasyon",
    ingredientsTitle: "İçindekiler",
    ingredientsText:
      "Her bileşen bir işlev taşır. Formülasyonumuzdaki hiçbir madde dolgu, renk veya koku amaçlı değildir.",
    howToLabel: "Uygulama Protokolü",
    howToTitle: "Nasıl Kullanılır",
    howToText: "Doğru sıra ve yöntem, formülasyonun etkinliğini doğrudan etkiler.",
    compatLabel: "Uyumluluk Notu",
    compatText: "Aktif kombinasyonları ve uyumluluk hakkında sorularınız için bize ulaşabilirsiniz:",
  },
  about: {
    heroLabel: "Biz Kimiz?",
    heroTitle1: "Daha az içerik,",
    heroTitleAccent: "daha fazla etki.",
    founderImage: "/founder/founder-rev.jpeg",
    founderLabel: "Kurucu",
    founderName: "Pelin Şölen",
    founderRole: "MSc. Chemist (METU) / Yüksek Kimyager",
    founderParagraphs: [
      "Dévoiler'nin hikayesi, laboratuvarın titiz disiplini ile cilt bakımına duyulan tutkunun bir araya gelmesiyle başladı. Orta Doğu Teknik Üniversitesi (ODTÜ) Kimya Bölümü'nden mezun bir Yüksek Kimyager ve bir kadın girişimci olarak, kozmetik dünyasındaki karmaşayı saf bilimle sadeleştirme vizyonuyla yola çıktım. Akademik hayatım boyunca edindiğim analitik bakış açısını, her bir formülün merkezine yerleştirerek; sadece birer ürün değil, cildin ihtiyaçlarına yanıt veren güvenilir çözümler tasarladım.",
      "Benim için cilt bakımı, geçici trendlerin ötesinde bir moleküler denge meselesidir. Doğru aktif bileşenin, en stabil formda ve bilimsel olarak kanıtlanmış konsantrasyonlarda ciltle buluşması, markamızın değişmez standardıdır. Bir kadın girişimci markası olarak, kullanıcılarımızın beklentilerini en doğal ve şeffaf haliyle anlıyor; Ar-Ge süreçlerimizde yüksek performanslı içerikleri, güvenli üretim prensipleriyle birleştiriyoruz.",
      "Biz Dévoiler ailesi olarak, güzelliğin bir varsayım değil, doğru bir formül olduğuna inanıyoruz. Bilimin rehberliğinde, cildinizin sağlığını ve doğal ışıltısını korumak için her şişede uzmanlığımızı ve tutkumuzu sunuyoruz.",
    ],
    valuesLabel: "Felsefemiz",
    valuesTitle: "Vizyonumuz & Değerlerimiz",
    values: [
      {
        title: "Ankara Merkezli Butik Üretim",
        text: "Tüm formülasyonlarımız Ankara'daki laboratuvarımızda, küçük partiler halinde titizlikle üretilir. Kitlesel üretime değil, kalite kontrol standartlarına öncelik veririz.",
      },
      {
        title: "Bilimsel Şeffaflık",
        text: "Her ürünümüzün tam içerik listesi, aktif madde konsantrasyonları ve destekleyici klinik referanslar kamuya açık şekilde paylaşılır.",
      },
      {
        title: "Kanıta Dayalı Formülasyon",
        text: "Trend değil, veri karar verir. Formülasyonlarımızdaki her bileşen, hakemli bilimsel çalışmalarla etkinliği ve güvenliği kanıtlanmış aktif maddelerdir.",
      },
      {
        title: "Kadın Girişimci Vizyonu",
        text: "Kullanıcılarımızın beklentilerini en doğal haliyle anlıyor, Ar-Ge süreçlerimizde yüksek performans ile güvenli üretim prensiplerini birleştiriyoruz.",
      },
      {
        title: "Etik & Sürdürülebilirlik",
        text: "Hayvan deneyi yapmıyoruz. Ambalajlarımızda geri dönüştürülmüş malzemeler kullanıyor, çevresel etkimizi bilinçli şekilde minimize ediyoruz.",
      },
      {
        title: "Uzun Vadeli Cilt Sağlığı",
        text: "Anlık parlaklık vaatleri değil; bariyer sağlığını destekleyen, hücre yenilenmesini teşvik eden uzun soluklu protokoller tasarlıyoruz.",
      },
    ],
    manifestoParagraphs: [
      "Devoiler, kozmetik endüstrisindeki karmaşıklığa verilen sade bir yanıttır. Mucizevi vaatler değil, bilimsel olarak kanıtlanmış içeriklerle cildi destekleyen formülasyonlar sunuyoruz.",
      "Her formülasyonumuz, aktif bileşenin işlev görebileceği minimum etkin konsantrasyonda hazırlanır. Ne fazlası ne eksiği. Gereksiz dolgu maddesi, parfüm veya yapay renklendirici yoktur.",
      "Şeffaflık yalnızca bir tercih değil, temel ilkemizdir. Her ürünümüzün tam içerik listesi, bileşen işlevleri ve klinik referansları açıkça paylaşılır.",
    ],
    principleLabel: "Kuruluş İlkesi",
    principleQuote: "“Cilt bakımı, gizem değil. Kimya, biyoloji ve sabır; mucize değil.”",
    slogansLabel: "Formülasyon Sloganları",
    slogansTitle: "Markanın sesi",
    slogans: [
      {
        product: "02 Purity Serum · %10 Niasinamid",
        slogan: "Örtmez. Düzenler.",
        sub: "Gözenek görünümünü rafine eden, sebo üretimini dengeleyen formülasyon.",
      },
      {
        product: "08 Radiance Serum · %15 Vitamin C",
        slogan: "Işık değil, bilim.",
        sub: "Melanin sentez yolunu hedefleyen kanıta dayalı aydınlatma serumu.",
      },
      {
        product: "01 Renewal Serum · %0.5 Retinol",
        slogan: "Cilt kendi yolunu bilir. Biz sadece hızlandırırız.",
        sub: "Hücre döngüsünü destekleyen, zamanla görünen etkinlik.",
      },
    ],
    ctaLabel: "Rutininizi Oluşturun",
    ctaTitle: "İlke kadar basit bir rutin.",
    ctaButtonLabel: "Cilt İhtiyacınızı Seçin",
    ctaButtonHref: "/solutions",
  },
  footer: {
    brandText:
      "Bilimsel içeriklerle desteklenen, minimal ve şeffaf dermo-kozmetik formülasyonlar.",
    solutionsTitle: "Cilt Çözümleri",
    solutionsLinks: [
      { label: "Leke & Ton Eşitsizliği", href: "/solutions/leke" },
      { label: "Akne & Siyah Nokta", href: "/solutions/akne" },
      { label: "Gözenek Sıkılaştırma", href: "/solutions/gozenek" },
      { label: "Nem & Bariyer Onarımı", href: "/solutions/nem" },
      { label: "Çizgi & Kırışıklık", href: "/solutions/cizgi" },
    ],
    ingredientsTitle: "Aktif İçerikler",
    ingredientsLinks: [
      { label: "Retinol", href: "/ingredients/retinol" },
      { label: "Vitamin C", href: "/ingredients/vitamin-c" },
      { label: "Hyaluronik Asit", href: "/ingredients/hyaluronik-asit" },
      { label: "Niasinamid", href: "/ingredients/niasinamid" },
      { label: "AHA & BHA", href: "/ingredients/asitler" },
      { label: "Peptidler", href: "/ingredients/peptidler" },
    ],
    infoTitle: "Bilgi",
    infoLinks: [
      { label: "Ürünler", href: "/products" },
      { label: "Biz Kimiz?", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Sıkça Sorulan Sorular", href: "/faq" },
      { label: "Kargo & İade", href: "/shipping" },
      { label: "Gizlilik Politikası", href: "/privacy" },
      { label: "KVKK", href: "/kvkk" },
    ],
    copyright: "© 2026 Devoiler Dermo-Cosmetics. Tüm hakları saklıdır.",
    location: "Ankara, Türkiye",
    tagline: "Cilt tipinizi tanıyın. Doğru içeriği seçin.",
  },
  skinNeeds: skinNeeds.map((n) => ({
    ...n,
    mechanism: skinNeedMechanisms[n.slug] ?? "",
  })),
  activeIngredients,
  productCategories,
};

// ─── Deep merge ────────────────────────────────────────────────────────────
// DB'deki kısmi içerik, varsayılanların üzerine biner. Diziler tamamen değiştirilir
// (admin panelinde dizi editörü tam listeyi gönderir).

type Json = Record<string, unknown>;

function isPlainObject(v: unknown): v is Json {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function mergeContent<T>(base: T, override: unknown): T {
  if (!isPlainObject(override)) return base;
  if (!isPlainObject(base)) return override as T;

  const out: Json = { ...(base as unknown as Json) };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined || value === null) continue;
    const baseValue = (base as unknown as Json)[key];
    out[key] =
      isPlainObject(value) && isPlainObject(baseValue)
        ? mergeContent(baseValue, value)
        : value;
  }
  return out as unknown as T;
}
