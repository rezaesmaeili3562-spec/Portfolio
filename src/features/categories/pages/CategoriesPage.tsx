import React from "react";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import Button from "../../../shared/components/ui/Button";
import LoadingState from "../../../shared/components/states/LoadingState";
import ErrorState from "../../../shared/components/states/ErrorState";
import { useCategories } from "../hooks/useCategories";
import type { CategoryNode } from "../../../shared/types/categories";

const reorderNodes = (nodes: CategoryNode[], draggedId: string, targetId: string): CategoryNode[] => {
  // Drag-and-drop reordering is kept simple: we only reorder items within the same level.
  const sourceIndex = nodes.findIndex((node) => node.id === draggedId);
  const targetIndex = nodes.findIndex((node) => node.id === targetId);

  if (sourceIndex !== -1 && targetIndex !== -1) {
    const updated = [...nodes];
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);
    return updated;
  }

  return nodes.map((node) =>
    node.children ? { ...node, children: reorderNodes(node.children, draggedId, targetId) } : node
  );
};

const CategoryItem = ({
  node,
  onDragStart,
  onDrop,
}: {
  node: CategoryNode;
  onDragStart: (id: string) => void;
  onDrop: (id: string) => void;
}) => {
  return (
    <li className="space-y-2">
      <div
        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
        draggable
        onDragStart={() => onDragStart(node.id)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => onDrop(node.id)}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{node.icon}</span>
          <span className="font-medium text-slate-900 dark:text-white">{node.name}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="px-3 py-1 text-xs">
            ویرایش
          </Button>
          <Button variant="ghost" className="px-3 py-1 text-xs text-rose-500">
            حذف
          </Button>
        </div>
      </div>
      {node.children?.length ? (
        <ul className="space-y-2 border-r border-slate-200 pr-4 dark:border-slate-800">
          {node.children.map((child) => (
            <CategoryItem key={child.id} node={child} onDragStart={onDragStart} onDrop={onDrop} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

const CategoriesPage = () => {
  const { categories, setCategories, loading, error, reload } = useCategories();
  const [draggedId, setDraggedId] = React.useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDrop = (targetId: string) => {
    if (!draggedId) return;
    setCategories((prev) => reorderNodes(prev, draggedId, targetId));
    setDraggedId(null);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={reload} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="مدیریت دسته‌بندی‌ها"
        description="دسته‌ها را مرتب کنید و ساختار درختی بسازید"
        action={<Button>افزودن دسته</Button>}
      />

      <Card title="ساختار دسته‌بندی" description="برای جابه‌جایی، آیتم را بکشید و رها کنید">
        <ul className="space-y-4">
          {categories.map((node) => (
            <CategoryItem key={node.id} node={node} onDragStart={handleDragStart} onDrop={handleDrop} />
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default CategoriesPage;
