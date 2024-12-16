"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserLearningPath } from "@/http/(user)/user-learningpath/get-all-user-learning-path";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CardLearningProgress() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetUserLearningPath(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const firstLearningPath = data?.data?.[0];

  return (
    <>
      <Card className="bg-transparent border md:block hidden">
        <CardContent className="p-8">
          <div className="md:space-y-6 space-y-4">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold text-muted/80">
                Progress Belajar
              </h1>
              <Link
                href={"/dashboard/learning"}
                className="text-lg font-bold uppercase text-primary hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="w-full">
              {isPending ? (
                <Card className="bg-transparent">
                  <CardContent className="p-0">
                    <div className="md:space-y-6 space-y-4">
                      <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : firstLearningPath ? (
                <Card key={firstLearningPath.id} className="bg-transparent">
                  <CardContent className="p-0">
                    <div className="md:space-y-6 space-y-4">
                      <div className="space-y-4">
                        <h1 className="text-xl md:text-2xl font-bold">
                          {firstLearningPath.learning_path.title}
                        </h1>
                        <Progress value={firstLearningPath.progress_status} />
                        <p>
                          {firstLearningPath.progress_status}% Progress Belajar
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-muted/80">Belum ada progress belajar</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
