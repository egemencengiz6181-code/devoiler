"use client";

import { useState } from "react";
import type { Product, ProductCategory } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function ProductsClient({
  products,
  categories,
  emptyText,
}: {
  products: Product[];
  categories: ProductCategory[];
  emptyText: string;
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug ?? "tumu");

  const activeLabel = categories.find((c) => c.slug === activeCategory)?.label;

  const filtered =
    activeCategory === "tumu"
      ? products
      : products.filter((p) => p.category === activeLabel);

  return (
    <>
      {/* Category Filter */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
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
              <p className="text-[14px] text-[#9A9A8A]">{emptyText}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
