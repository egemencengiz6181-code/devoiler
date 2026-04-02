import Link from "next/link";

export const metadata = {
  title: "Trendlerin Ötesinde: Cilt Bakımında Moleküler Denge — Blog",
  description:
    "Geçici moda akımları yerine, cildin biyolojik yapısına uyumlu aktif bileşenlerin ve doğru pH dengesinin neden kritik olduğunu keşfedin.",
};

export default function PostMolekulerDenge() {
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
                Bilimsel Analiz
              </span>
              <span className="text-[#E8E8E2]">·</span>
              <span className="text-[11px] text-[#9A9A8A]">28 Mart 2026</span>
            </div>
            <h1 className="text-[40px] md:text-[58px] font-light tracking-[-0.03em] leading-[1.05] text-[#1A1A1A]">
              Trendlerin Ötesinde:
              <br />
              <em className="not-italic text-[#6B8F71]">Cilt Bakımında Moleküler Denge</em>
            </h1>
          </div>
        </div>
      </section>

      {/* Cover */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20">
        <div className="w-full aspect-[16/6] bg-gradient-to-br from-[#2D3B3C] to-[#3D5040] flex items-center justify-center">
          <span className="text-[80px] select-none opacity-20">⚗️</span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[1440px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 lg:col-start-3 space-y-8 text-[16px] leading-[1.95] text-[#2A2A2A] font-light">
            <p>
              Kozmetik dünyası her sezon yeni bir &quot;mucize bileşen&quot; vaat
              eder. Ancak cildin biyolojik yapısı trendlere göre değil, bilimsel
              kurallara göre çalışır. Bir formülün etkili olabilmesi için önce
              cildin doğal dengesini anlamak, ardından bu dengeyi destekleyecek
              moleküler stratejiler geliştirmek gerekir.
            </p>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              pH Dengesi: Cildin Görünmez Kalkanı
            </h2>
            <p>
              Sağlıklı cildin pH değeri ortalama 4.5–5.5 arasında, hafif asidik
              bir aralıktadır. Bu asidik ortam, cildin doğal bariyer
              fonksiyonunu koruyan &quot;asit mantosu&quot; olarak bilinir.
              Yüksek pH&apos;lı (alkalen) temizleyiciler bu mantoyu bozar;
              düşük pH&apos;lı agresif asitler ise cildi tahriş eder.
            </p>
            <p>
              Devoiler formülasyonlarında pH değerini 4.8–5.2 aralığında
              sabitliyoruz. Tampon çözeltiler kullanarak, ürünün raf ömrü
              boyunca pH stabilitesini garanti ediyoruz. Bu detay, ürünün
              &quot;çalışması&quot; ile &quot;tahriş etmesi&quot; arasındaki
              ince çizgiyi belirler.
            </p>

            <div className="border-l-2 border-[#6B8F71] pl-8 py-2">
              <p className="text-[18px] font-light italic text-[#6B8F71] leading-[1.6]">
                &quot;Bir aktif bileşenin potansiyeli, formüldeki pH değeriyle
                doğrudan ilişkilidir. Yanlış pH&apos;da en değerli bileşen bile
                etkisiz kalır.&quot;
              </p>
              <p className="text-[12px] text-[#9A9A8A] mt-3 tracking-wide">
                — Pelin Şölen, Yüksek Kimyager
              </p>
            </div>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Aktif Konsantrasyon: Ne Çok Az, Ne Çok Fazla
            </h2>
            <p>
              Her aktif bileşenin etki gösterdiği bir minimum eşik
              konsantrasyonu ve tahrişe neden olduğu bir üst sınırı vardır.
              Örneğin, Niasinamid %2 altında kayda değer bir etki göstermezken
              %5 konsantrasyonda leke karşıtı, gözenek sıkılaştırıcı ve bariyer
              onarıcı etkilerini optimal düzeyde gösterir. %10 üzerine
              çıkıldığında ise bazı cilt tiplerinde kızarıklık riski artar.
            </p>
            <p>
              Vitamin C (L-Askorbik Asit) için bu aralık %10–20&apos;dir.
              Ancak burada kritik olan yalnızca konsantrasyon değil,
              stabilizasyon yöntemidir. L-Askorbik Asit oksidasyona son derece
              duyarlıdır; ışık, hava ve sıcaklık ile hızla bozunur. Bu nedenle
              Devoiler, C vitamini formüllerini airless (havasız) ambalajlarda
              ve düşük pH ortamında sunar.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 py-4">
              {[
                {
                  molecule: "Niasinamid",
                  range: "%2 – %10",
                  optimal: "%5",
                  note: "Bariyer onarımı, leke karşıtı",
                },
                {
                  molecule: "Vitamin C",
                  range: "%5 – %20",
                  optimal: "%15",
                  note: "Antioksidan, aydınlatıcı",
                },
                {
                  molecule: "Hyaluronik Asit",
                  range: "%0.1 – %2",
                  optimal: "%1",
                  note: "Derin nemlendirme, dolgunluk",
                },
              ].map((item) => (
                <div
                  key={item.molecule}
                  className="bg-[#F4F4F0] border border-[#E8E8E2] p-6"
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F71] font-medium mb-2">
                    {item.molecule}
                  </p>
                  <p className="text-[24px] font-light text-[#1A1A1A] mb-1">
                    {item.optimal}
                  </p>
                  <p className="text-[11px] text-[#9A9A8A] mb-3">
                    Etkili aralık: {item.range}
                  </p>
                  <p className="text-[12px] text-[#6A6A6A]">{item.note}</p>
                </div>
              ))}
            </div>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Formülasyon Stabilitesi: Raf Ömrünün Ötesinde
            </h2>
            <p>
              Bir ürünün etkili olması, yalnızca doğru bileşenleri bir araya
              getirmekle bitmez. O bileşenlerin birbirleriyle uyumu, zamanla
              bozunma hızları ve ambalaj etkileşimleri de hesaba katılmalıdır.
              Stabilite testleri — hızlandırılmış yaşlandırma, ışık maruziyeti,
              sıcaklık döngüleri — Devoiler laboratuvarında her formülün piyasaya
              çıkmadan önce geçmesi gereken zorunlu aşamalardır.
            </p>
            <p>
              Cildinize uyguladığınız her damla, bir kimyagerin titizliğiyle
              dengelenmiş bir moleküler sistem taşır. Trendler değişir; ancak
              bilimsel doğrular sabittir. Cilt bakımınızı geçici akımlara değil,
              kanıtlanmış formüllere dayandırın.
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="mt-20 pt-12 border-t border-[#E8E8E2] max-w-3xl mx-auto flex justify-between items-center">
          <Link
            href="/blog"
            className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
          >
            ← Tüm Yazılar
          </Link>
          <Link
            href="/blog/aktif-icerikler-101"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
          >
            Sonraki Yazı →
          </Link>
        </div>
      </article>
    </div>
  );
}
