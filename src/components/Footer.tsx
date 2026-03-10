import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* CTA Band */}
      <div className="border-b border-[#2A2A2A]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#6B8F71] mb-4 font-medium">
                Cilt Protokolünüz
              </p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
                Cildinize özel<br />
                <span className="italic text-[#9A9A8A]">formülasyon</span> bulun.
              </h2>
            </div>
            <div className="md:text-right">
              <p className="text-[14px] leading-relaxed text-[#9A9A8A] mb-8 max-w-sm md:ml-auto">
                Hangi aktif içeriğin sizin için doğru olduğunu bulmak 3 dakikanızı almaz.
              </p>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-3 bg-[#6B8F71] text-white text-[10px] tracking-[0.25em] uppercase px-10 py-4 hover:bg-[#45644A] transition-colors duration-300 font-medium"
              >
                Protokol Testini Başlat
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <p className="text-[20px] font-light tracking-[0.18em] uppercase text-white">Devoiler</p>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#6B8F71] mt-1 font-medium">Dermo-Cosmetics</p>
            </div>
            <p className="text-[13px] leading-relaxed text-[#6A6A6A] mb-8 max-w-[220px]">
              Bilimsel içeriklerle desteklenen, minimal ve şeffaf dermo-kozmetik formülasyonlar.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/devoiler" target="_blank" rel="noreferrer"
                className="p-2 border border-[#2A2A2A] text-[#6A6A6A] hover:text-white hover:border-[#6B8F71] transition-all duration-200">
                <Instagram size={14} />
              </a>
              <a href="mailto:info@devoiler.com.tr"
                className="p-2 border border-[#2A2A2A] text-[#6A6A6A] hover:text-white hover:border-[#6B8F71] transition-all duration-200">
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Çözümler */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#4A4A4A] mb-5 font-medium">Cilt Çözümleri</p>
            <div className="space-y-3">
              {[
                { label: "Leke & Ton Eşitsizliği", href: "/solutions/leke" },
                { label: "Akne & Siyah Nokta", href: "/solutions/akne" },
                { label: "Gözenek Sıkılaştırma", href: "/solutions/gozenek" },
                { label: "Nem & Bariyer Onarımı", href: "/solutions/nem" },
                { label: "Çizgi & Kırışıklık", href: "/solutions/cizgi" },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  className="block text-[12px] text-[#6A6A6A] hover:text-[#6B8F71] transition-colors duration-200 tracking-wide">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Aktif İçerikler */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#4A4A4A] mb-5 font-medium">Aktif İçerikler</p>
            <div className="space-y-3">
              {[
                { label: "Retinol", href: "/ingredients/retinol" },
                { label: "Vitamin C", href: "/ingredients/vitamin-c" },
                { label: "Hyaluronik Asit", href: "/ingredients/hyaluronik-asit" },
                { label: "Niasinamid", href: "/ingredients/niasinamid" },
                { label: "AHA & BHA", href: "/ingredients/asitler" },
                { label: "Peptidler", href: "/ingredients/peptidler" },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  className="block text-[12px] text-[#6A6A6A] hover:text-[#6B8F71] transition-colors duration-200 tracking-wide">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#4A4A4A] mb-5 font-medium">Bilgi</p>
            <div className="space-y-3">
              {[
                { label: "Hakkımızda", href: "/about" },
                { label: "Journal", href: "/journal" },
                { label: "Sıkça Sorulan Sorular", href: "/faq" },
                { label: "Kargo & İade", href: "/shipping" },
                { label: "Gizlilik Politikası", href: "/privacy" },
                { label: "KVKK", href: "/kvkk" },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  className="block text-[12px] text-[#6A6A6A] hover:text-[#6B8F71] transition-colors duration-200 tracking-wide">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#222222] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-[#4A4A4A] tracking-wide">
            © 2026 Devoiler Dermo-Cosmetics. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-1.5 text-[#4A4A4A]">
            <MapPin size={11} />
            <p className="text-[11px] tracking-wide">İstanbul, Türkiye</p>
          </div>
          <p className="text-[11px] text-[#4A4A4A] tracking-wide">
            Cilt tipinizi tanıyın. Doğru içeriği seçin.
          </p>
        </div>
      </div>
    </footer>
  );
}
