"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, XCircle, RefreshCw, Database } from "lucide-react";

type Check = { name: string; ok: boolean; detail: string };

export default function AdminSettingsPage() {
  const [checks, setChecks] = useState<Check[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/status", { cache: "no-store" });
      const body = await res.json();
      setChecks(body.checks ?? []);
    } catch {
      setChecks([{ name: "Bağlantı", ok: false, detail: "Durum bilgisi alınamadı." }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const seed = async (force: boolean) => {
    if (
      !window.confirm(
        force
          ? "TÜM ürünler koddaki orijinal hallerine geri döndürülecek. Panelden yaptığınız ürün düzenlemeleri kaybolur. Emin misiniz?"
          : "Koddaki ürünlerden veritabanında olmayanlar eklenecek. Devam edilsin mi?"
      )
    )
      return;
    setSeeding(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/seed${force ? "?force=1" : ""}`, {
        method: "POST",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Aktarım başarısız");
      setMessage(
        body.inserted ? `${body.inserted} ürün aktarıldı.` : body.message ?? "Tamamlandı."
      );
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Aktarım başarısız");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="p-8 max-w-[760px]">
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[22px] font-light text-[#1A1A1A] mb-1">Ayarlar & Durum</h1>
          <p className="text-[13px] text-[#9A9A8A]">
            Veritabanı ve görsel deposu bağlantı kontrolü.
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 border border-[#E8E8E2] bg-white px-4 py-2.5 text-[11px] tracking-wide text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors disabled:opacity-50 shrink-0"
        >
          <RefreshCw size={13} />
          Yenile
        </button>
      </div>

      <div className="border border-[#E8E8E2] bg-white divide-y divide-[#EFEFEA] mb-8">
        {loading ? (
          <p className="px-5 py-4 text-[13px] text-[#9A9A8A]">Kontrol ediliyor…</p>
        ) : (
          checks.map((c) => (
            <div key={c.name} className="flex items-start gap-3 px-5 py-4">
              {c.ok ? (
                <CheckCircle2 size={16} className="text-[#6B8F71] mt-0.5 shrink-0" />
              ) : (
                <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-[13px] text-[#1A1A1A]">{c.name}</p>
                <p className="text-[12px] text-[#9A9A8A] break-words leading-relaxed">
                  {c.detail}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border border-[#E8E8E2] bg-white p-6">
        <div className="flex items-center gap-2 mb-2">
          <Database size={14} className="text-[#6B8F71]" />
          <h2 className="text-[14px] font-medium text-[#1A1A1A]">Ürün Verisi Aktarımı</h2>
        </div>
        <p className="text-[12px] text-[#9A9A8A] leading-relaxed mb-4">
          Koddaki orijinal ürün listesini veritabanına aktarır. İlk kurulumda bir kez
          çalıştırmanız yeterlidir.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => seed(false)}
            disabled={seeding}
            className="bg-[#6B8F71] text-white px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#45644A] transition-colors disabled:opacity-50"
          >
            Eksikleri Aktar
          </button>
          <button
            onClick={() => seed(true)}
            disabled={seeding}
            className="border border-[#E8E8E2] text-[#9A9A8A] px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium hover:border-red-300 hover:text-red-500 transition-colors disabled:opacity-50"
          >
            Tümünü Sıfırla
          </button>
        </div>
        {message && <p className="text-[12px] text-[#4A4A4A] mt-4">{message}</p>}
      </div>
    </div>
  );
}
