import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { activeIngredients, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return activeIngredients.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const ing = activeIngredients.find((i) => i.slug === slug);
  if (!ing) return {};
  return {
    title: `${ing.label} — Aktif İçerik Rehberi | Devoiler`,
    description: ing.description,
  };
}

export default async function IngredientDetailPage({ params }: Props) {
  const { slug } = await params;
  const ing = activeIngredients.find((i) => i.slug === slug);
  if (!ing) notFound();

  const relatedProducts = products.filter(
    (p) =>
      p.activeIngredient.toLowerCase().includes(ing.label.split(" ")[0].toLowerCase()) ||
      p.slug.includes(slug)
  );

  return (
    <div className="bg-[#FAFAF8]">
      {/* HERO */}
      <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <Link href="/ingredients" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200 font-medium mb-16">
          <ArrowLeft size={11} />
          Tüm Aktif İçerikler
        </Link>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
              Aktif Bileşen Rehberi
            </p>
            <h1 className="text-[52px] md:text-[72px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A] mb-8">
              {ing.label}
            </h1>
            <div className="h-px w-12 bg-[#6B8F71] mb-10" />
            <p className="text-[18px] leading-[1.9] text-[#2A2A2A] font-light max-w-2xl mb-8">
              {ing.description}
            </p>
            <div className="bg-[#F4F4F0] border border-[#E8E8E2] p-6 max-w-2xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9A8A] font-medium mb-3">
                Etki Mekanizması
              </p>
              <p className="text-[14px] leading-[1.8] text-[#4A4A4A] font-mono">
                {ing.science}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONCENTRATIONS & USAGE */}
      <section className="py-24 px-6 md:px-12 bg-[#F4F4F0] border-y border-[#E8E8E2]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-px bg-[#E8E8E2]">
            {getDetailStats(slug).map((stat, i) => (
              <div key={i} className="bg-[#F4F4F0] p-10">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9A8A] font-medium mb-3">
                  {stat.label}
                </p>
                <p className="text-[22px] font-light text-[#1A1A1A] mb-3">{stat.value}</p>
                <p className="text-[13px] leading-[1.8] text-[#4A4A4A]">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
              İçeren Formülasyonlar
            </p>
            <h2 className="text-[28px] font-light tracking-[-0.01em] text-[#1A1A1A]">
              {ing.label} içeren ürünler
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* OTHER INGREDIENTS */}
      <section className="py-16 px-6 md:px-12 border-t border-[#E8E8E2] max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9A8A] font-medium">
            Diğer Aktif İçerikler
          </p>
          <Link href="/ingredients" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#6B8F71] font-medium hover:gap-3 transition-all duration-200">
            Tümü
            <ArrowRight size={10} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {activeIngredients.filter((i) => i.slug !== slug).map((i) => (
            <Link
              key={i.slug}
              href={`/ingredients/${i.slug}`}
              className="inline-flex items-center text-[10px] tracking-[0.2em] uppercase border border-[#E8E8E2] text-[#1A1A1A] px-4 py-2.5 hover:border-[#6B8F71] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
            >
              {i.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function getDetailStats(slug: string) {
  const map: Record<string, Array<{ label: string; value: string; note: string }>> = {
    retinol: [
      { label: "Etkin Konsantrasyon Aralığı", value: "%0.025 – %1", note: "Duyarlı ciltler için %0.025-0.1 başlangıç; tolerans gelişince kademelendirme önerilir." },
      { label: "Etki Başlangıcı", value: "4 – 8 Hafta", note: "Hücre döngüsünün tamamlanması süreyle ilintilidir. Tutarlı kullanım kritiktir." },
      { label: "Uygulama Zamanı", value: "Yalnızca Akşam", note: "UV ışığı retinol etkinliğini azaltır ve potansiyel irritasyon yaratır." },
    ],
    "vitamin-c": [
      { label: "Etkin Konsantrasyon Aralığı", value: "%5 – %20", note: "%15 L-askorbik asit; etkinlik ve tolerabilite dengesinde klinik referans." },
      { label: "pH Optimumu", value: "3.5 – 4.0", note: "Bu pH aralığında epidermise penetrasyonu ve antioksidan etkisi maksimize olur." },
      { label: "Stabilite", value: "Dikkat Gerekli", note: "Işık ve ısıdan uzak, koyu ambalajda muhafaza. Asidik tampon formulasyon tercih edilmeli." },
    ],
    "hyaluronik-asit": [
      { label: "Moleküler Ağırlık", value: "Düşük + Yüksek", note: "Farklı MW kombinasyonu yüzeysel ve dermal katmanı ayrı ayrı hedefler." },
      { label: "Su Tutma Kapasitesi", value: "1000× Ağırlığı", note: "Kendi ağırlığının bin katı kadar suyu bağlayabilen nadir humektan." },
      { label: "pH Uyumu", value: "Geniş Aralık", note: "Neredeyse tüm aktiflerle uyumlu; formülasyon kombinasyonlarında güvenli birincil humektan." },
    ],
    niasinamid: [
      { label: "Etkin Konsantrasyon Aralığı", value: "%4 – %10", note: "%10 gözenek ve ton için; %4-5 hassas ciltler, bariyer onarımı için yeterli." },
      { label: "Etki Alanları", value: "Çoklu", note: "Sebo regülasyonu, melanozom inhibisyonu, ceramid sentezi, anti-inflamatuar etki." },
      { label: "Kombine Uyum", value: "Yüksek", note: "Retinol, peptidler, ceramidler ve neredeyse tüm aktiflerle uyumlu." },
    ],
    asitler: [
      { label: "AHA Türleri", value: "Glikolik / Laktik", note: "Glikolik asit en küçük molekül; en derin penetrasyon. Laktik asit daha yümuşak, nemlendiricili AHA." },
      { label: "BHA", value: "Salisilik Asit", note: "Lipofilik yapısıyla gözenek içine girer. %0.5-2 akne ve gözenek için etkin." },
      { label: "Kullanım Frekansı", value: "Haftada 2 – 3", note: "Aşırı eksfoliasyon bariyer hasarı yaratır. Az ve düzenli uygulama önerilir." },
    ],
    peptidler: [
      { label: "Türler", value: "Sinyal / Taşıyıcı / İnhibitör", note: "Matrikin peptidler kollajen sentezini; taşıyıcı peptidler bakır iletimini destekler." },
      { label: "Tolerabilite", value: "Çok Yüksek", note: "Hassas ve reaktif ciltler dahil tüm cilt tipleri için güvenli." },
      { label: "Sinerjik Aktifler", value: "Retinol + Ceramidler", note: "Peptid + retinol kombinasyonu kollajen yanıtını amplifiye eder." },
    ],
  };
  return map[slug] || [
    { label: "Konsantrasyon", value: "Değişken", note: "Formülasyona ve ürüne göre farklılık gösterir." },
  ];
}
