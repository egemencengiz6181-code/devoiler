"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Upload, X, Plus, ArrowUp, ArrowDown, Trash2 } from "lucide-react";

// ─── Ortak stiller ─────────────────────────────────────────────────────────

const inputClass =
  "w-full border border-[#E8E8E2] bg-white px-3 py-2.5 text-[13px] text-[#1A1A1A] placeholder:text-[#C8C8C0] focus:outline-none focus:border-[#6B8F71] transition-colors";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] tracking-[0.12em] uppercase text-[#9A9A8A] font-medium mb-1.5">
      {children}
    </span>
  );
}

// ─── Metin ─────────────────────────────────────────────────────────────────

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  help?: string;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        className={inputClass}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {help && <p className="text-[11px] text-[#B8B8B0] mt-1">{help}</p>}
    </label>
  );
}

export function TextareaField({
  label,
  value,
  onChange,
  rows = 4,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  help?: string;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <textarea
        className={inputClass + " leading-relaxed resize-y"}
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {help && <p className="text-[11px] text-[#B8B8B0] mt-1">{help}</p>}
    </label>
  );
}

export function BooleanField({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  help?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 ${
            value ? "bg-[#6B8F71]" : "bg-[#D8D8D0]"
          }`}
          aria-pressed={value}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
              value ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
        <span className="text-[13px] text-[#1A1A1A]">{label}</span>
      </label>
      {help && <p className="text-[11px] text-[#B8B8B0] mt-1 ml-[52px]">{help}</p>}
    </div>
  );
}

// ─── Görsel ────────────────────────────────────────────────────────────────

export function ImageField({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Yükleme başarısız");
      onChange(body.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yükleme başarısız");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-3 items-start">
        <div className="relative w-20 h-20 shrink-0 bg-[#F4F4F0] border border-[#E8E8E2] overflow-hidden">
          {value ? (
            <Image
              src={value}
              alt=""
              fill
              className="object-contain"
              sizes="80px"
              unoptimized
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-[#C8C8C0]">
              Görsel yok
            </span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            className={inputClass}
            value={value ?? ""}
            placeholder="/assets/... veya https://..."
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 border border-[#E8E8E2] bg-white px-3 py-1.5 text-[11px] tracking-wide text-[#4A4A4A] hover:border-[#6B8F71] hover:text-[#6B8F71] transition-colors disabled:opacity-50"
            >
              <Upload size={12} />
              {uploading ? "Yükleniyor…" : "Görsel Yükle"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[11px] text-[#B8B8B0] hover:text-red-500 transition-colors"
              >
                <X size={12} />
                Kaldır
              </button>
            )}
          </div>
          {error && <p className="text-[11px] text-red-500">{error}</p>}
          {help && <p className="text-[11px] text-[#B8B8B0]">{help}</p>}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
    </div>
  );
}

/** Birden fazla görsel (ürün detay galerisi). */
export function ImageListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const items = value ?? [];
  const update = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-3">
        {items.map((img, i) => (
          <div key={i} className="flex gap-2 items-start border border-[#EFEFEA] p-3 bg-[#FCFCFA]">
            <div className="flex-1">
              <ImageField label={`Görsel ${i + 1}`} value={img} onChange={(v) => update(i, v)} />
            </div>
            <div className="flex flex-col gap-1 pt-6">
              <IconBtn onClick={() => move(i, -1)} title="Yukarı"><ArrowUp size={12} /></IconBtn>
              <IconBtn onClick={() => move(i, 1)} title="Aşağı"><ArrowDown size={12} /></IconBtn>
              <IconBtn
                onClick={() => onChange(items.filter((_, x) => x !== i))}
                title="Sil"
                danger
              >
                <Trash2 size={12} />
              </IconBtn>
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={() => onChange([...items, ""])} label="Görsel Ekle" />
    </div>
  );
}

// ─── Listeler ──────────────────────────────────────────────────────────────

export function StringListField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  const items = value ?? [];
  const update = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="text-[11px] text-[#C8C8C0] pt-3 w-5 shrink-0">{i + 1}</span>
            {multiline ? (
              <textarea
                className={inputClass + " resize-y"}
                rows={3}
                value={item}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
              />
            ) : (
              <input
                className={inputClass}
                value={item}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
              />
            )}
            <div className="flex gap-1 pt-1">
              <IconBtn onClick={() => move(i, -1)} title="Yukarı"><ArrowUp size={12} /></IconBtn>
              <IconBtn onClick={() => move(i, 1)} title="Aşağı"><ArrowDown size={12} /></IconBtn>
              <IconBtn onClick={() => onChange(items.filter((_, x) => x !== i))} title="Sil" danger>
                <Trash2 size={12} />
              </IconBtn>
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={() => onChange([...items, ""])} label="Ekle" />
    </div>
  );
}

export type ObjectFieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image";
};

export function ObjectListField({
  label,
  value,
  onChange,
  fields,
  template,
  titleKey,
}: {
  label: string;
  value: Record<string, string>[];
  onChange: (v: Record<string, string>[]) => void;
  fields: ObjectFieldDef[];
  template: Record<string, string>;
  titleKey?: string;
}) {
  const items = value ?? [];

  const update = (i: number, key: string, v: string) => {
    const next = items.map((it, x) => (x === i ? { ...it, [key]: v } : it));
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border border-[#EFEFEA] bg-[#FCFCFA] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-medium text-[#4A4A4A] truncate">
                {(titleKey && item[titleKey]) || item[fields[0]?.key] || `Öğe ${i + 1}`}
              </p>
              <div className="flex gap-1 shrink-0">
                <IconBtn onClick={() => move(i, -1)} title="Yukarı"><ArrowUp size={12} /></IconBtn>
                <IconBtn onClick={() => move(i, 1)} title="Aşağı"><ArrowDown size={12} /></IconBtn>
                <IconBtn onClick={() => onChange(items.filter((_, x) => x !== i))} title="Sil" danger>
                  <Trash2 size={12} />
                </IconBtn>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key} className={f.type === "textarea" ? "md:col-span-2" : ""}>
                  {f.type === "textarea" ? (
                    <TextareaField
                      label={f.label}
                      rows={3}
                      value={item[f.key] ?? ""}
                      onChange={(v) => update(i, f.key, v)}
                    />
                  ) : f.type === "image" ? (
                    <ImageField
                      label={f.label}
                      value={item[f.key] ?? ""}
                      onChange={(v) => update(i, f.key, v)}
                    />
                  ) : (
                    <TextField
                      label={f.label}
                      value={item[f.key] ?? ""}
                      onChange={(v) => update(i, f.key, v)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={() => onChange([...items, { ...template }])} label="Yeni Ekle" />
    </div>
  );
}

// ─── Küçük yardımcılar ─────────────────────────────────────────────────────

export function IconBtn({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 border border-[#E8E8E2] bg-white transition-colors ${
        danger
          ? "text-[#C8C8C0] hover:text-red-500 hover:border-red-300"
          : "text-[#9A9A8A] hover:text-[#1A1A1A] hover:border-[#C8C8C0]"
      }`}
    >
      {children}
    </button>
  );
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 inline-flex items-center gap-2 border border-dashed border-[#D8D8D0] px-4 py-2 text-[11px] tracking-[0.1em] uppercase text-[#9A9A8A] hover:border-[#6B8F71] hover:text-[#6B8F71] transition-colors"
    >
      <Plus size={12} />
      {label}
    </button>
  );
}
