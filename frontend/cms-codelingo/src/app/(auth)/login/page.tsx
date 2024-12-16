import LoginForm from "@/components/organism/auth/AuthLoginForm";
import { defineMetadata } from "@/lib/metadata";

export const metadata = defineMetadata({
  title: "Login",
});

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
