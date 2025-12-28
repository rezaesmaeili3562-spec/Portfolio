export type PaymentStatus = "paid" | "pending" | "refunded";
export type ShippingStatus = "preparing" | "shipped" | "delivered" | "returned";
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};

export type OrderTimelineEvent = {
  id: string;
  status: OrderStatus;
  createdAt: string;
  note?: string;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  history: OrderTimelineEvent[];
};

export type OrderPayload = {
  customerName: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
};
