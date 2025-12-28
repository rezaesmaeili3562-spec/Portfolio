import React from "react";
import { getDashboard } from "../api/dashboardApi";
import type { DashboardStat, OrdersChartPoint } from "../../../shared/types/dashboard";

export const useDashboard = () => {
  const [stats, setStats] = React.useState<DashboardStat[]>([]);
  const [chartData, setChartData] = React.useState<OrdersChartPoint[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDashboard();
      setStats(response.stats);
      setChartData(response.chartData);
    } catch {
      setError("دریافت داده‌های داشبورد ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return {
    stats,
    chartData,
    loading,
    error,
    reload: load,
  };
};
