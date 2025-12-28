import React from "react";
import { createOrder, getOrders, updateOrder } from "../api/ordersApi";
import type { Order, OrderPayload } from "../../../shared/types/orders";

export const useOrders = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOrders();
      setOrders(response.orders);
    } catch {
      setError("دریافت سفارش‌ها با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const addOrder = async (payload: OrderPayload) => {
    const order = await createOrder(payload);
    setOrders((prev) => [order, ...prev]);
  };

  const editOrder = async (id: string, payload: OrderPayload) => {
    const updated = await updateOrder(id, payload);
    if (updated) {
      setOrders((prev) => prev.map((item) => (item.id === id ? updated : item)));
    }
  };

  return {
    orders,
    loading,
    error,
    reload: load,
    addOrder,
    editOrder,
  };
};
