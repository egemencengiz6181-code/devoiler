"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { Check, ArrowRight, Package, Sparkles } from "lucide-react";

function ConfettiPiece({ delay, left }: { delay: number; left: number }) {
  const colors = ["#6B8F71", "#E8D5B5", "#A8C5B0", "#D4A574", "#B8D4C0", "#FFD700"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = 6 + Math.random() * 6;
  const rotation = Math.random() * 360;

  return (
    <div
      className="absolute top-0 animate-confetti-fall"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}ms`,
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        opacity: 0,
      }}
    />
  );
}

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const { orders } = useOrders();
  const [confetti, setConfetti] = useState<{ delay: number; left: number }[]>([]);

  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  const generateConfetti = useCallback(() => {
    const pieces = Array.from({ length: 60 }, () => ({
      delay: Math.random() * 2000,
      left: Math.random() * 100,
    }));
    setConfetti(pieces);
  }, []);

  useEffect(() => {
    clearCart();
    generateConfetti();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {confetti.map((c, i) => (
          <ConfettiPiece key={i} delay={c.delay} left={c.left} />
        ))}
      </div>

      <div className="max-w-[600px] mx-auto px-6 text-center relative z-20">
        {/* Success icon */}
        <div className="relative inline-block mb-10">
          <div className="w-20 h-20 bg-[#6B8F71] rounded-full flex items-center justify-center mx-auto animate-scale-in">
            <Check size={36} className="text-white" />
          </div>
          <Sparkles
            size={20}
            className="absolute -top-2 -right-2 text-[#E8D5B5] animate-pulse"
          />
        </div>

        <h1 className="text-[32px] md:text-[40px] font-light tracking-[-0.02em] text-[#1A1A1A] mb-4 animate-fade-in">
          Siparişiniz Alındı!
        </h1>

        <p className="text-[15px] text-[#9A9A8A] leading-[1.8] max-w-md mx-auto mb-8 animate-fade-in">
          Siparişiniz başarıyla oluşturuldu. Teslimat süreciyle ilgili bilgilendirmeler e-posta adresinize gönderilecektir.
        </p>

        {latestOrder && (
          <div className="bg-[#F4F4F0] border border-[#E8E8E2] p-6 mb-10 animate-fade-in text-left">
            <div className="flex items-center gap-2 mb-4">
              <Package size={16} className="text-[#6B8F71]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium">
                Sipariş Detayı
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#9A9A8A] font-medium mb-1">
                  Sipariş No
                </p>
                <p className="text-[15px] font-medium text-[#1A1A1A]">{latestOrder.id}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#9A9A8A] font-medium mb-1">
                  Toplam
                </p>
                <p className="text-[15px] font-medium text-[#1A1A1A]">
                  ₺{latestOrder.totalAmount.toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#E8E8E2]">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#9A9A8A] font-medium mb-2">
                Ürünler
              </p>
              {latestOrder.items.map((item, idx) => (
                <p key={idx} className="text-[12px] text-[#4A4A4A] tracking-wide">
                  {item.productName} × {item.quantity}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center gap-2 border border-[#E8E8E2] text-[#1A1A1A] text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:border-[#1A1A1A] transition-colors duration-300 font-medium"
          >
            <Package size={12} />
            Siparişi Takip Et
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium"
          >
            Alışverişe Devam Et
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
