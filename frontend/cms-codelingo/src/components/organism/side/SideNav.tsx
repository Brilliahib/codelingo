"use client";

import { PropsWithChildren, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  LucideIcon,
  Trophy,
  ScrollText,
  User,
  BookOpen,
  Users,
  Library,
  BookCheck,
} from "lucide-react";
import { Session } from "next-auth";
import SideNavL from "@/components/atoms/sidenav/SideNavL";
import SideNavHeader from "@/components/atoms/sidenav/SideNavHeader";

export interface Link {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  hide?: boolean;
}

interface SidenavProps extends PropsWithChildren {
  session: Session;
}

export default function Sidenav({ children, session }: SidenavProps) {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      ...(session?.user.role === "admin"
        ? [
            {
              href: "/dashboard/admin",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard/admin",
            },
            {
              href: "/dashboard/admin/learning",
              label: "Learning Path",
              icon: BookOpen,
              active: pathname.startsWith("/dashboard/admin/learning"),
            },
            {
              href: "/dashboard/admin/materials",
              label: "Materials",
              icon: Library,
              active: pathname.startsWith("/dashboard/admin/materials"),
            },
            {
              href: "/dashboard/admin/quizzes",
              label: "Quizzes",
              icon: BookCheck,
              active: pathname.startsWith("/dashboard/admin/quizzes"),
            },
            {
              href: "/dashboard/admin/users",
              label: "Pengguna",
              icon: Users,
              active: pathname.startsWith("/dashboard/admin/users"),
            },
          ]
        : [
            // {
            //   href: "/dashboard",
            //   label: "Dashboard",
            //   icon: LayoutDashboardIcon,
            //   active: pathname === "/dashboard",
            // },
            {
              href: "/dashboard/learning",
              label: "Belajar",
              icon: BookOpen,
              active: pathname.startsWith("/dashboard/learning"),
            },
            {
              href: "/dashboard/explanation",
              label: "Pembahasan",
              icon: ScrollText,
              active: pathname.startsWith("/dashboard/explanation"),
            },
            {
              href: "/dashboard/leaderboard",
              label: "Leaderboard",
              icon: Trophy,
              active: pathname.startsWith("/dashboard/leaderboard"),
            },
            {
              href: "/dashboard/profile",
              label: "Profile",
              active: pathname.startsWith("/dashboard/profile"),
              icon: User,
            },
          ]),
    ],
    [session, pathname]
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideNavL links={links} />
      <div className="flex max-h-screen flex-col overflow-y-auto">
        <SideNavHeader session={session} links={links} />
        <main className="mt-16 flex flex-1 flex-col gap-4 p-4 md:px-20 md:py-6 lg:gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}
