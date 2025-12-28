import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../../app/providers/ThemeProvider";
import Button from "../components/ui/Button";

const navItems = [
  { label: "داشبورد", to: "/dashboard" },
  { label: "سفارش‌ها", to: "/orders" },
  { label: "مشتریان", to: "/customers" },
];

const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className="w-64 border-e border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-xl font-semibold">پنل مدیریت سفارشات</h1>
          <nav className="mt-8 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">خوش آمدید، مدیر سیستم</p>
            <Button variant="ghost" onClick={toggleTheme}>
              حالت {theme === "dark" ? "روشن" : "تاریک"}
            </Button>
          </header>
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
