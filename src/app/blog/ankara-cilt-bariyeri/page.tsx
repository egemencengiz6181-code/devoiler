import Link from "next/link";

export const metadata = {
  title: "Ankara'nın Sert İkliminde Cilt Bariyerini Korumak — Blog",
  description:
    "Şehir hayatının getirdiği oksidatif stres ve nemsizliğe karşı, cildi yormadan koruyan minimalist bir rutin oluşturmanın yolları.",
};

export default function PostAnkaraCiltBariyeri() {
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
                Cilt Rutini
              </span>
              <span className="text-[#E8E8E2]">·</span>
              <span className="text-[11px] text-[#9A9A8A]">2 Mart 2026</span>
            </div>
            <h1 className="text-[40px] md:text-[58px] font-light tracking-[-0.03em] leading-[1.05] text-[#1A1A1A]">
              Ankara&apos;nın Sert İkliminde
              <br />
              <em className="not-italic text-[#6B8F71]">
                Cilt Bariyerini Korumak
              </em>
            </h1>
          </div>
        </div>
      </section>

      {/* Cover */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20">
        <div className="w-full aspect-[16/6] bg-gradient-to-br from-[#F0EDE8] to-[#E2DED6] flex items-center justify-center">
          <span className="text-[80px] select-none opacity-20">🔬</span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[1440px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 lg:col-start-3 space-y-8 text-[16px] leading-[1.95] text-[#2A2A2A] font-light">
            <p>
              Ankara, İç Anadolu&apos;nun karasal ikliminin tüm sertliğini
              taşır: kuru soğuk kışlar, sıcak ve kurak yazlar, ve mevsimler
              arası ani sıcaklık farkları. Bu iklimsel koşullar, şehirde
              yaşayan herkesin cildinde belirgin izler bırakır. Nemsizlik,
              hassasiyet ve bariyer bozulması — bunlar Ankara cildinin üç
              temel sorunu olarak öne çıkar.
            </p>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Karasal İklim ve Cilt Bariyeri
            </h2>
            <p>
              Cilt bariyeri (stratum corneum), cildin en dış katmanıdır ve
              ölü hücreler ile lipid matriksten oluşan bir &quot;tuğla–harç&quot;
              yapısına sahiptir. Bu bariyer, nem kaybını önler ve dış
              irritanların cilde girişini engeller. Ankara&apos;nın düşük nem
              oranı (%30-40 kış aylarında) bu bariyer lipitlerini kurutur;
              rüzgar ise mekanik aşınmaya neden olur.
            </p>
            <p>
              Sonuç: transdermal su kaybı (TEWL) artar, cilt gergin ve hassas
              hisseder, çizgiler daha belirgin hale gelir. Kapalı mekanlardaki
              merkezi ısıtma sistemi bu etkiyi daha da derinleştirir.
            </p>

            <div className="border-l-2 border-[#6B8F71] pl-8 py-2">
              <p className="text-[18px] font-light italic text-[#6B8F71] leading-[1.6]">
                &quot;Cilt bakımının ilk kuralı zarar vermemektir. Ankara
                ikliminde agresif peelingler ve alkollü tonikler yerine bariyer
                destekleyici rutinler tercih edilmelidir.&quot;
              </p>
              <p className="text-[12px] text-[#9A9A8A] mt-3 tracking-wide">
                — Pelin Şölen, Yüksek Kimyager
              </p>
            </div>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Oksidatif Stres: Şehrin Görünmez Düşmanı
            </h2>
            <p>
              Trafik yoğunluğu, egzoz gazları ve ince partiküler madde (PM2.5)
              ciltte serbest radikal oluşumunu artırır. Bu serbest radikaller
              kolajen ve elastin liflerini zayıflatır, erken yaşlanma
              bulgularını hızlandırır. Ankara&apos;nın kış aylarındaki hava
              kalitesinin düşmesi bu etkiyi daha da artırır.
            </p>
            <p>
              Koruma stratejisi iki katmanlıdır: birincisi, fiziksel bariyer
              olarak güneş koruyucu ve antioksidan serum kullanımı; ikincisi,
              gün sonunda etkili ve nazik bir temizleme ile partiküllerin
              ciltten uzaklaştırılması.
            </p>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Minimalist 3 Adımlı Rutin
            </h2>
            <p>
              Devoiler felsefesinin merkezinde &quot;az ama öz&quot; prensibi
              yer alır. Cildi düzinelerce ürünle yormak yerine, doğru üç
              adımla maksimum sonuç almak mümkündür:
            </p>

            <div className="space-y-8 py-4">
              {[
                {
                  step: "01",
                  title: "Nazik Temizleme",
                  description:
                    "pH dengeli (5.0–5.5), sülfat içermeyen bir jel temizleyici ile cildi tahriş etmeden temizleyin. Ankara suyunun sertliği göz önüne alındığında, termal su veya misel su ile son durulama yapmanız önerilir.",
                  ingredient: "Anahtar bileşen: Glucoside-bazlı surfaktanlar",
                },
                {
                  step: "02",
                  title: "Aktif Tedavi + Nemlendirme",
                  description:
                    "Cilt ihtiyacınıza göre seçilmiş bir serum (Niasinamid, Vitamin C veya Hyaluronik Asit) uygulayın. Ardından seramid ve skualen içeren bir nemlendirici ile bariyer desteği sağlayın.",
                  ingredient: "Anahtar bileşen: Seramid NP, Hyaluronik Asit",
                },
                {
                  step: "03",
                  title: "Güneş Koruması (Sabah)",
                  description:
                    "SPF 50+ geniş spektrumlu bir güneş koruyucu, kış dahil her gün kullanılmalıdır. Ankara'nın rakımı (850m+) nedeniyle UV radyasyonu deniz seviyesine göre daha yoğundur.",
                  ingredient: "Anahtar bileşen: Mineral filtreler (ZnO, TiO2)",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="shrink-0">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6B8F71] text-white text-[14px] font-light">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-light text-[#1A1A1A] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[14px] leading-[1.8] text-[#4A4A4A] mb-2">
                      {item.description}
                    </p>
                    <p className="text-[12px] text-[#6B8F71] tracking-wide font-medium">
                      {item.ingredient}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-[22px] font-light tracking-[-0.01em] text-[#1A1A1A] pt-4">
              Mevsimsel Geçiş Stratejisi
            </h2>
            <p>
              Ankara&apos;da mevsim geçişleri ani olur. Mart sonunda bir günde
              10°C fark yaşanabilir. Bu dönemlerde cildinize fazladan katman
              eklemeye değil, mevcut rutininizin yoğunluğunu artırmaya
              odaklanın. Örneğin, kış boyunca kullandığınız Hyaluronik Asit
              serumunun üzerine yaz aylarında hafif bir jel nemlendirici
              yeterliyken, kışın daha yoğun bir oklüzif nemlendirici
              (skualen veya shea bazlı) tercih edin.
            </p>
            <p>
              Cildinizi dinleyin, trendleri değil. Her mevsim aynı ürün
              dolapla geçmek yerine, cildin gönderdiği sinyallere — gerginlik,
              yağlanma, hassasiyet — göre dozu ayarlamak, minimalist bakımın
              temelidir.
            </p>
          </div>
        </div>

        {/* Back & Prev */}
        <div className="mt-20 pt-12 border-t border-[#E8E8E2] max-w-3xl mx-auto flex justify-between items-center">
          <Link
            href="/blog/aktif-icerikler-101"
            className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
          >
            ← Önceki Yazı
          </Link>
          <Link
            href="/blog"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-[#6B8F71] transition-colors duration-200 font-medium"
          >
            Tüm Yazılar →
          </Link>
        </div>
      </article>
    </div>
  );
}
