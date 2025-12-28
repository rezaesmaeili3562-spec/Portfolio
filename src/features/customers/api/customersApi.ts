import { http } from "../../../api/http";
import type { Customer } from "../../../shared/types/customers";

export type CustomersResponse = {
  customers: Customer[];
};

export const getCustomers = async (): Promise<CustomersResponse> => {
  const response = await http.get<CustomersResponse>("/customers");
  return response.data;
};
