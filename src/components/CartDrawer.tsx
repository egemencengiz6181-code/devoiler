"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const {
    items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice,
    appliedCoupon, couponError, applyCoupon, removeCoupon, discountAmount, finalPrice,
  } = useCart();
  const { user, openAuth } = useAuth();
  const [couponInput, setCouponInput] = useState("");

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    if (!user) {
      closeCart();
      openAuth("register");
      return;
    }
    closeCart();
    window.location.href = "/checkout";
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[440px] bg-[#FAFAF8] shadow-[-20px_0_60px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#E8E8E2]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-[#1A1A1A]" />
            <h2 className="text-[11px] tracking-[0.25em] uppercase font-medium text-[#1A1A1A]">
              Sepet
            </h2>
            {totalItems > 0 && (
              <span className="text-[10px] tracking-wide text-[#9A9A8A]">
                ({totalItems} ürün)
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-[#E8E8E2] mb-6" />
              <p className="text-[15px] font-light text-[#1A1A1A] mb-2">
                Sepetiniz boş
              </p>
              <p className="text-[13px] text-[#9A9A8A] mb-8 max-w-[220px]">
                Cildinize uygun formülasyonları keşfedin.
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#6B8F71] hover:text-[#1A1A1A] transition-colors duration-200 font-medium"
              >
                Ürünlere Göz At
                <ArrowRight size={11} />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.slug}
                  className="flex gap-5 pb-6 border-b border-[#E8E8E2] last:border-0 animate-fade-in"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={closeCart}
                    className="shrink-0 w-[90px] h-[120px] bg-[#F4F4F0] relative overflow-hidden group"
                  >
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                        sizes="90px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[9px] tracking-[0.2em] uppercase text-[#9A9A8A]">
                        Ürün
                      </div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={closeCart}
                      className="block text-[14px] font-light text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200 mb-1 truncate"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-[11px] text-[#9A9A8A] tracking-wide mb-4">
                      {item.product.activeConcentration}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E8E8E2]">
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                          className="p-2 text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-[13px] font-medium text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                          className="p-2 text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-[14px] font-medium text-[#1A1A1A]">
                          {item.product.price}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.slug)}
                          className="text-[#C8C8C0] hover:text-red-400 transition-colors duration-200"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E8E2] px-8 py-6 space-y-4">
            {/* Coupon Code */}
            {!appliedCoupon ? (
              <div>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C8C8C0]" />
                    <input
                      type="text"
                      placeholder="İndirim Kodu"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-transparent border border-[#E8E8E2] pl-9 pr-3 py-2.5 text-[12px] text-[#1A1A1A] placeholder:text-[#C8C8C0] focus:outline-none focus:border-[#6B8F71] transition-colors duration-300 tracking-wide"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (couponInput.trim()) {
                        const ok = applyCoupon(couponInput);
                        if (ok) setCouponInput("");
                      }
                    }}
                    className="border border-[#E8E8E2] text-[#1A1A1A] text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 hover:border-[#6B8F71] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
                  >
                    Uygula
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-red-400 mt-2 tracking-wide animate-fade-in">{couponError}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between bg-[#F4F4F0] px-4 py-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Tag size={12} className="text-[#6B8F71]" />
                  <span className="text-[11px] tracking-wide text-[#6B8F71] font-medium uppercase">
                    {appliedCoupon.code}
                  </span>
                  <span className="text-[11px] text-[#9A9A8A]">
                    ({appliedCoupon.discountType === "percentage" ? `%${appliedCoupon.value}` : `₺${appliedCoupon.value}`})
                  </span>
                </div>
                <button onClick={removeCoupon} className="text-[#C8C8C0] hover:text-red-400 transition-colors duration-200">
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium">
                Ara Toplam
              </span>
              <span className="text-[15px] text-[#1A1A1A]">
                ₺{totalPrice.toLocaleString("tr-TR")}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex items-center justify-between animate-fade-in">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#6B8F71] font-medium">
                  İndirim
                </span>
                <span className="text-[15px] text-[#6B8F71]">
                  -₺{discountAmount.toLocaleString("tr-TR")}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-[#E8E8E2]">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A] font-medium">
                Toplam
              </span>
              <span className="text-[20px] font-light text-[#1A1A1A]">
                ₺{finalPrice.toLocaleString("tr-TR")}
              </span>
            </div>

            <p className="text-[11px] text-[#9A9A8A] tracking-wide">
              Ücretsiz kargo · 30 gün iade garantisi
            </p>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium flex items-center justify-center gap-3"
            >
              {user ? "Ödemeye Geç" : "Devam Et"}
              <ArrowRight size={12} />
            </button>

            {/* Continue Shopping */}
            <button
              onClick={closeCart}
              className="w-full text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200 font-medium py-2"
            >
              Alışverişe Devam Et
            </button>
          </div>
        )}
      </div>
    </>
  );
}
