import { http } from "../../../api/http";
import type { Coupon, CouponPayload } from "../../../shared/types/coupons";

export type CouponsResponse = {
  coupons: Coupon[];
};

export const getCoupons = async (): Promise<CouponsResponse> => {
  const response = await http.get<CouponsResponse>("/coupons");
  return response.data;
};

export const createCoupon = async (payload: CouponPayload): Promise<Coupon> => {
  const response = await http.post<{ coupon: Coupon }>("/coupons", payload);
  return response.data.coupon;
};

export const updateCoupon = async (id: string, payload: CouponPayload): Promise<Coupon | undefined> => {
  const response = await http.put<{ coupon: Coupon | undefined }>(`/coupons/${id}`, payload);
  return response.data.coupon;
};
