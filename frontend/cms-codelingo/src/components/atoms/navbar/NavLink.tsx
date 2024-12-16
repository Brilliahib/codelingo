import Link from "next/link";

import { cn } from "@/lib/utils";

interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function NavLink({ href, label, active }: Link) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-white flex items-center rounded px-5 py-2 font-semibold uppercase hover:text-primary"
      )}
    >
      {label}
    </Link>
  );
}
