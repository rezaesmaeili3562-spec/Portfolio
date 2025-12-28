import React from "react";
import { getCustomers } from "../api/customersApi";
import type { Customer } from "../../../shared/types/customers";

export const useCustomers = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCustomers();
      setCustomers(response.customers);
    } catch {
      setError("دریافت فهرست مشتریان ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return { customers, loading, error, reload: load };
};
