export type DashboardStat = {
  label: string;
  value: string;
  trend: string;
  tone: "positive" | "negative" | "neutral";
};

export type MonthlySalesPoint = {
  month: string;
  revenue: number;
  orders: number;
};

export type CategoryPerformance = {
  category: string;
  value: number;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
};
