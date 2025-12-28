import { http } from "../../../api/http";
import type {
  ActivityItem,
  CategoryPerformance,
  DashboardStat,
  MonthlySalesPoint,
} from "../../../shared/types/dashboard";
import type { Order } from "../../../shared/types/orders";
import type { Product } from "../../../shared/types/products";

export type DashboardResponse = {
  stats: DashboardStat[];
  monthlySales: MonthlySalesPoint[];
  categoryPerformance: CategoryPerformance[];
  latestOrders: Order[];
  lowStock: Product[];
  activities: ActivityItem[];
};

export const getDashboardOverview = async (): Promise<DashboardResponse> => {
  const response = await http.get<DashboardResponse>("/dashboard/overview");
  return response.data;
};
