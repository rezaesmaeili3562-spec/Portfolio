import React from "react";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-2 text-sm">
        {label ? <span className="text-slate-600 dark:text-slate-300">{label}</span> : null}
        <textarea
          ref={ref}
          className={`min-h-[120px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-400 ${
            error ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
          } ${className ?? ""}`}
          {...props}
        />
        {error ? <span className="text-xs text-red-500">{error}</span> : null}
      </label>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
