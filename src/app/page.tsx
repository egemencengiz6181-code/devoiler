import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, skinNeeds } from "@/lib/data";

export default function Home() {
  return (
    <div className="bg-[#FAFAF8]">
      {/* ——————————————————————————————
          HERO
      —————————————————————————————— */}
      <section className="flex flex-col pt-32 md:pt-40 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="max-w-[1440px] mx-auto w-full">
          {/* Top label */}
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-12">
            Dermo-Cosmetics — Ankara
          </p>

          {/* Main headline */}
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-[52px] md:text-[72px] lg:text-[88px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A]">
                Cildinize gerçekten
                <br />
                <em className="not-italic text-[#6B8F71]">ne yaptığını</em>
                <br />
                biliyor musunuz?
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <div className="max-w-xs">
                <p className="text-[15px] leading-[1.9] text-[#4A4A4A] mb-10">
                  Mucizevi vaatler değil. Kanıt. Her formülasyonumuz, aktif bileşen konsantrasyonları ve klinik referanslarıyla şeffaf biçimde sunulur.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/solutions" className="inline-flex items-center gap-2.5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium">
                    Protokolünü Bul
                    <ArrowRight size={12} />
                  </Link>
                  <Link href="/ingredients" className="inline-flex items-center gap-2.5 border border-[#E8E8E2] text-[#1A1A1A] text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:border-[#1A1A1A] transition-colors duration-300 font-medium">
                    Aktif İçerikler
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics strip */}
          <div className="mt-20 pt-10 border-t border-[#E8E8E2] grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "100%", label: "Şeffaf Formülasyon" },
              { num: "0", label: "Fragran, Alkol, Yapay Renk" },
              { num: "6", label: "Aktif Bileşen Ailesi" },
              { num: "≤ 15", label: "İçerik / Ürün" },
            ].map((stat) => (
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
              Felsefemiz
            </p>
            <blockquote className="text-[28px] md:text-[38px] font-light leading-[1.3] text-white tracking-[-0.01em]">
              "Daha az ama daha etkili. Her bileşen bir işlev taşır; dolgu veya süs değil."
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
              Cilt İhtiyacına Göre
            </p>
            <h2 className="text-[36px] md:text-[48px] font-light tracking-[-0.02em] text-[#1A1A1A] leading-tight">
              Probleminizi seçin.<br />
              <span className="text-[#6B8F71]">Çözümünüzü bulun.</span>
            </h2>
          </div>
          <Link href="/solutions" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200 font-medium shrink-0">
            Tüm çözümler
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
                <span>Protokol Gör</span>
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
              Formülasyonlar
            </p>
            <h2 className="text-[36px] md:text-[48px] font-light tracking-[-0.02em] text-[#1A1A1A] leading-tight">
              Aktif içerikler,<br />
              <span className="text-[#6B8F71]">doğru konsantrasyonda.</span>
            </h2>
          </div>
          <Link href="/ingredients" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200 font-medium shrink-0">
            Tüm ürünler
            <ArrowRight size={11} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ——————————————————————————————
          BİLİM BANTI
      —————————————————————————————— */}
      <section className="bg-[#F4F4F0] border-t border-b border-[#E8E8E2] py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {[
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
            ].map((item) => (
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
          ACTİF İÇERİK SCROLLING TICKER
      —————————————————————————————— */}
      <section className="py-12 overflow-hidden border-y border-[#E8E8E2]">
        <div className="flex items-center gap-12 animate-none whitespace-nowrap">
          {[
            "Retinol", "Vitamin C", "Niasinamid", "Hyaluronik Asit",
            "Glikolik Asit", "Salisilik Asit", "Peptidler", "Ceramidler",
            "Skualen", "Ferülik Asit", "Panthenol", "Madecassoside",
            "Retinol", "Vitamin C", "Niasinamid", "Hyaluronik Asit",
          ].map((ing, i) => (
            <span key={i} className="text-[11px] tracking-[0.3em] uppercase text-[#C8C8C0] font-medium shrink-0 flex items-center gap-12">
              {ing}
              <span className="text-[#6B8F71] text-xs">◦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ——————————————————————————————
          CTA
      —————————————————————————————— */}
      <section className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
          Kişisel Protokol
        </p>
        <h2 className="text-[40px] md:text-[60px] font-light tracking-[-0.02em] text-[#1A1A1A] leading-[1.05] mb-8 max-w-2xl mx-auto">
          Cilt rutininizi doğru temeller üzerine inşa edin.
        </h2>
        <p className="text-[15px] leading-[1.9] text-[#4A4A4A] mb-12 max-w-lg mx-auto">
          Cilt ihtiyacınızı seçin, protokol önerimizi alın. Bilimsel olarak desteklenen bileşenlerle, doğru sırayla.
        </p>
        <Link
          href="/solutions"
          className="inline-flex items-center gap-3 bg-[#6B8F71] text-white text-[10px] tracking-[0.25em] uppercase px-12 py-5 hover:bg-[#45644A] transition-colors duration-300 font-medium"
        >
          Protokol Testini Başlat
          <ArrowRight size={12} />
        </Link>
      </section>
    </div>
  );
}
