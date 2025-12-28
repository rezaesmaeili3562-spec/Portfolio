import React from "react";
import Card from "../../../shared/components/ui/Card";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import EmptyState from "../../../shared/components/states/EmptyState";
import Button from "../../../shared/components/ui/Button";
import OrderForm from "../components/OrderForm";
import OrdersTable from "../components/OrdersTable";
import { useOrders } from "../hooks/useOrders";
import type { Order } from "../../../shared/types/orders";
import type { OrderFormValues } from "../schema";

const OrdersPage = () => {
  const { orders, loading, error, reload, addOrder, editOrder, removeOrder } = useOrders();
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null);
  const [showForm, setShowForm] = React.useState(false);

  const handleCreate = async (values: OrderFormValues) => {
    await addOrder(values);
    setShowForm(false);
  };

  const handleEdit = async (values: OrderFormValues) => {
    if (!editingOrder) {
      return;
    }
    await editOrder(editingOrder.id, values);
    setEditingOrder(null);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={reload} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">مدیریت سفارش‌ها</h2>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "بستن فرم" : "ثبت سفارش"}
        </Button>
      </div>

      {showForm ? <OrderForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} /> : null}

      {editingOrder ? (
        <OrderForm
          initialValues={editingOrder}
          onSubmit={handleEdit}
          onCancel={() => setEditingOrder(null)}
        />
      ) : null}

      {!orders.length ? (
        <EmptyState message="سفارشی ثبت نشده است." />
      ) : (
        <Card title="لیست سفارش‌ها" description="نمای کلی سفارش‌های اخیر">
          <OrdersTable
            orders={orders}
            onEdit={(order) => setEditingOrder(order)}
            onDelete={(order) => removeOrder(order.id)}
          />
        </Card>
      )}
    </div>
  );
};

export default OrdersPage;
