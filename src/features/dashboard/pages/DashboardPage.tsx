import Card from "../../../shared/components/ui/Card";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import OrdersChart from "../components/OrdersChart";
import { useDashboard } from "../hooks/useDashboard";

const DashboardPage = () => {
  const { stats, chartData, loading, error, reload } = useDashboard();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={reload} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold">{item.value}</p>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">{item.trend}</p>
          </Card>
        ))}
      </div>
      <OrdersChart data={chartData} />
    </div>
  );
};

export default DashboardPage;
