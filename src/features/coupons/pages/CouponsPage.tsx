import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import DataTable from "../../../shared/components/ui/DataTable";
import Badge from "../../../shared/components/ui/Badge";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { useCoupons } from "../hooks/useCoupons";
import type { Coupon } from "../../../shared/types/coupons";

const CouponsPage = () => {
  const { coupons, loading, error, reload } = useCoupons();
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    return coupons.filter((coupon) => coupon.code.toLowerCase().includes(query.toLowerCase()));
  }, [coupons, query]);

  const columns = React.useMemo<ColumnDef<Coupon>[]>(
    () => [
      { header: "کد", accessorKey: "code" },
      {
        header: "نوع تخفیف",
        cell: ({ row }) => (row.original.type === "percentage" ? "درصدی" : "مبلغ ثابت"),
      },
      { header: "مقدار", accessorKey: "value" },
      { header: "تاریخ انقضا", accessorKey: "expiryDate" },
      { header: "سقف استفاده", accessorKey: "usageLimit" },
      {
        header: "وضعیت",
        cell: ({ row }) => (
          <Badge
            tone={
              row.original.status === "active"
                ? "success"
                : row.original.status === "scheduled"
                ? "info"
                : "danger"
            }
          >
            {row.original.status === "active"
              ? "فعال"
              : row.original.status === "scheduled"
              ? "زمان‌بندی"
              : "منقضی"}
          </Badge>
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
      <PageHeader
        title="مدیریت کوپن‌ها"
        description="ایجاد و مدیریت کدهای تخفیف"
        action={
          <Link to="/coupons/new">
            <Button>ایجاد کوپن</Button>
          </Link>
        }
      />

      <Card>
        <Input
          label="جستجوی کوپن"
          placeholder="کد تخفیف"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Card>

      <Card title="لیست کوپن‌ها" description="کوپن‌های فعال و زمان‌بندی شده">
        <DataTable data={filtered} columns={columns} />
      </Card>
    </div>
  );
};

export default CouponsPage;
