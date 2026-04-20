"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Package, MapPin, Heart, Settings, ChevronRight, LogOut } from "lucide-react";

const menuItems = [
  { key: "orders", label: "Siparişlerim", icon: Package, href: "/account/orders" },
  { key: "addresses", label: "Adreslerim", icon: MapPin, href: "/account/addresses" },
  { key: "wishlist", label: "Favorilerim", icon: Heart, href: "/account/wishlist" },
  { key: "settings", label: "Hesap Ayarları", icon: Settings, href: "/account/settings" },
];

export default function AccountLayout({ children, activeTab }: { children: React.ReactNode; activeTab: string }) {
  const { user, logout, openAuth } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    if (typeof window !== "undefined") {
      openAuth("login");
      router.push("/");
    }
    return null;
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-3">
            Hesabım
          </p>
          <h1 className="text-[32px] md:text-[40px] font-light tracking-[-0.02em] text-[#1A1A1A]">
            Merhaba, {user.firstName}
          </h1>
        </div>

        {/* Mobile tab selector */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-full flex items-center justify-between border border-[#E8E8E2] px-5 py-4 mb-6 text-[12px] tracking-wide text-[#1A1A1A]"
        >
          <span>{menuItems.find((m) => m.key === activeTab)?.label || "Menü"}</span>
          <ChevronRight size={14} className={`transition-transform duration-200 ${mobileMenuOpen ? "rotate-90" : ""}`} />
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className={`lg:col-span-3 ${mobileMenuOpen ? "block" : "hidden"} lg:block`}>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 text-[12px] tracking-wide transition-all duration-200 ${
                      isActive
                        ? "bg-[#F4F4F0] text-[#1A1A1A] font-medium border-l-2 border-[#6B8F71]"
                        : "text-[#9A9A8A] hover:text-[#1A1A1A] hover:bg-[#F4F4F0]/50"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="flex items-center gap-3 px-4 py-3.5 text-[12px] tracking-wide text-[#9A9A8A] hover:text-red-400 transition-colors duration-200 w-full mt-4 border-t border-[#E8E8E2] pt-5"
              >
                <LogOut size={16} />
                Çıkış Yap
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
