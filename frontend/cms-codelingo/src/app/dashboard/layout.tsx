import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Sidenav from "@/components/organism/side/SideNav";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  return <Sidenav session={session!}>{children}</Sidenav>;
}
