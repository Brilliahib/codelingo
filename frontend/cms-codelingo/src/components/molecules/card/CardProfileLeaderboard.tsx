"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Session } from "next-auth";
import { Badge } from "@/components/ui/badge";
import bronze from "/public/images/tier/bronze.svg";
import silver from "/public/images/tier/silver.svg";
import gold from "/public/images/tier/gold.svg";
import emerald from "/public/images/tier/emerald.svg";
import diamond from "/public/images/tier/diamond.svg";
import RankingLeaderboard from "./RankingLeaderboard";
import { useGetStatistics } from "@/http/(user)/profile/get-statistics";

export interface CardProfileLeaderboardProps {
  session: Session;
}

export default function CardProfileLeaderboard({
  session,
}: CardProfileLeaderboardProps) {
  const { data, isPending } = useGetStatistics(
    session?.access_token as string,
    { enabled: !!session?.access_token }
  );

  const statistics = data?.data;

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "bronze":
        return bronze;
      case "silver":
        return silver;
      case "gold":
        return gold;
      case "emerald":
        return emerald;
      case "diamond":
        return diamond;
      default:
        return bronze;
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-12">
        <Card className="w-full lg:w-3/4 p-4 flex flex-col lg:flex-row justify-start gap-4 items-center">
          <Image
            src={session.user.image ?? "/images/profile/general.png"}
            alt="Profile"
            width="120"
            height="120"
            className="rounded-full"
          />
          <div className="space-y-1">
            <h1 className="text-xl lg:text-2xl font-bold">
              {session.user.name}
            </h1>
            <h1 className="text-md lg:text-lg opacity-80 font-bold">
              #{session.user.username}
            </h1>
            <Badge className="text-yellow-300 text-md lg:text-lg font-bold">
              {statistics?.exp ?? 0} XP
            </Badge>
          </div>
        </Card>

        {/* Rank Card */}
        <Card className="w-full lg:w-1/4 flex flex-col items-center justify-center">
          <div className="space-y-4">
            <h1 className="font-bold text-lg lg:text-base text-center">
              Rank saat ini
            </h1>
            <div className="flex flex-row gap-2 items-center justify-center">
              <Image
                src={getTierIcon(statistics?.league ?? "bronze")}
                alt={statistics?.league ?? "bronze"}
                width={80}
                height={80}
              />
              <h1 className="font-bold text-xl lg:text-2xl">
                {statistics?.rank ?? "-"}
              </h1>
            </div>
          </div>
        </Card>
      </div>
      <hr className="border-t-2 border-[#90A3BD]" />
      <RankingLeaderboard session={session!} />
    </>
  );
}
