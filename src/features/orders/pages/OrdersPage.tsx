import React from "react";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import Select from "../../../shared/components/ui/Select";
import Input from "../../../shared/components/ui/Input";
import DataTable from "../../../shared/components/ui/DataTable";
import Badge from "../../../shared/components/ui/Badge";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { formatCurrency, formatDate } from "../../../shared/utils/formatters";
import { useOrders } from "../hooks/useOrders";
import type { Order } from "../../../shared/types/orders";

const OrdersPage = () => {
  const { orders, loading, error, reload } = useOrders();
  const [status, setStatus] = React.useState("all");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = status === "all" ? true : order.status === status;
      const matchesQuery =
        order.id.toLowerCase().includes(query.toLowerCase()) ||
        order.customerName.includes(query) ||
        order.customerEmail.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [orders, status, query]);

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        header: "شناسه",
        accessorKey: "id",
      },
      {
        header: "مشتری",
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{row.original.customerName}</p>
            <p className="text-xs text-slate-500">{row.original.customerEmail}</p>
          </div>
        ),
      },
      {
        header: "تاریخ",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        header: "مبلغ",
        cell: ({ row }) => formatCurrency(row.original.total),
      },
      {
        header: "پرداخت",
        cell: ({ row }) => {
          const status = row.original.paymentStatus;
          const tone = status === "paid" ? "success" : status === "refunded" ? "danger" : "warning";
          const label =
            status === "paid" ? "پرداخت شده" : status === "refunded" ? "بازگشت وجه" : "در انتظار";
          return <Badge tone={tone}>{label}</Badge>;
        },
      },
      {
        header: "ارسال",
        cell: ({ row }) => {
          const status = row.original.shippingStatus;
          const tone =
            status === "delivered"
              ? "success"
              : status === "returned"
              ? "danger"
              : status === "preparing"
              ? "warning"
              : "info";

          const label =
            status === "delivered"
              ? "تحویل"
              : status === "returned"
              ? "مرجوعی"
              : status === "preparing"
              ? "آماده‌سازی"
              : "ارسال شده";

          return <Badge tone={tone}>{label}</Badge>;
        },
      },
      {
        header: "جزئیات",
        cell: ({ row }) => (
          <Link
            to={`/orders/${row.original.id}`}
            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500"
          >
            مشاهده <HiOutlineArrowTopRightOnSquare />
          </Link>
        ),
      },
    ],
    []
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={reload} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="مدیریت سفارش‌ها" description="فیلتر و مدیریت سفارش‌های فروشگاه" />

      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="جستجو"
            placeholder="شناسه یا نام مشتری"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Select label="وضعیت سفارش" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">همه</option>
            <option value="pending">در انتظار</option>
            <option value="processing">در حال پردازش</option>
            <option value="completed">تکمیل شده</option>
            <option value="cancelled">لغو شده</option>
          </Select>
        </div>
      </Card>

      <Card title="لیست سفارش‌ها" description="آخرین سفارش‌های ثبت شده">
        <DataTable data={filtered} columns={columns} />
      </Card>
    </div>
  );
};

export default OrdersPage;
