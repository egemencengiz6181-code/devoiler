"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Order, OrderItem, AddressEntry } from "@/lib/types";

type OrderContextType = {
  orders: Order[];
  createOrder: (items: OrderItem[], address: AddressEntry, totalAmount: number, discountAmount?: number, couponCode?: string) => Order;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order["status"], trackingNumber?: string, trackingLink?: string) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("devoiler-orders");
      if (saved) setOrders(JSON.parse(saved));
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("devoiler-orders", JSON.stringify(orders));
    }
  }, [orders, mounted]);

  const createOrder = useCallback(
    (items: OrderItem[], address: AddressEntry, totalAmount: number, discountAmount?: number, couponCode?: string): Order => {
      const order: Order = {
        id: `DV-${Date.now().toString(36).toUpperCase()}`,
        userId: "", // set by caller context
        status: "preparing",
        totalAmount,
        discountAmount,
        couponCode,
        items,
        addressSnapshot: address,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    []
  );

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  const updateOrderStatus = useCallback(
    (id: string, status: Order["status"], trackingNumber?: string, trackingLink?: string) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, status, trackingNumber, trackingLink, updatedAt: new Date().toISOString() }
            : o
        )
      );
    },
    []
  );

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
