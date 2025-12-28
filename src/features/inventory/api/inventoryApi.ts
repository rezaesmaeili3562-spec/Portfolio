import { http } from "../../../api/http";
import type { InventoryItem, StockMovement } from "../../../shared/types/inventory";

export type InventoryResponse = {
  inventory: InventoryItem[];
  movements: StockMovement[];
};

export const getInventory = async (): Promise<InventoryResponse> => {
  const response = await http.get<InventoryResponse>("/inventory");
  return response.data;
};
