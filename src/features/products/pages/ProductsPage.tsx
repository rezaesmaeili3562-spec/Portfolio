import React from "react";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import Select from "../../../shared/components/ui/Select";
import DataTable from "../../../shared/components/ui/DataTable";
import Badge from "../../../shared/components/ui/Badge";
import PageHeader from "../../../shared/components/ui/PageHeader";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { formatCurrency } from "../../../shared/utils/formatters";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../../../shared/types/products";

const ProductsPage = () => {
  const { products, loading, error, reload } = useProducts();
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");

  const filtered = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.includes(search) ||
        product.category.includes(search) ||
        product.sku.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" ? true : product.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [products, search, status]);

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: "تصویر",
        cell: ({ row }) => (
          <img
            src={row.original.images[0]?.url}
            alt={row.original.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ),
      },
      {
        header: "نام محصول",
        accessorKey: "name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{row.original.name}</p>
            <p className="text-xs text-slate-500">{row.original.sku}</p>
          </div>
        ),
      },
      { header: "دسته‌بندی", accessorKey: "category" },
      {
        header: "قیمت",
        cell: ({ row }) => formatCurrency(row.original.price),
      },
      {
        header: "موجودی",
        accessorKey: "stock",
      },
      {
        header: "وضعیت",
        cell: ({ row }) => (
          <Badge tone={row.original.status === "active" ? "success" : "neutral"}>
            {row.original.status === "active" ? "فعال" : "غیرفعال"}
          </Badge>
        ),
      },
      {
        header: "عملیات",
        cell: ({ row }) => (
          <Link
            to={`/products/${row.original.id}`}
            className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-500"
          >
            <HiOutlinePencilSquare /> ویرایش
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
      <PageHeader
        title="مدیریت محصولات"
        description="لیست محصولات، جستجو و فیلترهای پیشرفته"
        action={
          <Link to="/products/new">
            <Button>افزودن محصول</Button>
          </Link>
        }
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
          <Input
            label="جستجو"
            placeholder="نام، دسته‌بندی یا SKU"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Select label="وضعیت" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">همه</option>
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
          </Select>
        </div>
      </Card>

      <Card title="لیست محصولات" description="نمای کلی محصولات فروشگاه">
        <DataTable data={filtered} columns={columns} />
      </Card>
    </div>
  );
};

export default ProductsPage;
