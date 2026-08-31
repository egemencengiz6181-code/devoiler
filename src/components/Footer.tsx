import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin } from "lucide-react";
import { getSiteContent } from "@/lib/cms";

export default async function Footer() {
  const content = await getSiteContent();
  const c = content.footer;
  const g = content.general;

  const columns = [
    { title: c.solutionsTitle, links: c.solutionsLinks },
    { title: c.ingredientsTitle, links: c.ingredientsLinks },
    { title: c.infoTitle, links: c.infoLinks },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <Image
                src={g.logo}
                alt="Devoiler"
                width={120}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert"
                unoptimized
              />
            </div>
            <p className="text-[13px] leading-relaxed text-[#6A6A6A] mb-8 max-w-[220px]">
              {c.brandText}
            </p>
            <div className="flex items-center gap-4">
              {g.instagram && (
                <a href={g.instagram} target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 border border-[#2A2A2A] text-[#6A6A6A] hover:text-white hover:border-[#6B8F71] transition-all duration-200">
                  <Instagram size={14} />
                </a>
              )}
              {g.email && (
                <a href={`mailto:${g.email}`}
                  aria-label="E-posta"
                  className="p-2 border border-[#2A2A2A] text-[#6A6A6A] hover:text-white hover:border-[#6B8F71] transition-all duration-200">
                  <Mail size={14} />
                </a>
              )}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#4A4A4A] mb-5 font-medium">
                {col.title}
              </p>
              <div className="space-y-3">
                {col.links.map((item) => (
                  <Link key={item.href + item.label} href={item.href}
                    className="block text-[12px] text-[#6A6A6A] hover:text-[#6B8F71] transition-colors duration-200 tracking-wide">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#222222] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-[#4A4A4A] tracking-wide">
            {c.copyright}
          </p>
          <div className="flex items-center gap-1.5 text-[#4A4A4A]">
            <MapPin size={11} />
            <p className="text-[11px] tracking-wide">{c.location}</p>
          </div>
          <p className="text-[11px] text-[#4A4A4A] tracking-wide">
            {c.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
