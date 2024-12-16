import RegisterForm from "@/components/organism/auth/AuthRegisterForm";
import { defineMetadata } from "@/lib/metadata";

export const metadata = defineMetadata({
  title: "Register",
});

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <RegisterForm />
    </main>
  );
}
