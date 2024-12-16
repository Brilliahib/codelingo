"use client";

import Image from "next/image";
import { Session } from "next-auth";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export interface CardUserProfileProps {
  session: Session;
}

export default function CardUserProfile({ session }: CardUserProfileProps) {
  return (
    <>
      <div className="md:flex md:space-y-0 space-y-4 justify-between">
        <div className="flex flex-row items-center gap-8">
          <Image
            src={session.user.image ?? "/images/profile/general.png"}
            alt="profile"
            height={100}
            width={100}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{session.user.name}</h1>
            <h1 className="text-xl opacity-80">#{session.user.username}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={"/dashboard/profile/settings"}
            className="p-3 bg-surface rounded-md h-fit"
          >
            <Settings className="h-7 w-7 text-gray-300" />
          </Link>
          <div
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-[#FF685C] rounded-md p-3 rounded-md h-fit cursor-pointer"
          >
            <LogOut className="text-white h-7 w-7" />
          </div>
        </div>
      </div>
      <hr className="border-t-2 border-[#90A3BD]" />
    </>
  );
}
