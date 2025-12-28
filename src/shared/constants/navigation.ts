import {
  HiOutlineChartPie,
  HiOutlineCube,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineSquares2X2,
  HiOutlineTicket,
  HiOutlineClipboardDocumentCheck,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

export const navigationItems = [
  { label: "داشبورد", to: "/dashboard", icon: HiOutlineChartPie },
  { label: "محصولات", to: "/products", icon: HiOutlineCube },
  { label: "سفارش‌ها", to: "/orders", icon: HiOutlineShoppingBag },
  { label: "کاربران", to: "/users", icon: HiOutlineUsers },
  { label: "دسته‌بندی‌ها", to: "/categories", icon: HiOutlineSquares2X2 },
  { label: "کوپن‌ها", to: "/coupons", icon: HiOutlineTicket },
  { label: "موجودی", to: "/inventory", icon: HiOutlineClipboardDocumentCheck },
  { label: "گزارش‌ها", to: "/reports", icon: HiOutlineChartBar },
  { label: "تنظیمات", to: "/settings", icon: HiOutlineCog6Tooth },
];
