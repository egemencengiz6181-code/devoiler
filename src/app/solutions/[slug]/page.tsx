import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { skinNeeds, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return skinNeeds.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const need = skinNeeds.find((n) => n.slug === slug);
  if (!need) return {};
  return {
    title: `${need.label} — Devoiler Cilt Çözümleri`,
    description: need.description,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const need = skinNeeds.find((n) => n.slug === slug);
  if (!need) notFound();

  const relatedProducts = products.filter((p) => p.skinNeeds.includes(slug));

  return (
    <div className="bg-[#FAFAF8]">
      {/* HERO */}
      <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <Link href="/solutions" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200 font-medium mb-16">
          <ArrowLeft size={11} />
          Tüm Çözümler
        </Link>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
              Cilt Çözümü
            </p>
            <div className="flex items-start gap-6 mb-8">
              <span className="text-[56px] text-[#6B8F71] leading-none mt-2">{need.icon}</span>
              <h1 className="text-[48px] md:text-[64px] font-light tracking-[-0.02em] leading-[0.95] text-[#1A1A1A]">
                {need.label}
              </h1>
            </div>
            <div className="h-px w-12 bg-[#6B8F71] mb-8" />
            <p className="text-[17px] leading-[1.9] text-[#4A4A4A] max-w-xl">
              {need.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mechanism - scientific description */}
      <section className="pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
              Bilimsel Arka Plan
            </p>
            <h2 className="text-[24px] font-light text-[#1A1A1A] leading-snug">
              Neden oluşur?
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-4 text-[15px] leading-[1.9] text-[#4A4A4A]">
              {getMechanism(slug).map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 px-6 md:px-12 bg-[#F4F4F0] border-y border-[#E8E8E2]">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-16">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
                Önerilen Formülasyonlar
              </p>
              <h2 className="text-[32px] font-light tracking-[-0.01em] text-[#1A1A1A]">
                {need.label} için protokol
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Skin Needs */}
      <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-wrap gap-3">
          {skinNeeds
            .filter((n) => n.slug !== slug)
            .map((n) => (
              <Link
                key={n.slug}
                href={`/solutions/${n.slug}`}
                className="inline-flex items-center gap-2 border border-[#E8E8E2] text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 hover:border-[#6B8F71] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
              >
                <span>{n.icon}</span>
                {n.label}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

function getMechanism(slug: string): string[] {
  const map: Record<string, string[]> = {
    leke: [
      "Hiperpigmentasyon; UV hasarı, hormonal değişimler veya inflamasyon sonrası melanin üretiminin dengesizleşmesiyle ortaya çıkar.",
      "Tirozinaz enzimi, tirozin aminoasidini melanin pigmentine dönüştürür. Bu yolağı hedefleyen aktifler (Vitamin C, niasinamid, alfa-arbutin) melanin sentezini ve melanozom transferini inhibe eder.",
      "Etkinliği klinik araştırmalarla desteklenen bu aktifler, tutarlı kullanımda 8–12 hafta içinde ton eşitlemede ölçülebilir değişim sağlar.",
    ],
    akne: [
      "Aknede dört temel mekanizma iç içe geçer: aşırı sebum üretimi, komedon oluşumu, Cutibacterium acnes kolonizasyonu ve inflamatuar yanıt.",
      "Bilimsel olarak değerlendirilmiş aktifler her aşamayı hedefler: salisilik asit (BHA) lipofilik yapısıyla gözenek içine girerek komedon sıkışmasını önler; niasinamid sebum üretimini düzenler; benzoil peroksit ise bakteri yükünü azaltır.",
      "İrritan formülasyonlardan kaçınmak inflamatuar döngüyü kırmak için kritiktir.",
    ],
    gozenek: [
      "Gözenek boyutu genetik olarak belirlenir; tamamen 'kapanmaz'. Ancak aşırı sebum, keratin birikmesi ve cilt elastikiyetinin azalması gözeneklerin görsel olarak genişlemesine neden olur.",
      "AHA'larla kimyasal eksfoliasyon ve niasinamid ile sebo regülasyonu; gözenek içini temizleyerek ve çevre dokusunu sıkılaştırarak görünümü minimize eder.",
      "Retinol uzun vadede hücre döngüsünü hızlandırarak gözenek tıkanıklıklarını önler.",
    ],
    nem: [
      "Sağlıklı bir epidermal bariyer üç bileşen gerektirir: keratinosit proteinleri, ceramid başta olmak üzere lipidler ve doğal nemlendiriciler (NMF).",
      "Bariyer hasarında transepidermal su kaybı (TEWL) artar; cildin nem tutma kapasitesi düşer. Ceramid + kolesterol + serbest yağ asidi kombinasyonu fizyolojik lipid oranını yeniden oluşturur.",
      "Hyaluronik asit gibi humektanlar ise farklı moleküler ağırlıklarda epidermal ve dermal katmanı nemlendirir.",
    ],
    cizgi: [
      "Kırışıklıklar; kollajen ve elastin liflerinin UV, oksidatif stres ve hücresel yaşlanmayla yıpranmasıyla gelişir. Dermal matriksin yeniden yapılanması yavaşlar.",
      "Retinoidler (retinol → retinal → retinoik asit) RAR reseptörlerine bağlanarak kollajen sentezini artırır ve matriks metalloproteinaz (MMP) aktivitesini baskılar.",
      "Peptidler fibroblastları sinyalizasyon yoluyla aktive eder; A vitamini türevleriyle sinerji yaratır.",
    ],
    hassas: [
      "Hassas cilt; bozulmuş epidermal bariyer, artmış nörosensöriyal reaktivite ve düşük inflamasyon eşiğinin birleşimidir.",
      "Fragman, alkol ve yüksek konsantrasyonlu aktifler bu mekanizmayı tetikler. Hypoallerjenik formülasyon; yalnızca güvenlik profili geniş değerlendirilmiş bileşenleri içerir.",
      "Ceramid ve madecassoside gibi yatıştırıcı aktifler bariyer bütünlüğünü destekler ve kızarıklık görünümünü azaltır.",
    ],
  };
  return map[slug] || ["Bu çözüm için bilimsel protokol içeriği hazırlanıyor."];
}
