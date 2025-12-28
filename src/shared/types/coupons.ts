export type CouponType = "percentage" | "fixed";
export type CouponStatus = "active" | "expired" | "scheduled";

export type Coupon = {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minPurchase: number;
  expiryDate: string;
  usageLimit: number;
  status: CouponStatus;
};

export type CouponPayload = {
  code: string;
  type: CouponType;
  value: number;
  minPurchase: number;
  expiryDate: string;
  usageLimit: number;
  status: CouponStatus;
};
