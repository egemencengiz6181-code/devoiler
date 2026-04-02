"use client";

import { useState } from "react";

const faqs = [
  {
    category: "Siparişler",
    items: [
      {
        question: "Siparişimi nasıl takip edebilirim?",
        answer:
          "Siparişiniz kargoya verildikten sonra kayıtlı e-posta adresinize takip numarası iletilir. Kargo firmasının web sitesi veya uygulaması üzerinden anlık takip yapabilirsiniz. Ayrıca 'Destek' sayfamızdaki formu doldurarak bizden de bilgi alabilirsiniz.",
      },
      {
        question: "Siparişimi verdikten sonra vazgeçebilir miyim?",
        answer:
          "Sipariş 'Hazırlanıyor' aşamasına geçmeden önce iptal talebinizi info@devoiler.com.tr adresine iletebilirsiniz. Kargoya verildikten sonra iptal yapılamamakta; ancak ürünü teslim aldıktan sonra iade sürecini başlatabilirsiniz.",
      },
      {
        question: "Ne zaman teslimat alacağım?",
        answer:
          "Ankara içi siparişler iş günü içinde kargoya verilir ve 1–2 iş günü içinde teslim edilir. Ankara dışı siparişler için teslimat süresi 2–4 iş günüdür. Cumartesi günleri kargo alımı yapılmamaktadır.",
      },
    ],
  },
  {
    category: "Ödeme",
    items: [
      {
        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        answer:
          "Kredi kartı (Visa, Mastercard, AmEx), banka kartı, havale/EFT ve kapıda ödeme seçeneklerini destekliyoruz. Kapıda ödeme yalnızca nakit olarak kabul edilmekte olup 200 TL ek işlem bedeli uygulanmaktadır.",
      },
      {
        question: "Taksit imkânı var mı?",
        answer:
          "Anlaşmalı bankalarla 3, 6 ve 12 taksit seçeneği sunulmaktadır. Taksit seçenekleri ödeme sayfasında kartınıza göre otomatik olarak listelenir. Anlaşmalı banka listesine ödeme sayfamızdan ulaşabilirsiniz.",
      },
      {
        question: "Ödeme bilgilerim güvende mi?",
        answer:
          "Tüm ödeme işlemleri PCI-DSS uyumlu altyapı üzerinde 256-bit SSL şifrelemesiyle gerçekleştirilmektedir. Kart bilgileriniz hiçbir şekilde sistemlerimizde saklanmaz.",
      },
    ],
  },
  {
    category: "İade & Değişim",
    items: [
      {
        question: "İade sürecim nasıl işler?",
        answer:
          "Teslim tarihinden itibaren 14 gün içinde iade talebini başlatabilirsiniz. Ürün etiketi sökülmemiş, denenmemiş ve orijinal ambalajında olmalıdır. info@devoiler.com.tr adresine sipariş numaranızla birlikte iade talebinizi iletmeniz yeterlidir; size iade yönlendirmesi yapılır.",
      },
      {
        question: "İade kargo ücreti kimden tahsil edilir?",
        answer:
          "Ürün hatası veya yanlış gönderimden kaynaklanan iadelerde kargo ücreti tarafımızca karşılanır ve anlaşmalı kargo şirketimiz evinizden ürünü alır. Diğer durumlarda iade kargo ücreti müşteriye aittir.",
      },
      {
        question: "Değişim yapabilir miyim?",
        answer:
          "Beden veya renk değişimi için aynı 14 günlük süre geçerlidir. Talep ettiğiniz ürün stoğu mevcutsa değişim yapılır; stok yoksa iade işlemi başlatılarak ödemeniz iade edilir.",
      },
      {
        question: "Para iadesi ne zaman yapılır?",
        answer:
          "İade ürünü depomuzda incelendikten sonra 5 iş günü içinde ödeme iadesi başlatılır. Kredi kartı iadelerinin hesabınıza yansıması bankanızın işlem süresine göre 3–10 iş günü arasında değişebilir.",
      },
    ],
  },
];

export default function FAQPageClient() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) =>
    setOpenItem(openItem === key ? null : key);

  return (
    <>
      {faqs.map((section) => (
        <div key={section.category} className="mb-14">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#6B8F71] font-medium mb-6">
            {section.category}
          </p>
          <div className="border-t border-[#E8E8E2]">
            {section.items.map((item, i) => {
              const key = `${section.category}-${i}`;
              return (
                <div key={key} className="border-b border-[#E8E8E2]">
                  <button
                    onClick={() => toggle(key)}
                    className="w-full flex items-center justify-between text-left py-6 gap-6 group"
                    aria-expanded={openItem === key}
                  >
                    <span className="text-[15px] font-light text-[#1A1A1A] leading-snug group-hover:text-[#6B8F71] transition-colors duration-200">
                      {item.question}
                    </span>
                    <span className="shrink-0 text-[24px] font-extralight text-[#9A9A8A] group-hover:text-[#6B8F71] transition-colors duration-200 leading-none">
                      {openItem === key ? "−" : "+"}
                    </span>
                  </button>
                  {openItem === key && (
                    <div className="pb-7 pr-10">
                      <p className="text-[14px] leading-[1.9] text-[#4A4A4A]">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
