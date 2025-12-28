import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "../../../shared/components/ui/Card";
import type { MonthlySalesPoint } from "../../../shared/types/dashboard";

const MonthlySalesChart = ({ data }: { data: MonthlySalesPoint[] }) => {
  return (
    <Card title="فروش ماهانه" description="مقایسه فروش و تعداد سفارش‌ها">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, left: 0, right: 12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: "#e2e8f0",
                fontFamily: "inherit",
              }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MonthlySalesChart;
