export type SalesReportPoint = {
  label: string;
  revenue: number;
  orders: number;
};

export type ReportSummary = {
  totalRevenue: number;
  totalOrders: number;
  returningCustomers: number;
  conversionRate: number;
};

export type TopProduct = {
  id: string;
  name: string;
  revenue: number;
  units: number;
};
