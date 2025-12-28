import React from "react";
import { createProduct, getProducts, updateProduct } from "../api/productsApi";
import type { Product, ProductPayload } from "../../../shared/types/products";

export const useProducts = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts();
      setProducts(response.products);
    } catch {
      setError("دریافت محصولات با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const addProduct = async (payload: ProductPayload) => {
    const product = await createProduct(payload);
    setProducts((prev) => [product, ...prev]);
  };

  const editProduct = async (id: string, payload: ProductPayload) => {
    const updated = await updateProduct(id, payload);
    if (updated) {
      setProducts((prev) => prev.map((item) => (item.id === id ? updated : item)));
    }
  };

  return {
    products,
    loading,
    error,
    reload: load,
    addProduct,
    editProduct,
  };
};
