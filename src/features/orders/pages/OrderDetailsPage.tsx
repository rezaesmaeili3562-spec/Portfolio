import React from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import Badge from "../../../shared/components/ui/Badge";
import Select from "../../../shared/components/ui/Select";
import Button from "../../../shared/components/ui/Button";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { formatCurrency, formatDate } from "../../../shared/utils/formatters";
import { getOrder } from "../api/ordersApi";
import type { Order } from "../../../shared/types/orders";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = React.useState<Order | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<Order["status"]>("pending");

  React.useEffect(() => {
    const load = async () => {
      if (!orderId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await getOrder(orderId);
        if (response) {
          setOrder(response);
          setStatus(response.status);
        }
      } catch {
        setError("دریافت جزئیات سفارش با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [orderId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !order) {
    return <ErrorState message={error ?? "سفارش یافت نشد."} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`جزئیات سفارش ${order.id}`}
        description="اطلاعات مشتری و وضعیت ارسال"
        action={
          <Link to="/orders">
            <Button variant="secondary">بازگشت به لیست</Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card title="اقلام سفارش" description="جزئیات محصولات خریداری شده">
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-none">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.productName}</p>
                  <p className="text-xs text-slate-500">تعداد: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="خلاصه پرداخت" description="روش پرداخت و وضعیت فعلی">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>مبلغ کل</span>
              <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(order.total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>روش پرداخت</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>وضعیت پرداخت</span>
              <Badge tone={order.paymentStatus === "paid" ? "success" : "warning"}>
                {order.paymentStatus === "paid" ? "پرداخت شده" : "در انتظار"}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <Select label="به‌روزرسانی وضعیت سفارش" value={status} onChange={(event) => setStatus(event.target.value as Order["status"])}>
              <option value="pending">در انتظار</option>
              <option value="processing">در حال پردازش</option>
              <option value="completed">تکمیل شده</option>
              <option value="cancelled">لغو شده</option>
            </Select>
            <Button className="mt-3 w-full">ثبت تغییرات</Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="اطلاعات مشتری">
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <span className="font-medium text-slate-900 dark:text-white">{order.customerName}</span>
            </p>
            <p>{order.customerEmail}</p>
            <p>{order.shippingAddress}</p>
            <p>تاریخ ثبت: {formatDate(order.createdAt)}</p>
          </div>
        </Card>

        <Card title="تاریخچه وضعیت">
          <ol className="space-y-3 text-sm">
            {order.history.map((event) => (
              <li key={event.id} className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{event.status}</p>
                  {event.note ? <p className="text-xs text-slate-500">{event.note}</p> : null}
                </div>
                <span className="text-xs text-slate-400">{formatDate(event.createdAt)}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
