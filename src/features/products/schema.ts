import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "نام محصول الزامی است"),
  category: z.string().min(2, "دسته‌بندی را انتخاب کنید"),
  price: z.number().min(1000, "قیمت باید معتبر باشد"),
  discountPrice: z.number().optional(),
  stock: z.number().min(0, "موجودی نمی‌تواند منفی باشد"),
  sku: z.string().min(3, "کد SKU الزامی است"),
  status: z.enum(["active", "inactive"]),
  shortDescription: z.string().min(10, "توضیح کوتاه الزامی است"),
  description: z.string().min(20, "توضیح کامل الزامی است"),
  specs: z.array(z.string().min(3, "مشخصه معتبر وارد کنید")),
  attributes: z.array(
    z.object({
      label: z.string().min(2, "عنوان ویژگی الزامی است"),
      value: z.string().min(1, "مقدار ویژگی الزامی است"),
    })
  ),
});

export type ProductFormValues = z.infer<typeof productSchema>;
