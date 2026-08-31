"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Users, Settings, LogOut, LayoutDashboard, Package, FileText } from "lucide-react";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { href: "/admin/products", label: "Ürünler", icon: Package },
  { href: "/admin/content", label: "Site İçeriği", icon: FileText },
  { href: "/admin/orders", label: "Siparişler", icon: ShoppingBag },
  { href: "/admin/customers", label: "Müşteriler", icon: Users },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex h-screen bg-[#F5F5F3]">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 bg-[#1A1A1A] flex flex-col">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <LayoutDashboard size={15} className="text-[#6B8F71]" />
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-white">
              Devoiler
            </span>
          </div>
          <p className="text-[10px] text-white/40 mt-1 tracking-wide">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 text-[12px] tracking-wide rounded transition-colors duration-150 ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-[12px] tracking-wide text-white/40 hover:text-white hover:bg-white/5 rounded transition-colors duration-150 w-full"
          >
            <LogOut size={14} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
