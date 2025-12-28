import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { ColumnDef } from "@tanstack/react-table";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import Button from "../../../shared/components/ui/Button";
import DataTable from "../../../shared/components/ui/DataTable";
import Badge from "../../../shared/components/ui/Badge";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { formatCurrency } from "../../../shared/utils/formatters";
import { useReports } from "../hooks/useReports";
import type { SalesReportPoint, TopProduct } from "../../../shared/types/reports";

const ReportsPage = () => {
  const { summary, points, topProducts, loading, error, reload } = useReports();
  const [range, setRange] = React.useState("weekly");

  const columns = React.useMemo<ColumnDef<TopProduct>[]>(
    () => [
      { header: "محصول", accessorKey: "name" },
      {
        header: "درآمد",
        cell: ({ row }) => formatCurrency(row.original.revenue),
      },
      { header: "تعداد فروش", accessorKey: "units" },
      {
        header: "عملکرد",
        cell: ({ row }) => (
          <Badge tone={row.original.units > 80 ? "success" : "info"}>
            {row.original.units > 80 ? "پرفروش" : "متوسط"}
          </Badge>
        ),
      },
    ],
    []
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error || !summary) {
    return <ErrorState message={error ?? "گزارشی یافت نشد."} onRetry={reload} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="گزارش‌ها"
        description="تحلیل فروش، کاربران فعال و محصولات پرفروش"
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">خروجی Excel</Button>
            <Button variant="secondary">خروجی PDF</Button>
          </div>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 text-sm">
            {["daily", "weekly", "monthly", "yearly"].map((item) => (
              <button
                key={item}
                type="button"
                className={`rounded-full px-3 py-1 text-xs ${
                  range === item
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200"
                }`}
                onClick={() => setRange(item)}
              >
                {item === "daily"
                  ? "روزانه"
                  : item === "weekly"
                  ? "هفتگی"
                  : item === "monthly"
                  ? "ماهانه"
                  : "سالانه"}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500">گزارش بر اساس بازه {range}</span>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm text-slate-500">کل درآمد</p>
          <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            {formatCurrency(summary.totalRevenue)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">کل سفارش‌ها</p>
          <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            {summary.totalOrders}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">مشتریان بازگشتی</p>
          <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            {summary.returningCustomers}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">نرخ تبدیل</p>
          <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            {summary.conversionRate}%
          </p>
        </Card>
      </div>

      <Card title="نمودار فروش">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={points as SalesReportPoint[]} margin={{ top: 10, left: 0, right: 12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
              <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="محصولات پرفروش">
        <DataTable data={topProducts} columns={columns} />
      </Card>
    </div>
  );
};

export default ReportsPage;
