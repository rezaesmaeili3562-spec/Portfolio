import { http } from "../../../api/http";
import type { DashboardStat, OrdersChartPoint } from "../../../shared/types/dashboard";

export type DashboardResponse = {
  stats: DashboardStat[];
  chartData: OrdersChartPoint[];
};

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await http.get<DashboardResponse>("/dashboard/stats");
  return response.data;
};
