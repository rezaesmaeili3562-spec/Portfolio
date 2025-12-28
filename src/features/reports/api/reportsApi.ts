import { http } from "../../../api/http";
import type { ReportSummary, SalesReportPoint, TopProduct } from "../../../shared/types/reports";

export type ReportsResponse = {
  summary: ReportSummary;
  points: SalesReportPoint[];
  topProducts: TopProduct[];
};

export const getReports = async (): Promise<ReportsResponse> => {
  const response = await http.get<ReportsResponse>("/reports");
  return response.data;
};
