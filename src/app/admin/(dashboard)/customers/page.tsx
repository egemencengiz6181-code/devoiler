"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import type { SupabaseProfile } from "@/lib/types";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<SupabaseProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customers");
      const data = await res.json();
      setCustomers(data.customers ?? []);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-light text-[#1A1A1A]">Müşteriler</h1>
          <p className="text-[13px] text-[#9A9A8A] mt-1">
            {customers.length} kayıtlı müşteri
          </p>
        </div>
        <button
          onClick={fetchCustomers}
          disabled={loading}
          className="flex items-center gap-2 border border-[#E8E8E2] bg-white px-4 py-2 text-[12px] text-[#1A1A1A] hover:bg-[#F4F4F0] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Yenile
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="w-6 h-6 border-2 border-[#E8E8E2] border-t-[#6B8F71] rounded-full animate-spin" />
        </div>
      ) : customers.length === 0 ? (
        <div className="text-center py-20 border border-[#E8E8E2] bg-white">
          <p className="text-[13px] text-[#9A9A8A]">Henüz müşteri yok.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E8E2] overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E8E2] bg-[#FAFAF8]">
                {["Ad Soyad", "E-posta", "Telefon", "Kayıt Tarihi"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3.5 font-medium text-[#9A9A8A] text-[10px] tracking-[0.15em] uppercase whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, idx) => (
                <tr
                  key={c.id}
                  className={`border-b border-[#E8E8E2] hover:bg-[#FAFAF8] transition-colors ${
                    idx === customers.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-5 py-4 font-medium text-[#1A1A1A]">
                    {c.full_name ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-[#9A9A8A]">{c.email}</td>
                  <td className="px-5 py-4 text-[#9A9A8A]">
                    {c.phone ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-[#9A9A8A]">
                    {formatDate(c.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
