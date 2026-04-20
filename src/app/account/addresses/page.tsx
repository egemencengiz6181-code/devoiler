"use client";

import { useState } from "react";
import AccountLayout from "@/components/AccountLayout";
import { useAuth } from "@/context/AuthContext";
import type { AddressEntry } from "@/lib/types";
import { Plus, Pencil, Trash2, X as XIcon, MapPin } from "lucide-react";

const emptyAddress: Omit<AddressEntry, "id"> = {
  title: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  district: "",
  zip: "",
};

export default function AddressesPage() {
  const { user, addAddress, updateAddress, removeAddress } = useAuth();
  const [editing, setEditing] = useState<AddressEntry | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const addresses = user?.addressBook || [];

  const inputClass =
    "w-full bg-transparent border border-[#E8E8E2] px-4 py-3 text-[13px] text-[#1A1A1A] placeholder:text-[#C8C8C0] focus:outline-none focus:border-[#6B8F71] transition-colors duration-300 tracking-wide";

  const openNew = () => {
    setEditing({ id: crypto.randomUUID(), ...emptyAddress });
    setIsNew(true);
  };

  const openEdit = (addr: AddressEntry) => {
    setEditing({ ...addr });
    setIsNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (isNew) {
      addAddress(editing);
    } else {
      updateAddress(editing);
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    removeAddress(id);
    setConfirmDelete(null);
  };

  return (
    <AccountLayout activeTab="addresses">
      <div>
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-[24px] font-light text-[#1A1A1A] mb-2">Adreslerim</h2>
            <p className="text-[13px] text-[#9A9A8A] tracking-wide">
              Teslimat adreslerinizi yönetin.
            </p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-[#1A1A1A] text-white text-[10px] tracking-[0.2em] uppercase px-5 py-3 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium shrink-0"
          >
            <Plus size={12} />
            Yeni Adres
          </button>
        </div>

        {/* Edit / New Modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-[#FAFAF8] w-full max-w-lg p-8 relative animate-scale-in">
              <button
                onClick={() => setEditing(null)}
                className="absolute top-4 right-4 p-2 text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors"
              >
                <XIcon size={18} />
              </button>

              <h3 className="text-[18px] font-light text-[#1A1A1A] mb-6">
                {isNew ? "Yeni Adres Ekle" : "Adresi Düzenle"}
              </h3>

              <form onSubmit={handleSave} className="space-y-4">
                <input
                  type="text"
                  placeholder="Adres Başlığı (Ev, İş...)"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className={inputClass}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ad"
                    value={editing.firstName}
                    onChange={(e) => setEditing({ ...editing, firstName: e.target.value })}
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Soyad"
                    value={editing.lastName}
                    onChange={(e) => setEditing({ ...editing, lastName: e.target.value })}
                    className={inputClass}
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={editing.phone}
                  onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                  className={inputClass}
                  required
                />
                <textarea
                  placeholder="Açık Adres"
                  value={editing.address}
                  onChange={(e) => setEditing({ ...editing, address: e.target.value })}
                  className={inputClass + " resize-none h-24"}
                  required
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="İl"
                    value={editing.city}
                    onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    placeholder="İlçe"
                    value={editing.district}
                    onChange={(e) => setEditing({ ...editing, district: e.target.value })}
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Posta Kodu"
                    value={editing.zip}
                    onChange={(e) => setEditing({ ...editing, zip: e.target.value })}
                    className={inputClass}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#2D3B3C] transition-colors duration-300 font-medium mt-4"
                >
                  {isNew ? "Adresi Kaydet" : "Değişiklikleri Kaydet"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-[#FAFAF8] w-full max-w-sm p-8 text-center animate-scale-in">
              <p className="text-[15px] text-[#1A1A1A] mb-6">Bu adresi silmek istediğinize emin misiniz?</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="border border-[#E8E8E2] text-[#9A9A8A] text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors duration-300 font-medium"
                >
                  Vazgeç
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="bg-red-500 text-white text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-red-600 transition-colors duration-300 font-medium"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Address List */}
        {addresses.length === 0 ? (
          <div className="text-center py-16 border border-[#E8E8E2]">
            <MapPin size={48} className="mx-auto text-[#E8E8E2] mb-6" />
            <p className="text-[15px] font-light text-[#1A1A1A] mb-2">Henüz adres eklemediniz</p>
            <p className="text-[13px] text-[#9A9A8A]">Hızlı alışveriş için adres ekleyin.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="border border-[#E8E8E2] p-6 hover:border-[#C8C8C0] transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#6B8F71] font-medium bg-[#6B8F71]/10 px-3 py-1">
                    {addr.title}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(addr)}
                      className="p-1.5 text-[#9A9A8A] hover:text-[#1A1A1A] transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(addr.id)}
                      className="p-1.5 text-[#9A9A8A] hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <p className="text-[14px] font-light text-[#1A1A1A] mb-1">
                  {addr.firstName} {addr.lastName}
                </p>
                <p className="text-[12px] text-[#9A9A8A] tracking-wide leading-[1.6] mb-2">
                  {addr.address}
                </p>
                <p className="text-[11px] text-[#9A9A8A]">
                  {addr.district}, {addr.city} {addr.zip}
                </p>
                <p className="text-[11px] text-[#9A9A8A] mt-1">{addr.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
