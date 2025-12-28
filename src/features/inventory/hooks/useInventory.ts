import React from "react";
import { getInventory } from "../api/inventoryApi";
import type { InventoryItem, StockMovement } from "../../../shared/types/inventory";

export const useInventory = () => {
  const [inventory, setInventory] = React.useState<InventoryItem[]>([]);
  const [movements, setMovements] = React.useState<StockMovement[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getInventory();
      setInventory(response.inventory);
      setMovements(response.movements);
    } catch {
      setError("دریافت موجودی با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return { inventory, movements, loading, error, reload: load };
};
