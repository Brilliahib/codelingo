"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetUserLearningPathDetail } from "@/http/(user)/user-learningpath/get-detail-user-learning-path";
import { ArrowLeft, BookOpen, Check, Play } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface CardLearningDetailProps {
  id: number;
}

export default function CardLearningDetail({ id }: CardLearningDetailProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetUserLearningPathDetail(
    { id, token: session?.access_token as string },
    { enabled: status === "authenticated" }
  );

  return (
    <>
      <TooltipProvider>
        <div className="md:space-y-12 space-y-4">
          <Link href={"/dashboard/learning"}>
            <Card className="bg-primary text-background">
              <CardContent className="p-6">
                <div className="flex gap-4 items-center">
                  <ArrowLeft />
                  <h1 className="font-bold text-2xl">
                    {data?.data.learning_details.title}
                  </h1>
                </div>
              </CardContent>
            </Card>
          </Link>
          <div className="md:space-y-6 space-y-4">
            <h1 className="font-bold text-2xl">Teruskan Belajar</h1>
            <Progress value={data?.data.learning_details.progress_status} />
            <p>
              {data?.data.learning_details.progress_status}% Progress Belajar
            </p>
          </div>
          <div className="relative flex justify-center items-center w-full">
            <div className="relative w-1/2">
              {data?.data.learning_items.map((item, index) => {
                const top = index * 80;
                const isRight = index % 2 === 0;
                const left = isRight
                  ? `${20 + (index % 3) * 20}%`
                  : `${60 - (index % 3) * 20}%`;

                const bgColor = item.is_unlocked ? "bg-primary" : "bg-gray-500";
                const borderColor = item.is_unlocked
                  ? "border-blue-700"
                  : "border-gray-700";

                const Icon = item.is_completed
                  ? Check
                  : item.is_unlocked
                  ? Play
                  : BookOpen;

                let title: string | undefined;
                let link: string | undefined;

                if (item.type === "material") {
                  title = item.title;
                  link = `/materials/${item.id}`;
                } else if (item.type === "quiz") {
                  title = item.title;
                  link = `/quizzes/${item.id}`;
                }

                const MaterialOrQuizLink = item.is_unlocked ? (
                  <Link href={link || "#"}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={`p-4 rounded-full ${bgColor} w-fit border-b-8 ${borderColor}`}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="shadow space-y-2 p-4">
                        <Badge className="bg-transparent border-white border">
                          Level {index + 1}
                        </Badge>
                        <h1 className="text-base font-bold text-center">
                          {title}
                        </h1>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center space-y-2">
                        <div
                          className={`p-4 rounded-full ${bgColor} w-fit border-b-8 ${borderColor}`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-surface shadow space-y-2 p-4">
                      <Badge className="bg-transparent border-white border">
                        Level {index + 1}
                      </Badge>
                      <h1 className="text-base font-bold text-center">
                        {title}
                      </h1>
                    </TooltipContent>
                  </Tooltip>
                );

                return (
                  <div
                    key={item.id}
                    className="absolute transition-all duration-300"
                    style={{ top: `${top}px`, left }}
                  >
                    {MaterialOrQuizLink}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
}
