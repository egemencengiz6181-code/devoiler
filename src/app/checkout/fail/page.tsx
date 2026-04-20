"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";

export default function CheckoutFailPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-32 pb-20">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center mx-auto mb-10 animate-scale-in">
          <AlertTriangle size={32} className="text-red-400" />
        </div>

        <h1 className="text-[32px] md:text-[40px] font-light tracking-[-0.02em] text-[#1A1A1A] mb-4">
          Ödeme Başarısız
        </h1>

        <p className="text-[15px] text-[#9A9A8A] leading-[1.8] max-w-md mx-auto mb-10">
          Ödeme işlemi sırasında bir hata oluştu. Kart bilgilerinizi kontrol edip tekrar deneyebilir
          veya farklı bir ödeme yöntemi kullanabilirsiniz.
        </p>

        <div className="bg-[#F4F4F0] border border-[#E8E8E2] p-6 mb-10 text-left">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium mb-3">
            Olası Nedenler
          </p>
          <ul className="space-y-2">
            <li className="text-[13px] text-[#4A4A4A] tracking-wide flex items-start gap-2">
              <span className="text-[#9A9A8A] mt-0.5">•</span>
              Yetersiz bakiye
            </li>
            <li className="text-[13px] text-[#4A4A4A] tracking-wide flex items-start gap-2">
              <span className="text-[#9A9A8A] mt-0.5">•</span>
              Kart bilgileri hatalı girilmiş olabilir
            </li>
            <li className="text-[13px] text-[#4A4A4A] tracking-wide flex items-start gap-2">
              <span className="text-[#9A9A8A] mt-0.5">•</span>
              3D Secure doğrulaması tamamlanamamış olabilir
            </li>
            <li className="text-[13px] text-[#4A4A4A] tracking-wide flex items-start gap-2">
              <span className="text-[#9A9A8A] mt-0.5">•</span>
              Banka tarafından işlem reddedilmiş olabilir
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium"
          >
            <RefreshCw size={12} />
            Tekrar Dene
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-[#E8E8E2] text-[#1A1A1A] text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:border-[#1A1A1A] transition-colors duration-300 font-medium"
          >
            Alışverişe Dön
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
