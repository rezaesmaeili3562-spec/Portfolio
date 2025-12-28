import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().min(3, "کد کوپن الزامی است"),
  type: z.enum(["percentage", "fixed"]),
  value: z.number().min(1, "مقدار تخفیف معتبر نیست"),
  minPurchase: z.number().min(0, "حداقل خرید نامعتبر است"),
  expiryDate: z.string().min(1, "تاریخ انقضا الزامی است"),
  usageLimit: z.number().min(1, "سقف استفاده باید بزرگتر از صفر باشد"),
  status: z.enum(["active", "expired", "scheduled"]),
});

export type CouponFormValues = z.infer<typeof couponSchema>;
