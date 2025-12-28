import React from "react";

type ToggleProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(({ label, ...props }, ref) => {
  return (
    <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
      <span className="relative inline-flex items-center">
        <input ref={ref} type="checkbox" className="peer sr-only" {...props} />
        <span className="h-6 w-10 rounded-full bg-slate-300 transition peer-checked:bg-indigo-600 dark:bg-slate-700" />
        <span className="absolute right-1 h-4 w-4 rounded-full bg-white shadow transition peer-checked:-translate-x-4" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
});

Toggle.displayName = "Toggle";

export default Toggle;
