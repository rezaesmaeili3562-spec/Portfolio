import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(3, "نام مشتری الزامی است"),
  customerEmail: z.string().email("ایمیل معتبر وارد کنید"),
  total: z
    .number({ invalid_type_error: "مبلغ باید عدد باشد" })
    .min(10000, "مبلغ باید حداقل ۱۰,۰۰۰ تومان باشد"),
  status: z.enum(["pending", "processing", "completed", "cancelled"], {
    required_error: "وضعیت سفارش الزامی است",
  }),
  paymentStatus: z.enum(["paid", "pending", "refunded"], {
    required_error: "وضعیت پرداخت الزامی است",
  }),
  shippingStatus: z.enum(["preparing", "shipped", "delivered", "returned"], {
    required_error: "وضعیت ارسال الزامی است",
  }),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
