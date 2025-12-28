import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import Input from "../../../shared/components/ui/Input";
import Select from "../../../shared/components/ui/Select";
import PageHeader from "../../../shared/components/ui/PageHeader";
import { couponSchema, type CouponFormValues } from "../schema";
import { useCoupons } from "../hooks/useCoupons";

const CouponFormPage = () => {
  const navigate = useNavigate();
  const { addCoupon } = useCoupons();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      type: "percentage",
      value: 10,
      minPurchase: 0,
      expiryDate: "",
      usageLimit: 100,
      status: "active",
    },
  });

  const onSubmit = async (values: CouponFormValues) => {
    await addCoupon(values);
    navigate("/coupons");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="ایجاد کوپن جدید" description="اطلاعات تخفیف را وارد کنید" />

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card title="مشخصات کوپن">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="کد" error={errors.code?.message} {...register("code")} />
            <Select label="نوع تخفیف" {...register("type")}
            >
              <option value="percentage">درصدی</option>
              <option value="fixed">مبلغ ثابت</option>
            </Select>
            <Input
              label="مقدار"
              type="number"
              error={errors.value?.message}
              {...register("value", { valueAsNumber: true })}
            />
            <Input
              label="حداقل خرید"
              type="number"
              error={errors.minPurchase?.message}
              {...register("minPurchase", { valueAsNumber: true })}
            />
            <Input
              label="تاریخ انقضا"
              type="date"
              error={errors.expiryDate?.message}
              {...register("expiryDate")}
            />
            <Input
              label="سقف استفاده"
              type="number"
              error={errors.usageLimit?.message}
              {...register("usageLimit", { valueAsNumber: true })}
            />
            <Select label="وضعیت" {...register("status")}>
              <option value="active">فعال</option>
              <option value="scheduled">زمان‌بندی</option>
              <option value="expired">منقضی</option>
            </Select>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "در حال ذخیره..." : "ذخیره کوپن"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/coupons")}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CouponFormPage;
