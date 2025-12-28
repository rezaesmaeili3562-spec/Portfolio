import { http } from "../../../api/http";
import type { CategoryNode } from "../../../shared/types/categories";

export type CategoriesResponse = {
  categories: CategoryNode[];
};

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await http.get<CategoriesResponse>("/categories");
  return response.data;
};
