// Admin panelindeki "İçerik" ekranı bu şemadan otomatik üretilir.
// Yeni bir alan eklemek için site-content.ts'e alanı ekleyip buraya bir satır yazmak yeterli.

export type FieldType =
  | "text"
  | "textarea"
  | "image"
  | "boolean"
  | "stringList"
  | "list";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  /** type === "list" için alt alanlar */
  fields?: FieldDef[];
  /** type === "list" için yeni öğe şablonu */
  itemTemplate?: Record<string, string>;
};

export type SectionDef = {
  key: string;
  label: string;
  description?: string;
  fields: FieldDef[];
};

export const contentSchema: SectionDef[] = [
  {
    key: "general",
    label: "Genel",
    description: "Site başlığı, iletişim bilgileri ve logo.",
    fields: [
      { key: "siteTitle", label: "Site Başlığı (SEO)", type: "text" },
      { key: "siteDescription", label: "Site Açıklaması (SEO)", type: "textarea" },
      { key: "email", label: "E-posta", type: "text" },
      { key: "instagram", label: "Instagram Adresi", type: "text" },
      { key: "phone", label: "Telefon", type: "text" },
      { key: "address", label: "Adres / Konum", type: "text" },
      { key: "logo", label: "Logo", type: "image" },
    ],
  },
  {
    key: "home",
    label: "Ana Sayfa",
    fields: [
      { key: "heroLabel", label: "Üst Etiket", type: "text" },
      { key: "heroTitle1", label: "Başlık — 1. satır", type: "text" },
      { key: "heroTitleAccent", label: "Başlık — 2. satır (yeşil)", type: "text" },
      { key: "heroTitle3", label: "Başlık — 3. satır", type: "text" },
      { key: "heroDescription", label: "Hero Açıklaması", type: "textarea" },
      { key: "heroPrimaryLabel", label: "1. Buton Yazısı", type: "text" },
      { key: "heroPrimaryHref", label: "1. Buton Linki", type: "text" },
      { key: "heroSecondaryLabel", label: "2. Buton Yazısı", type: "text" },
      { key: "heroSecondaryHref", label: "2. Buton Linki", type: "text" },
      {
        key: "metrics",
        label: "Rakamlar Şeridi",
        type: "list",
        itemTemplate: { num: "", label: "" },
        fields: [
          { key: "num", label: "Rakam", type: "text" },
          { key: "label", label: "Açıklama", type: "text" },
        ],
      },
      { key: "manifestoLabel", label: "Manifesto Etiketi", type: "text" },
      { key: "manifestoQuote", label: "Manifesto Alıntısı", type: "textarea" },
      { key: "solutionsLabel", label: "Çözümler — Etiket", type: "text" },
      { key: "solutionsTitle", label: "Çözümler — Başlık 1", type: "text" },
      { key: "solutionsTitleAccent", label: "Çözümler — Başlık 2 (yeşil)", type: "text" },
      { key: "solutionsLinkLabel", label: "Çözümler — Link Yazısı", type: "text" },
      { key: "productsLabel", label: "Ürünler — Etiket", type: "text" },
      { key: "productsTitle", label: "Ürünler — Başlık 1", type: "text" },
      { key: "productsTitleAccent", label: "Ürünler — Başlık 2 (yeşil)", type: "text" },
      { key: "productsLinkLabel", label: "Ürünler — Link Yazısı", type: "text" },
      { key: "comingSoonEnabled", label: "\"Yakında\" kartını göster", type: "boolean" },
      { key: "comingSoonBadge", label: "Yakında — Rozet", type: "text" },
      { key: "comingSoonTitle", label: "Yakında — Başlık", type: "text" },
      { key: "comingSoonText", label: "Yakında — Açıklama", type: "textarea" },
      {
        key: "scienceItems",
        label: "Bilim Bandı",
        type: "list",
        itemTemplate: { icon: "◎", title: "", text: "" },
        fields: [
          { key: "icon", label: "Simge", type: "text" },
          { key: "title", label: "Başlık", type: "text" },
          { key: "text", label: "Metin", type: "textarea" },
        ],
      },
      { key: "ticker", label: "Kayan İçerik Şeridi", type: "stringList" },
    ],
  },
  {
    key: "productsPage",
    label: "Ürünler Sayfası",
    fields: [
      { key: "label", label: "Üst Etiket", type: "text" },
      { key: "title", label: "Başlık", type: "text" },
      { key: "description", label: "Açıklama", type: "textarea" },
      { key: "emptyText", label: "Boş Kategori Yazısı", type: "text" },
    ],
  },
  {
    key: "productDetail",
    label: "Ürün Detay Sayfası",
    description: "Tüm ürün detay sayfalarında ortak görünen sabit metinler.",
    fields: [
      { key: "activeLabel", label: "Aktif Bileşen Etiketi", type: "text" },
      { key: "freeShippingNote", label: "Kargo Notu", type: "text" },
      { key: "returnNote", label: "İade Notu", type: "text" },
      { key: "infoButtonLabel", label: "Bilgi Al Butonu", type: "text" },
      { key: "infoButtonHref", label: "Bilgi Al Linki", type: "text" },
      { key: "scienceNoteLabel", label: "Bilimsel Formül — Etiket", type: "text" },
      { key: "scienceNoteText", label: "Bilimsel Formül — Metin", type: "textarea" },
      { key: "ingredientsLabel", label: "İçindekiler — Etiket", type: "text" },
      { key: "ingredientsTitle", label: "İçindekiler — Başlık", type: "text" },
      { key: "ingredientsText", label: "İçindekiler — Metin", type: "textarea" },
      { key: "howToLabel", label: "Kullanım — Etiket", type: "text" },
      { key: "howToTitle", label: "Kullanım — Başlık", type: "text" },
      { key: "howToText", label: "Kullanım — Metin", type: "textarea" },
      { key: "compatLabel", label: "Uyumluluk — Etiket", type: "text" },
      { key: "compatText", label: "Uyumluluk — Metin", type: "textarea" },
    ],
  },
  {
    key: "solutionsPage",
    label: "Çözümler Sayfası",
    fields: [
      { key: "label", label: "Üst Etiket", type: "text" },
      { key: "title1", label: "Başlık — 1. satır", type: "text" },
      { key: "titleAccent", label: "Başlık — 2. satır (yeşil)", type: "text" },
      { key: "description", label: "Açıklama", type: "textarea" },
    ],
  },
  {
    key: "ingredientsPage",
    label: "Aktif İçerikler Sayfası",
    fields: [
      { key: "label", label: "Üst Etiket", type: "text" },
      { key: "title1", label: "Başlık — 1. satır", type: "text" },
      { key: "titleAccent", label: "Başlık — 2. satır (yeşil)", type: "text" },
      { key: "description", label: "Açıklama", type: "textarea" },
    ],
  },
  {
    key: "about",
    label: "Biz Kimiz",
    fields: [
      { key: "heroLabel", label: "Üst Etiket", type: "text" },
      { key: "heroTitle1", label: "Başlık — 1. satır", type: "text" },
      { key: "heroTitleAccent", label: "Başlık — 2. satır (yeşil)", type: "text" },
      { key: "founderImage", label: "Kurucu Fotoğrafı", type: "image" },
      { key: "founderLabel", label: "Kurucu Etiketi", type: "text" },
      { key: "founderName", label: "Kurucu Adı", type: "text" },
      { key: "founderRole", label: "Kurucu Ünvanı", type: "text" },
      { key: "founderParagraphs", label: "Kurucu Metni (paragraflar)", type: "stringList" },
      { key: "valuesLabel", label: "Değerler — Etiket", type: "text" },
      { key: "valuesTitle", label: "Değerler — Başlık", type: "text" },
      {
        key: "values",
        label: "Değerler",
        type: "list",
        itemTemplate: { title: "", text: "" },
        fields: [
          { key: "title", label: "Başlık", type: "text" },
          { key: "text", label: "Metin", type: "textarea" },
        ],
      },
      { key: "manifestoParagraphs", label: "Manifesto (paragraflar)", type: "stringList" },
      { key: "principleLabel", label: "Kuruluş İlkesi — Etiket", type: "text" },
      { key: "principleQuote", label: "Kuruluş İlkesi — Alıntı", type: "textarea" },
      { key: "slogansLabel", label: "Sloganlar — Etiket", type: "text" },
      { key: "slogansTitle", label: "Sloganlar — Başlık", type: "text" },
      {
        key: "slogans",
        label: "Sloganlar",
        type: "list",
        itemTemplate: { product: "", slogan: "", sub: "" },
        fields: [
          { key: "product", label: "Ürün", type: "text" },
          { key: "slogan", label: "Slogan", type: "text" },
          { key: "sub", label: "Alt Metin", type: "textarea" },
        ],
      },
      { key: "ctaLabel", label: "CTA — Etiket", type: "text" },
      { key: "ctaTitle", label: "CTA — Başlık", type: "text" },
      { key: "ctaButtonLabel", label: "CTA — Buton", type: "text" },
      { key: "ctaButtonHref", label: "CTA — Buton Linki", type: "text" },
    ],
  },
  {
    key: "footer",
    label: "Alt Bilgi (Footer)",
    fields: [
      { key: "brandText", label: "Marka Metni", type: "textarea" },
      { key: "solutionsTitle", label: "1. Kolon Başlığı", type: "text" },
      {
        key: "solutionsLinks",
        label: "1. Kolon Linkleri",
        type: "list",
        itemTemplate: { label: "", href: "" },
        fields: [
          { key: "label", label: "Yazı", type: "text" },
          { key: "href", label: "Link", type: "text" },
        ],
      },
      { key: "ingredientsTitle", label: "2. Kolon Başlığı", type: "text" },
      {
        key: "ingredientsLinks",
        label: "2. Kolon Linkleri",
        type: "list",
        itemTemplate: { label: "", href: "" },
        fields: [
          { key: "label", label: "Yazı", type: "text" },
          { key: "href", label: "Link", type: "text" },
        ],
      },
      { key: "infoTitle", label: "3. Kolon Başlığı", type: "text" },
      {
        key: "infoLinks",
        label: "3. Kolon Linkleri",
        type: "list",
        itemTemplate: { label: "", href: "" },
        fields: [
          { key: "label", label: "Yazı", type: "text" },
          { key: "href", label: "Link", type: "text" },
        ],
      },
      { key: "copyright", label: "Telif Yazısı", type: "text" },
      { key: "location", label: "Konum", type: "text" },
      { key: "tagline", label: "Slogan", type: "text" },
    ],
  },
  {
    key: "skinNeeds",
    label: "Cilt İhtiyaçları",
    description: "Ana sayfa ve /solutions altındaki kategoriler. Slug değiştirmek linkleri de değiştirir.",
    fields: [
      {
        key: "",
        label: "Cilt İhtiyaçları",
        type: "list",
        itemTemplate: { slug: "", label: "", description: "", icon: "◎", mechanism: "" },
        fields: [
          { key: "slug", label: "Slug (link)", type: "text" },
          { key: "label", label: "Başlık", type: "text" },
          { key: "icon", label: "Simge", type: "text" },
          { key: "description", label: "Açıklama", type: "textarea" },
          {
            key: "mechanism",
            label: "Bilimsel Arka Plan (paragrafları boş satırla ayırın)",
            type: "textarea",
          },
        ],
      },
    ],
  },
  {
    key: "activeIngredients",
    label: "Aktif İçerikler",
    description: "/ingredients altındaki bileşen aileleri.",
    fields: [
      {
        key: "",
        label: "Aktif İçerikler",
        type: "list",
        itemTemplate: { slug: "", label: "", description: "", science: "" },
        fields: [
          { key: "slug", label: "Slug (link)", type: "text" },
          { key: "label", label: "Başlık", type: "text" },
          { key: "description", label: "Açıklama", type: "textarea" },
          { key: "science", label: "Bilimsel Not", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "productCategories",
    label: "Ürün Kategorileri",
    description: "Ürünler sayfasındaki filtre butonları. \"Tümü\" ilk sırada kalmalıdır.",
    fields: [
      {
        key: "",
        label: "Kategoriler",
        type: "list",
        itemTemplate: { slug: "", label: "" },
        fields: [
          { key: "slug", label: "Slug", type: "text" },
          { key: "label", label: "Görünen Ad", type: "text" },
        ],
      },
    ],
  },
];
