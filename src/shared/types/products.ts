export type ProductStatus = "active" | "inactive";

export type ProductImage = {
  id: string;
  url: string;
};

export type ProductAttribute = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  status: ProductStatus;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  attributes: ProductAttribute[];
  specs: string[];
};

export type ProductPayload = {
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  status: ProductStatus;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  attributes: ProductAttribute[];
  specs: string[];
};
