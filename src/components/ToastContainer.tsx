"use client";

import { useToast } from "@/context/ToastContext";
import { X, ShoppingBag } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1A1A1A] text-white px-6 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex items-center gap-4 animate-toast-in min-w-[300px] max-w-[420px]"
        >
          <ShoppingBag size={16} className="text-[#6B8F71] shrink-0" />
          <span className="text-[13px] tracking-wide flex-1">{toast.message}</span>
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-[10px] tracking-[0.2em] uppercase text-[#6B8F71] hover:text-white transition-colors duration-200 font-medium whitespace-nowrap"
            >
              {toast.action.label}
            </button>
          )}
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#6A6A6A] hover:text-white transition-colors duration-200 ml-1"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
