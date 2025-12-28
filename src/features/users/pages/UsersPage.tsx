import React from "react";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import Input from "../../../shared/components/ui/Input";
import Select from "../../../shared/components/ui/Select";
import DataTable from "../../../shared/components/ui/DataTable";
import Badge from "../../../shared/components/ui/Badge";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { formatDate } from "../../../shared/utils/formatters";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../../../shared/types/users";

const UsersPage = () => {
  const { users, loading, error, reload } = useUsers();
  const [query, setQuery] = React.useState("");
  const [role, setRole] = React.useState("all");

  const filtered = React.useMemo(() => {
    return users.filter((user) => {
      const matchesQuery = user.name.includes(query) || user.email.includes(query);
      const matchesRole = role === "all" ? true : user.role === role;
      return matchesQuery && matchesRole;
    });
  }, [users, query, role]);

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "کاربر",
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{row.original.name}</p>
            <p className="text-xs text-slate-500">{row.original.email}</p>
          </div>
        ),
      },
      {
        header: "نقش",
        accessorKey: "role",
      },
      {
        header: "تاریخ عضویت",
        cell: ({ row }) => formatDate(row.original.joinedAt),
      },
      {
        header: "وضعیت",
        cell: ({ row }) => (
          <Badge tone={row.original.status === "active" ? "success" : "warning"}>
            {row.original.status === "active" ? "فعال" : row.original.status === "invited" ? "دعوت شده" : "معلق"}
          </Badge>
        ),
      },
      {
        header: "جزئیات",
        cell: ({ row }) => (
          <Link to={`/users/${row.original.id}`} className="text-indigo-600 hover:text-indigo-500">
            مشاهده
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
      <PageHeader title="مدیریت کاربران" description="نمای کلی کاربران و نقش‌ها" />

      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="جستجو" value={query} onChange={(event) => setQuery(event.target.value)} />
          <Select label="نقش" value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="all">همه</option>
            <option value="admin">ادمین</option>
            <option value="manager">مدیر</option>
            <option value="support">پشتیبانی</option>
            <option value="viewer">مشاهده‌گر</option>
          </Select>
        </div>
      </Card>

      <Card title="لیست کاربران" description="کاربران فعال سیستم">
        <DataTable data={filtered} columns={columns} />
      </Card>
    </div>
  );
};

export default UsersPage;
