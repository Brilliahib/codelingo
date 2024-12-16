import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import Image from "next/image";
import { Link as NavbarLink } from "@/components/organism/navbar/Navbar";
import NavLink from "./NavLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackFromName } from "@/utils/misc";
import { signOut, useSession } from "next-auth/react";

interface NavHeaderProps {
  links: NavbarLink[];
}

export default function NavButton({ links }: NavHeaderProps) {
  const { data: session } = useSession();
  return (
    <>
      <div className="hidden items-center gap-4 md:flex">
        {session ? (
          <DropdownMenu>
            <div className="flex items-center gap-5">
              <DropdownMenuTrigger asChild>
                <Button variant="tertiary" size="icon" className="rounded-full">
                  <Avatar className="border border-muted">
                    <AvatarImage
                      src={session.user.image ?? "/images/profile/general.png"}
                    />
                    <AvatarFallback className="text-gray-700">
                      {generateFallbackFromName(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="end" className="font-poppins">
              <DropdownMenuLabel>
                <p>{session.user.name}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer text-white">
                <Link href="/dashboard">
                  <LayoutDashboard /> Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/20"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                {" "}
                <LogOut />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Link href="/register">Daftar Sekarang</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden border-0"
            >
              <Menu className="h-5 w-5 text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col">
            <div className="mx-auto my-8">
              <Link
                href="/"
                className="flex text-left justify-center items-center gap-2 font-semibold"
              >
                <Image
                  src="/images/logo.png"
                  alt="CodeLingo"
                  width={180}
                  height={180}
                />
              </Link>
            </div>
            <nav className="grid-gap-2 space-y-4 font-poppins">
              {links.map((link) => (
                <NavLink key={link.label} {...link} />
              ))}

              {session ? (
                <DropdownMenu>
                  <div className="flex flex-col items-center space-y-4">
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="tertiary"
                        size="icon"
                        className="rounded-full"
                      >
                        <Avatar className="border border-muted">
                          <AvatarFallback className="text-gray-700 bg-white">
                            {generateFallbackFromName(session.user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      className="font-poppins"
                    >
                      <DropdownMenuLabel>
                        <p>{session.user.name}</p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive cursor-pointer"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                      >
                        Keluar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Button variant="outline">
                    <Link href="/register">Daftar Sekarang</Link>
                  </Button>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
