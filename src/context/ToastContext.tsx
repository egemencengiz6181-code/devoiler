"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Toast = {
  id: string;
  message: string;
  action?: { label: string; onClick: () => void };
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (message: string, action?: { label: string; onClick: () => void }) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, action?: { label: string; onClick: () => void }) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, action }]);
      setTimeout(() => removeToast(id), 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
