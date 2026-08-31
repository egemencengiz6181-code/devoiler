"use client";

import { useEffect, useState } from "react";
import { Save, AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import { contentSchema, type FieldDef } from "@/lib/content-schema";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content";
import {
  TextField,
  TextareaField,
  BooleanField,
  ImageField,
  StringListField,
  ObjectListField,
} from "@/components/admin/fields";

type AnyRecord = Record<string, unknown>;

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [section, setSection] = useState(contentSchema[0].key);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/content", { cache: "no-store" });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "İçerik yüklenemedi");
        setContent(body.content);
        setWarning(body.warning ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "İçerik yüklenemedi");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setValue = (sectionKey: string, fieldKey: string, value: unknown) => {
    setSaved(false);
    setContent((prev) => {
      if (!fieldKey) {
        // Bölümün kendisi bir dizi (skinNeeds, activeIngredients, productCategories)
        return { ...prev, [sectionKey]: value } as SiteContent;
      }
      const current = (prev as unknown as AnyRecord)[sectionKey] as AnyRecord;
      return {
        ...prev,
        [sectionKey]: { ...current, [fieldKey]: value },
      } as SiteContent;
    });
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Kaydedilemedi");
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kaydedilemedi");
    } finally {
      setSaving(false);
    }
  };

  const resetAll = async () => {
    if (
      !window.confirm(
        "Tüm site yazıları fabrika ayarlarına dönecek. Ürünler etkilenmez. Emin misiniz?"
      )
    )
      return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", { method: "DELETE" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Sıfırlanamadı");
      setContent(defaultSiteContent);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sıfırlanamadı");
    } finally {
      setSaving(false);
    }
  };

  const active = contentSchema.find((s) => s.key === section)!;
  const sectionValue = (content as unknown as AnyRecord)[section];

  const renderField = (field: FieldDef) => {
    const raw = field.key
      ? ((sectionValue as AnyRecord)?.[field.key] as unknown)
      : sectionValue;
    const onChange = (v: unknown) => setValue(section, field.key, v);

    switch (field.type) {
      case "textarea":
        return (
          <TextareaField
            key={field.key}
            label={field.label}
            help={field.help}
            value={(raw as string) ?? ""}
            onChange={onChange}
          />
        );
      case "image":
        return (
          <ImageField
            key={field.key}
            label={field.label}
            help={field.help}
            value={(raw as string) ?? ""}
            onChange={onChange}
          />
        );
      case "boolean":
        return (
          <BooleanField
            key={field.key}
            label={field.label}
            help={field.help}
            value={Boolean(raw)}
            onChange={onChange}
          />
        );
      case "stringList":
        return (
          <StringListField
            key={field.key}
            label={field.label}
            value={(raw as string[]) ?? []}
            onChange={onChange}
            multiline
          />
        );
      case "list":
        return (
          <ObjectListField
            key={field.key || field.label}
            label={field.label}
            value={(raw as Record<string, string>[]) ?? []}
            onChange={onChange}
            template={field.itemTemplate ?? {}}
            fields={(field.fields ?? []).map((f) => ({
              key: f.key,
              label: f.label,
              type: f.type === "textarea" ? "textarea" : f.type === "image" ? "image" : "text",
            }))}
          />
        );
      default:
        return (
          <TextField
            key={field.key}
            label={field.label}
            help={field.help}
            value={(raw as string) ?? ""}
            onChange={onChange}
          />
        );
    }
  };

  if (loading) {
    return <div className="p-8 text-[13px] text-[#9A9A8A]">Yükleniyor…</div>;
  }

  return (
    <div className="p-8 pb-32 max-w-[1000px]">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <h1 className="text-[22px] font-light text-[#1A1A1A] mb-1">Site İçeriği</h1>
          <p className="text-[13px] text-[#9A9A8A]">
            Sayfalardaki başlıklar, metinler, görseller ve menü linkleri.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={resetAll}
            disabled={saving}
            className="inline-flex items-center gap-2 border border-[#E8E8E2] bg-white px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors disabled:opacity-50"
          >
            <RotateCcw size={12} />
            Sıfırla
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#2D3B3C] transition-colors disabled:opacity-50"
          >
            <Save size={13} />
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3">
          <AlertTriangle size={15} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-[12px] text-red-700 leading-relaxed">{error}</p>
        </div>
      )}
      {warning && (
        <div className="mb-6 flex items-start gap-3 border border-[#E4D9B8] bg-[#FBF7EC] px-4 py-3">
          <AlertTriangle size={15} className="text-[#B89B4A] mt-0.5 shrink-0" />
          <p className="text-[12px] text-[#7A6A3A] leading-relaxed">{warning}</p>
        </div>
      )}
      {saved && (
        <div className="mb-6 flex items-center gap-3 border border-[#CBE0CE] bg-[#F1F7F2] px-4 py-3">
          <CheckCircle2 size={15} className="text-[#6B8F71] shrink-0" />
          <p className="text-[12px] text-[#45644A]">Kaydedildi.</p>
        </div>
      )}

      <div className="flex gap-8">
        {/* Bölüm listesi */}
        <nav className="w-[190px] shrink-0 space-y-0.5">
          {contentSchema.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`block w-full text-left px-3 py-2.5 text-[12px] tracking-wide transition-colors ${
                section === s.key
                  ? "bg-[#1A1A1A] text-white font-medium"
                  : "text-[#4A4A4A] hover:bg-[#EDEDE7]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Alanlar */}
        <div className="flex-1 min-w-0">
          {active.description && (
            <p className="text-[12px] text-[#9A9A8A] mb-6 leading-relaxed">
              {active.description}
            </p>
          )}
          <div className="space-y-6">{active.fields.map(renderField)}</div>
        </div>
      </div>

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
