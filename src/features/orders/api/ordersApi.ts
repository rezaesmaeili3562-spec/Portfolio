import { http } from "../../../api/http";
import type { Order, OrderPayload } from "../../../shared/types/orders";

export type OrdersResponse = {
  orders: Order[];
};

export const getOrders = async (): Promise<OrdersResponse> => {
  const response = await http.get<OrdersResponse>("/orders");
  return response.data;
};

export const getOrder = async (orderId: string): Promise<Order | undefined> => {
  const response = await http.get<{ order: Order | undefined }>(`/orders/${orderId}`);
  return response.data.order;
};

export const createOrder = async (payload: OrderPayload): Promise<Order> => {
  const response = await http.post<{ order: Order }>("/orders", payload);
  return response.data.order;
};

export const updateOrder = async (id: string, payload: OrderPayload): Promise<Order | undefined> => {
  const response = await http.put<{ order: Order | undefined }>(`/orders/${id}`, payload);
  return response.data.order;
};
