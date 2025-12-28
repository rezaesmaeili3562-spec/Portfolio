const LoadingState = ({ message = "در حال دریافت اطلاعات..." }: { message?: string }) => {
  return (
    <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
      {message}
    </div>
  );
};

export default LoadingState;
