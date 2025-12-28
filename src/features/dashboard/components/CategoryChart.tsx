import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../../../shared/components/ui/Card";
import type { CategoryPerformance } from "../../../shared/types/dashboard";

const colors = ["#3b82f6", "#10b981", "#f97316", "#f43f5e"];

const CategoryChart = ({ data }: { data: CategoryPerformance[] }) => {
  return (
    <Card title="پرفروش‌ترین دسته‌ها" description="سهم فروش بر اساس دسته‌بندی">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="category" innerRadius={50} outerRadius={90}>
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.category}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "سهم فروش"]}
              contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {data.map((entry, index) => (
          <div key={entry.category} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-slate-600 dark:text-slate-300">{entry.category}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategoryChart;
