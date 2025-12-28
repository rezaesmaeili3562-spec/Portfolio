import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Input from "../../../shared/components/ui/Input";
import Button from "../../../shared/components/ui/Button";
import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
  username: z.string().min(3, "نام کاربری الزامی است"),
  password: z.string().min(4, "رمز عبور الزامی است"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { loginUser, loading, error } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    const response = await loginUser(values);
    if (response) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
      <Card title="ورود به پنل" description="برای دسترسی به سفارش‌ها وارد شوید." className="w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="نام کاربری"
            placeholder="admin"
            error={errors.username?.message}
            {...register("username")}
          />
          <Input
            type="password"
            label="رمز عبور"
            placeholder="••••"
            error={errors.password?.message}
            {...register("password")}
          />
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
