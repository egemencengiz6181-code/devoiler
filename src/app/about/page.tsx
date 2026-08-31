import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getSiteContent } from "@/lib/cms";

export const revalidate = 60;

export const metadata = {
  title: "Biz Kimiz? — Devoiler",
  description: "Devoiler'in felsefesi, kuruluş hikayesi ve bilim odaklı yaklaşımı hakkında.",
};

export default async function AboutPage() {
  const content = await getSiteContent();
  const c = content.about;

  return (
    <div className="bg-[#FAFAF8]">
      {/* ——————————————————————————————
          HERO
      —————————————————————————————— */}
      <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-y-12">
          <div className="lg:col-span-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-8">
              {c.heroLabel}
            </p>
            <h1 className="text-[52px] md:text-[72px] lg:text-[82px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A]">
              {c.heroTitle1}
              <br />
              <em className="not-italic text-[#6B8F71]">{c.heroTitleAccent}</em>
            </h1>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          FOUNDER SECTION
      —————————————————————————————— */}
      <section className="pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[3/4] bg-[#E8E8E2] overflow-hidden">
              <Image
                src={c.founderImage}
                alt={`${c.founderName} — ${c.founderLabel}, Devoiler`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="h-px w-12 bg-[#6B8F71] mb-10" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
              {c.founderLabel}
            </p>
            <h2 className="font-serif text-[28px] md:text-[34px] font-light tracking-[-0.01em] text-[#1A1A1A] leading-snug mb-10">
              {c.founderName}
              <span className="block text-[16px] md:text-[18px] text-[#9A9A8A] font-light mt-2 font-sans tracking-normal">
                {c.founderRole}
              </span>
            </h2>

            <div className="space-y-7 text-[16px] leading-[2] text-[#2A2A2A] font-light">
              {c.founderParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          VİZYONUMUZ & DEĞERLERİMİZ
      —————————————————————————————— */}
      <section className="bg-[#2D3B3C] py-24 md:py-28 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
              {c.valuesLabel}
            </p>
            <h2 className="font-serif text-[32px] md:text-[40px] font-light text-white tracking-[-0.01em] leading-snug">
              {c.valuesTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.values.map((item, idx) => (
              <div key={idx} className="border border-[#3E4E4F] p-10">
                <h3 className="font-serif text-[18px] font-light text-white mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-[1.9] text-[#9A9A8A]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          MANIFESTO METNİ
      —————————————————————————————— */}
      <section className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 lg:col-start-2">
            <div className="h-px w-12 bg-[#6B8F71] mb-12" />
            <div className="space-y-6 text-[17px] leading-[1.9] text-[#2A2A2A] font-light">
              {c.manifestoParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-8">
            <div className="bg-[#2D3B3C] p-12 h-full min-h-[340px] flex flex-col justify-between">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium">
                {c.principleLabel}
              </p>
              <blockquote className="text-[20px] font-light text-white leading-[1.5] my-8">
                {c.principleQuote}
              </blockquote>
              <div className="h-px w-8 bg-[#6B8F71]" />
            </div>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          SLOGANLAR
      —————————————————————————————— */}
      <section className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
            {c.slogansLabel}
          </p>
          <h2 className="text-[32px] font-light tracking-[-0.01em] text-[#1A1A1A]">
            {c.slogansTitle}
          </h2>
        </div>

        <div className="space-y-0 border-t border-[#E8E8E2]">
          {c.slogans.map((item, idx) => (
            <div key={idx} className="grid md:grid-cols-[1fr_2fr] gap-8 py-10 border-b border-[#E8E8E2]">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium pt-1">
                {item.product}
              </p>
              <div>
                <h3 className="text-[26px] md:text-[32px] font-light text-[#1A1A1A] mb-3 tracking-[-0.01em]">
                  {item.slogan}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#4A4A4A]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——————————————————————————————
          CTA
      —————————————————————————————— */}
      <section className="bg-[#1A1A1A] py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
            {c.ctaLabel}
          </p>
          <h2 className="text-[36px] md:text-[48px] font-light text-white tracking-[-0.02em] mb-8 leading-tight">
            {c.ctaTitle}
          </h2>
          <Link href={c.ctaButtonHref} className="inline-flex items-center gap-3 bg-[#6B8F71] text-white text-[10px] tracking-[0.25em] uppercase px-12 py-5 hover:bg-[#45644A] transition-colors duration-300 font-medium">
            {c.ctaButtonLabel}
            <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  );
}
