import Link from "next/link";
import { Product } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-[#F4F4F0] aspect-[3/4] mb-6 transition-all duration-700 group-hover:bg-[#EEEEE8]">
        {/* Placeholder visual — replace with real product imagery */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          {/* Simulated lab flask / bottle silhouette */}
          <div className="relative">
            <div className="w-16 h-28 border border-[#C8C8C0] rounded-sm flex items-end justify-center pb-4">
              <div className="w-8 h-1.5 bg-[#6B8F71] rounded-full" />
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-4 border border-[#C8C8C0] border-b-0" />
          </div>
          <div className="absolute top-5 right-5 text-[9px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium">
            {product.category}
          </div>
        </div>

        {/* Active Ingredient badge */}
        <div className="absolute bottom-5 left-5">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 border border-[#E8E8E2]">
            <span className="text-[18px] font-light text-[#2D3B3C]">{product.activeConcentration}</span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#6B8F71] font-medium">
              {product.activeIngredient}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#9A9A8A] mb-1 font-medium">
              {product.activeConcentration} {product.activeIngredient}
            </p>
            <h3 className="text-[18px] font-light tracking-tight text-[#1A1A1A] group-hover:text-[#2D3B3C] transition-colors duration-200">
              {product.name}
            </h3>
          </div>
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
