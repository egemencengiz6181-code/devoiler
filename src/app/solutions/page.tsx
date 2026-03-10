import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { skinNeeds, products } from "@/lib/data";

export const metadata = {
  title: "Cilt Çözümleri — Devoiler",
  description: "Cilt ihtiyacınıza göre formülasyon protokolü: leke, akne, gözenek, nem, kırışıklık, hassas cilt.",
};

export default function SolutionsPage() {
  return (
    <div className="bg-[#FAFAF8]">
      {/* HERO */}
      <section className="pt-48 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-8">
          Cilt İhtiyacına Göre
        </p>
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          <h1 className="text-[52px] md:text-[68px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A]">
            Probleminizi seçin.
            <br />
            <em className="not-italic text-[#6B8F71]">Çözümünüzü bulun.</em>
          </h1>
          <p className="text-[15px] leading-[1.9] text-[#4A4A4A] max-w-md">
            Ürün isimleri değil cilt ihtiyaçları üzerinden düşünüyoruz. Her protokol, o ihtiyaç için bilimsel olarak desteklenen aktif bileşenleri sunar.
          </p>
        </div>
      </section>

      {/* SOLUTION GRID */}
      <section className="px-6 md:px-12 pb-28 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8E8E2]">
          {skinNeeds.map((need) => {
            const relatedProducts = products.filter((p) => p.skinNeeds.includes(need.slug));
            return (
              <Link
                key={need.slug}
                href={`/solutions/${need.slug}`}
                className="group bg-[#FAFAF8] hover:bg-[#F2F2EC] transition-colors duration-300 p-10 flex flex-col gap-6"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[36px] text-[#C8C8C0] group-hover:text-[#6B8F71] transition-colors duration-300 leading-none">
                    {need.icon}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#C8C8C0] font-medium mt-2">
                    {relatedProducts.length} ürün
                  </span>
                </div>

                <div>
                  <h2 className="text-[20px] font-light text-[#1A1A1A] mb-3 leading-snug">{need.label}</h2>
                  <p className="text-[13px] leading-[1.8] text-[#9A9A8A]">{need.description}</p>
                </div>

                {relatedProducts.length > 0 && (
                  <div className="space-y-1.5">
                    {relatedProducts.slice(0, 2).map((p) => (
                      <div key={p.slug} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6B8F71]" />
                        <span className="text-[11px] text-[#9A9A8A] tracking-wide">{p.activeConcentration} {p.activeIngredient}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#6B8F71] font-medium mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Protokol Gör</span>
                  <ArrowRight size={10} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PROTOCOL STRIP */}
      <section className="bg-[#2D3B3C] py-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-[#3A4A4B]">
            {[
              { step: "01", title: "İhtiyacı Belirle", text: "Hangi cilt endişesi sizi en çok etkiliyor?" },
              { step: "02", title: "Aktifi Tanı", text: "O endişeye bilimsel olarak yanıt veren bileşeni seçin." },
              { step: "03", title: "Protokolü Uygula", text: "Doğru sıra ve frekansla rutin oluşturun." },
            ].map((item) => (
              <div key={item.step} className="bg-[#2D3B3C] p-10">
                <p className="text-[11px] tracking-[0.3em] text-[#4A6E6E] font-medium mb-4">{item.step}</p>
                <h3 className="text-[18px] font-light text-white mb-3">{item.title}</h3>
                <p className="text-[13px] leading-[1.8] text-[#7A9A9A]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
