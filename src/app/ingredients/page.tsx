import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { activeIngredients, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Aktif İçerikler & Formülasyonlar — Devoiler",
  description: "Retinol, Vitamin C, Niasinamid, Hyaluronik Asit ve daha fazlası. Aktif içerik seçiminizle doğru formülasyonu bulun.",
};

export default function IngredientsPage() {
  return (
    <div className="bg-[#FAFAF8]">
      {/* HERO */}
      <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-8">
          Aktif İçeriğe Göre
        </p>
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          <h1 className="text-[52px] md:text-[68px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A]">
            İçeriği tanıyın.
            <br />
            <em className="not-italic text-[#6B8F71]">Bilinçli seçin.</em>
          </h1>
          <p className="text-[15px] leading-[1.9] text-[#4A4A4A] max-w-md">
            Her aktif bileşen farklı bir mekanizma üzerinden çalışır. Hangi bileşenin ne yaptığını anlamak, doğru protokolü inşa etmenin temelidir.
          </p>
        </div>
      </section>

      {/* INGREDIENT FAMILIES */}
      <section className="pb-28 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="space-y-0 border-t border-[#E8E8E2]">
          {activeIngredients.map((ing, idx) => {
            const relatedProducts = products.filter((p) =>
              p.activeIngredient.toLowerCase().includes(ing.label.split(" ")[0].toLowerCase()) ||
              p.slug.includes(ing.slug)
            );

            return (
              <Link
                key={ing.slug}
                href={`/ingredients/${ing.slug}`}
                className="group grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-8 items-center py-10 border-b border-[#E8E8E2] hover:bg-[#F4F4F0] transition-colors duration-200 px-4 -mx-4"
              >
                <span className="hidden md:block text-[13px] tracking-[0.2em] text-[#C8C8C0] font-medium">
                  0{idx + 1}
                </span>

                <div>
                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    <h2 className="text-[24px] md:text-[28px] font-light text-[#1A1A1A] tracking-[-0.01em] group-hover:text-[#2D3B3C] transition-colors duration-200">
                      {ing.label}
                    </h2>
                    {relatedProducts.length > 0 && (
                      <span className="text-[9px] tracking-[0.2em] uppercase bg-[#6B8F71]/10 text-[#45644A] px-2 py-1 font-medium">
                        {relatedProducts.length} formülasyon
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] leading-relaxed text-[#4A4A4A] max-w-2xl mb-2">{ing.description}</p>
                  <p className="text-[12px] leading-relaxed text-[#9A9A8A] font-mono max-w-2xl">{ing.science}</p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#6B8F71] font-medium group-hover:gap-3 transition-all duration-200 shrink-0">
                  <span>Detay</span>
                  <ArrowRight size={11} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="py-24 px-6 md:px-12 bg-[#F4F4F0] border-y border-[#E8E8E2]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
              Tüm Formülasyonlar
            </p>
            <h2 className="text-[32px] font-light tracking-[-0.01em] text-[#1A1A1A]">
              Koleksiyon
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* COMPATIBILITY GUIDE */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
            Kombinasyon Rehberi
          </p>
          <h2 className="text-[32px] font-light tracking-[-0.01em] text-[#1A1A1A] max-w-xl">
            Hangi aktifler birlikte kullanılabilir?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#E8E8E2]">
          {[
            {
              title: "Uyumlu Kombinasyonlar",
              color: "#6B8F71",
              pairs: [
                "Niasinamid + Retinol — Sabah/akşam; irritasyon minimize",
                "Vitamin C + Ferülik Asit — Sinerjistik antioksidan",
                "AHA + Hyaluronik Asit — Eksfoliasyon + nemlendirme",
                "Peptidler + Ceramidler — Bariyer onarımı",
              ],
            },
            {
              title: "Dikkatli Kombinasyonlar",
              color: "#9A7A5A",
              pairs: [
                "Vitamin C + AHA — pH rekabeti; aralarında süre bırakın",
                "Retinol + BHA — Kümülatif irritasyon riski",
                "Retinol + Vitamin C — Farklı pH optimumu; ayrı rutinde kullanın",
                "Birden fazla AHA — Eksfoliasyon dozajı aşılabilir",
              ],
            },
          ].map((group) => (
            <div key={group.title} className="bg-[#FAFAF8] p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
                <p className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: group.color }}>
                  {group.title}
                </p>
              </div>
              <div className="space-y-4">
                {group.pairs.map((pair, i) => (
                  <p key={i} className="text-[13px] leading-[1.8] text-[#4A4A4A]">
                    {pair}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
