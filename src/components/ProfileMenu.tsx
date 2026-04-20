"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Package, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function ProfileMenu() {
  const { user, openAuth, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) {
    return (
      <button
        onClick={() => openAuth("login")}
        className="p-2 text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200"
        aria-label="Giriş Yap"
      >
        <User size={19} strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-2 text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200"
        aria-label="Profil Menüsü"
      >
        <div className="w-7 h-7 rounded-full bg-[#6B8F71] flex items-center justify-center">
          <span className="text-[10px] font-medium text-white uppercase">
            {user.firstName[0]}{user.lastName[0]}
          </span>
        </div>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 text-[#9A9A8A] ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full right-0 pt-3 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-[#FAFAF8] border border-[#E8E8E2] shadow-[0_20px_60px_rgba(0,0,0,0.08)] w-56">
          {/* User info */}
          <div className="px-5 py-4 border-b border-[#E8E8E2]">
            <p className="text-[13px] font-medium text-[#1A1A1A] mb-0.5">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[11px] text-[#9A9A8A] tracking-wide truncate">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-[12px] tracking-wide text-[#1A1A1A] hover:text-[#6B8F71] hover:bg-[#F4F4F0] transition-all duration-200"
            >
              <User size={14} />
              Hesabım
            </Link>
            <Link
              href="/account/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-[12px] tracking-wide text-[#1A1A1A] hover:text-[#6B8F71] hover:bg-[#F4F4F0] transition-all duration-200"
            >
              <Package size={14} />
              Siparişlerim
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-[#E8E8E2] py-2">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-5 py-3 text-[12px] tracking-wide text-[#9A9A8A] hover:text-red-400 transition-colors duration-200 w-full"
            >
              <LogOut size={14} />
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
