export type InventoryItem = {
  id: string;
  productName: string;
  sku: string;
  stock: number;
  reserved: number;
  reorderLevel: number;
};

export type StockMovement = {
  id: string;
  productName: string;
  quantity: number;
  type: "in" | "out";
  createdAt: string;
  note: string;
};
