import React from "react";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../api/ordersApi";
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
      setError("دریافت سفارش‌ها ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const addOrder = async (payload: OrderPayload) => {
    const newOrder = await createOrder(payload);
    setOrders((prev) => [newOrder, ...prev]);
  };

  const editOrder = async (id: string, payload: OrderPayload) => {
    const updated = await updateOrder(id, payload);
    if (!updated) {
      return;
    }
    setOrders((prev) => prev.map((order) => (order.id === id ? updated : order)));
  };

  const removeOrder = async (id: string) => {
    await deleteOrder(id);
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return {
    orders,
    loading,
    error,
    reload: load,
    addOrder,
    editOrder,
    removeOrder,
  };
};
