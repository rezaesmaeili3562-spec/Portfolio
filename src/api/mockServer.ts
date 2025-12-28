import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { v4 as uuid } from "../shared/utils/uuid";
import type { Order, OrderPayload } from "../shared/types/orders";
import type { Customer } from "../shared/types/customers";
import type { DashboardStat, OrdersChartPoint } from "../shared/types/dashboard";

const now = new Date();

let orders: Order[] = [
  {
    id: uuid(),
    customerName: "لیلا امینی",
    total: 3200000,
    status: "processing",
    createdAt: new Date(now.getTime() - 86400000 * 1).toISOString(),
  },
  {
    id: uuid(),
    customerName: "مهدی رضایی",
    total: 1850000,
    status: "pending",
    createdAt: new Date(now.getTime() - 86400000 * 3).toISOString(),
  },
  {
    id: uuid(),
    customerName: "راضیه محمدی",
    total: 5400000,
    status: "delivered",
    createdAt: new Date(now.getTime() - 86400000 * 6).toISOString(),
  },
];

const customers: Customer[] = [
  { id: uuid(), name: "لیلا امینی", email: "leila@example.com", phone: "09121234567", totalOrders: 5 },
  { id: uuid(), name: "مهدی رضایی", email: "mahdi@example.com", phone: "09351234567", totalOrders: 3 },
  { id: uuid(), name: "راضیه محمدی", email: "raziye@example.com", phone: "09211234567", totalOrders: 8 },
];

const stats: DashboardStat[] = [
  { label: "فروش امروز", value: "۱۲٫۴ میلیون تومان", trend: "+۱۵٪" },
  { label: "سفارش‌های باز", value: "۲۴", trend: "-۵٪" },
  { label: "مشتریان فعال", value: "۳۵۰", trend: "+۸٪" },
  { label: "میانگین تحویل", value: "۲ روز", trend: "+۲٪" },
];

const chartData: OrdersChartPoint[] = [
  { name: "شنبه", orders: 18, revenue: 6.4 },
  { name: "یک‌شنبه", orders: 22, revenue: 7.9 },
  { name: "دوشنبه", orders: 16, revenue: 5.2 },
  { name: "سه‌شنبه", orders: 28, revenue: 9.1 },
  { name: "چهارشنبه", orders: 24, revenue: 8.3 },
  { name: "پنج‌شنبه", orders: 30, revenue: 10.2 },
  { name: "جمعه", orders: 20, revenue: 7.4 },
];

const createResponse = <T>(data: T, status = 200): AxiosResponse<T> => ({
  data,
  status,
  statusText: "OK",
  headers: {},
  config: {},
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAdapter = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  await delay(300);
  const { url = "", method = "get", data } = config;

  if (url === "/auth/login" && method === "post") {
    return createResponse({ token: "mock-token", user: { name: "مدیر سیستم" } }, 200);
  }

  if (url === "/dashboard/stats" && method === "get") {
    return createResponse({ stats, chartData }, 200);
  }

  if (url === "/orders" && method === "get") {
    return createResponse({ orders }, 200);
  }

  if (url === "/orders" && method === "post") {
    const payload = JSON.parse(data as string) as OrderPayload;
    const newOrder: Order = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...payload,
    };
    orders = [newOrder, ...orders];
    return createResponse({ order: newOrder }, 201);
  }

  if (url?.startsWith("/orders/") && method === "put") {
    const orderId = url.split("/orders/")[1];
    const payload = JSON.parse(data as string) as OrderPayload;
    orders = orders.map((order) => (order.id === orderId ? { ...order, ...payload } : order));
    const updated = orders.find((order) => order.id === orderId);
    return createResponse({ order: updated }, 200);
  }

  if (url?.startsWith("/orders/") && method === "delete") {
    const orderId = url.split("/orders/")[1];
    orders = orders.filter((order) => order.id !== orderId);
    return createResponse({ success: true }, 200);
  }

  if (url === "/customers" && method === "get") {
    return createResponse({ customers }, 200);
  }

  return createResponse({ message: "مسیر یافت نشد" }, 404);
};
