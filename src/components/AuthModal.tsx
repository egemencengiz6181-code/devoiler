"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Eye, EyeOff, ArrowRight, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthModal() {
  const { isAuthOpen, authMode, closeAuth, setAuthMode, login, register, redirectAfterAuth } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Reset form on open/close
  useEffect(() => {
    if (!isAuthOpen) {
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setAddress("");
        setError("");
        setShowPassword(false);
      }, 300);
    }
  }, [isAuthOpen]);

  // Prevent body scroll
  useEffect(() => {
    if (isAuthOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let success = false;
      if (authMode === "login") {
        success = await login(email, password);
        if (!success) {
          setError("E-posta veya şifre hatalı.");
        }
      } else {
        if (!firstName || !lastName || !phone || !address) {
          setError("Lütfen tüm alanları doldurun.");
          setLoading(false);
          return;
        }
        success = await register({
          email,
          password,
          firstName,
          lastName,
          phone,
          address,
        });
        if (!success) {
          setError("Bu e-posta adresi zaten kayıtlı.");
        }
      }

      // Başarılı auth sonrası bekleyen yönlendirme varsa uygula
      if (success && redirectAfterAuth) {
        router.push(redirectAfterAuth);
      }
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-[#E8E8E2] px-4 py-3.5 text-[13px] text-[#1A1A1A] placeholder:text-[#C8C8C0] focus:outline-none focus:border-[#6B8F71] transition-colors duration-300 tracking-wide";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          isAuthOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeAuth}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center p-4 transition-all duration-500 ${
          isAuthOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-[#FAFAF8] w-full max-w-[480px] max-h-[90vh] overflow-y-auto shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isAuthOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-2">
            <div className="flex items-center gap-3">
              <UserIcon size={18} className="text-[#6B8F71]" />
              <h2 className="text-[11px] tracking-[0.25em] uppercase font-medium text-[#1A1A1A]">
                {authMode === "login" ? "Giriş Yap" : "Kayıt Ol"}
              </h2>
            </div>
            <button
              onClick={closeAuth}
              className="p-2 text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Subtitle */}
          <div className="px-8 pb-8">
            <p className="text-[13px] text-[#9A9A8A] tracking-wide">
              {authMode === "login"
                ? "Devoiler hesabınıza giriş yapın."
                : "Hesap oluşturun ve siparişlerinizi kolayca takip edin."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            {authMode === "register" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ad"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Soyad"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  required
                />
              </>
            )}

            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass + " pr-12"}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C8C8C0] hover:text-[#9A9A8A] transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {authMode === "register" && (
              <textarea
                placeholder="Teslimat Adresi"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass + " resize-none h-24"}
                required
              />
            )}

            {error && (
              <p className="text-[12px] text-red-500 tracking-wide animate-fade-in">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {authMode === "login" ? "Giriş Yap" : "Kayıt Ol"}
                  <ArrowRight size={12} />
                </>
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="px-8 pb-8 pt-2 border-t border-[#E8E8E2] mx-8">
            <p className="text-[13px] text-[#9A9A8A] text-center pt-6">
              {authMode === "login" ? (
                <>
                  Hesabınız yok mu?{" "}
                  <button
                    onClick={() => { setAuthMode("register"); setError(""); }}
                    className="text-[#6B8F71] hover:text-[#45644A] transition-colors duration-200 font-medium"
                  >
                    Kayıt Ol
                  </button>
                </>
              ) : (
                <>
                  Zaten hesabınız var mı?{" "}
                  <button
                    onClick={() => { setAuthMode("login"); setError(""); }}
                    className="text-[#6B8F71] hover:text-[#45644A] transition-colors duration-200 font-medium"
                  >
                    Giriş Yap
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
