import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data";
import { ArrowRight, Star } from "lucide-react";

const reviews = [
  "\u201CODTÜ Kimya güvencesi: pH dengesi mükemmel, cildim sonunda aradığı dengeyi buldu.\u201D — Ece B.",
  "\u201CSonunda gerçekten işe yarayan bir C Vitamini. İlk haftadan cildimdeki aydınlanma fark edilir boyutta.\u201D — Burcu K.",
  "\u201CKimyager elinden çıktığı belli. Niasinamid konsantrasyonu tam kıvamında, sivilcelerim kontrol altında.\u201D — Selin G.",
  "\u201CMinimalist rutinimin vazgeçilmezi. Cilt bariyerimi onardı.\u201D — Aysu R.",
  "\u201CAnkara'nın kuru havasında cildimi neme doyuran tek serum.\u201D — Deniz T.",
];

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-[#F4F4F0] aspect-[3/4] mb-4 transition-all duration-700 group-hover:bg-[#EEEEE8]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-16 h-28 border border-[#C8C8C0] rounded-sm flex items-end justify-center pb-4">
                <div className="w-8 h-1.5 bg-[#6B8F71] rounded-full" />
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-4 border border-[#C8C8C0] border-b-0" />
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-5 right-5 text-[9px] tracking-[0.2em] uppercase text-white/90 font-medium bg-[#1A1A1A]/30 backdrop-blur-sm px-2.5 py-1">
          {product.category}
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} className="fill-[#C9A96E] text-[#C9A96E]" />
        ))}
        <span className="text-[10px] text-[#9A9A8A] ml-1.5 tracking-wide">(5.0)</span>
      </div>

      {/* Marquee Reviews */}
      <div className="relative overflow-hidden h-5 mb-3">
        <div className="absolute whitespace-nowrap animate-marquee">
          {reviews.concat(reviews).map((review, i) => (
            <span key={i} className="text-[10px] text-[#9A9A8A] italic mx-6">
              {review}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[18px] font-light tracking-tight text-[#1A1A1A] group-hover:text-[#2D3B3C] transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-[15px] font-medium text-[#1A1A1A] shrink-0">{product.price}</p>
        </div>
        <p className="text-[12px] text-[#9A9A8A] tracking-wide leading-relaxed">{product.tagline}</p>
        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#6B8F71] font-medium group-hover:gap-3 transition-all duration-200 pt-1">
          <span>İncele</span>
          <ArrowRight size={11} />
        </div>
      </div>
    </Link>
  );
}
