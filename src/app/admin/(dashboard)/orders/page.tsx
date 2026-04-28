"use client";

import { useState, useEffect, useCallback } from "react";
import { X, RefreshCw, ChevronDown } from "lucide-react";
import type { SupabaseOrder, SupabaseOrderStatus } from "@/lib/types";

const STATUS_LABELS: Record<SupabaseOrderStatus, string> = {
  pending: "Beklemede",
  paid: "Ödendi",
  failed: "Başarısız",
  preparing: "Hazırlanıyor",
  shipped: "Kargoda",
  delivered: "Teslim Edildi",
  cancelled: "İptal",
};

const STATUS_COLORS: Record<SupabaseOrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  failed: "bg-red-100 text-red-700",
  preparing: "bg-orange-100 text-orange-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-zinc-100 text-zinc-500",
};

const STATUS_OPTIONS: SupabaseOrderStatus[] = [
  "pending",
  "paid",
  "failed",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<SupabaseOrder | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders ?? []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (
    orderId: string,
    newStatus: SupabaseOrderStatus
  ) => {
    setUpdatingId(orderId);
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      setSelected((prev) =>
        prev?.id === orderId ? { ...prev, status: newStatus } : prev
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount / 100);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-light text-[#1A1A1A]">Siparişler</h1>
          <p className="text-[13px] text-[#9A9A8A] mt-1">
            {orders.length} sipariş
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 border border-[#E8E8E2] bg-white px-4 py-2 text-[12px] text-[#1A1A1A] hover:bg-[#F4F4F0] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Yenile
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="w-6 h-6 border-2 border-[#E8E8E2] border-t-[#6B8F71] rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 border border-[#E8E8E2] bg-white">
          <p className="text-[13px] text-[#9A9A8A]">Henüz sipariş yok.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E8E2] overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E8E2] bg-[#FAFAF8]">
                {["Sipariş No", "Müşteri", "Tutar", "Tarih", "Durum", "İşlem"].map(
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
              {orders.map((order, idx) => (
                <tr
                  key={order.id}
                  onClick={() => setSelected(order)}
                  className={`border-b border-[#E8E8E2] hover:bg-[#FAFAF8] transition-colors cursor-pointer ${
                    idx === orders.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-5 py-4 font-mono text-[11px] text-[#9A9A8A]">
                    {order.paytr_oid ?? order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-[#1A1A1A]">
                      {order.profiles?.full_name ??
                        order.address_snapshot?.name ??
                        "—"}
                    </div>
                    <div className="text-[11px] text-[#9A9A8A] mt-0.5">
                      {order.profiles?.email ?? "—"}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-[#1A1A1A] whitespace-nowrap">
                    {formatAmount(order.total_amount)}
                  </td>
                  <td className="px-5 py-4 text-[#9A9A8A] whitespace-nowrap">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        STATUS_COLORS[order.status]
                      }`}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  {/* Status dropdown — stops row click propagation */}
                  <td
                    className="px-5 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative inline-flex items-center">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as SupabaseOrderStatus
                          )
                        }
                        disabled={updatingId === order.id}
                        className="appearance-none border border-[#E8E8E2] px-3 py-1.5 pr-7 text-[12px] text-[#1A1A1A] bg-white focus:outline-none focus:border-[#6B8F71] cursor-pointer disabled:opacity-50 rounded"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={11}
                        className="absolute right-2 text-[#9A9A8A] pointer-events-none"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Order Detail Modal ────────────────────────────────────────────── */}
      {selected && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[210]"
            onClick={() => setSelected(null)}
          />
          <div className="fixed inset-0 z-[220] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[560px] max-h-[85vh] overflow-y-auto shadow-2xl">
              {/* Modal header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-[#E8E8E2]">
                <div>
                  <h2 className="text-[15px] font-medium text-[#1A1A1A]">
                    Sipariş Detayı
                  </h2>
                  <p className="text-[11px] text-[#9A9A8A] mt-0.5 font-mono">
                    {selected.paytr_oid ?? selected.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-7 py-6 space-y-6">
                {/* Status + Date */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-medium ${
                      STATUS_COLORS[selected.status]
                    }`}
                  >
                    {STATUS_LABELS[selected.status]}
                  </span>
                  <span className="text-[12px] text-[#9A9A8A]">
                    {formatDate(selected.created_at)}
                  </span>
                </div>

                {/* Customer info */}
                <div className="p-4 bg-[#FAFAF8] border border-[#E8E8E2]">
                  <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#9A9A8A] mb-3">
                    Müşteri Bilgileri
                  </h3>
                  <p className="text-[13px] font-medium text-[#1A1A1A]">
                    {selected.profiles?.full_name ??
                      selected.address_snapshot?.name ??
                      "—"}
                  </p>
                  <p className="text-[12px] text-[#9A9A8A] mt-1">
                    {selected.profiles?.email ??
                      selected.address_snapshot?.email ??
                      "—"}
                  </p>
                  <p className="text-[12px] text-[#9A9A8A] mt-0.5">
                    {selected.address_snapshot?.phone ??
                      selected.profiles?.phone ??
                      "—"}
                  </p>
                </div>

                {/* Delivery address */}
                {selected.address_snapshot && (
                  <div className="p-4 bg-[#FAFAF8] border border-[#E8E8E2]">
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#9A9A8A] mb-3">
                      Teslimat Adresi
                    </h3>
                    <p className="text-[13px] text-[#1A1A1A]">
                      {selected.address_snapshot.address}
                    </p>
                  </div>
                )}

                {/* Basket items */}
                {selected.basket_details && selected.basket_details.length > 0 && (
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#9A9A8A] mb-3">
                      Ürünler
                    </h3>
                    <div className="border border-[#E8E8E2] divide-y divide-[#E8E8E2]">
                      {selected.basket_details.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-4 py-3"
                        >
                          <div>
                            <p className="text-[13px] text-[#1A1A1A]">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-[#9A9A8A] mt-0.5">
                              Adet: {item.quantity}
                            </p>
                          </div>
                          <p className="text-[13px] font-medium text-[#1A1A1A]">
                            {formatAmount(Number(item.price))}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E8E8E2]">
                  <span className="text-[13px] font-medium text-[#1A1A1A]">
                    Toplam
                  </span>
                  <span className="text-[16px] font-medium text-[#1A1A1A]">
                    {formatAmount(selected.total_amount)}
                  </span>
                </div>

                {/* Status update */}
                <div>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#9A9A8A] mb-3">
                    Durum Güncelle
                  </h3>
                  <div className="relative">
                    <select
                      value={selected.status}
                      onChange={(e) =>
                        handleStatusChange(
                          selected.id,
                          e.target.value as SupabaseOrderStatus
                        )
                      }
                      disabled={updatingId === selected.id}
                      className="w-full appearance-none border border-[#E8E8E2] px-4 py-3 pr-10 text-[13px] text-[#1A1A1A] bg-white focus:outline-none focus:border-[#6B8F71] cursor-pointer disabled:opacity-50"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A8A] pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
