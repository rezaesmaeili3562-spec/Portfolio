import React from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
};

export default PageHeader;
