"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import bronze from "/public/images/tier/bronze.svg";
import silver from "/public/images/tier/silver.svg";
import gold from "/public/images/tier/gold.svg";
import diamond from "/public/images/tier/diamond.svg";
import emerald from "/public/images/tier/emerald.svg";

import { useFetchLeague } from "@/http/(user)/profile/get-league";

interface CardProfileProps {
  session: Session;
}

const leagueImages: Record<string, string> = {
  bronze: bronze.src,
  silver: silver.src,
  gold: gold.src,
  diamond: diamond.src,
  emerald: emerald.src,
};

export default function CardProfile({ session }: CardProfileProps) {
  const { data, isLoading, isError } = useFetchLeague(session.access_token, {
    enabled: !!session.access_token,
  });

  return (
    <Card className="bg-transparent border md:block hidden">
      <CardContent className="p-8">
        <div className="md:space-y-6 space-y-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-muted/80">Profile</h1>
            <Link
              href={"/dashboard/profile"}
              className="text-lg font-bold uppercase text-primary hover:underline"
            >
              Lihat Semua
            </Link>
          </div>
          {isLoading ? (
            <div className="space-y-6">
              <div className="flex items-center md:gap-6 gap-4">
                <Skeleton className="w-20 h-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                <Skeleton className="h-6 w-full rounded-full" />
                <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
              </div>
            </div>
          ) : isError || !data ? (
            <div>Tidak dapat memuat liga</div>
          ) : (
            <>
              <div className="flex items-center md:gap-6 gap-4">
                <Image
                  src={session.user.image ?? "/images/profile/general.png"}
                  alt="Profile"
                  width={1000}
                  height={1000}
                  className="w-20 h-20 rounded-full"
                />
                <div className="space-y-2">
                  <h1 className="font-bold text-xl">{session.user.name}</h1>
                  <p className="font-semibold uppercase tracking-wider">
                    Liga {data.current_league}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Image
                  src={leagueImages[data.current_league]}
                  alt={data.current_league}
                  height={50}
                  width={50}
                />
                <Progress type="league" value={data.progress} />
                <Image
                  src={leagueImages[data.next_league]}
                  alt={data.next_league}
                  height={50}
                  width={50}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
