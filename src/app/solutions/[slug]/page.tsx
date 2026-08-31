import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProducts, getSiteContent } from "@/lib/cms";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const content = await getSiteContent();
  return content.skinNeeds.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const content = await getSiteContent();
  const need = content.skinNeeds.find((n) => n.slug === slug);
  if (!need) return {};
  return {
    title: `${need.label} — Devoiler Cilt Çözümleri`,
    description: need.description,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const [products, content] = await Promise.all([getProducts(), getSiteContent()]);
  const skinNeeds = content.skinNeeds;
  const need = skinNeeds.find((n) => n.slug === slug);
  if (!need) notFound();

  const relatedProducts = products.filter((p) => p.skinNeeds.includes(slug));
  const mechanism = (need.mechanism ?? "")
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean);

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
              {(mechanism.length > 0
                ? mechanism
                : ["Bu çözüm için bilimsel protokol içeriği hazırlanıyor."]
              ).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
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
