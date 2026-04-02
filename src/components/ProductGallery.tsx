"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  mainImage: string;
  detailImages: string[];
  productName: string;
  category: string;
  activeConcentration: string;
  activeIngredient: string;
}

export default function ProductGallery({
  mainImage,
  detailImages,
  productName,
  category,
  activeConcentration,
  activeIngredient,
}: Props) {
  const allImages = [mainImage, ...detailImages];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="bg-[#F4F4F0] relative overflow-hidden" style={{ height: "auto", maxHeight: "80vh" }}>
        <Image
          src={allImages[selectedIndex]}
          alt={productName}
          width={800}
          height={800}
          className="w-full h-auto max-h-[80vh] object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* Category badge */}
        <div className="absolute top-6 left-6 text-[9px] tracking-[0.3em] uppercase text-white/90 font-medium bg-[#1A1A1A]/40 backdrop-blur-sm px-3 py-1.5">
          {category}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
        {allImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`relative w-20 h-20 shrink-0 overflow-hidden border transition-all duration-200 bg-[#F4F4F0] ${
              i === selectedIndex
                ? "border-[#1A1A1A]"
                : "border-[#E8E8E2] hover:border-[#C8C8C0]"
            }`}
          >
            <Image
              src={img}
              alt={`${productName} - ${i === 0 ? "Ana Görsel" : `Detay ${i}`}`}
              fill
              className="object-contain p-1"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
