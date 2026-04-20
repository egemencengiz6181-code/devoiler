"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product } from "@/lib/data";
import { mockCoupons, type Coupon } from "@/lib/types";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  // Coupon
  appliedCoupon: Coupon | null;
  couponError: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;
  finalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function parsePrice(price: string): number {
  return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("devoiler-cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("devoiler-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.product.slug === product.slug
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.product.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.slug !== slug));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product.slug === slug ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponError("");
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + parsePrice(i.product.price) * i.quantity,
    0
  );

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");

  const applyCoupon = useCallback(
    (code: string): boolean => {
      setCouponError("");
      const coupon = mockCoupons.find(
        (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
      );
      if (!coupon) {
        setCouponError("Geçersiz veya süresi dolmuş kupon kodu.");
        return false;
      }
      if (coupon.minAmount && totalPrice < coupon.minAmount) {
        setCouponError(`Bu kupon için minimum sepet tutarı ₺${coupon.minAmount}.`);
        return false;
      }
      setAppliedCoupon(coupon);
      return true;
    },
    [totalPrice]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponError("");
  }, []);

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === "percentage"
      ? Math.round(totalPrice * (appliedCoupon.value / 100))
      : appliedCoupon.value
    : 0;

  const finalPrice = Math.max(0, totalPrice - discountAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
