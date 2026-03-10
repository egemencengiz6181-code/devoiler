import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Hakkımızda — Devoiler",
  description: "Devoiler'in felsefesi, kuruluş hikayesi ve bilim odaklı yaklaşımı hakkında.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF8]">
      {/* ——————————————————————————————
          HERO
      —————————————————————————————— */}
      <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-y-12">
          <div className="lg:col-span-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-8">
              Hakkımızda
            </p>
            <h1 className="text-[52px] md:text-[72px] lg:text-[82px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A]">
              Daha az içerik,
              <br />
              <em className="not-italic text-[#6B8F71]">daha fazla etki.</em>
            </h1>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          MANIFESTO METNİ
      —————————————————————————————— */}
      <section className="pb-28 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 lg:col-start-2">
            <div className="h-px w-12 bg-[#6B8F71] mb-12" />
            <div className="space-y-6 text-[17px] leading-[1.9] text-[#2A2A2A] font-light">
              <p>
                Devoiler, kozmetik endüstrisindeki karmaşıklığa verilen sade bir yanıttır. 
                Mucizevi vaatler değil, bilimsel olarak kanıtlanmış içeriklerle cildi destekleyen 
                formülasyonlar sunuyoruz.
              </p>
              <p>
                Her formülasyonumuz, aktif bileşenin işlev görebileceği minimum etkin 
                konsantrasyonda hazırlanır. Ne fazlası ne eksiği. Gereksiz dolgu maddesi, 
                parfüm veya yapay renklendirici yoktur.
              </p>
              <p>
                Şeffaflık yalnızca bir tercih değil, temel ilkemizdir. Her ürünümüzün 
                tam içerik listesi, bileşen işlevleri ve klinik referansları açıkça paylaşılır.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-8">
            {/* Decorative panel */}
            <div className="bg-[#2D3B3C] p-12 h-full min-h-[340px] flex flex-col justify-between">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium">
                Kuruluş İlkesi
              </p>
              <blockquote className="text-[20px] font-light text-white leading-[1.5] my-8">
                "Cilt bakımı, gizem değil. Kimya, biyoloji ve sabır; mucize değil."
              </blockquote>
              <div className="h-px w-8 bg-[#6B8F71]" />
            </div>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          DEĞERLER
      —————————————————————————————— */}
      <section className="bg-[#F4F4F0] border-y border-[#E8E8E2] py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
              Temel İlkelerimiz
            </p>
            <h2 className="text-[36px] font-light tracking-[-0.01em] text-[#1A1A1A]">
              Her kararın arkasında bir neden var.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8E8E2]">
            {[
              {
                num: "01",
                title: "Kanıta Dayalı Seçim",
                text: "Formülasyonlarımızdaki her bileşen, klinik çalışmalarla güvenlik ve etkinliği değerlendirilmiş aktif maddelerdir. Trend değil, veri karar verir.",
              },
              {
                num: "02",
                title: "Tam Şeffaflık",
                text: "INCI adları, konsantrasyonlar ve her bileşenin işlevi kamuya açıktır. Sizi bilmeden öneremeyeceğimiz hiçbir şey formülasyonlarımızda bulunmaz.",
              },
              {
                num: "03",
                title: "Az Bileşen, Yüksek Etki",
                text: "Her formülasyon ≤15 bileşen içerir. Birbirleriyle olumsuz etkileşime girebilecek fazla malzemeleri dışarıda bırakmak bilinçli bir tercihimizdir.",
              },
              {
                num: "04",
                title: "Hayvan Deneyi Yok",
                text: "Tüm güvenlik ve etkinlik değerlendirmelerimiz in vitro ve klinik insan çalışmalarına dayanır. Cruelty-free formülasyon politikamız tartışmasızdır.",
              },
              {
                num: "05",
                title: "Sürdürülebilir Ambalaj",
                text: "Birincil ambalajlarımız yüksek oranda geri dönüştürülmüş malzemeden üretilir. Ambalajı en aza indirerek çevresel etkimizi sınırlandırıyoruz.",
              },
              {
                num: "06",
                title: "Uzun Vadeli Cilt Sağlığı",
                text: "Anlık parlaklık için cildi strese sokan uygulamalar değil; uzun vadeli bariyer sağlığını ve hücre yenilenmesini destekleyen protokoller tasarlıyoruz.",
              },
            ].map((value) => (
              <div key={value.num} className="bg-[#FAFAF8] p-10">
                <p className="text-[11px] tracking-[0.2em] text-[#C8C8C0] font-medium mb-6">{value.num}</p>
                <h3 className="text-[17px] font-light text-[#1A1A1A] mb-4 leading-snug">{value.title}</h3>
                <p className="text-[13px] leading-[1.9] text-[#4A4A4A]">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          SLOGANLAR
      —————————————————————————————— */}
      <section className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
            Formülasyon Sloganları
          </p>
          <h2 className="text-[32px] font-light tracking-[-0.01em] text-[#1A1A1A]">
            Markanın sesi
          </h2>
        </div>

        <div className="space-y-0 border-t border-[#E8E8E2]">
          {[
            {
              product: "02 Purity Serum · %10 Niasinamid",
              slogan: "Örtmez. Düzenler.",
              sub: "Gözenek görünümünü rafine eden, sebo üretimini dengeleyen formülasyon.",
            },
            {
              product: "08 Radiance Serum · %15 Vitamin C",
              slogan: "Işık değil, bilim.",
              sub: "Melanin sentez yolunu hedefleyen kanıta dayalı aydınlatma serumu.",
            },
            {
              product: "01 Renewal Serum · %0.5 Retinol",
              slogan: "Cilt kendi yolunu bilir. Biz sadece hızlandırırız.",
              sub: "Hücre döngüsünü destekleyen, zamanla görünen etkinlik.",
            },
          ].map((item, idx) => (
            <div key={idx} className="grid md:grid-cols-[1fr_2fr] gap-8 py-10 border-b border-[#E8E8E2]">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium pt-1">
                {item.product}
              </p>
              <div>
                <h3 className="text-[26px] md:text-[32px] font-light text-[#1A1A1A] mb-3 tracking-[-0.01em]">
                  {item.slogan}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#4A4A4A]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——————————————————————————————
          CTA
      —————————————————————————————— */}
      <section className="bg-[#1A1A1A] py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
            Protokolünüzü Oluşturun
          </p>
          <h2 className="text-[36px] md:text-[48px] font-light text-white tracking-[-0.02em] mb-8 leading-tight">
            İlke kadar basit bir rutin.
          </h2>
          <Link href="/solutions" className="inline-flex items-center gap-3 bg-[#6B8F71] text-white text-[10px] tracking-[0.25em] uppercase px-12 py-5 hover:bg-[#45644A] transition-colors duration-300 font-medium">
            Cilt İhtiyacınızı Seçin
            <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  );
}
