import React from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import Avatar from "../../../shared/components/ui/Avatar";
import Select from "../../../shared/components/ui/Select";
import Button from "../../../shared/components/ui/Button";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { formatCurrency, formatDate } from "../../../shared/utils/formatters";
import { getUser } from "../api/usersApi";
import type { User } from "../../../shared/types/users";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [role, setRole] = React.useState<User["role"]>("viewer");
  const [status, setStatus] = React.useState<User["status"]>("active");

  React.useEffect(() => {
    const load = async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await getUser(userId);
        if (response) {
          setUser(response);
          setRole(response.role);
          setStatus(response.status);
        }
      } catch {
        setError("دریافت اطلاعات کاربر با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !user) {
    return <ErrorState message={error ?? "کاربر یافت نشد."} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`پروفایل ${user.name}`}
        description="نمای کلی اطلاعات و سفارش‌های کاربر"
        action={
          <Link to="/users">
            <Button variant="secondary">بازگشت</Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card title="اطلاعات کاربر">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} src={user.avatarUrl} className="h-14 w-14" />
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
              <p className="text-xs text-slate-400">عضویت: {formatDate(user.joinedAt)}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Select label="نقش" value={role} onChange={(event) => setRole(event.target.value as User["role"])}>
              <option value="admin">ادمین</option>
              <option value="manager">مدیر</option>
              <option value="support">پشتیبانی</option>
              <option value="viewer">مشاهده‌گر</option>
            </Select>
            <Select label="وضعیت" value={status} onChange={(event) => setStatus(event.target.value as User["status"])}>
              <option value="active">فعال</option>
              <option value="invited">دعوت شده</option>
              <option value="suspended">معلق</option>
            </Select>
          </div>
          <Button className="mt-4">ذخیره تغییرات</Button>
        </Card>

        <Card title="آدرس‌ها">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {user.addresses.map((address) => (
              <div key={address.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                <p className="font-medium text-slate-900 dark:text-white">{address.title}</p>
                <p className="text-xs text-slate-500">{address.address}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="سوابق سفارش‌ها" description="سفارش‌های اخیر کاربر">
        <div className="space-y-3">
          {user.orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-none">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{order.id}</p>
                <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {formatCurrency(order.total)}
              </p>
              <span className="text-xs text-slate-500">{order.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserDetailsPage;
