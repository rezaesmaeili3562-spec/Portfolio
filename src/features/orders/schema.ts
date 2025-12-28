import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(3, "نام مشتری الزامی است"),
  total: z
    .number({ invalid_type_error: "مبلغ باید عدد باشد" })
    .min(10000, "مبلغ باید حداقل ۱۰,۰۰۰ تومان باشد"),
  status: z.enum(["pending", "processing", "delivered", "cancelled"], {
    required_error: "وضعیت سفارش الزامی است",
  }),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
