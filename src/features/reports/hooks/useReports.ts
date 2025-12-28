import React from "react";
import { getReports } from "../api/reportsApi";
import type { ReportSummary, SalesReportPoint, TopProduct } from "../../../shared/types/reports";

export const useReports = () => {
  const [summary, setSummary] = React.useState<ReportSummary | null>(null);
  const [points, setPoints] = React.useState<SalesReportPoint[]>([]);
  const [topProducts, setTopProducts] = React.useState<TopProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getReports();
      setSummary(response.summary);
      setPoints(response.points);
      setTopProducts(response.topProducts);
    } catch {
      setError("دریافت گزارش‌ها با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return { summary, points, topProducts, loading, error, reload: load };
};
