"use client";

import { Flame, Trophy, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useGetStatistics } from "@/http/(user)/profile/get-statistics";

export default function CardStatistics() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetStatistics(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const statistics = data?.data;

  return (
    <>
      <h1 className="text-2xl font-bold">Statistik</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row gap-4 w-full items-center justify-center mb-4">
          <div className="border rounded-lg flex flex-row items-center justify-start w-1/2 gap-4 p-4">
            <Flame className="text-orange-500 w-12 h-12" fill="currentColor" />
            <div className="flex flex-col">
              <h1 className="font-bold text-xl">2</h1>
              <h1 className="text-sm font-light opacity-80">Runtunan hari</h1>
            </div>
          </div>
          <div className="border rounded-lg flex flex-row items-center justify-start w-1/2 gap-4 p-4">
            <Zap className="h-10 w-10 text-yellow-400" fill="currentColor" />
            <div className="flex flex-col">
              <h1 className="font-bold text-xl">{statistics?.exp}</h1>
              <h1 className="text-sm font-light opacity-80">Total XP</h1>
            </div>
          </div>
        </div>
        <div className="border rounded-lg flex flex-row items-center justify-between gap-4 w-full p-4">
          <div className="flex flex-row gap-4">
            <Trophy className="h-12 w-12 text-yellow-400" />
            <div className="flex flex-col">
              <h1 className="font-bold text-xl">{statistics?.rank}</h1>
              <h1 className="text-sm font-light opacity-80">
                Peringkat saat ini
              </h1>
            </div>
          </div>
          <Link
            href={"/dashboard/leaderboard"}
            className="text-sm font-bold uppercase text-primary hover:underline"
          >
            Lihat Semua
          </Link>
        </div>
      </div>
    </>
  );
}
