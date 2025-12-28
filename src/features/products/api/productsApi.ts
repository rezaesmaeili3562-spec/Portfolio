import { http } from "../../../api/http";
import type { Product, ProductPayload } from "../../../shared/types/products";

export type ProductsResponse = {
  products: Product[];
};

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await http.get<ProductsResponse>("/products");
  return response.data;
};

export const createProduct = async (payload: ProductPayload): Promise<Product> => {
  const response = await http.post<{ product: Product }>("/products", payload);
  return response.data.product;
};

export const updateProduct = async (id: string, payload: ProductPayload): Promise<Product | undefined> => {
  const response = await http.put<{ product: Product | undefined }>(`/products/${id}`, payload);
  return response.data.product;
};
