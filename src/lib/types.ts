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

// Mock coupons for demo
export const mockCoupons: Coupon[] = [
  { code: "HOSGELDIN", discountType: "percentage", value: 10, isActive: true },
  { code: "DEVOILER50", discountType: "fixed", value: 50, isActive: true, minAmount: 300 },
  { code: "BILIM20", discountType: "percentage", value: 20, isActive: true, minAmount: 500 },
];
