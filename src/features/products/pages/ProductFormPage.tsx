import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import Input from "../../../shared/components/ui/Input";
import TextArea from "../../../shared/components/ui/TextArea";
import Select from "../../../shared/components/ui/Select";
import PageHeader from "../../../shared/components/ui/PageHeader";
import { productSchema, type ProductFormValues } from "../schema";
import { useProducts } from "../hooks/useProducts";
import type { ProductPayload } from "../../../shared/types/products";
import { v4 as uuid } from "../../../shared/utils/uuid";

const categoryOptions = [
  "کفش ورزشی",
  "گجت پوشیدنی",
  "صوتی",
  "خانه",
  "زیبایی",
];

const ProductFormPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, editProduct } = useProducts();
  const existingProduct = products.find((product) => product.id === productId);

  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      discountPrice: undefined,
      stock: 0,
      sku: "",
      status: "active",
      shortDescription: "",
      description: "",
      specs: [""],
      attributes: [{ label: "", value: "" }],
    },
  });

  React.useEffect(() => {
    if (!existingProduct) {
      return;
    }

    reset({
      name: existingProduct.name,
      category: existingProduct.category,
      price: existingProduct.price,
      discountPrice: existingProduct.discountPrice,
      stock: existingProduct.stock,
      sku: existingProduct.sku,
      status: existingProduct.status,
      shortDescription: existingProduct.shortDescription,
      description: existingProduct.description,
      specs: existingProduct.specs,
      attributes: existingProduct.attributes,
    });
    setImagePreviews(existingProduct.images.map((image) => image.url));
  }, [existingProduct, reset]);

  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control,
    name: "specs",
  });

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    // In a real app, you'd upload the files. Here we generate preview URLs for mock UX.
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const onSubmit = async (values: ProductFormValues) => {
    const payload: ProductPayload = {
      ...values,
      images: imagePreviews.map((url) => ({ id: uuid(), url })),
    };

    if (existingProduct) {
      await editProduct(existingProduct.id, payload);
    } else {
      await addProduct(payload);
    }

    navigate("/products");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={existingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}
        description="اطلاعات محصول و موجودی را مدیریت کنید"
      />

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card title="اطلاعات پایه" description="نام، توضیحات و دسته‌بندی">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="نام محصول" error={errors.name?.message} {...register("name")} />
            <Select label="دسته‌بندی" error={errors.category?.message} {...register("category")}>
              <option value="">انتخاب کنید</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <TextArea
              label="توضیح کوتاه"
              error={errors.shortDescription?.message}
              {...register("shortDescription")}
            />
            <TextArea label="توضیح کامل" error={errors.description?.message} {...register("description")} />
          </div>
        </Card>

        <Card title="قیمت‌گذاری" description="قیمت فروش و تخفیف">
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="قیمت"
              type="number"
              error={errors.price?.message}
              {...register("price", { valueAsNumber: true })}
            />
            <Input
              label="قیمت تخفیفی"
              type="number"
              error={errors.discountPrice?.message}
              {...register("discountPrice", { valueAsNumber: true })}
            />
            <Input
              label="کد SKU"
              error={errors.sku?.message}
              {...register("sku")}
            />
          </div>
        </Card>

        <Card title="انبار و وضعیت" description="موجودی و وضعیت انتشار">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="موجودی"
              type="number"
              error={errors.stock?.message}
              {...register("stock", { valueAsNumber: true })}
            />
            <Select label="وضعیت" {...register("status")}>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </Select>
          </div>
        </Card>

        <Card title="آپلود تصاویر" description="چند تصویر محصول را اضافه کنید">
          <div className="space-y-4">
            <input type="file" multiple onChange={handleImageChange} />
            <div className="grid gap-3 sm:grid-cols-3">
              {imagePreviews.map((url) => (
                <img key={url} src={url} alt="preview" className="h-24 w-full rounded-xl object-cover" />
              ))}
            </div>
          </div>
        </Card>

        <Card title="ویژگی‌ها و مشخصات" description="جزئیات فنی و ویژگی‌های محصول">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">مشخصات</h4>
                <Button type="button" variant="secondary" onClick={() => appendSpec("")}
                >
                  افزودن مشخصه
                </Button>
              </div>
              {specFields.map((field, index) => (
                <div key={field.id} className="flex gap-3">
                  <Input
                    className="flex-1"
                    placeholder="مثال: وزن ۲۵۰ گرم"
                    error={errors.specs?.[index]?.message}
                    {...register(`specs.${index}` as const)}
                  />
                  <Button type="button" variant="ghost" onClick={() => removeSpec(index)}>
                    حذف
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">ویژگی‌ها</h4>
                <Button type="button" variant="secondary" onClick={() => appendAttribute({ label: "", value: "" })}
                >
                  افزودن ویژگی
                </Button>
              </div>
              {attributeFields.map((field, index) => (
                <div key={field.id} className="grid gap-3 md:grid-cols-2">
                  <Input
                    placeholder="عنوان ویژگی"
                    error={errors.attributes?.[index]?.label?.message}
                    {...register(`attributes.${index}.label` as const)}
                  />
                  <div className="flex gap-3">
                    <Input
                      className="flex-1"
                      placeholder="مقدار"
                      error={errors.attributes?.[index]?.value?.message}
                      {...register(`attributes.${index}.value` as const)}
                    />
                    <Button type="button" variant="ghost" onClick={() => removeAttribute(index)}>
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "در حال ذخیره..." : "ذخیره محصول"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/products")}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
