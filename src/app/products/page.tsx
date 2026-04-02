"use client";

import { useState } from "react";
import { products, productCategories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("tumu");

  const filtered =
    activeCategory === "tumu"
      ? products
      : products.filter((p) => {
          const map: Record<string, string> = {
            serumlar: "Serumlar",
            tonikler: "Tonikler",
            "gunes-korumasi": "Güneş Koruması",
            temizleyiciler: "Temizleyiciler",
          };
          return p.category === map[activeCategory];
        });

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-4">
            Bilimsel Formülasyonlar
          </p>
          <h1 className="text-[40px] md:text-[56px] font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
            Ürünlerimiz
          </h1>
          <p className="text-[15px] leading-[1.9] text-[#4A4A4A] max-w-xl">
            Her biri bir kimyagerin titizliğiyle formüle edilmiş, klinik verilerle desteklenen
            dermo-kozmetik ürün ailemiz.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap gap-3">
            {productCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 font-medium ${
                  activeCategory === cat.slug
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-transparent text-[#4A4A4A] border-[#E8E8E2] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[14px] text-[#9A9A8A]">Bu kategoride henüz ürün bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
