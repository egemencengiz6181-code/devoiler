import FAQClient from "./FAQClient";

export const metadata = {
  title: "Sıkça Sorulan Sorular — Devoiler",
  description:
    "Sipariş takibi, ödeme yöntemleri, iade ve değişim süreçleri hakkında sık sorulan sorular.",
};

export default function FAQPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
          Yardım
        </p>
        <h1 className="text-[48px] md:text-[64px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A]">
          Sıkça Sorulan
          <br />
          <em className="not-italic text-[#6B8F71]">Sorular</em>
        </h1>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="h-px bg-[#E8E8E2]" />
      </div>

      {/* Accordion */}
      <section className="pt-16 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="max-w-3xl">
          <FAQClient />
        </div>
      </section>

      {/* Contact CTA */}
      <div className="border-t border-[#E8E8E2] bg-[#F4F4F0]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[13px] font-light text-[#4A4A4A] mb-1">
              Aradığınızı bulamadınız mı?
            </p>
            <p className="text-[22px] font-light text-[#1A1A1A]">
              Size yardımcı olmaktan memnuniyet duyarız.
            </p>
          </div>
          <a
            href="mailto:info@devoiler.com.tr"
            className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-10 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium whitespace-nowrap"
          >
            Bize Yazın
          </a>
        </div>
      </div>
    </div>
  );
}
