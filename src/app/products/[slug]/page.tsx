import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import FAQAccordion from "@/components/FAQAccordion";
import ProductGallery from "@/components/ProductGallery";
import ProductReviews from "@/components/ProductReviews";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — Devoiler`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div className="bg-[#FAFAF8]">
      {/* ——————————————————————————————
          ÜRÜN HERO
      —————————————————————————————— */}
      <section className="pt-32 pb-0">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <Link href="/products" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200 font-medium mb-16">
            <ArrowLeft size={11} />
            Tüm Ürünler
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Product Visual */}
            <div className="relative">
              {product.image && product.detailImages ? (
                <ProductGallery
                  mainImage={product.image}
                  detailImages={product.detailImages}
                  productName={product.name}
                  category={product.category}
                  activeConcentration={product.activeConcentration}
                  activeIngredient={product.activeIngredient}
                />
              ) : (
                <>
                  {/* Placeholder for products without images */}
                  <div className="aspect-square bg-[#F4F4F0] relative overflow-hidden flex items-center justify-center">
                    <div className="relative flex flex-col items-center">
                      <div className="w-4 h-6 border border-[#B8B8B0] rounded-sm mb-0" />
                      <div className="w-24 h-48 border border-[#B8B8B0] rounded-sm flex flex-col items-center justify-center gap-3 bg-white/40">
                        <div className="w-14 h-px bg-[#6B8F71]" />
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F71] font-medium">
                          {product.activeConcentration}
                        </p>
                        <p className="text-[8px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium">
                          {product.activeIngredient}
                        </p>
                        <div className="w-14 h-px bg-[#E8E8E2]" />
                        <p className="text-[7px] tracking-widest uppercase text-[#C8C8C0]">Devoiler</p>
                      </div>
                    </div>
                    <div className="absolute top-8 right-8 w-16 h-20 border border-[#E0E0D8] rounded-full opacity-30" />
                    <div className="absolute bottom-8 left-8 w-10 h-10 border border-[#E0E0D8] rounded-full opacity-20" />
                    <div className="absolute top-6 left-6 text-[9px] tracking-[0.3em] uppercase text-[#9A9A8A] font-medium">
                      {product.category}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`w-20 h-20 bg-[#F4F4F0] border cursor-pointer transition-all duration-200 ${i === 0 ? "border-[#1A1A1A]" : "border-[#E8E8E2] hover:border-[#C8C8C0]"}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-4">
              {/* Active Ingredient — BIG DISPLAY */}
              <div className="mb-10 pb-8 border-b border-[#E8E8E2]">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-3">
                  Birincil Aktif Bileşen
                </p>
                <div className="flex items-baseline gap-4">
                  <span className="text-[64px] md:text-[80px] font-light tracking-tight text-[#1A1A1A] leading-none">
                    {product.activeConcentration}
                  </span>
                  <span className="text-[20px] font-light text-[#6B8F71] leading-tight">
                    {product.activeIngredient}
                  </span>
                </div>
              </div>

              {/* Name & Tagline */}
              <div className="mb-8">
                <h1 className="text-[32px] font-light tracking-[-0.01em] text-[#1A1A1A] mb-2">
                  {product.name}
                </h1>
                <p className="text-[15px] text-[#6B8F71] font-light tracking-wide">
                  {product.tagline}
                </p>
              </div>

              {/* Skin Needs Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.skinNeeds.map((need) => (
                  <Link
                    key={need}
                    href={`/solutions/${need}`}
                    className="inline-flex items-center text-[10px] tracking-[0.2em] uppercase border border-[#E8E8E2] text-[#2D3B3C] px-3 py-1.5 hover:border-[#6B8F71] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
                  >
                    {need}
                  </Link>
                ))}
              </div>

              {/* Description */}
              <p className="text-[15px] leading-[1.9] text-[#4A4A4A] mb-10">
                {product.description}
              </p>

              {/* Price & CTA */}
              <div className="flex items-center gap-6 mb-10">
                <span className="text-[28px] font-light text-[#1A1A1A]">{product.price}</span>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium">
                    Ücretsiz Kargo
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium">
                    30 Gün İade Garantisi
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium">
                  Sepete Ekle
                </button>
                <a
                  href="https://www.instagram.com/devoiler.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-[#6B8F71] text-[#6B8F71] text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#6B8F71] hover:text-white transition-colors duration-300 font-medium text-center"
                >
                  Bilgi Al
                </a>
              </div>

              {/* Scientific formulation note */}
              <div className="mt-8 p-6 bg-[#F4F4F0] border border-[#E8E8E2]">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F71] font-medium mb-2">
                  Bilimsel Formül
                </p>
                <p className="text-[13px] leading-[1.8] text-[#4A4A4A]">
                  Her Devoiler ürünü, ODTÜ Kimya mezunu Yüksek Kimyager Pelin Şölen&apos;in uzmanlığıyla,
                  klinik verilerle desteklenen konsantrasyonlarda formüle edilmiştir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          KULLANICI DENEYİMLERİ — MARQUEE
      —————————————————————————————— */}
      {product.reviews && product.reviews.length > 0 && (
        <ProductReviews reviews={product.reviews} />
      )}

      {/* ——————————————————————————————
          İÇİNDEKİLER — ŞEFFAF FORMÜLASYON
      —————————————————————————————— */}
      <section className="py-24 px-6 md:px-12 border-t border-[#E8E8E2] mt-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
                Şeffaf Formülasyon
              </p>
              <h2 className="text-[32px] font-light tracking-[-0.01em] text-[#1A1A1A] mb-6 leading-tight">
                İçindekiler
              </h2>
              <p className="text-[14px] leading-[1.9] text-[#4A4A4A]">
                Her bileşen bir işlev taşır. Formülasyonumuzdaki hiçbir madde dolgu, renk veya koku amaçlı değildir.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-0">
                {product.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[56px_1fr_auto] gap-6 items-start py-8 border-b border-[#E8E8E2] hover:bg-[#F4F4F0] transition-colors duration-200 px-4 -mx-4"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full border border-[#E8E8E2] flex items-center justify-center text-[13px] font-light text-[#6B8F71] group-hover:border-[#6B8F71] transition-colors duration-200 bg-white shrink-0">
                      {ing.icon}
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-[15px] font-light text-[#1A1A1A]">{ing.name}</h3>
                        {ing.concentration && (
                          <span className="text-[9px] tracking-[0.2em] uppercase bg-[#6B8F71]/10 text-[#45644A] px-2 py-0.5 font-medium">
                            {ing.concentration}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] tracking-widest uppercase text-[#B8B8B0] mb-2 font-medium">{ing.inci}</p>
                      <p className="text-[13px] leading-[1.8] text-[#4A4A4A]">{ing.benefit}</p>
                    </div>

                    {/* Index */}
                    <p className="text-[11px] text-[#C8C8C0] font-medium pt-1 shrink-0">
                      0{idx + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          KULLANIM KILAVUZU
      —————————————————————————————— */}
      <section className="py-24 px-6 md:px-12 bg-[#F4F4F0]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
                Uygulama Protokolü
              </p>
              <h2 className="text-[32px] font-light tracking-[-0.01em] text-[#1A1A1A] mb-6 leading-tight">
                Nasıl Kullanılır
              </h2>
              <p className="text-[14px] leading-[1.9] text-[#4A4A4A]">
                Doğru sıra ve yöntem, formülasyonun etkinliğini doğrudan etkiler.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-6">
                {product.howToUse.map((step, idx) => (
                  <div key={idx} className="flex gap-8 items-start">
                    <span className="text-[11px] tracking-[0.2em] text-[#9A9A8A] font-medium shrink-0 pt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-[15px] leading-[1.8] text-[#1A1A1A] font-light">{step}</p>
                  </div>
                ))}
              </div>

              {/* Compatibility note */}
              <div className="mt-12 p-8 bg-white border border-[#E8E8E2]">
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#6B8F71] font-medium mb-3">
                  Uyumluluk Notu
                </p>
                <p className="text-[13px] leading-[1.8] text-[#4A4A4A]">
                  Bu ürünü rutin protokolünüzde doğru konumlandırmak için{" "}
                  <Link href="/solutions" className="underline underline-offset-4 text-[#1A1A1A] hover:text-[#6B8F71] transition-colors">
                    kişisel protokol sayfamıza
                  </Link>{" "}
                  göz atabilirsiniz. Aktif kombinasyonları hakkında sorularınız için<br />
                  <a href="mailto:protocol@devoiler.com.tr" className="underline underline-offset-4 text-[#1A1A1A] hover:text-[#6B8F71] transition-colors">
                    protocol@devoiler.com.tr
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          SSS
      —————————————————————————————— */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
                Sorular
              </p>
              <h2 className="text-[32px] font-light tracking-[-0.01em] text-[#1A1A1A] leading-tight">
                Sıkça Sorulanlar
              </h2>
            </div>
            <div className="lg:col-span-8">
              <FAQAccordion faqs={product.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          DİĞER FORMÜLASYONLAR
      —————————————————————————————— */}
      <section className="py-20 px-6 md:px-12 bg-[#F4F4F0] border-t border-[#E8E8E2]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#9A9A8A] font-medium mb-2">Formülasyon Ailesi</p>
            <h3 className="text-[22px] font-light text-[#1A1A1A]">Diğer aktif içerikleri keşfedin</h3>
          </div>
          <Link href="/ingredients" className="inline-flex items-center gap-2.5 border border-[#1A1A1A] text-[#1A1A1A] text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300 font-medium">
            Tüm Formülasyonlar
            <ArrowRight size={11} />
          </Link>
        </div>
      </section>
    </div>
  );
}
