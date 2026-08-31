"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/data";
import {
  TextField,
  TextareaField,
  BooleanField,
  ImageField,
  ImageListField,
  StringListField,
  ObjectListField,
  Label,
} from "@/components/admin/fields";
import { defaultSiteContent } from "@/lib/site-content";

type Ctx = { params: Promise<{ slug: string }> };

const TABS = [
  { key: "basic", label: "Temel Bilgiler" },
  { key: "images", label: "Görseller" },
  { key: "ingredients", label: "İçindekiler" },
  { key: "usage", label: "Kullanım" },
  { key: "faqs", label: "SSS" },
  { key: "reviews", label: "Yorumlar" },
] as const;

export default function AdminProductEditPage({ params }: Ctx) {
  const { slug } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("basic");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [categories, setCategories] = useState(
    defaultSiteContent.productCategories.filter((c) => c.slug !== "tumu")
  );
  const [needs, setNeeds] = useState(defaultSiteContent.skinNeeds);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/products/${slug}`, { cache: "no-store" });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "Ürün yüklenemedi");
        setProduct(body.product.data);
        setIsActive(body.product.is_active !== false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Ürün yüklenemedi");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // Kategori ve cilt ihtiyacı listelerini içerik ayarlarından al
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/content", { cache: "no-store" });
        if (!res.ok) return;
        const body = await res.json();
        if (body?.content?.productCategories?.length) {
          setCategories(
            body.content.productCategories.filter(
              (c: { slug: string }) => c.slug !== "tumu"
            )
          );
        }
        if (body?.content?.skinNeeds?.length) setNeeds(body.content.skinNeeds);
      } catch {
        // varsayılanlarla devam
      }
    })();
  }, []);

  const patch = <K extends keyof Product>(key: K, value: Product[K]) => {
    setProduct((p) => (p ? { ...p, [key]: value } : p));
    setSaved(false);
  };

  const save = async () => {
    if (!product) return;
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/products/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: product, is_active: isActive }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Kaydedilemedi");
      setSaved(true);
      if (body.slug && body.slug !== slug) {
        window.location.href = `/admin/products/${body.slug}`;
        return;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kaydedilemedi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-[13px] text-[#9A9A8A]">Yükleniyor…</div>;
  }

  if (!product) {
    return (
      <div className="p-8">
        <p className="text-[13px] text-red-600 mb-4">{error || "Ürün bulunamadı."}</p>
        <Link href="/admin/products" className="text-[12px] text-[#6B8F71] underline">
          Ürünlere dön
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[900px] pb-32">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors mb-6"
      >
        <ArrowLeft size={12} />
        Ürünler
      </Link>

      <div className="flex items-start justify-between gap-6 mb-6">
        <div className="min-w-0">
          <h1 className="text-[22px] font-light text-[#1A1A1A] truncate">{product.name}</h1>
          <a
            href={`/products/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#9A9A8A] hover:text-[#6B8F71] transition-colors mt-1"
          >
            /products/{slug}
            <ExternalLink size={11} />
          </a>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#2D3B3C] transition-colors disabled:opacity-50 shrink-0"
        >
          <Save size={13} />
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3">
          <AlertTriangle size={15} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-[12px] text-red-700 leading-relaxed">{error}</p>
        </div>
      )}
      {saved && (
        <div className="mb-6 flex items-center gap-3 border border-[#CBE0CE] bg-[#F1F7F2] px-4 py-3">
          <CheckCircle2 size={15} className="text-[#6B8F71] shrink-0" />
          <p className="text-[12px] text-[#45644A]">
            Kaydedildi. Değişiklikler sitede birkaç saniye içinde görünür.
          </p>
        </div>
      )}

      {/* Sekmeler */}
      <div className="flex flex-wrap gap-1 border-b border-[#E8E8E2] mb-8">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-[12px] tracking-wide transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? "border-[#6B8F71] text-[#1A1A1A] font-medium"
                : "border-transparent text-[#9A9A8A] hover:text-[#1A1A1A]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "basic" && (
        <div className="space-y-6">
          <div className="border border-[#E8E8E2] bg-white p-5 space-y-3">
            <BooleanField
              label="Sitede yayında"
              value={isActive}
              onChange={(v) => {
                setIsActive(v);
                setSaved(false);
              }}
              help="Kapatılırsa ürün sitede hiç görünmez."
            />
            <BooleanField
              label="Tükendi olarak işaretle"
              value={Boolean(product.soldOut)}
              onChange={(v) => patch("soldOut", v)}
              help="Ürün görünür kalır ancak sepete eklenemez."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <TextField label="Ürün Adı" value={product.name} onChange={(v) => patch("name", v)} />
            <TextField
              label="Slug (link adresi)"
              value={product.slug}
              onChange={(v) => patch("slug", v)}
              help="Değiştirirseniz eski link çalışmaz."
            />
          </div>

          <TextField
            label="Kısa Slogan"
            value={product.tagline}
            onChange={(v) => patch("tagline", v)}
          />

          <div className="grid md:grid-cols-3 gap-5">
            <label className="block">
              <Label>Kategori</Label>
              <select
                className="w-full border border-[#E8E8E2] bg-white px-3 py-2.5 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#6B8F71]"
                value={product.category}
                onChange={(e) => patch("category", e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.label}>
                    {c.label}
                  </option>
                ))}
                {!categories.some((c) => c.label === product.category) && (
                  <option value={product.category}>{product.category}</option>
                )}
              </select>
            </label>
            <TextField label="Fiyat" value={product.price} onChange={(v) => patch("price", v)} />
            <TextField
              label="Hacim / Miktar"
              value={product.activeConcentration}
              onChange={(v) => patch("activeConcentration", v)}
              help="Ürün sayfasında büyük punto ile görünür (ör. 30 ml)."
            />
          </div>

          <TextField
            label="Birincil Aktif Bileşenler"
            value={product.activeIngredient}
            onChange={(v) => patch("activeIngredient", v)}
          />

          <TextareaField
            label="Açıklama"
            rows={6}
            value={product.description}
            onChange={(v) => patch("description", v)}
          />

          <div>
            <Label>Cilt İhtiyaçları</Label>
            <div className="flex flex-wrap gap-2">
              {needs.map((n) => {
                const on = product.skinNeeds?.includes(n.slug);
                return (
                  <button
                    key={n.slug}
                    type="button"
                    onClick={() =>
                      patch(
                        "skinNeeds",
                        on
                          ? product.skinNeeds.filter((s) => s !== n.slug)
                          : [...(product.skinNeeds ?? []), n.slug]
                      )
                    }
                    className={`text-[11px] tracking-wide px-3 py-2 border transition-colors ${
                      on
                        ? "border-[#6B8F71] bg-[#6B8F71]/10 text-[#45644A]"
                        : "border-[#E8E8E2] text-[#9A9A8A] hover:border-[#C8C8C0]"
                    }`}
                  >
                    {n.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === "images" && (
        <div className="space-y-8">
          <ImageField
            label="Ana Görsel"
            value={product.image ?? ""}
            onChange={(v) => patch("image", v)}
            help="Ürün kartlarında ve galeride ilk sırada görünür."
          />
          <ImageListField
            label="Detay Görselleri"
            value={product.detailImages ?? []}
            onChange={(v) => patch("detailImages", v)}
          />
        </div>
      )}

      {tab === "ingredients" && (
        <ObjectListField
          label="İçindekiler"
          value={(product.ingredients ?? []) as unknown as Record<string, string>[]}
          onChange={(v) => patch("ingredients", v as unknown as Product["ingredients"])}
          titleKey="name"
          template={{ name: "", inci: "", concentration: "", benefit: "", icon: "" }}
          fields={[
            { key: "name", label: "Bileşen Adı", type: "text" },
            { key: "inci", label: "INCI Adı", type: "text" },
            { key: "concentration", label: "Konsantrasyon (opsiyonel)", type: "text" },
            { key: "icon", label: "Simge (tek harf)", type: "text" },
            { key: "benefit", label: "Faydası", type: "textarea" },
          ]}
        />
      )}

      {tab === "usage" && (
        <StringListField
          label="Nasıl Kullanılır (adımlar)"
          value={product.howToUse ?? []}
          onChange={(v) => patch("howToUse", v)}
          multiline
          placeholder="Adım metni…"
        />
      )}

      {tab === "faqs" && (
        <ObjectListField
          label="Sıkça Sorulan Sorular"
          value={(product.faqs ?? []) as unknown as Record<string, string>[]}
          onChange={(v) => patch("faqs", v as unknown as Product["faqs"])}
          titleKey="question"
          template={{ question: "", answer: "" }}
          fields={[
            { key: "question", label: "Soru", type: "text" },
            { key: "answer", label: "Cevap", type: "textarea" },
          ]}
        />
      )}

      {tab === "reviews" && (
        <ObjectListField
          label="Kullanıcı Yorumları"
          value={(product.reviews ?? []) as unknown as Record<string, string>[]}
          onChange={(v) => patch("reviews", v as unknown as Product["reviews"])}
          titleKey="author"
          template={{ text: "", author: "" }}
          fields={[
            { key: "author", label: "Yazar", type: "text" },
            { key: "text", label: "Yorum", type: "textarea" },
          ]}
        />
      )}

      {/* Sabit kaydet çubuğu */}
      <div className="fixed bottom-0 left-[220px] right-0 bg-white/95 backdrop-blur border-t border-[#E8E8E2] px-8 py-4 flex items-center justify-between">
        <p className="text-[12px] text-[#9A9A8A]">
          {saved ? "Tüm değişiklikler kaydedildi." : "Kaydedilmemiş değişiklikler olabilir."}
        </p>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#2D3B3C] transition-colors disabled:opacity-50"
        >
          <Save size={13} />
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </div>
    </div>
  );
}
