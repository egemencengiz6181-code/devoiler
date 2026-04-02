export const metadata = {
  title: "Gizlilik Politikası — Devoiler",
  description:
    "Devoiler'in kullanıcı verilerini nasıl topladığı, işlediği ve koruduğuna ilişkin gizlilik politikası.",
};

const sections = [
  {
    title: "1. Veri Sorumlusu",
    content: `Bu web sitesini kullanan ziyaretçilerin kişisel verileri, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca Devoiler Dermo-Cosmetics ("Şirket") tarafından işlenmektedir. Veri sorumlusu sıfatıyla iletişim adresimiz: info@devoiler.com.tr`,
  },
  {
    title: "2. Toplanan Veriler",
    content: `Web sitemizi ziyaret etmeniz ve hizmetlerimizden yararlanmanız kapsamında; ad-soyad, e-posta adresi, telefon numarası, teslimat adresi, IP adresi, tarayıcı ve cihaz bilgileri, site içi davranış verileri (sayfa görüntüleme, tıklama, oturum süresi) toplanmaktadır. Bu veriler yalnızca belirtilen amaçlar doğrultusunda ve gerektiği ölçüde işlenmektedir.`,
  },
  {
    title: "3. Verilerin İşlenme Amaçları",
    content: `Kişisel verileriniz; sipariş işlemlerinin yürütülmesi, müşteri destek hizmetlerinin sunulması, yasal yükümlülüklerin yerine getirilmesi, site güvenliğinin sağlanması, pazarlama iletişimi (açık rızanız alınmak kaydıyla) ve hizmet kalitesinin iyileştirilmesi amacıyla işlenmektedir.`,
  },
  {
    title: "4. Çerez (Cookie) Kullanımı",
    content: `Web sitemizde oturum yönetimi, güvenlik ve analitik amaçları için çerezler kullanılmaktadır. Zorunlu çerezler site işlevselliği için gerekli olup devre dışı bırakılamaz. Analitik ve pazarlama çerezleri için tarayıcı ayarlarınızdan tercihlerinizi yönetebilirsiniz. Çerezler hakkında ayrıntılı bilgiye Çerez Politikamızdan ulaşabilirsiniz.`,
  },
  {
    title: "5. Üçüncü Taraflarla Paylaşım",
    content: `Kişisel verileriniz; kargo şirketleri (teslimat amacıyla), ödeme altyapı sağlayıcıları (ödeme işlemleri amacıyla), yasal yükümlülük kapsamında yetkili kamu kurumları ile paylaşılabilir. Üçüncü taraflarla yapılan veri paylaşımları, KVKK ile AB GDPR ilkeleri doğrultusunda gerçekleştirilmekte; veri aktarımlarında gerekli güvenlik önlemleri alınmaktadır.`,
  },
  {
    title: "6. Veri Güvenliği",
    content: `Verilerinizin güvenliğini sağlamak amacıyla endüstri standardı teknik ve idari tedbirler uygulanmaktadır. Tüm veri iletimi SSL/TLS şifrelemesiyle korunmaktadır. Ödeme bilgileriniz sistemlerimizde saklanmaz; PCI-DSS uyumlu ödeme altyapısı üzerinden işlenir.`,
  },
  {
    title: "7. Veri Saklama Süresi",
    content: `Verileriniz, işlenme amacının gerektirdiği süre boyunca ve yasal saklama yükümlülükleri kapsamında muhafaza edilir. Müşteri hesap verileri hesap silme talebinden itibaren 30 gün içinde, sipariş ve finansal kayıtlar ise yasal yükümlülükler gereği 10 yıl süreyle saklanır.`,
  },
  {
    title: "8. İlgili Kişi Hakları",
    content: `KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygunluğunu öğrenme, yurt içi/yurt dışı üçüncü kişileri öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme, aktarılan üçüncü kişilere bildirilmesini isteme, otomatik sistemle aleyhinize sonuç çıkmasına itiraz etme ve zararınızın giderilmesini talep etme haklarına sahipsiniz. Bu haklarınızı kullanmak için info@devoiler.com.tr adresine e-posta gönderebilirsiniz.`,
  },
  {
    title: "9. Değişiklikler",
    content: `Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler e-posta veya site bildirimi yoluyla duyurulacaktır. Politikanın güncel versiyonu her zaman bu sayfada yayımlanır. Son güncelleme tarihi: 2 Nisan 2026.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
          Yasal
        </p>
        <h1 className="text-[48px] md:text-[64px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A]">
          Gizlilik
          <br />
          <em className="not-italic text-[#6B8F71]">Politikası</em>
        </h1>
        <p className="mt-6 text-[13px] text-[#9A9A8A] tracking-wide">
          Son güncelleme: 2 Nisan 2026
        </p>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="h-px bg-[#E8E8E2]" />
      </div>

      <section className="pt-16 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 lg:col-start-2 space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-[16px] font-normal text-[#1A1A1A] mb-4 tracking-wide">
                  {section.title}
                </h2>
                <p className="text-[14px] leading-[1.95] text-[#4A4A4A] font-light">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
