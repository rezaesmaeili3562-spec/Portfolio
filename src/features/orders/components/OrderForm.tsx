import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import Card from "../../../shared/components/ui/Card";
import { orderSchema, type OrderFormValues } from "../schema";
import type { Order } from "../../../shared/types/orders";

const statusOptions = [
  { value: "pending", label: "در انتظار" },
  { value: "processing", label: "در حال پردازش" },
  { value: "completed", label: "تکمیل شده" },
  { value: "cancelled", label: "لغو شده" },
] as const;

const paymentOptions = [
  { value: "paid", label: "پرداخت شده" },
  { value: "pending", label: "در انتظار" },
  { value: "refunded", label: "بازگشت وجه" },
] as const;

const shippingOptions = [
  { value: "preparing", label: "آماده‌سازی" },
  { value: "shipped", label: "ارسال شده" },
  { value: "delivered", label: "تحویل شده" },
  { value: "returned", label: "مرجوعی" },
] as const;

type OrderFormProps = {
  initialValues?: Order;
  onSubmit: (values: OrderFormValues) => void | Promise<void>;
  onCancel?: () => void;
};

const OrderForm = ({ initialValues, onSubmit, onCancel }: OrderFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialValues
      ? {
        customerName: initialValues.customerName,
        customerEmail: initialValues.customerEmail,
        total: initialValues.total,
        status: initialValues.status,
        paymentStatus: initialValues.paymentStatus,
        shippingStatus: initialValues.shippingStatus,
      }
    : {
        customerName: "",
        customerEmail: "",
        total: 0,
        status: "pending",
        paymentStatus: "pending",
        shippingStatus: "preparing",
      },
  });

  return (
    <Card title={initialValues ? "ویرایش سفارش" : "ثبت سفارش جدید"}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="نام مشتری"
          placeholder="مثال: علی احمدی"
          error={errors.customerName?.message}
          {...register("customerName")}
        />
        <Input
          label="ایمیل مشتری"
          placeholder="ali@example.com"
          error={errors.customerEmail?.message}
          {...register("customerEmail")}
        />
        <Input
          label="مبلغ (تومان)"
          type="number"
          error={errors.total?.message}
          {...register("total", { valueAsNumber: true })}
        />
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-slate-600 dark:text-slate-300">وضعیت سفارش</span>
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            {...register("status")}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status?.message ? (
            <span className="text-xs text-red-500">{errors.status.message}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-slate-600 dark:text-slate-300">وضعیت پرداخت</span>
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            {...register("paymentStatus")}
          >
            {paymentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.paymentStatus?.message ? (
            <span className="text-xs text-red-500">{errors.paymentStatus.message}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-slate-600 dark:text-slate-300">وضعیت ارسال</span>
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            {...register("shippingStatus")}
          >
            {shippingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.shippingStatus?.message ? (
            <span className="text-xs text-red-500">{errors.shippingStatus.message}</span>
          ) : null}
        </label>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
          </Button>
          {onCancel ? (
            <Button type="button" variant="secondary" onClick={onCancel}>
              انصراف
            </Button>
          ) : null}
        </div>
      </form>
    </Card>
  );
};

export default OrderForm;
