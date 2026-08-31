"use client";

import { useEffect, useState } from "react";
import AccountLayout from "@/components/AccountLayout";
import { useAuth } from "@/context/AuthContext";
import type { Product } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((b) => setProducts(b.products ?? []))
      .catch(() => setProducts([]));
  }, []);

  const wishlistSlugs = user?.wishlist || [];
  const wishlistProducts = products.filter((p) => wishlistSlugs.includes(p.slug));

  return (
    <AccountLayout activeTab="wishlist">
      <div>
        <h2 className="text-[24px] font-light text-[#1A1A1A] mb-2">Favorilerim</h2>
        <p className="text-[13px] text-[#9A9A8A] tracking-wide mb-8">
          Beğendiğiniz ürünleri burada bulabilirsiniz.
        </p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16 border border-[#E8E8E2]">
            <Heart size={48} className="mx-auto text-[#E8E8E2] mb-6" />
            <p className="text-[15px] font-light text-[#1A1A1A] mb-2">Henüz favori ürününüz yok</p>
            <p className="text-[13px] text-[#9A9A8A]">
              Ürün sayfalarındaki kalp ikonuna tıklayarak favorilerinize ekleyin.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
