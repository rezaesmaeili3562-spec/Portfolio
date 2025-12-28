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
