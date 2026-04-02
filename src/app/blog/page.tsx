import Link from "next/link";

export const metadata = {
  title: "Blog — Devoiler",
  description: "Bilim, formül ve saf güzellik. Cilt bakımına bir kimyagerin analitik bakış açısıyla yaklaşıyoruz.",
};

const posts = [
  {
    slug: "molekuler-denge",
    title: "Trendlerin Ötesinde: Cilt Bakımında Moleküler Denge",
    summary:
      "Geçici moda akımları yerine, cildin biyolojik yapısına uyumlu aktif bileşenlerin ve doğru pH dengesinin neden kritik olduğunu keşfedin.",
    date: "28 Mart 2026",
    category: "Bilimsel Analiz",
  },
  {
    slug: "aktif-icerikler-101",
    title: "Aktif İçerikler 101: Niasinamid ve Vitamin C Uyumu",
    summary:
      "Laboratuvarımızdan notlar: Hangi içerik hangi konsantrasyonda daha etkili? Bir kimyager gözüyle içerik listesi (INCI) okuma rehberi.",
    date: "14 Mart 2026",
    category: "İçerik Rehberi",
  },
  {
    slug: "ankara-cilt-bariyeri",
    title: "Ankara'nın Sert İkliminde Cilt Bariyerini Korumak",
    summary:
      "Şehir hayatının getirdiği oksidatif stres ve nemsizliğe karşı, cildi yormadan koruyan minimalist bir rutin oluşturmanın yolları.",
    date: "2 Mart 2026",
    category: "Cilt Rutini",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B8F71] font-medium mb-6">
          Blog
        </p>
        <h1 className="text-[52px] md:text-[72px] font-light tracking-[-0.03em] leading-[0.95] text-[#1A1A1A] max-w-2xl">
          Bilim,&nbsp;Formül
          <br />
          <em className="not-italic text-[#6B8F71]">ve Saf Güzellik.</em>
        </h1>
        <p className="text-[14px] leading-relaxed text-[#6A6A6A] mt-6 max-w-lg font-light">
          Cilt bakımına bir kimyagerin analitik bakış açısıyla yaklaşıyoruz.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="h-px bg-[#E8E8E2]" />
      </div>

      {/* Posts Grid */}
      <section className="pt-20 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              {/* Placeholder Image */}
              <div
                className={`w-full aspect-[4/3] mb-6 overflow-hidden ${
                  i === 0
                    ? "bg-gradient-to-br from-[#2D3B3C] to-[#3D5040]"
                    : i === 1
                    ? "bg-gradient-to-br from-[#E8E8E2] to-[#D5D5C8]"
                    : "bg-gradient-to-br from-[#F0EDE8] to-[#E2DED6]"
                }`}
              >
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 opacity-30 group-hover:opacity-40 transition-opacity duration-300">
                  <span className="text-[48px] select-none">
                    {i === 0 ? "⚗️" : i === 1 ? "🧪" : "🔬"}
                  </span>
                  <span className={`text-[11px] tracking-[0.3em] uppercase font-medium select-none ${i === 0 ? "text-white" : "text-[#1A1A1A]"}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#6B8F71] font-medium">
                  {post.category}
                </span>
                <span className="text-[#E8E8E2]">·</span>
                <span className="text-[11px] text-[#9A9A8A] tracking-wide">
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-[18px] font-light leading-snug text-[#1A1A1A] mb-3 group-hover:text-[#6B8F71] transition-colors duration-200 tracking-[-0.01em]">
                {post.title}
              </h2>

              {/* Summary */}
              <p className="text-[13px] leading-[1.8] text-[#6A6A6A]">
                {post.summary}
              </p>

              {/* Read more */}
              <div className="mt-5 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A] group-hover:text-[#6B8F71] transition-colors duration-200 font-medium">
                Devamını Oku
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
