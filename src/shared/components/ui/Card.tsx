import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
};

const Card = ({ title, description, className, children, ...props }: CardProps) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${
        className ?? ""
      }`}
      {...props}
    >
      {title ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description ? <p className="text-sm text-slate-500">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Card;
