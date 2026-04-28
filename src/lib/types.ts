// Order, Coupon, Address types for Devoiler E-Commerce

export type OrderStatus = "preparing" | "shipped" | "delivered" | "cancelled";

export type OrderItem = {
  productSlug: string;
  productName: string;
  productImage?: string;
  quantity: number;
  unitPrice: number;
};

export type AddressEntry = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  zip: string;
};

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  trackingNumber?: string;
  trackingLink?: string;
  totalAmount: number;
  discountAmount?: number;
  couponCode?: string;
  items: OrderItem[];
  addressSnapshot: AddressEntry;
  createdAt: string;
  updatedAt: string;
};

export type Coupon = {
  code: string;
  discountType: "percentage" | "fixed";
  value: number;
  isActive: boolean;
  minAmount?: number;
};

// ─── Supabase / Admin types ────────────────────────────────────────────────

export type SupabaseOrderStatus =
  | "pending"
  | "paid"
  | "failed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type BasketItem = {
  name: string;
  price: string; // kuruş cinsinden string
  quantity: string;
};

export type AddressSnapshot = {
  name: string;
  address: string;
  phone: string;
  email: string;
};

export type SupabaseOrder = {
  id: string;
  user_id: string | null;
  paytr_oid: string | null;
  total_amount: number;
  status: SupabaseOrderStatus;
  basket_details: BasketItem[] | null;
  address_snapshot: AddressSnapshot | null;
  created_at: string;
  updated_at: string;
  profiles: {
    email: string;
    full_name: string | null;
    phone: string | null;
  } | null;
};

export type SupabaseProfile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
};

// ─── Mock coupons for demo ─────────────────────────────────────────────────

// Mock coupons for demo
export const mockCoupons: Coupon[] = [
  { code: "HOSGELDIN", discountType: "percentage", value: 10, isActive: true },
  { code: "DEVOILER50", discountType: "fixed", value: 50, isActive: true, minAmount: 300 },
  { code: "BILIM20", discountType: "percentage", value: 20, isActive: true, minAmount: 500 },
];
