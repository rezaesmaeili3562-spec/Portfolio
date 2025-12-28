export type OrderStatus = "pending" | "processing" | "delivered" | "cancelled";

export type Order = {
  id: string;
  customerName: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

export type OrderPayload = {
  customerName: string;
  total: number;
  status: OrderStatus;
};
