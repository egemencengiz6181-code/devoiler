import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Biz Kimiz? — Devoiler",
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
              Biz Kimiz?
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
          FOUNDER SECTION
      —————————————————————————————— */}
      <section className="pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[3/4] bg-[#E8E8E2] overflow-hidden">
              <Image
                src="/founder/founder.png"
                alt="Pelin Şölen — Kurucu, Devoiler"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="h-px w-12 bg-[#6B8F71] mb-10" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
              Kurucu
            </p>
            <h2 className="font-serif text-[28px] md:text-[34px] font-light tracking-[-0.01em] text-[#1A1A1A] leading-snug mb-10">
              Pelin Şölen
              <span className="block text-[16px] md:text-[18px] text-[#9A9A8A] font-light mt-2 font-sans tracking-normal">
                MSc. Chemist (METU) / Yüksek Kimyager
              </span>
            </h2>

            <div className="space-y-7 text-[16px] leading-[2] text-[#2A2A2A] font-light">
              <p>
                Dévoiler&apos;nin hikayesi, laboratuvarın titiz disiplini ile cilt bakımına duyulan
                tutkunun bir araya gelmesiyle başladı. <strong className="font-medium text-[#6B8F71]">Orta
                Doğu Teknik Üniversitesi (ODTÜ)</strong> Kimya Bölümü&apos;nden mezun bir{" "}
                <strong className="font-medium text-[#6B8F71]">Yüksek Kimyager</strong> ve bir kadın
                girişimci olarak, kozmetik dünyasındaki karmaşayı saf bilimle sadeleştirme
                vizyonuyla yola çıktım. Akademik hayatım boyunca edindiğim analitik bakış
                açısını, her bir formülün merkezine yerleştirerek; sadece birer ürün değil,
                cildin ihtiyaçlarına yanıt veren güvenilir çözümler tasarladım.
              </p>
              <p>
                Benim için cilt bakımı, geçici trendlerin ötesinde bir moleküler denge
                meselesidir. Doğru aktif bileşenin, en stabil formda ve bilimsel olarak
                kanıtlanmış konsantrasyonlarda ciltle buluşması, markamızın değişmez
                standardıdır. Bir kadın girişimci markası olarak, kullanıcılarımızın
                beklentilerini en doğal ve şeffaf haliyle anlıyor; Ar-Ge süreçlerimizde
                yüksek performanslı içerikleri, güvenli üretim prensipleriyle birleştiriyoruz.
              </p>
              <p>
                Biz Dévoiler ailesi olarak, güzelliğin bir varsayım değil, doğru bir formül
                olduğuna inanıyoruz. Bilimin rehberliğinde, cildinizin sağlığını ve doğal
                ışıltısını korumak için her şişede uzmanlığımızı ve tutkumuzu sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          VİZYONUMUZ & DEĞERLERİMİZ
      —————————————————————————————— */}
      <section className="bg-[#2D3B3C] py-24 md:py-28 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
              Felsefemiz
            </p>
            <h2 className="font-serif text-[32px] md:text-[40px] font-light text-white tracking-[-0.01em] leading-snug">
              Vizyonumuz &amp; Değerlerimiz
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Ankara Merkezli Butik Üretim",
                text: "Tüm formülasyonlarımız Ankara'daki laboratuvarımızda, küçük partiler halinde titizlikle üretilir. Kitlesel üretime değil, kalite kontrol standartlarına öncelik veririz.",
              },
              {
                title: "Bilimsel Şeffaflık",
                text: "Her ürünümüzün tam içerik listesi, aktif madde konsantrasyonları ve destekleyici klinik referanslar kamuya açık şekilde paylaşılır.",
              },
              {
                title: "Kanıta Dayalı Formülasyon",
                text: "Trend değil, veri karar verir. Formülasyonlarımızdaki her bileşen, hakemli bilimsel çalışmalarla etkinliği ve güvenliği kanıtlanmış aktif maddelerdir.",
              },
              {
                title: "Kadın Girişimci Vizyonu",
                text: "Kullanıcılarımızın beklentilerini en doğal haliyle anlıyor, Ar-Ge süreçlerimizde yüksek performans ile güvenli üretim prensiplerini birleştiriyoruz.",
              },
              {
                title: "Etik & Sürdürülebilirlik",
                text: "Hayvan deneyi yapmıyoruz. Ambalajlarımızda geri dönüştürülmüş malzemeler kullanıyor, çevresel etkimizi bilinçli şekilde minimize ediyoruz.",
              },
              {
                title: "Uzun Vadeli Cilt Sağlığı",
                text: "Anlık parlaklık vaatleri değil; bariyer sağlığını destekleyen, hücre yenilenmesini teşvik eden uzun soluklu protokoller tasarlıyoruz.",
              },
            ].map((item, idx) => (
              <div key={idx} className="border border-[#3E4E4F] p-10">
                <h3 className="font-serif text-[18px] font-light text-white mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-[1.9] text-[#9A9A8A]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——————————————————————————————
          MANIFESTO METNİ
      —————————————————————————————— */}
      <section className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto">
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
            <div className="bg-[#2D3B3C] p-12 h-full min-h-[340px] flex flex-col justify-between">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium">
                Kuruluş İlkesi
              </p>
              <blockquote className="text-[20px] font-light text-white leading-[1.5] my-8">
                &ldquo;Cilt bakımı, gizem değil. Kimya, biyoloji ve sabır; mucize değil.&rdquo;
              </blockquote>
              <div className="h-px w-8 bg-[#6B8F71]" />
            </div>
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
