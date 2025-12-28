export type UserRole = "admin" | "manager" | "support" | "viewer";
export type UserStatus = "active" | "suspended" | "invited";

export type UserAddress = {
  id: string;
  title: string;
  address: string;
};

export type UserOrderSummary = {
  id: string;
  total: number;
  createdAt: string;
  status: "completed" | "processing" | "cancelled";
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  avatarUrl?: string;
  orders: UserOrderSummary[];
  addresses: UserAddress[];
};
