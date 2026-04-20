"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProfileMenu from "@/components/ProfileMenu";


const navProducts = [
  { label: "Akne Karşıtı Serum", href: "/products/akne-karsiti-serum" },
  { label: "Anti-Aging Tonic", href: "/products/anti-aging-tonic" },
  { label: "Güneş Kremi", href: "/products/gunes-kremi" },
  { label: "Leke Karşıtı Serum", href: "/products/leke-karsiti-serum" },
  { label: "Somon DNA Serum", href: "/products/somon-dna-serum" },
  { label: "Yüz Temizleme Jeli", href: "/products/yuz-temizleme-jeli" },
];

const ingredients = [
  { label: "Retinol & Retinoidler", href: "/ingredients/retinol" },
  { label: "Vitamin C (Askorbik Asit)", href: "/ingredients/vitamin-c" },
  { label: "Hyaluronik Asit", href: "/ingredients/hyaluronik-asit" },
  { label: "Niasinamid", href: "/ingredients/niasinamid" },
  { label: "AHA & BHA Asitler", href: "/ingredients/asitler" },
  { label: "Peptidler", href: "/ingredients/peptidler" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E8E8E2]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/logo.webp"
                alt="Devoiler Dermo-Cosmetics"
                className="h-[35px] md:h-[50px] w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">

              {/* Ürünlerimiz Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu("products")}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200 font-medium py-2">
                  Ürünlerimiz
                  <ChevronDown size={12} className={`transition-transform duration-200 ${openMenu === "products" ? "rotate-180" : ""}`} />
                </button>
                {openMenu === "products" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                    <div className="bg-[#FAFAF8] border border-[#E8E8E2] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 w-72">
                      <p className="text-[9px] tracking-[0.3em] uppercase text-[#9A9A8A] mb-5 font-medium">Formülasyonlar</p>
                      <div className="space-y-3">
                        {navProducts.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-[12px] tracking-wide text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* İçerikler Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu("ingredients")}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200 font-medium py-2">
                  Aktif İçerikler
                  <ChevronDown size={12} className={`transition-transform duration-200 ${openMenu === "ingredients" ? "rotate-180" : ""}`} />
                </button>
                {openMenu === "ingredients" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                    <div className="bg-[#FAFAF8] border border-[#E8E8E2] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 w-72">
                      <p className="text-[9px] tracking-[0.3em] uppercase text-[#9A9A8A] mb-5 font-medium">Aktif İçeriğe Göre</p>
                      <div className="space-y-3">
                        {ingredients.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-[12px] tracking-wide text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about" className="text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200 font-medium">
                Biz Kimiz?
              </Link>
              <Link href="/blog" className="text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200 font-medium">
                Blog
              </Link>
            </nav>

            {/* Cart & Profile Icons */}
            <div className="flex items-center gap-2">
              {/* Cart Icon */}
              <button
                onClick={openCart}
                className="relative p-2 text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200"
                aria-label="Sepet"
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#6B8F71] text-white text-[9px] font-medium rounded-full flex items-center justify-center animate-cart-badge">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Profile Icon */}
              <div className="hidden lg:block">
                <ProfileMenu />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#1A1A1A]"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAFAF8] pt-20 overflow-y-auto">
          <div className="px-6 py-8 space-y-8">
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#9A9A8A] mb-4 font-medium">Ürünlerimiz</p>
              <div className="space-y-3">
                {navProducts.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                    className="block text-[13px] tracking-wide text-[#1A1A1A] hover:text-[#6B8F71]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="h-px bg-[#E8E8E2]" />
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#9A9A8A] mb-4 font-medium">Aktif İçerikler</p>
              <div className="space-y-3">
                {ingredients.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                    className="block text-[13px] tracking-wide text-[#1A1A1A] hover:text-[#6B8F71]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="h-px bg-[#E8E8E2]" />
            <div className="space-y-3">
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-[13px] tracking-wide text-[#1A1A1A]">Biz Kimiz?</Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)} className="block text-[13px] tracking-wide text-[#1A1A1A]">Blog</Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
