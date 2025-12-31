import AuthLayout from "@/features/login/AuthLayout";
import LoginForm from "@/features/login/LoginForm";

export default function LoginPage() {
  return (
    <>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
}
