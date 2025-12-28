import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../shared/layouts/DashboardLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import OrdersPage from "../features/orders/pages/OrdersPage";
import OrderDetailsPage from "../features/orders/pages/OrderDetailsPage";
import ProductsPage from "../features/products/pages/ProductsPage";
import ProductFormPage from "../features/products/pages/ProductFormPage";
import UsersPage from "../features/users/pages/UsersPage";
import UserDetailsPage from "../features/users/pages/UserDetailsPage";
import CategoriesPage from "../features/categories/pages/CategoriesPage";
import CouponsPage from "../features/coupons/pages/CouponsPage";
import CouponFormPage from "../features/coupons/pages/CouponFormPage";
import InventoryPage from "../features/inventory/pages/InventoryPage";
import ReportsPage from "../features/reports/pages/ReportsPage";
import SettingsPage from "../features/settings/pages/SettingsPage";
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
      { path: "products", element: <ProductsPage /> },
      { path: "products/new", element: <ProductFormPage /> },
      { path: "products/:productId", element: <ProductFormPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "orders/:orderId", element: <OrderDetailsPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "users/:userId", element: <UserDetailsPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "coupons", element: <CouponsPage /> },
      { path: "coupons/new", element: <CouponFormPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
