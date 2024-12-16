"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAchievementUser } from "@/http/(user)/profile/get-achievement";
import { CircleCheck } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CardAchievement() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAchievementUser(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Pencapaian</h1>
      <div className="grid gap-4">
        {isPending
          ? Array.from({ length: 2 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="flex flex-row justify-between items-center p-6">
                  <div>
                    <Skeleton className="h-6 w-20 mb-4" />{" "}
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />{" "}
                </CardContent>
              </Card>
            ))
          : data?.data.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="flex flex-row justify-between items-center p-6">
                  <div>
                    <Badge className="opacity-80 mb-4">
                      {achievement.user_materials.length} Materi
                    </Badge>
                    <h1 className="font-bold text-xl">
                      {achievement.learning_path.title}
                    </h1>
                  </div>
                  <CircleCheck className={`h-10 w-10 text-nature`} />
                </CardContent>
              </Card>
            ))}
      </div>
    </>
  );
}
