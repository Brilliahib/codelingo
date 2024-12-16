import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/dashboard/learning");

  return <>{children}</>;
}
