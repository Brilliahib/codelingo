"use client";

import Link from "next/link";

import { Flame, Heart, LogOut, Menu } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { Link as NavLink } from "@/components/organism/side/SideNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideNavLink from "./SideNavLink";
import Image from "next/image";

interface SideNavHeaderProps {
  session: Session;
  links: NavLink[];
}

export default function SideNavHeader({ links }: SideNavHeaderProps) {
  return (
    <header className="fixed left-0 right-0 z-40 h-14 lg:h-[60px] lg:px-6 bg-background">
      <div className="flex h-full w-full items-center justify-between gap-4 bg-background px-4 md:justify-end md:px-16">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden rounded-lg hover:bg-transparent"
            >
              <Menu className="h-5 w-5 text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="flex flex-col">
            <div className="mx-auto my-8">
              <Link
                href="/"
                className="flex text-left justify-center items-center gap-2 font-semibold"
              >
                <Image
                  src="/images/logo.png"
                  alt="CodeLingo"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
            <nav className="grid-gap-2 space-y-4 font-poppins">
              {links
                .filter((link) => !link.hide)
                .map((link) => (
                  <SideNavLink key={link.label} {...link} />
                ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex gap-x-12">
          <div className="flex items-center gap-x-2">
            <Flame className="text-orange-500" fill="currentColor" />
            <h1 className="text-white font-semibold text-lg">
              2 hari beruntun
            </h1>
          </div>
          <div className="flex items-center gap-x-2">
            <Heart className="text-destructive" fill="currentColor" />
            <h1 className="text-white font-semibold text-lg">5</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
