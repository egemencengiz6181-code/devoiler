import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts, getSiteContent } from "@/lib/cms";

export const revalidate = 60;

export default async function Home() {
  const [products, content] = await Promise.all([getProducts(), getSiteContent()]);
  const c = content.home;
  const skinNeeds = content.skinNeeds;

  return (
    <div className="bg-[#FAFAF8]">
      {/* ——————————————————————————————
          HERO
      —————————————————————————————— */}
      <section className="flex flex-col pt-32 md:pt-40 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="max-w-[1440px] mx-auto w-full">
          {/* Top label */}
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-12">
            {c.heroLabel}
          </p>

          {/* Main headline */}
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-[52px] md:text-[72px] lg:text-[88px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A]">
                {c.heroTitle1}
                <br />
                <em className="not-italic text-[#6B8F71]">{c.heroTitleAccent}</em>
                <br />
                {c.heroTitle3}
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <div className="max-w-xs">
                <p className="text-[15px] leading-[1.9] text-[#4A4A4A] mb-10">
                  {c.heroDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={c.heroPrimaryHref} className="inline-flex items-center gap-2.5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium">
                    {c.heroPrimaryLabel}
                    <ArrowRight size={12} />
                  </Link>
                  <Link href={c.heroSecondaryHref} className="inline-flex items-center gap-2.5 border border-[#E8E8E2] text-[#1A1A1A] text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:border-[#1A1A1A] transition-colors duration-300 font-medium">
                    {c.heroSecondaryLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics strip */}
          <div className="mt-20 pt-10 border-t border-[#E8E8E2] grid grid-cols-2 md:grid-cols-3 gap-8">
            {c.metrics.map((stat) => (
              <div key={stat.label}>
                <p className="text-[32px] md:text-[36px] font-light tracking-tight text-[#1A1A1A] mb-1">{stat.num}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#9A9A8A] font-medium leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          MANIFESTO BAND
      —————————————————————————————— */}
      <section className="bg-[#2D3B3C] py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-8">
              {c.manifestoLabel}
            </p>
            <blockquote className="text-[28px] md:text-[38px] font-light leading-[1.3] text-white tracking-[-0.01em]">
              {c.manifestoQuote}
            </blockquote>
            <div className="mt-8 h-px w-12 bg-[#6B8F71]" />
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          ÇÖZÜM GRİLLER — CİLT İHTİYACINA GÖRE
      —————————————————————————————— */}
      <section className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
              {c.solutionsLabel}
            </p>
            <h2 className="text-[36px] md:text-[48px] font-light tracking-[-0.02em] text-[#1A1A1A] leading-tight">
              {c.solutionsTitle}<br />
              <span className="text-[#6B8F71]">{c.solutionsTitleAccent}</span>
            </h2>
          </div>
          <Link href="/solutions" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200 font-medium shrink-0">
            {c.solutionsLinkLabel}
            <ArrowRight size={11} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#E8E8E2]">
          {skinNeeds.map((need) => (
            <Link
              key={need.slug}
              href={`/solutions/${need.slug}`}
              className="group bg-[#FAFAF8] hover:bg-[#F4F4F0] transition-colors duration-300 p-10 flex flex-col gap-6"
            >
              <span className="text-[28px] text-[#C8C8C0] group-hover:text-[#6B8F71] transition-colors duration-300">
                {need.icon}
              </span>
              <div>
                <h3 className="text-[16px] font-light text-[#1A1A1A] mb-2 leading-snug">{need.label}</h3>
                <p className="text-[12px] leading-[1.8] text-[#9A9A8A]">{need.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#6B8F71] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Çözümü Gör</span>
                <ArrowRight size={10} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ——————————————————————————————
          ÜRÜN SHOWCASE
      —————————————————————————————— */}
      <section className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-[#E8E8E2]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
              {c.productsLabel}
            </p>
            <h2 className="text-[36px] md:text-[48px] font-light tracking-[-0.02em] text-[#1A1A1A] leading-tight">
              {c.productsTitle}<br />
              <span className="text-[#6B8F71]">{c.productsTitleAccent}</span>
            </h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200 font-medium shrink-0">
            {c.productsLinkLabel}
            <ArrowRight size={11} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}

          {c.comingSoonEnabled && (
            <div className="block">
              <div className="relative overflow-hidden bg-[#F4F4F0] aspect-[3/4] mb-4">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <p className="text-[9px] tracking-[0.35em] uppercase text-[#9A9A8A] font-medium">Coming Soon</p>
                  <div className="w-8 h-px bg-[#C8C8C0]" />
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#C8C8C0] font-light">{c.comingSoonTitle}</p>
                </div>
                <div className="absolute top-5 right-5 text-[9px] tracking-[0.2em] uppercase text-white/90 font-medium bg-[#1A1A1A]/30 backdrop-blur-sm px-2.5 py-1">
                  {c.comingSoonBadge}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[18px] font-light tracking-tight text-[#1A1A1A]">{c.comingSoonTitle}</h3>
                </div>
                <p className="text-[12px] text-[#9A9A8A] tracking-wide leading-relaxed">{c.comingSoonText}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ——————————————————————————————
          BİLİM BANTI
      —————————————————————————————— */}
      <section className="bg-[#F4F4F0] border-t border-b border-[#E8E8E2] py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {c.scienceItems.map((item) => (
              <div key={item.title} className="flex flex-col gap-5">
                <span className="text-[32px] text-[#6B8F71]">{item.icon}</span>
                <div>
                  <h3 className="text-[18px] font-light text-[#1A1A1A] mb-3">{item.title}</h3>
                  <p className="text-[14px] leading-[1.9] text-[#4A4A4A]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          AKTİF İÇERİK ŞERİDİ
      —————————————————————————————— */}
      <section className="py-12 overflow-hidden border-y border-[#E8E8E2]">
        <div className="flex items-center gap-12 animate-none whitespace-nowrap">
          {[...c.ticker, ...c.ticker].map((ing, i) => (
            <span key={i} className="text-[11px] tracking-[0.3em] uppercase text-[#C8C8C0] font-medium shrink-0 flex items-center gap-12">
              {ing}
              <span className="text-[#6B8F71] text-xs">◦</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
