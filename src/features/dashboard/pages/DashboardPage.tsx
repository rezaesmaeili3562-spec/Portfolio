import Card from "../../../shared/components/ui/Card";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import StatCard from "../../../shared/components/ui/StatCard";
import Badge from "../../../shared/components/ui/Badge";
import MonthlySalesChart from "../components/MonthlySalesChart";
import CategoryChart from "../components/CategoryChart";
import { useDashboard } from "../hooks/useDashboard";
import { formatCurrency, formatDate } from "../../../shared/utils/formatters";
import PageHeader from "../../../shared/components/ui/PageHeader";

const DashboardPage = () => {
  const { data, loading, error, reload } = useDashboard();

  if (loading) {
    return <LoadingState />;
  }

  if (error || !data) {
    return <ErrorState message={error ?? "اطلاعاتی برای نمایش وجود ندارد."} onRetry={reload} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="نمای کلی فروشگاه"
        description="آخرین وضعیت فروش، سفارش‌ها و موجودی"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <MonthlySalesChart data={data.monthlySales} />
        <CategoryChart data={data.categoryPerformance} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card title="آخرین سفارش‌ها" description="۵ سفارش اخیر ثبت شده">
          <div className="space-y-4">
            {data.latestOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-none last:pb-0 dark:border-slate-800"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{order.id}</p>
                  <p className="text-xs text-slate-500">{order.customerName}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p>
                </div>
                <Badge
                  tone={
                    order.status === "completed"
                      ? "success"
                      : order.status === "cancelled"
                      ? "danger"
                      : "warning"
                  }
                >
                  {order.status === "completed"
                    ? "تکمیل شده"
                    : order.status === "processing"
                    ? "در حال پردازش"
                    : order.status === "pending"
                    ? "در انتظار"
                    : "لغو شده"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card title="هشدار موجودی" description="محصولات نزدیک به اتمام">
          <ul className="space-y-4">
            {data.lowStock.map((product) => (
              <li key={product.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{product.name}</p>
                  <p className="text-xs text-slate-500">کد کالا: {product.sku}</p>
                </div>
                <Badge tone="danger">{product.stock} عدد</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="رویدادهای اخیر" description="فعالیت‌های تیم و سیستم">
        <ol className="space-y-4">
          {data.activities.map((activity) => (
            <li key={activity.id} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.title}</p>
                <p className="text-xs text-slate-500">{activity.description}</p>
                <p className="text-xs text-slate-400">{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
};

export default DashboardPage;
