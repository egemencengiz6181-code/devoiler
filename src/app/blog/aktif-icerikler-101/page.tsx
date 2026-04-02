import Link from "next/link";

export const metadata = {
  title: "Aktif İçerikler 101: Niasinamid ve Vitamin C Uyumu — Blog",
  description:
    "Laboratuvarımızdan notlar: Hangi içerik hangi konsantrasyonda daha etkili? Bir kimyager gözüyle INCI okuma rehberi.",
};

export default function PostAktifIcerikler() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <section className="pt-48 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] hover:text-[#6B8F71] transition-colors duration-200 font-medium mb-12"
        >
          ← Blog&apos;a Dön
        </Link>

        <div className="grid lg:grid-cols-12 gap-y-10">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#6B8F71] font-medium">
                İçerik Rehberi
              </span>
              <span className="text-[#E8E8E2]">·</span>
              <span className="text-[11px] text-[#9A9A8A]">14 Mart 2026</span>
            </div>
            <h1 className="text-[40px] md:text-[58px] font-light tracking-[-0.03em] leading-[1.05] text-[#1A1A1A]">
              Aktif İçerikler 101:
              <br />
              <em className="not-italic text-[#6B8F71]">
                Niasinamid ve Vitamin C Uyumu
              </em>
            </h1>
          </div>
        </div>
      </section>

      {/* Cover */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20">
        <div className="w-full aspect-[16/6] bg-gradient-to-br from-[#E8E8E2] to-[#D5D5C8] flex items-center justify-center">
          <span className="text-[80px] select-none opacity-20">🧪</span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[1440px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 lg:col-start-3 space-y-8 text-[16px] leading-[1.95] text-[#2A2A2A] font-light">
            <p>
              Bir kozmetik ürünün ambalajının arkasındaki INCI (International
              Nomenclature of Cosmetic Ingredients) listesi, o ürünün gerçek
              kimliğidir. Pazarlama vaatlerinin ötesinde, bileşen listesini
              okuyabilmek size neyin cildinize gerçekten fayda sağladığını, neyin
              ise yalnızca doku veya koku için eklendiğini anlatır.
            </p>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              INCI Listesi Nasıl Okunur?
            </h2>
            <p>
              INCI listesinde bileşenler, formülde en yüksek konsantrasyondan en
              düşüğe doğru sıralanır. İlk beş bileşen, ürünün karakterini
              belirler. %1 altında kalan bileşenler ise herhangi bir sırada
              listelenebilir. Bu nedenle, bir &quot;Vitamin C serumu&quot;nun
              listesinde Ascorbic Acid ilk sıralarda değilse, ürün muhtemelen
              etkili konsantrasyonun altındadır.
            </p>

            <div className="bg-[#F4F4F0] border border-[#E8E8E2] p-8 my-4">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F71] font-medium mb-5">
                Devoiler INCI Okuma İpuçları
              </p>
              <ul className="space-y-3">
                {[
                  "İlk 5 bileşen → ürünün %80-90'ını oluşturur",
                  "\"Aqua\" (Su) neredeyse her zaman ilk sıradadır",
                  "Aktif bileşen ne kadar üstteyse konsantrasyonu o kadar yüksektir",
                  "\"Parfum/Fragrance\" hassas ciltlerde kaçınılması gereken bileşenlerdir",
                  "Latince isimler genellikle bitkisel ekstrelere aittir",
                ].map((tip) => (
                  <li key={tip} className="text-[13px] text-[#4A4A4A] flex gap-3">
                    <span className="text-[#6B8F71] shrink-0">—</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Niasinamid (Vitamin B3): Çok Yönlü Aktif
            </h2>
            <p>
              Niasinamid, dermatolojide en çok çalışılmış bileşenlerden biridir.
              %5 konsantrasyonda hiperpigmentasyonu (lekelenmeyi) azaltır, cilt
              bariyerini güçlendiren seramid üretimini artırır ve sebum
              regülasyonu yaparak gözeneklerin görünümünü minimize eder.
            </p>
            <p>
              Moleküler açıdan Niasinamid suda çözünür, stabil bir yapıya
              sahiptir ve geniş bir pH aralığında (pH 5–7) etkili kalır. Bu
              stabilite, onu formülasyonda çalışması en kolay aktiflerden biri
              yapar. Devoiler serumlarında Niasinamid, %5 konsantrasyonda ve
              Zinc PCA ile birlikte kullanılarak gözenek sıkılaştırma etkisi
              desteklenir.
            </p>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Vitamin C (L-Askorbik Asit): Güçlü Ama Hassas
            </h2>
            <p>
              L-Askorbik Asit, en potent C vitamini formudur. Güçlü bir
              antioksidan olarak serbest radikalleri nötralize eder, kolajen
              sentezini uyarır ve melanin üretimini düzenleyerek cilt tonunu
              eşitler. Ancak büyük bir dezavantajı vardır: son derece
              stabil değildir.
            </p>
            <p>
              Oksidasyona (hava teması), fotodegradasyona (ışık maruziyeti)
              ve hidrolize (su ortamında bozunma) karşı hassastır. Bu nedenle
              formülasyonda pH 3.5 civarında tutulmalı, airless ambalajda
              sunulmalı ve antioksidan stabilizatörler (Vitamin E, Ferulik Asit)
              ile desteklenmelidir. Devoiler&apos;in C vitamini formülü bu üç
              koşulu birlikte karşılar.
            </p>

            <div className="border-l-2 border-[#6B8F71] pl-8 py-2">
              <p className="text-[18px] font-light italic text-[#6B8F71] leading-[1.6]">
                &quot;Niasinamid ve Vitamin C birlikte kullanılamaz miti,
                güncel bilimsel verilere göre çürütülmüştür. Ancak formülasyondaki
                pH uyumu kritik öneme sahiptir.&quot;
              </p>
              <p className="text-[12px] text-[#9A9A8A] mt-3 tracking-wide">
                — Pelin Şölen, Yüksek Kimyager
              </p>
            </div>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Niasinamid + Vitamin C: Birlikte Kullanım
            </h2>
            <p>
              Eski bir kozmetik miti, Niasinamid ile L-Askorbik Asit&apos;in bir
              arada kullanıldığında birbirini etkisizleştirdiğini iddia eder.
              Bu mit, 1960&apos;larda çok yüksek sıcaklıklarda yapılan ve
              gerçek cilt bakım koşullarını yansıtmayan bir deneye dayanır.
            </p>
            <p>
              Modern çalışmalar, oda sıcaklığında ve normal kullanım koşullarında
              bu iki bileşenin birlikte güvenle ve etkin biçimde
              uygulanabileceğini göstermiştir. Devoiler olarak önerdiğimiz
              yöntem: sabah rutininde Vitamin C serumunu önce uygulayın, ardından
              Niasinamid içeren nemlendiriciye geçin. Akşam rutininde ise
              Niasinamid serumunu tek başına kullanabilirsiniz.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 py-4">
              {[
                {
                  title: "Sabah Protokolü",
                  items: [
                    "Temizleme (pH dengeli jel)",
                    "Vitamin C Serum (%15, pH 3.5)",
                    "Niasinamidli nemlendirici",
                    "SPF 50+ güneş koruyucu",
                  ],
                },
                {
                  title: "Akşam Protokolü",
                  items: [
                    "Çift aşamalı temizleme",
                    "Niasinamid Serum (%5)",
                    "Hyaluronik Asit nemlendirici",
                    "Onarıcı gece kremi (opsiyonel)",
                  ],
                },
              ].map((block) => (
                <div
                  key={block.title}
                  className="bg-[#F4F4F0] border border-[#E8E8E2] p-6"
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F71] font-medium mb-4">
                    {block.title}
                  </p>
                  <ol className="space-y-2">
                    {block.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-[13px] text-[#4A4A4A] flex gap-2"
                      >
                        <span className="text-[#6B8F71] shrink-0 font-medium">
                          {i + 1}.
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Hyaluronik Asit: Nemin Moleküler Taşıyıcısı
            </h2>
            <p>
              Hyaluronik Asit (HA), ciltte doğal olarak bulunan bir
              glikozaminoglikandır. Kendi ağırlığının 1000 katı suyu tutma
              kapasitesiyle bilinir. Ancak HA&apos;nın etkinliği, moleküler
              ağırlığına bağlıdır: yüksek molekül ağırlıklı HA cilt yüzeyinde
              nem filmi oluştururken, düşük molekül ağırlıklı HA derinin daha
              derin katmanlarına nüfuz edebilir.
            </p>
            <p>
              Devoiler formülasyonlarında çoklu moleküler ağırlıkta HA
              kullanıyoruz — hem yüzeysel hem de derin nemlendirme sağlamak
              için. Bu katmanlı yaklaşım, cildin hem anlık dolgunluk hem de
              uzun süreli hidrasyon ihtiyacını karşılar.
            </p>
          </div>
        </div>

        {/* Back & Next */}
        <div className="mt-20 pt-12 border-t border-[#E8E8E2] max-w-3xl mx-auto flex justify-between items-center">
          <Link
            href="/blog/molekuler-denge"
            className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
          >
            ← Önceki Yazı
          </Link>
          <Link
            href="/blog/ankara-cilt-bariyeri"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
          >
            Sonraki Yazı →
          </Link>
        </div>
      </article>
    </div>
  );
}
