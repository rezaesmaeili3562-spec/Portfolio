import Button from "../../../shared/components/ui/Button";
import type { Order } from "../../../shared/types/orders";
import { formatCurrency, formatDate } from "../../../shared/utils/formatters";

const statusLabel: Record<Order["status"], string> = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
};

type OrdersTableProps = {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
};

const OrdersTable = ({ orders, onEdit, onDelete }: OrdersTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <tr>
            <th className="px-4 py-3 text-right">مشتری</th>
            <th className="px-4 py-3 text-right">تاریخ</th>
            <th className="px-4 py-3 text-right">مبلغ</th>
            <th className="px-4 py-3 text-right">وضعیت</th>
            <th className="px-4 py-3 text-right">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-slate-200 dark:border-slate-700">
              <td className="px-4 py-3 font-medium">{order.customerName}</td>
              <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
              <td className="px-4 py-3">{formatCurrency(order.total)}</td>
              <td className="px-4 py-3">{statusLabel[order.status]}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => onEdit(order)}>
                    ویرایش
                  </Button>
                  <Button variant="ghost" onClick={() => onDelete(order)}>
                    حذف
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
