import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineBell, HiOutlineMagnifyingGlass, HiOutlineMenu } from "react-icons/hi2";
import { useTheme } from "../../app/providers/ThemeProvider";
import { useAdminStore } from "../../app/providers/AdminStoreProvider";
import { navigationItems } from "../constants/navigation";
import Button from "../components/ui/Button";
import Avatar from "../components/ui/Avatar";

const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { state, dispatch } = useAdminStore();
  const unreadCount = state.notifications.filter((item) => !item.read).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 right-0 z-40 flex w-72 flex-col border-e border-slate-200 bg-white p-6 transition-transform dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${
            state.sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">پنل مدیریت فروشگاه</h1>
              <p className="text-xs text-slate-500">نسخه حرفه‌ای آنلاین</p>
            </div>
            <button
              type="button"
              className="lg:hidden"
              onClick={() => dispatch({ type: "close_sidebar" })}
            >
              ✕
            </button>
          </div>
          <nav className="mt-8 flex flex-1 flex-col gap-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                <item.icon className="text-lg" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 rounded-xl bg-indigo-50 p-4 text-xs text-slate-600 dark:bg-indigo-500/20 dark:text-slate-200">
            <p className="font-medium">راهنمای سریع</p>
            <p className="mt-1">آخرین نسخه داشبورد برای مدیریت چند فروشگاه آماده است.</p>
          </div>
        </aside>

        {state.sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => dispatch({ type: "close_sidebar" })}
          />
        ) : null}

        <main className="flex min-h-screen flex-1 flex-col lg:mr-72">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-200 lg:hidden"
                  onClick={() => dispatch({ type: "toggle_sidebar" })}
                  aria-label="باز کردن منو"
                >
                  <HiOutlineMenu />
                </button>
                <div className="relative hidden w-72 lg:block">
                  <HiOutlineMagnifyingGlass className="absolute right-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="جستجو در سفارش‌ها، محصولات و کاربران"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-2 text-sm text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="relative rounded-lg border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-200"
                  onClick={() => dispatch({ type: "mark_all_read" })}
                  aria-label="اعلان‌ها"
                >
                  <HiOutlineBell />
                  {unreadCount ? (
                    <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">
                      {unreadCount}
                    </span>
                  ) : null}
                </button>
                <Button variant="ghost" onClick={toggleTheme}>
                  حالت {theme === "dark" ? "روشن" : "تاریک"}
                </Button>
                <div className="flex items-center gap-3">
                  <Avatar name="مدیر سیستم" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100" />
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium">مدیر سیستم</p>
                    <p className="text-xs text-slate-500">admin@shop.com</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="flex-1 p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
