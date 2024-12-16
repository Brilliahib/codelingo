"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bronze from "/public/images/tier/bronze.svg";
import diamond from "/public/images/tier/diamond.svg";
import emerald from "/public/images/tier/emerald.svg";
import gold from "/public/images/tier/gold.svg";
import silver from "/public/images/tier/silver.svg";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Session } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeaderboard } from "@/http/(user)/leaderboard/get-leaderboard";

export interface CardProfileLeaderboardProps {
  session: Session;
}

const leagues = ["bronze", "silver", "gold", "emerald", "diamond"] as const;

const RankingLeaderboard: React.FC<CardProfileLeaderboardProps> = ({
  session,
}) => {
  const [activeLeagueIndex, setActiveLeagueIndex] = useState(0);
  const activeLeague = leagues[activeLeagueIndex];

  const {
    data: players = [],
    isLoading,
    isError,
  } = useLeaderboard(activeLeague, session.access_token, {
    staleTime: 1000 * 60 * 5,
  });

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

  const handlePrevLeague = () => {
    setActiveLeagueIndex((prevIndex) =>
      prevIndex === 0 ? leagues.length - 1 : prevIndex - 1
    );
  };

  const handleNextLeague = () => {
    setActiveLeagueIndex((prevIndex) => (prevIndex + 1) % leagues.length);
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevLeague}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md"
            aria-label="Previous League"
          >
            <ChevronLeft />
          </button>
          <div className="flex flex-row items-center justify-center">
            <Image
              height={32}
              width={32}
              src={getTierIcon(activeLeague)}
              alt={"rank"}
              className="h-20 w-20"
            />
            <h1 className="font-bold text-xl">Liga {activeLeague}</h1>
          </div>
          <button
            onClick={handleNextLeague}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md"
            aria-label="Next League"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div>
        <div className="space-y-4">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <Card
                key={index}
                className="flex items-center gap-4 p-4 hover:bg-gray-800 rounded-md transition-colors"
              >
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-24 h-4" />
                </div>
                <Skeleton className="w-16 h-6 rounded-md" />
              </Card>
            ))
          ) : players.length === 0 ? (
            <div className="md:space-y-8 space-y-4 text-center flex flex-col items-center justify-center text-xl font-semibold">
              <Image
                src="/images/panda-not-found.gif"
                alt="Panda Not Found"
                width={1000}
                height={1000}
                className="max-w-[280px]"
              />
              <div className="space-y-1">
                <h1>Belum Ada Yang Masuk di Liga Ini!</h1>
                <p className="text-base font-semibold">
                  Rajin kerjakan materi dan quiz untuk masuk ke liga ini.
                </p>
              </div>
            </div>
          ) : (
            players.map((player, index) => (
              <Card
                key={player.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-800 rounded-md transition-colors"
              >
                <h1
                  className={`rounded-full flex items-center font-bold justify-center h-8 w-8 ${
                    index + 1 === 1
                      ? "bg-yellow-300 text-[#1D2941]"
                      : index + 1 === 2
                      ? "bg-white/80 text-[#1D2941]"
                      : index + 1 === 3
                      ? "bg-orange-500 text-[#1D2941]"
                      : "bg-[#273856] text-white"
                  }`}
                >
                  {index + 1}
                </h1>
                <Image
                  height={1000}
                  width={1000}
                  src={player.image ?? "/images/profile/general.png"}
                  alt={`${activeLeague} Tier ${player.id}`}
                  className="h-16 w-16 rounded-full"
                />
                <div className="flex-grow">
                  <div className="font-semibold">{player.name}</div>
                  <div className="text-gray-400 font-semibold">
                    #{player.username}
                  </div>
                </div>
                <Badge className="text-yellow-300">
                  {player.exp.toLocaleString()} XP
                </Badge>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default RankingLeaderboard;
