"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      let body: { ok?: boolean; error?: string } = {};
      try {
        body = await res.json();
      } catch {
        // JSON parse edilemezse görmezden gel
      }

      if (res.ok) {
        // Cookie tarayıcıya yazıldı — tam sayfa yüklemesiyle middleware cookie'yi okusun
        window.location.href = "/admin/orders";
        return;
      }

      if (res.status === 401) {
        setError("Şifre hatalı. Lütfen tekrar deneyin.");
      } else if (res.status === 500) {
        const detail = body.error ?? "Sunucu hatası";
        console.error("[Admin Login] API 500:", detail);
        setError(`Sunucu hatası: ${detail}`);
      } else {
        setError(body.error ?? "Giriş başarısız.");
      }
    } catch (err) {
      console.error("[Admin Login] Fetch error:", err);
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center p-6">
      <div className="w-full max-w-[380px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-[22px] font-light tracking-[0.2em] uppercase text-[#1A1A1A]">
            Devoiler
          </h1>
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#9A9A8A] mt-1">
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E8E8E2] p-8 space-y-5"
        >
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Admin Şifresi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E8E8E2] px-4 py-3.5 text-[13px] text-[#1A1A1A] placeholder:text-[#C8C8C0] focus:outline-none focus:border-[#6B8F71] transition-colors pr-12"
              required
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C8C8C0] hover:text-[#9A9A8A] transition-colors"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-[12px] text-red-500 tracking-wide">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase py-4 hover:bg-[#2D3B3C] transition-colors disabled:opacity-50 font-medium flex items-center justify-center"
          >
          {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="ml-2">Giriş Yapılıyor...</span>
              </>
            ) : (
              "Giriş Yap"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
