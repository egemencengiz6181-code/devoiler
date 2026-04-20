"use client";

import { useState, useEffect } from "react";
import AccountLayout from "@/components/AccountLayout";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Check } from "lucide-react";

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ firstName, lastName, email, phone });
    showToast("Profil bilgileriniz güncellendi.");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    "w-full bg-transparent border border-[#E8E8E2] px-4 py-3.5 text-[13px] text-[#1A1A1A] placeholder:text-[#C8C8C0] focus:outline-none focus:border-[#6B8F71] transition-colors duration-300 tracking-wide";

  return (
    <AccountLayout activeTab="settings">
      <div>
        <h2 className="text-[24px] font-light text-[#1A1A1A] mb-2">Hesap Ayarları</h2>
        <p className="text-[13px] text-[#9A9A8A] tracking-wide mb-8">
          Kişisel bilgilerinizi güncelleyin.
        </p>

        <form onSubmit={handleSave} className="max-w-lg space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium mb-2">
              Ad
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium mb-2">
              Soyad
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium mb-2">
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium mb-2">
              Telefon
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium mt-6 w-full"
          >
            {saved ? (
              <>
                <Check size={14} />
                Kaydedildi
              </>
            ) : (
              "Değişiklikleri Kaydet"
            )}
          </button>
        </form>
      </div>
    </AccountLayout>
  );
}
