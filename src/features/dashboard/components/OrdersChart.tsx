import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { OrdersChartPoint } from "../../../shared/types/dashboard";
import Card from "../../../shared/components/ui/Card";

const OrdersChart = ({ data }: { data: OrdersChartPoint[] }) => {
  return (
    <Card title="روند سفارش‌ها" description="نمای کلی سفارش‌های هفت روز گذشته">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, left: 0, right: 12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: "#e2e8f0",
                fontFamily: "inherit",
              }}
            />
            <Line type="monotone" dataKey="orders" stroke="#4f46e5" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#0f766e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default OrdersChart;
