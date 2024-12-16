"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { baseUrl } from "@/utils/misc";
import { useGetQuestionDetail } from "@/http/(user)/learning/quiz/get-detail-question";
import { Skeleton } from "@/components/ui/skeleton";

interface CardLearningDetailProps {
  quizId: string;
}

export default function CardKey({ quizId }: CardLearningDetailProps) {
  const { data: session, status } = useSession();
  const token = session?.access_token;

  const { data, isPending, error } = useGetQuestionDetail(
    { id: quizId, token: token || "" },
    {
      enabled: status === "authenticated" && !!token,
    }
  );

  if (isPending) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Skeleton className="h-14 w-full rounded-lg" />
        <div className="shadow-lg rounded-xl">
          <Skeleton className="h-64 w-full mb-4 rounded-lg" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <Skeleton className="h-8 w-1/3 mt-4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <p className="text-red-600">Error loading explanation details</p>
      </div>
    );
  }

  const question = data?.data;

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

        {question && (
          <div key={question.id} className="shadow-lg rounded-xl">
            <div className="mb-6">
              {question.explanation_image && (
                <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={`${baseUrl}/${question.explanation_image}`}
                    alt="Explanation Image"
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <h2 className="text-xl font-bold text-white mb-4">
                {question.question_text}
              </h2>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="flex flex-col text-center gap-3"
                  >
                    <Badge
                      variant={answer.is_correct ? "success" : "destructive"}
                      className="text-sm py-2 px-3 rounded-md"
                    >
                      {answer.answer_text}
                    </Badge>
                  </div>
                ))}
              </div>

              {question.explanation_text && (
                <Card className="mt-6 p-4 rounded-lg shadow-none">
                  <h3 className="font-semibold text-white mb-1 opacity-80">
                    Jawaban Benar:
                  </h3>
                  <h2 className="mb-4">
                    {question.answers
                      .filter((answer) => answer.is_correct)
                      .map((answer) => (
                        <div key={answer.id}>{answer.answer_text}</div>
                      ))}
                  </h2>

                  <p className="text-white opacity-80">
                    {question.explanation_text}
                  </p>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
