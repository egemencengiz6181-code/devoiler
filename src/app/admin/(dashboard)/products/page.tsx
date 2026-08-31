"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Pencil,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import type { Product } from "@/lib/data";

type Row = {
  slug: string;
  data: Product;
  sort_order: number;
  is_active: boolean;
};

export default function AdminProductsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [source, setSource] = useState<"db" | "static">("db");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products", { cache: "no-store" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Ürünler yüklenemedi");
      setRows(body.products ?? []);
      setSource(body.source ?? "db");
      setWarning(body.warning ?? "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ürünler yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const createProduct = async () => {
    const name = window.prompt("Yeni ürünün adı:");
    if (!name) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Ürün oluşturulamadı");
      window.location.href = `/admin/products/${body.slug}`;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ürün oluşturulamadı");
      setBusy(false);
    }
  };

  const seed = async () => {
    if (
      !window.confirm(
        "Koddaki mevcut ürünler veritabanına aktarılacak. Devam edilsin mi?"
      )
    )
      return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Aktarım başarısız");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Aktarım başarısız");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (slug: string, name: string) => {
    if (!window.confirm(`"${name}" ürünü kalıcı olarak silinecek. Emin misiniz?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Silinemedi");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Silinemedi");
    } finally {
      setBusy(false);
    }
  };

  const toggleActive = async (row: Row) => {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${row.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: row.data, is_active: !row.is_active }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Güncellenemedi");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Güncellenemedi");
    } finally {
      setBusy(false);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[index], next[j]] = [next[j], next[index]];
    setRows(next);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/products/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: next.map((r) => r.slug) }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Sıralama kaydedilemedi");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sıralama kaydedilemedi");
      await load();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="p-8 max-w-[1100px]">
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[22px] font-light text-[#1A1A1A] mb-1">Ürünler</h1>
          <p className="text-[13px] text-[#9A9A8A]">
            Ürün adı, fiyat, görseller, içindekiler, kullanım, SSS ve yorumlar — hepsi düzenlenebilir.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={load}
            disabled={busy}
            className="inline-flex items-center gap-2 border border-[#E8E8E2] bg-white px-3 py-2.5 text-[11px] tracking-wide text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} />
          </button>
          <button
            onClick={createProduct}
            disabled={busy}
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#2D3B3C] transition-colors disabled:opacity-50"
          >
            <Plus size={13} />
            Yeni Ürün
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

      {source === "static" && !warning && !loading && (
        <div className="mb-6 border border-[#E4D9B8] bg-[#FBF7EC] px-5 py-4">
          <p className="text-[13px] text-[#7A6A3A] leading-relaxed mb-3">
            Ürünler şu anda koddaki statik listeden gösteriliyor. Düzenleyebilmek için
            önce veritabanına aktarın — site görünümü aynı kalır.
          </p>
          <button
            onClick={seed}
            disabled={busy}
            className="inline-flex items-center gap-2 bg-[#6B8F71] text-white px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#45644A] transition-colors disabled:opacity-50"
          >
            Ürünleri Veritabanına Aktar
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-[13px] text-[#9A9A8A]">Yükleniyor…</p>
      ) : rows.length === 0 ? (
        <p className="text-[13px] text-[#9A9A8A]">Henüz ürün yok.</p>
      ) : (
        <div className="border border-[#E8E8E2] bg-white divide-y divide-[#EFEFEA]">
          {rows.map((row, i) => (
            <div key={row.slug} className="flex items-center gap-4 px-4 py-3">
              <div className="relative w-12 h-14 bg-[#F4F4F0] shrink-0 overflow-hidden">
                {row.data?.image ? (
                  <Image
                    src={row.data.image}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="48px"
                    unoptimized
                  />
                ) : null}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#1A1A1A] truncate">{row.data?.name}</p>
                <p className="text-[11px] text-[#9A9A8A] truncate">
                  {row.data?.category} · {row.data?.price} · /{row.slug}
                  {row.data?.soldOut ? " · Tükendi" : ""}
                </p>
              </div>

              <button
                onClick={() => toggleActive(row)}
                disabled={busy || source === "static"}
                title={row.is_active ? "Sitede görünüyor" : "Sitede gizli"}
                className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors disabled:opacity-50 shrink-0 ${
                  row.is_active
                    ? "border-[#6B8F71] text-[#45644A] bg-[#6B8F71]/10"
                    : "border-[#E8E8E2] text-[#B8B8B0]"
                }`}
              >
                {row.is_active ? "Yayında" : "Gizli"}
              </button>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => move(i, -1)}
                  disabled={busy || i === 0 || source === "static"}
                  className="p-2 text-[#9A9A8A] hover:text-[#1A1A1A] disabled:opacity-30 transition-colors"
                  title="Yukarı taşı"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={busy || i === rows.length - 1 || source === "static"}
                  className="p-2 text-[#9A9A8A] hover:text-[#1A1A1A] disabled:opacity-30 transition-colors"
                  title="Aşağı taşı"
                >
                  <ArrowDown size={13} />
                </button>
                <a
                  href={`/products/${row.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors"
                  title="Sitede gör"
                >
                  <ExternalLink size={13} />
                </a>
                <Link
                  href={`/admin/products/${row.slug}`}
                  className="inline-flex items-center gap-1.5 border border-[#E8E8E2] px-3 py-1.5 text-[11px] text-[#4A4A4A] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                >
                  <Pencil size={12} />
                  Düzenle
                </Link>
                <button
                  onClick={() => remove(row.slug, row.data?.name ?? row.slug)}
                  disabled={busy || source === "static"}
                  className="p-2 text-[#C8C8C0] hover:text-red-500 disabled:opacity-30 transition-colors"
                  title="Sil"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
