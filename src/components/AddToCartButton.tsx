"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Product } from "@/lib/data";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  if (product.soldOut) {
    return (
      <button
        disabled
        className="flex-1 text-[10px] tracking-[0.25em] uppercase px-8 py-4 font-medium flex items-center justify-center gap-3 bg-[#E8E8E2] text-[#9A9A8A] cursor-not-allowed"
      >
        Tükendi
      </button>
    );
  }

  const handleAdd = () => {
    if (added) return;
    addItem(product);
    setAdded(true);
    showToast("Ürün sepete eklendi", {
      label: "Sepete Git",
      onClick: openCart,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex-1 text-[10px] tracking-[0.25em] uppercase px-8 py-4 font-medium flex items-center justify-center gap-3 transition-all duration-500 ${
        added
          ? "bg-[#6B8F71] text-white"
          : "bg-[#1A1A1A] text-white hover:bg-[#2D3B3C]"
      }`}
    >
      <span className="relative w-4 h-4">
        <ShoppingBag
          size={14}
          className={`absolute inset-0 m-auto transition-all duration-300 ${
            added ? "opacity-0 scale-50" : "opacity-100 scale-100"
          }`}
        />
        <Check
          size={14}
          className={`absolute inset-0 m-auto transition-all duration-300 ${
            added ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
      </span>
      {added ? "Eklendi" : "Sepete Ekle"}
    </button>
  );
}
