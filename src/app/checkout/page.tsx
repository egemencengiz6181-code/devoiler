"use client";

import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, CreditCard, Check, ShoppingBag, Truck, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AddressEntry } from "@/lib/types";

type Step = "address" | "payment";

function parsePrice(price: string): number {
  return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, appliedCoupon, discountAmount, finalPrice } = useCart();
  const { user, openAuth, addAddress } = useAuth();
  const { createOrder } = useOrders();
  const router = useRouter();
  const [step, setStep] = useState<Step>("address");
  const [iframeToken, setIframeToken] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Address selection
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showNewAddress, setShowNewAddress] = useState(false);

  // New address form
  const [newAddress, setNewAddress] = useState<Omit<AddressEntry, "id">>({
    title: "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    district: "",
    zip: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      openAuth("register");
      router.push("/");
    }
  }, [user, openAuth, router]);

  // Auto-select first address
  useEffect(() => {
    if (user?.addressBook?.length && !selectedAddressId) {
      setSelectedAddressId(user.addressBook[0].id);
    }
  }, [user?.addressBook, selectedAddressId]);

  const selectedAddress = user?.addressBook?.find((a) => a.id === selectedAddressId) || null;

  const requestPaytrToken = useCallback(async (addr: AddressEntry) => {
    setPaymentLoading(true);
    setPaymentError("");
    try {
      const merchant_oid = `DV${Date.now().toString(36).toUpperCase()}`;
      const user_basket = items.map((item) => [
        item.product.name,
        String(parsePrice(item.product.price) * 100),
        String(item.quantity),
      ]);

      const res = await fetch("/api/paytr/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          payment_amount: Math.round(finalPrice * 100),
          user_basket,
          user_name: `${addr.firstName} ${addr.lastName}`,
          user_address: `${addr.address}, ${addr.district}, ${addr.city} ${addr.zip}`,
          user_phone: addr.phone,
          merchant_oid,
          user_ip: "0.0.0.0",
        }),
      });

      const data = await res.json();
      if (data.token) {
        setIframeToken(data.token);

        // Create order in context
        createOrder(
          items.map((item) => ({
            productSlug: item.product.slug,
            productName: item.product.name,
            productImage: item.product.image,
            quantity: item.quantity,
            unitPrice: parsePrice(item.product.price),
          })),
          addr,
          finalPrice,
          discountAmount > 0 ? discountAmount : undefined,
          appliedCoupon?.code,
        );
      } else {
        setPaymentError(data.reason || "Ödeme başlatılamadı. Lütfen tekrar deneyin.");
      }
    } catch {
      setPaymentError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setPaymentLoading(false);
    }
  }, [items, finalPrice, discountAmount, appliedCoupon, user, createOrder]);

  if (!user) return null;

  if (items.length === 0) {
    return (
      <div className="bg-[#FAFAF8] min-h-screen pt-32 pb-20">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <ShoppingBag size={48} className="mx-auto text-[#E8E8E2] mb-6" />
          <h1 className="text-[28px] font-light text-[#1A1A1A] mb-4">Sepetiniz boş</h1>
          <p className="text-[14px] text-[#9A9A8A] mb-8">
            Ödeme yapabilmek için önce sepetinize ürün ekleyin.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium"
          >
            Ürünlere Göz At
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    );
  }

  const handleAddressContinue = () => {
    if (showNewAddress) {
      // Save new address first
      const id = crypto.randomUUID();
      const addr: AddressEntry = { id, ...newAddress };
      addAddress(addr);
      setSelectedAddressId(id);
      setShowNewAddress(false);
      setStep("payment");
      requestPaytrToken(addr);
    } else if (selectedAddress) {
      setStep("payment");
      requestPaytrToken(selectedAddress);
    }
  };

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "address", label: "Teslimat", icon: <MapPin size={14} /> },
    { key: "payment", label: "Ödeme", icon: <CreditCard size={14} /> },
  ];

  const activeStepIdx = steps.findIndex((s) => s.key === step);

  const inputClass =
    "w-full bg-transparent border border-[#E8E8E2] px-4 py-3.5 text-[13px] text-[#1A1A1A] placeholder:text-[#C8C8C0] focus:outline-none focus:border-[#6B8F71] transition-colors duration-300 tracking-wide";

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-32 pb-20">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors duration-200 font-medium mb-12"
        >
          <ArrowLeft size={11} />
          Alışverişe Dön
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mb-16">
          {steps.map((s, idx) => (
            <div key={s.key} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    idx <= activeStepIdx
                      ? "bg-[#6B8F71] text-white"
                      : "border border-[#E8E8E2] text-[#C8C8C0]"
                  }`}
                >
                  {idx < activeStepIdx ? <Check size={14} /> : s.icon}
                </div>
                <span
                  className={`text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                    idx <= activeStepIdx ? "text-[#1A1A1A]" : "text-[#C8C8C0]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-12 md:w-20 h-px mx-4 transition-colors duration-500 ${
                    idx < activeStepIdx ? "bg-[#6B8F71]" : "bg-[#E8E8E2]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Form Area */}
          <div className="lg:col-span-7">
            {/* Address Step */}
            {step === "address" && (
              <div className="animate-fade-in">
                <h2 className="text-[24px] font-light text-[#1A1A1A] mb-2">Teslimat Adresi</h2>
                <p className="text-[13px] text-[#9A9A8A] mb-8 tracking-wide">
                  Kayıtlı adreslerinizden birini seçin veya yeni adres ekleyin.
                </p>

                {/* Saved addresses */}
                {(user.addressBook || []).length > 0 && !showNewAddress && (
                  <div className="space-y-3 mb-6">
                    {(user.addressBook || []).map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`w-full text-left p-5 border transition-all duration-200 ${
                          selectedAddressId === addr.id
                            ? "border-[#6B8F71] bg-[#6B8F71]/5"
                            : "border-[#E8E8E2] hover:border-[#C8C8C0]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#6B8F71]">
                            {addr.title}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedAddressId === addr.id ? "border-[#6B8F71]" : "border-[#E8E8E2]"
                            }`}
                          >
                            {selectedAddressId === addr.id && (
                              <div className="w-2 h-2 rounded-full bg-[#6B8F71]" />
                            )}
                          </div>
                        </div>
                        <p className="text-[13px] text-[#1A1A1A]">
                          {addr.firstName} {addr.lastName}
                        </p>
                        <p className="text-[12px] text-[#9A9A8A] tracking-wide mt-0.5">
                          {addr.address}, {addr.district}/{addr.city}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* New address toggle */}
                {!showNewAddress ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewAddress(true);
                      setSelectedAddressId(null);
                    }}
                    className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#6B8F71] hover:text-[#45644A] transition-colors duration-200 font-medium mb-8"
                  >
                    <Plus size={14} />
                    Yeni Adres Ekle
                  </button>
                ) : (
                  <div className="space-y-4 mb-6 p-6 border border-[#E8E8E2]">
                    <h3 className="text-[14px] font-light text-[#1A1A1A] mb-2">Yeni Adres</h3>
                    <input
                      type="text"
                      placeholder="Adres Başlığı (Ev, İş...)"
                      value={newAddress.title}
                      onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                      className={inputClass}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Ad"
                        value={newAddress.firstName}
                        onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
                        className={inputClass}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Soyad"
                        value={newAddress.lastName}
                        onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
                        className={inputClass}
                        required
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Telefon"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className={inputClass}
                      required
                    />
                    <textarea
                      placeholder="Açık Adres"
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      className={inputClass + " resize-none h-24"}
                      required
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="İl"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className={inputClass}
                        required
                      />
                      <input
                        type="text"
                        placeholder="İlçe"
                        value={newAddress.district}
                        onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                        className={inputClass}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Posta Kodu"
                        value={newAddress.zip}
                        onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                        className={inputClass}
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNewAddress(false)}
                      className="text-[11px] tracking-[0.15em] uppercase text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors font-medium"
                    >
                      Vazgeç
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAddressContinue}
                  disabled={!selectedAddressId && !showNewAddress}
                  className="w-full bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium flex items-center justify-center gap-3 disabled:opacity-40"
                >
                  Ödeme Adımına Geç
                  <ArrowRight size={12} />
                </button>
              </div>
            )}

            {/* Payment Step — PayTR iFrame */}
            {step === "payment" && (
              <div className="animate-fade-in">
                <h2 className="text-[24px] font-light text-[#1A1A1A] mb-2">Ödeme</h2>
                <p className="text-[13px] text-[#9A9A8A] mb-8 tracking-wide">
                  Güvenli ödeme altyapısı ile siparişinizi tamamlayın.
                </p>

                {/* Delivery address summary */}
                {selectedAddress && (
                  <div className="p-5 bg-[#F4F4F0] border border-[#E8E8E2] mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Truck size={14} className="text-[#6B8F71]" />
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A8A] font-medium">
                          Teslimat Adresi
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setStep("address");
                          setIframeToken(null);
                        }}
                        className="text-[10px] tracking-[0.15em] uppercase text-[#6B8F71] hover:text-[#45644A] transition-colors duration-200 font-medium"
                      >
                        Değiştir
                      </button>
                    </div>
                    <p className="text-[13px] text-[#1A1A1A]">
                      {selectedAddress.firstName} {selectedAddress.lastName}
                    </p>
                    <p className="text-[12px] text-[#9A9A8A] tracking-wide mt-1">
                      {selectedAddress.address}, {selectedAddress.district}/{selectedAddress.city}
                    </p>
                  </div>
                )}

                {/* PayTR iframe or loading */}
                {paymentLoading && (
                  <div className="flex items-center justify-center py-20">
                    <span className="inline-block w-6 h-6 border-2 border-[#E8E8E2] border-t-[#6B8F71] rounded-full animate-spin" />
                    <span className="ml-3 text-[13px] text-[#9A9A8A]">Ödeme sayfası hazırlanıyor...</span>
                  </div>
                )}

                {paymentError && (
                  <div className="p-5 border border-red-200 bg-red-50 mb-6">
                    <p className="text-[13px] text-red-600">{paymentError}</p>
                    <button
                      onClick={() => selectedAddress && requestPaytrToken(selectedAddress)}
                      className="text-[11px] tracking-[0.15em] uppercase text-red-600 underline mt-2 font-medium"
                    >
                      Tekrar Dene
                    </button>
                  </div>
                )}

                {iframeToken && (
                  <div className="border border-[#E8E8E2] overflow-hidden">
                    <iframe
                      src={`https://www.paytr.com/odeme/guvenli/${iframeToken}`}
                      id="paytriframe"
                      frameBorder="0"
                      scrolling="yes"
                      style={{ width: "100%", height: "600px" }}
                    />
                  </div>
                )}

                {!iframeToken && !paymentLoading && !paymentError && (
                  <div className="text-center py-16 border border-[#E8E8E2]">
                    <CreditCard size={48} className="mx-auto text-[#E8E8E2] mb-6" />
                    <p className="text-[13px] text-[#9A9A8A]">
                      Ödeme sayfası yükleniyor...
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStep("address");
                    setIframeToken(null);
                  }}
                  className="mt-6 border border-[#E8E8E2] text-[#9A9A8A] text-[10px] tracking-[0.25em] uppercase px-6 py-4 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors duration-300 font-medium"
                >
                  Geri
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#F4F4F0] border border-[#E8E8E2] p-8 sticky top-28">
              <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#9A9A8A] font-medium mb-6">
                Sipariş Özeti
              </h3>

              <div className="space-y-5 mb-8">
                {items.map((item) => (
                  <div key={item.product.slug} className="flex gap-4">
                    <div className="shrink-0 w-[60px] h-[80px] bg-[#EEEEE8] relative overflow-hidden">
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                          sizes="60px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] text-[#9A9A8A]">
                          Ürün
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-light text-[#1A1A1A] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-[#9A9A8A] tracking-wide">
                        {item.quantity} adet
                      </p>
                    </div>
                    <span className="text-[13px] font-medium text-[#1A1A1A] shrink-0">
                      {item.product.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-[#E8E8E2]">
                <div className="flex justify-between">
                  <span className="text-[12px] text-[#9A9A8A] tracking-wide">Ara Toplam</span>
                  <span className="text-[13px] text-[#1A1A1A]">₺{totalPrice.toLocaleString("tr-TR")}</span>
                </div>
                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#6B8F71] tracking-wide">
                      Kupon ({appliedCoupon.code})
                    </span>
                    <span className="text-[12px] text-[#6B8F71] font-medium">
                      -₺{discountAmount.toLocaleString("tr-TR")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[12px] text-[#9A9A8A] tracking-wide">Kargo</span>
                  <span className="text-[12px] text-[#6B8F71] font-medium">Ücretsiz</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#E8E8E2]">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A] font-medium">
                    Toplam
                  </span>
                  <span className="text-[22px] font-light text-[#1A1A1A]">
                    ₺{finalPrice.toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
