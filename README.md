# Iranian RTL Order Management Admin Panel (React + TypeScript)

This repository provides a production-ready frontend **project structure** for an **Iranian RTL admin dashboard** built with:
React + TypeScript, Tailwind CSS, React Router, React Hook Form, Zod, Recharts, Axios, and a **mock API**.

---

## 1. Folder Structure (Feature-Based)

```txt
src/
├── api/
│   ├── http.ts
│   └── mockServer.ts
├── app/
│   ├── App.tsx
│   └── providers/
│       └── ThemeProvider.tsx
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   ├── components/
│   │   │   └── AuthGate.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── pages/
│   │       └── LoginPage.tsx
│   ├── customers/
│   │   ├── api/
│   │   │   └── customersApi.ts
│   │   ├── hooks/
│   │   │   └── useCustomers.ts
│   │   └── pages/
│   │       └── CustomersPage.tsx
│   ├── dashboard/
│   │   ├── api/
│   │   │   └── dashboardApi.ts
│   │   ├── components/
│   │   │   └── OrdersChart.tsx
│   │   ├── hooks/
│   │   │   └── useDashboard.ts
│   │   └── pages/
│   │       └── DashboardPage.tsx
│   └── orders/
│       ├── api/
│       │   └── ordersApi.ts
│       ├── components/
│       │   ├── OrderForm.tsx
│       │   └── OrdersTable.tsx
│       ├── hooks/
│       │   └── useOrders.ts
│       ├── pages/
│       │   └── OrdersPage.tsx
│       └── schema.ts
├── routes/
│   └── index.tsx
├── shared/
│   ├── components/
│   │   ├── states/
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   └── LoadingState.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   ├── constants/
│   │   └── storageKeys.ts
│   ├── layouts/
│   │   └── DashboardLayout.tsx
│   ├── types/
│   │   ├── customers.ts
│   │   ├── dashboard.ts
│   │   └── orders.ts
│   └── utils/
│       ├── formatters.ts
│       └── uuid.ts
├── styles/
│   └── index.css
└── main.tsx
```

**Why this structure?**
- **Feature-based** folders (`auth`, `orders`, `dashboard`, `customers`)
- **Separation of concerns**: API, hooks, UI, schemas, types
- **Scalable** and **clean** for freelancing platforms like **Kaarlancer**

---

## 2. Main Files Implementation

### `src/main.tsx`
Bootstraps the app, global styles, and theme provider.
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### `src/app/App.tsx`
Router provider entry point.
```tsx
import { RouterProvider } from "react-router-dom";
import { appRouter } from "../routes";

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
```

### `src/routes/index.tsx`
Route configuration with auth guard and layout.
```tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../shared/layouts/DashboardLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import OrdersPage from "../features/orders/pages/OrdersPage";
import CustomersPage from "../features/customers/pages/CustomersPage";
import { AuthGate } from "../features/auth/components/AuthGate";

export const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <AuthGate>
        <DashboardLayout />
      </AuthGate>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "customers", element: <CustomersPage /> },
    ],
  },
]);
```

---

## 3. Example Feature: Orders Module

### API (`src/features/orders/api/ordersApi.ts`)
Handles mock API calls.
```tsx
import { http } from "../../../api/http";
import type { Order, OrderPayload } from "../../../shared/types/orders";

export type OrdersResponse = {
  orders: Order[];
};

export const getOrders = async (): Promise<OrdersResponse> => {
  const response = await http.get<OrdersResponse>("/orders");
  return response.data;
};

export const createOrder = async (payload: OrderPayload): Promise<Order> => {
  const response = await http.post<{ order: Order }>("/orders", payload);
  return response.data.order;
};

export const updateOrder = async (id: string, payload: OrderPayload): Promise<Order | undefined> => {
  const response = await http.put<{ order: Order | undefined }>(`/orders/${id}`, payload);
  return response.data.order;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await http.delete(`/orders/${id}`);
};
```

### Schema (`src/features/orders/schema.ts`)
Zod validation separated from UI logic.
```tsx
import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(3, "نام مشتری الزامی است"),
  total: z
    .number({ invalid_type_error: "مبلغ باید عدد باشد" })
    .min(10000, "مبلغ باید حداقل ۱۰,۰۰۰ تومان باشد"),
  status: z.enum(["pending", "processing", "delivered", "cancelled"], {
    required_error: "وضعیت سفارش الزامی است",
  }),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
```

### Page + Components (`src/features/orders/pages/OrdersPage.tsx`)
Creates, updates, deletes orders with local state and hooks.
```tsx
import React from "react";
import Card from "../../../shared/components/ui/Card";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import EmptyState from "../../../shared/components/states/EmptyState";
import Button from "../../../shared/components/ui/Button";
import OrderForm from "../components/OrderForm";
import OrdersTable from "../components/OrdersTable";
import { useOrders } from "../hooks/useOrders";
import type { Order } from "../../../shared/types/orders";
import type { OrderFormValues } from "../schema";

const OrdersPage = () => {
  const { orders, loading, error, reload, addOrder, editOrder, removeOrder } = useOrders();
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null);
  const [showForm, setShowForm] = React.useState(false);

  const handleCreate = async (values: OrderFormValues) => {
    await addOrder(values);
    setShowForm(false);
  };

  const handleEdit = async (values: OrderFormValues) => {
    if (!editingOrder) {
      return;
    }
    await editOrder(editingOrder.id, values);
    setEditingOrder(null);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={reload} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">مدیریت سفارش‌ها</h2>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "بستن فرم" : "ثبت سفارش"}
        </Button>
      </div>

      {showForm ? <OrderForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} /> : null}

      {editingOrder ? (
        <OrderForm
          initialValues={editingOrder}
          onSubmit={handleEdit}
          onCancel={() => setEditingOrder(null)}
        />
      ) : null}

      {!orders.length ? (
        <EmptyState message="سفارشی ثبت نشده است." />
      ) : (
        <Card title="لیست سفارش‌ها" description="نمای کلی سفارش‌های اخیر">
          <OrdersTable
            orders={orders}
            onEdit={(order) => setEditingOrder(order)}
            onDelete={(order) => removeOrder(order.id)}
          />
        </Card>
      )}
    </div>
  );
};

export default OrdersPage;
```

---

## 4. Axios Instance + Mock API

### `src/api/http.ts`
Axios instance with mock adapter.
```tsx
import axios from "axios";
import { mockAdapter } from "./mockServer";

export const http = axios.create({
  baseURL: "/",
  timeout: 800,
  adapter: mockAdapter,
});
```

### `src/api/mockServer.ts`
In-memory mock API for auth, orders, customers, dashboard.
```tsx
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
```

---

## 5. Example Form (React Hook Form + Zod)

### `src/features/orders/components/OrderForm.tsx`
Uses Zod schema for validation and clean UI.
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import Card from "../../../shared/components/ui/Card";
import { orderSchema, type OrderFormValues } from "../schema";
import type { Order } from "../../../shared/types/orders";

const statusOptions = [
  { value: "pending", label: "در انتظار" },
  { value: "processing", label: "در حال پردازش" },
  { value: "delivered", label: "تحویل شده" },
  { value: "cancelled", label: "لغو شده" },
] as const;

type OrderFormProps = {
  initialValues?: Order;
  onSubmit: (values: OrderFormValues) => void | Promise<void>;
  onCancel?: () => void;
};

const OrderForm = ({ initialValues, onSubmit, onCancel }: OrderFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialValues
      ? {
          customerName: initialValues.customerName,
          total: initialValues.total,
          status: initialValues.status,
        }
      : {
          customerName: "",
          total: 0,
          status: "pending",
        },
  });

  return (
    <Card title={initialValues ? "ویرایش سفارش" : "ثبت سفارش جدید"}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="نام مشتری"
          placeholder="مثال: علی احمدی"
          error={errors.customerName?.message}
          {...register("customerName")}
        />
        <Input
          label="مبلغ (تومان)"
          type="number"
          error={errors.total?.message}
          {...register("total", { valueAsNumber: true })}
        />
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-slate-600 dark:text-slate-300">وضعیت سفارش</span>
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            {...register("status")}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status?.message ? (
            <span className="text-xs text-red-500">{errors.status.message}</span>
          ) : null}
        </label>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
          </Button>
          {onCancel ? (
            <Button type="button" variant="secondary" onClick={onCancel}>
              انصراف
            </Button>
          ) : null}
        </div>
      </form>
    </Card>
  );
};

export default OrderForm;
```

---

## 6. Example Chart (Recharts)

### `src/features/dashboard/components/OrdersChart.tsx`
```tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { OrdersChartPoint } from "../../../shared/types/dashboard";
import Card from "../../../shared/components/ui/Card";

const OrdersChart = ({ data }: { data: OrdersChartPoint[] }) => {
  return (
    <Card title="روند سفارش‌ها" description="نمای کلی سفارش‌های هفت روز گذشته">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, left: 0, right: 12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: "#e2e8f0",
                fontFamily: "inherit",
              }}
            />
            <Line type="monotone" dataKey="orders" stroke="#4f46e5" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#0f766e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default OrdersChart;
```

---

## 7. RTL + Tailwind Setup Notes

### Tailwind + RTL
- Use **logical CSS** and set global `direction: rtl`.
- If you need stronger RTL control, consider adding an RTL plugin later.

`src/styles/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: "IRANSans", "Vazirmatn", system-ui, sans-serif;
  direction: rtl;
}
```

> Tip: This setup is already **Persian-friendly** (RTL + Persian typography).

---

## 8. Clean Code Principles Applied
- Feature-driven design
- Small reusable UI components
- Hooks for business logic
- Dedicated validation schemas
- Strong TypeScript typing
- Clear folder separation (API / UI / Logic)

---

✅ This structure is optimized for **freelancing delivery** (Kaarlancer-ready), scalable, and easy to maintain.
