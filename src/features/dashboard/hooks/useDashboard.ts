import React from "react";
import { getDashboardOverview } from "../api/dashboardApi";
import type { DashboardResponse } from "../api/dashboardApi";

export const useDashboard = () => {
  const [data, setData] = React.useState<DashboardResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDashboardOverview();
      setData(response);
    } catch {
      setError("دریافت اطلاعات داشبورد با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    loading,
    error,
    reload: load,
  };
};
