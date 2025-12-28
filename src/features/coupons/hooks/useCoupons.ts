import React from "react";
import { createCoupon, getCoupons, updateCoupon } from "../api/couponsApi";
import type { Coupon, CouponPayload } from "../../../shared/types/coupons";

export const useCoupons = () => {
  const [coupons, setCoupons] = React.useState<Coupon[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCoupons();
      setCoupons(response.coupons);
    } catch {
      setError("دریافت کوپن‌ها با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const addCoupon = async (payload: CouponPayload) => {
    const coupon = await createCoupon(payload);
    setCoupons((prev) => [coupon, ...prev]);
  };

  const editCoupon = async (id: string, payload: CouponPayload) => {
    const updated = await updateCoupon(id, payload);
    if (updated) {
      setCoupons((prev) => prev.map((item) => (item.id === id ? updated : item)));
    }
  };

  return { coupons, loading, error, reload: load, addCoupon, editCoupon };
};
