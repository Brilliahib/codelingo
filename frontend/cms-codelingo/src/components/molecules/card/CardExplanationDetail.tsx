"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQuestions } from "@/http/(user)/explanation/get-detail-user-quiz";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardLearningDetailProps {
  quizId: string;
}

export default function CardExplanationDetail({
  quizId,
}: CardLearningDetailProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetQuestions(
    session?.access_token as string,
    quizId,
    { enabled: status === "authenticated" }
  );

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto md:space-y-8 space-y-6">
        <Skeleton className="h-16 w-full rounded-lg" />
        {[...Array(3)].map((_, index) => (
          <div key={index} className="shadow-lg rounded-xl">
            <Card className="mb-6">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-16 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-1/2 mb-2" />
                ))}
                <Skeleton className="h-10 w-32 mt-4" />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto md:space-y-8 space-y-6">
        <Link href="/dashboard/explanation" className="block">
          <Card className="bg-primary text-background hover:bg-primary/90 transition-colors">
            <CardContent className="p-6">
              <div className="flex gap-4 items-center">
                <ArrowLeft className="w-6 h-6" />
                <h1 className="font-bold text-2xl">Kembali</h1>
              </div>
            </CardContent>
          </Card>
        </Link>

        {data?.data.map((question) => (
          <div key={question.id} className="shadow-lg rounded-xl">
            <Card className="mb-6">
              <CardContent className="p-6">
                <Badge className="opacity-80 my-4">QUIZ</Badge>
                <h2 className="text-xl font-bold text-white mb-4">
                  {question.question_text}
                </h2>
                {question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="flex flex-col text-center gap-3 py-1"
                  >
                    <Badge className="text-sm py-2 px-3 rounded-md">
                      {answer.answer_text}
                    </Badge>
                  </div>
                ))}
                <Link href={`/dashboard/explanation/key/${question.id}`}>
                  <Button className="my-4">Lihat Jawaban</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
