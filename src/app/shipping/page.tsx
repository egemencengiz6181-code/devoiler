export const metadata = {
  title: "Kargo ve İade — Devoiler",
  description:
    "Teslimat süreleri, iade koşulları ve iade adresi hakkında bilgiler.",
};

export default function ShippingPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
          Teslimat
        </p>
        <h1 className="text-[48px] md:text-[64px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A]">
          Kargo ve
          <br />
          <em className="not-italic text-[#6B8F71]">İade</em>
        </h1>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="h-px bg-[#E8E8E2]" />
      </div>

      <section className="pt-16 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 lg:col-start-2 space-y-16">

            {/* Teslimat Süreleri */}
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#6B8F71] font-medium mb-8">
                Teslimat Süreleri
              </p>
              <div className="space-y-0 border-t border-[#E8E8E2]">
                {[
                  {
                    label: "Ankara İçi",
                    detail: "Aynı gün kargoya verilir, 1–2 iş günü içinde teslim edilir.",
                  },
                  {
                    label: "Ankara Dışı (Türkiye Geneli)",
                    detail: "Sipariş günü veya ertesi iş günü kargoya verilir, 2–4 iş günü içinde teslim edilir.",
                  },
                  {
                    label: "Kargo Ücretsizlik Koşulu",
                    detail: "500 TL ve üzeri siparişlerde kargo ücretsizdir. Altındaki siparişler için sabit 39 TL kargo bedeli uygulanır.",
                  },
                  {
                    label: "Kargo Günleri",
                    detail: "Hafta içi (Pazartesi–Cuma) saat 14:00&apos;e kadar verilen siparişler aynı gün kargoya verilir. Cumartesi ve resmi tatil günlerinde kargo çıkışı yapılmaz.",
                  },
                  {
                    label: "Kargo Firması",
                    detail: "Aras Kargo ve Yurtiçi Kargo ile çalışmaktayız. Tercihli firma belirtemezsiniz; bölgenize en hızlı ulaşacak firma otomatik seçilir.",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid sm:grid-cols-5 gap-4 border-b border-[#E8E8E2] py-5"
                  >
                    <p className="sm:col-span-2 text-[13px] font-normal text-[#1A1A1A] tracking-wide">
                      {row.label}
                    </p>
                    <p
                      className="sm:col-span-3 text-[13px] text-[#4A4A4A] leading-[1.8] font-light"
                      dangerouslySetInnerHTML={{ __html: row.detail }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* İade Koşulları */}
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#6B8F71] font-medium mb-8">
                İade Koşulları
              </p>
              <div className="space-y-5">
                {[
                  "Teslim tarihinden itibaren <strong>14 gün</strong> içinde iade talebini başlatabilirsiniz.",
                  "İade edilecek ürün; etiketi sökülmemiş, denenmemiş, kullanılmamış ve orijinal ambalajında olmalıdır.",
                  "Özel olarak kişiselleştirilmiş veya sipariş üzerine üretilen ürünler iade kapsamı dışındadır.",
                  "İç giyim ürünleri hijyen nedeniyle iade edilemez.",
                  "İade talebi için <strong>info@devoiler.com.tr</strong> adresine sipariş numaranızla birlikte e-posta gönderin. 1 iş günü içinde yanıt alırsınız.",
                  "Ürün hatası veya yanlış gönderim durumunda kargo ücreti tarafımızca karşılanır.",
                  "Onaylanan iadelerde para iadesi, ürün depomuza ulaştığı tarihten itibaren <strong>5 iş günü</strong> içinde başlatılır.",
                ].map((text, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="shrink-0 mt-1 w-5 h-5 border border-[#6B8F71] text-[#6B8F71] text-[10px] flex items-center justify-center font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="text-[14px] text-[#4A4A4A] leading-[1.9] font-light"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* İade Adresi */}
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#6B8F71] font-medium mb-8">
                İade Adresi
              </p>
              <div className="bg-[#F4F4F0] border border-[#E8E8E2] p-8 inline-block">
                <p className="text-[13px] font-normal text-[#1A1A1A] mb-1">Devoiler Dermo-Cosmetics</p>
                <p className="text-[13px] text-[#4A4A4A] font-light leading-[1.8]">
                  Kızılay Mah. Atatürk Bulvarı No:42
                  <br />
                  Çankaya / Ankara, 06420
                  <br />
                  Türkiye
                </p>
                <p className="text-[11px] text-[#9A9A8A] mt-4 tracking-wide">
                  İade gönderimleri için e-posta ile ön bildirim zorunludur.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
