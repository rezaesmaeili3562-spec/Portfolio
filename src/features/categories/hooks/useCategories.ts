import React from "react";
import { getCategories } from "../api/categoriesApi";
import type { CategoryNode } from "../../../shared/types/categories";

export const useCategories = () => {
  const [categories, setCategories] = React.useState<CategoryNode[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCategories();
      setCategories(response.categories);
    } catch {
      setError("دریافت دسته‌بندی‌ها با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return { categories, setCategories, loading, error, reload: load };
};
