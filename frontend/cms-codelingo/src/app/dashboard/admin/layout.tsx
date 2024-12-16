"use client";

import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user.role !== "admin") {
      router.push("/dashboard/learning");
    }
  }, [session, status, router]);

  if (status === "authenticated" && session?.user.role === "admin") {
    return <div className="min-h-full w-full">{children}</div>;
  }

  return null;
};

export default AdminLayout;
