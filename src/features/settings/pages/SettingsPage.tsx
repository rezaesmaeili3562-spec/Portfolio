import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import Input from "../../../shared/components/ui/Input";
import TextArea from "../../../shared/components/ui/TextArea";
import Button from "../../../shared/components/ui/Button";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { useSettings } from "../hooks/useSettings";
import type { StoreSettings } from "../../../shared/types/settings";

const settingsSchema = z.object({
  storeName: z.string().min(3, "نام فروشگاه الزامی است"),
  storeEmail: z.string().email("ایمیل معتبر وارد کنید"),
  phone: z.string().min(6, "شماره تماس الزامی است"),
  address: z.string().min(10, "آدرس کامل لازم است"),
  logoUrl: z.string().url("آدرس لوگو معتبر نیست"),
  socials: z.array(
    z.object({
      label: z.string().min(2, "عنوان شبکه اجتماعی الزامی است"),
      url: z.string().url("آدرس شبکه اجتماعی معتبر نیست"),
    })
  ),
  taxRate: z.number().min(0, "نرخ مالیات معتبر نیست"),
  bankAccount: z.string().min(6, "شماره حساب معتبر نیست"),
  shippingPolicy: z.string().min(10, "قانون ارسال را وارد کنید"),
  paymentGateway: z.string().min(2, "درگاه پرداخت الزامی است"),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const SettingsPage = () => {
  const { settings, loading, error, reload, saveSettings } = useSettings();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings ?? undefined,
  });

  React.useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [reset, settings]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const onSubmit = async (values: SettingsFormValues) => {
    await saveSettings(values as StoreSettings);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !settings) {
    return <ErrorState message={error ?? "تنظیمات یافت نشد."} onRetry={reload} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="تنظیمات فروشگاه" description="مدیریت اطلاعات عمومی و مالی" />

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card title="اطلاعات عمومی">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="نام فروشگاه" error={errors.storeName?.message} {...register("storeName")} />
            <Input label="ایمیل" error={errors.storeEmail?.message} {...register("storeEmail")} />
            <Input label="شماره تماس" error={errors.phone?.message} {...register("phone")} />
            <Input label="لوگو" error={errors.logoUrl?.message} {...register("logoUrl")} />
            <TextArea label="آدرس" error={errors.address?.message} {...register("address")} />
          </div>
        </Card>

        <Card title="شبکه‌های اجتماعی">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
                <Input
                  label="عنوان"
                  error={errors.socials?.[index]?.label?.message}
                  {...register(`socials.${index}.label` as const)}
                />
                <Input
                  label="آدرس"
                  error={errors.socials?.[index]?.url?.message}
                  {...register(`socials.${index}.url` as const)}
                />
                <Button type="button" variant="ghost" className="self-end" onClick={() => remove(index)}>
                  حذف
                </Button>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={() => append({ label: "", url: "" })}>
              افزودن شبکه اجتماعی
            </Button>
          </div>
        </Card>

        <Card title="تنظیمات مالی و ارسال">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="نرخ مالیات (%)"
              type="number"
              error={errors.taxRate?.message}
              {...register("taxRate", { valueAsNumber: true })}
            />
            <Input label="شماره حساب" error={errors.bankAccount?.message} {...register("bankAccount")} />
            <Input label="درگاه پرداخت" error={errors.paymentGateway?.message} {...register("paymentGateway")} />
            <TextArea
              label="سیاست ارسال"
              error={errors.shippingPolicy?.message}
              {...register("shippingPolicy")}
            />
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "در حال ذخیره..." : "ذخیره تنظیمات"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
