"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import NavButton from "@/components/atoms/navbar/NavButton";
import NavL from "@/components/atoms/navbar/NavL";
import NavLink from "@/components/atoms/navbar/NavLink";

export interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      {
        href: "#home",
        label: "Home",
        active: pathname === "/",
      },
      {
        href: "#services",
        label: "Our Service",
        active: pathname === "/",
      },
      {
        href: "#about",
        label: "About",
        active: pathname === "/",
      },
    ],
    [pathname]
  );

  return (
    <>
      <div className="w-full bg-background z-50 sticky top-0 mb-0">
        <div className="flex justify-between items-center bg-background py-2 pad-x-xl">
          <NavL />
          <nav className="hidden items-center font-semibold md:flex">
            {links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>
          <NavButton links={links} />
        </div>
      </div>
    </>
  );
}
