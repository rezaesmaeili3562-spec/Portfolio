import Card from "./Card";
import type { DashboardStat } from "../../types/dashboard";

const toneMap: Record<DashboardStat["tone"], string> = {
  positive: "text-emerald-600 dark:text-emerald-400",
  negative: "text-rose-600 dark:text-rose-400",
  neutral: "text-slate-500 dark:text-slate-400",
};

const StatCard = ({ stat }: { stat: DashboardStat }) => {
  return (
    <Card className="flex flex-col gap-2">
      <span className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</span>
      <span className="text-2xl font-semibold text-slate-900 dark:text-white">{stat.value}</span>
      <span className={`text-xs font-medium ${toneMap[stat.tone]}`}>{stat.trend}</span>
    </Card>
  );
};

export default StatCard;
