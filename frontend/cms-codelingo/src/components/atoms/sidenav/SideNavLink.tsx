import Link from "next/link";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SideNavLinkProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  hide?: boolean;
}

export default function SideNavLink({
  href,
  label,
  active,
  icon: Icon,
  hide,
}: SideNavLinkProps) {
  if (hide) return null;

  return (
    <Link
      href={href}
      className={cn(
        "text-base flex items-center text-white gap-3 rounded-xl px-3 py-2 transition-all",
        {
          "hover:text-primary": !active,
          "outline outline-2 outline-primary text-primary": active,
        }
      )}
    >
      {Icon ? <Icon className="h-6 w-6" /> : null}
      {label}
    </Link>
  );
}
