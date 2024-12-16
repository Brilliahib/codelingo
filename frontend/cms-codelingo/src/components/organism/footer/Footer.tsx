"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import NavLink from "@/components/atoms/navbar/NavLink";

export default function Footer() {
  const pathname = usePathname();
  const links = useMemo(
    () => [
      {
        href: "/",
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
      <footer className="text-white py-8 px-4 pad-x">
        <div className="pad-x flex flex-col md:flex-row justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-lg font-bold text-green-500">CodeLingo</h1>
            <p className="text-sm mt-2 w-full md:w-2/3 opacity-80">
              Jl. Prof. Soedarto, Tembalang, Kec. Tembalang, Kota Semarang, Jawa
              Tengah 50275
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex md:flex-col flex-row justify-center gap-4 md:gap-2 text-sm text-right">
            {links.map((link) => (
              <NavLink key={link.label} {...link}/>
            ))}
          </div>
        </div>
        <div className="border-t-2 border-gray-700 mt-8 mx-24 pt-4 text-center text-sm">
          © 2024 CodeLingo
        </div>
      </footer>
    </>
  );
}
