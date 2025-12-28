import Button from "../ui/Button";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorState = ({ message = "خطایی رخ داده است.", onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-red-200 bg-red-50 p-8 text-sm text-red-600 dark:border-red-800/60 dark:bg-red-900/20 dark:text-red-200">
      <p>{message}</p>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          تلاش مجدد
        </Button>
      ) : null}
    </div>
  );
};

export default ErrorState;
