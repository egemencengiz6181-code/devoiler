"use client";

import AccountLayout from "@/components/AccountLayout";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { Package, Truck, Check, X as XIcon, ExternalLink } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  preparing: { label: "Hazırlanıyor", color: "text-amber-500", icon: <Package size={14} /> },
  shipped: { label: "Kargoya Verildi", color: "text-blue-500", icon: <Truck size={14} /> },
  delivered: { label: "Teslim Edildi", color: "text-[#6B8F71]", icon: <Check size={14} /> },
  cancelled: { label: "İptal Edildi", color: "text-red-400", icon: <XIcon size={14} /> },
};

export default function OrdersPage() {
  const { orders } = useOrders();
  const { user } = useAuth();

  const userOrders = orders.filter((o) => !user || o.userId === user.id || o.userId === "");

  return (
    <AccountLayout activeTab="orders">
      <div>
        <h2 className="text-[24px] font-light text-[#1A1A1A] mb-2">Siparişlerim</h2>
        <p className="text-[13px] text-[#9A9A8A] tracking-wide mb-8">
          Tüm siparişlerinizi buradan takip edebilirsiniz.
        </p>

        {userOrders.length === 0 ? (
          <div className="text-center py-16 border border-[#E8E8E2]">
            <Package size={48} className="mx-auto text-[#E8E8E2] mb-6" />
            <p className="text-[15px] font-light text-[#1A1A1A] mb-2">Henüz siparişiniz yok</p>
            <p className="text-[13px] text-[#9A9A8A]">İlk siparişinizi vermek için ürünlerimize göz atın.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => {
              const sc = statusConfig[order.status] || statusConfig.preparing;
              return (
                <div
                  key={order.id}
                  className="border border-[#E8E8E2] p-6 hover:border-[#C8C8C0] transition-colors duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium mb-1">
                        Sipariş No
                      </p>
                      <p className="text-[15px] font-medium text-[#1A1A1A]">{order.id}</p>
                    </div>
                    <div className={`flex items-center gap-2 ${sc.color}`}>
                      {sc.icon}
                      <span className="text-[11px] tracking-[0.15em] uppercase font-medium">{sc.label}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {order.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] tracking-wide text-[#4A4A4A] bg-[#F4F4F0] px-3 py-1.5"
                      >
                        {item.productName} × {item.quantity}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E8E8E2]">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-[#9A9A8A] font-medium">Toplam</p>
                        <p className="text-[15px] font-medium text-[#1A1A1A]">₺{order.totalAmount.toLocaleString("tr-TR")}</p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-[#9A9A8A] font-medium">Tarih</p>
                        <p className="text-[12px] text-[#4A4A4A]">
                          {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                        </p>
                      </div>
                    </div>

                    {order.status === "shipped" && order.trackingLink && (
                      <a
                        href={order.trackingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-[10px] tracking-[0.2em] uppercase px-5 py-3 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium"
                      >
                        <Truck size={12} />
                        Kargom Nerede?
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
