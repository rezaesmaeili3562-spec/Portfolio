import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import Button from "../../../shared/components/ui/Button";
import DataTable from "../../../shared/components/ui/DataTable";
import Badge from "../../../shared/components/ui/Badge";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { formatDate } from "../../../shared/utils/formatters";
import { useInventory } from "../hooks/useInventory";
import type { InventoryItem, StockMovement } from "../../../shared/types/inventory";

const InventoryPage = () => {
  const { inventory, movements, loading, error, reload } = useInventory();

  const inventoryColumns = React.useMemo<ColumnDef<InventoryItem>[]>(
    () => [
      { header: "محصول", accessorKey: "productName" },
      { header: "SKU", accessorKey: "sku" },
      { header: "موجودی", accessorKey: "stock" },
      {
        header: "رزرو",
        accessorKey: "reserved",
      },
      {
        header: "حد سفارش مجدد",
        accessorKey: "reorderLevel",
      },
      {
        header: "وضعیت",
        cell: ({ row }) => (
          <Badge tone={row.original.stock <= row.original.reorderLevel ? "danger" : "success"}>
            {row.original.stock <= row.original.reorderLevel ? "کمبود" : "نرمال"}
          </Badge>
        ),
      },
    ],
    []
  );

  const movementColumns = React.useMemo<ColumnDef<StockMovement>[]>(
    () => [
      { header: "محصول", accessorKey: "productName" },
      {
        header: "نوع",
        cell: ({ row }) => (
          <Badge tone={row.original.type === "in" ? "success" : "warning"}>
            {row.original.type === "in" ? "ورودی" : "خروجی"}
          </Badge>
        ),
      },
      { header: "تعداد", accessorKey: "quantity" },
      { header: "تاریخ", cell: ({ row }) => formatDate(row.original.createdAt) },
      { header: "توضیحات", accessorKey: "note" },
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
        title="مدیریت موجودی"
        description="کنترل موجودی، هشدارها و تاریخچه تغییرات"
        action={<Button>به‌روزرسانی دستی</Button>}
      />

      <Card title="لیست موجودی">
        <DataTable data={inventory} columns={inventoryColumns} />
      </Card>

      <Card title="تاریخچه ورود و خروج">
        <DataTable data={movements} columns={movementColumns} />
      </Card>
    </div>
  );
};

export default InventoryPage;
