import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FiGithub, FiMail } from "react-icons/fi";
import Card from "../../../shared/components/ui/Card";
import Input from "../../../shared/components/ui/Input";
import Button from "../../../shared/components/ui/Button";
import Checkbox from "../../../shared/components/ui/Checkbox";
import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
  username: z.string().min(3, "نام کاربری یا ایمیل الزامی است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { loginUser, loading, error } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const response = await loginUser(values);
    if (response) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
      <Card
        title="ورود به پنل ادمین"
        description="برای مدیریت فروشگاه وارد شوید"
        className="w-full max-w-md"
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="ایمیل یا نام کاربری"
            placeholder="admin@shop.com"
            error={errors.username?.message}
            {...register("username")}
          />
          <Input
            type="password"
            label="رمز عبور"
            placeholder="••••••"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <Checkbox label="مرا به خاطر بسپار" {...register("remember")} />
            <button type="button" className="text-indigo-600 hover:text-indigo-500">
              فراموشی رمز عبور
            </button>
          </div>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <Button type="submit" disabled={loading || isSubmitting}>
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            ورود سریع
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="secondary" className="gap-2">
              <FiMail /> ورود با گوگل
            </Button>
            <Button variant="secondary" className="gap-2">
              <FiGithub /> ورود با گیت‌هاب
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
