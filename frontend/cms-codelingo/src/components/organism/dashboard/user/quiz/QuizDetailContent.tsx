"use client";

import DialogExplanationQuestion from "@/components/atoms/dialog/DialogQuestionExplanation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAddSubmitQuestion } from "@/http/(user)/learning/quiz/add-submit-question";
import { useGetAllQuestion } from "@/http/(user)/learning/quiz/get-all-question";
import { useGetQuestionDetail } from "@/http/(user)/learning/quiz/get-detail-question";
import { ArrowRight, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface QuizDetailParams {
  id: string;
}

export default function QuizDetailContent({ id }: QuizDetailParams) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetQuestionDetail(
    { id, token: session?.access_token as string },
    { enabled: status === "authenticated" }
  );
  const router = useRouter();

  const [learningPathId, setLearningPathId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data?.quiz_id) {
      setLearningPathId(data.data.quiz_id);
    }
  }, [data?.data?.quiz_id]);

  const { data: question } = useGetAllQuestion(
    {
      id: learningPathId!,
      token: session?.access_token as string,
    },
    { enabled: learningPathId !== null }
  );

  const [currentQuizId, setCurrentQuizId] = useState<string>(id);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  const quiz = question?.data || [];
  const currentIndex = quiz.findIndex(
    (item) => item.id.toString() === currentQuizId
  );

  const goToMaterial = (index: number) => {
    if (index >= 0 && index < quiz.length) {
      const quizId = quiz[index].id.toString();
      setCurrentQuizId(quizId);
      router.push(`/quizzes/${quizId}`);
    }
  };

  const { mutate: submitQuestion, isPending: isSubmitting } =
    useAddSubmitQuestion(currentQuizId, {
      onSuccess: (data) => {
        const selectedAnswer = data?.data.correct_answer.answer_text;
        setCorrectAnswer(data?.data.correct_answer.answer_text);
        setSubmittedAnswer(selectedAnswer);
        setIsAnswerSubmitted(true);
        if (data.data.is_correct === false) {
          const incorrectSound = new Audio("/sounds/wrong.mp3");
          incorrectSound.play();
        } else {
          const correctSound = new Audio("/sounds/correct.mp3");
          correctSound.play();
        }
      },
      onError: (error) => {
        console.error("Error submitting question:", error);
      },
    });

  const [dialogExplanationQuestionOpen, setDialogExplanationQuestionOpen] =
    useState(false);

  const handleExplanationQuestionDialogOpen = () => {
    setDialogExplanationQuestionOpen(true);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col pt-12">
        <div className="flex-1 md:space-y-12 space-y-8 pad-x">
          <div className="flex items-center gap-4 md:gap-8">
            <Link
              href={`/dashboard/learning/${data?.data.user_learning_path_id}`}
            >
              <X className="cursor-pointer" />
            </Link>
            <Progress value={((currentIndex + 1) / quiz.length) * 100} />
          </div>
          <div>
            <h1 className="font-bold text-3xl uppercase">Quiz</h1>
          </div>
          <div className="grid grid-cols-1 md:gap-12 gap-8">
            <div>
              <h1 className="font-bold text-2xl">{data?.data.question_text}</h1>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-12 md:gap-y-6 gap-8">
            {data?.data.answers.map((answer) => (
              <Button
                key={answer.id}
                className={`bg-[#273856] rounded-2xl text-white border-[#1D2941] font-semibold md:text-xl text-sm border-b-8 border-r-8 text-center cursor-pointer hover:bg-primary hover:border-secondary md:p-10 p-6 text-wrap ${
                  isSubmitting ? "opacity-50 pointer-events-none" : ""
                } ${
                  isAnswerSubmitted && answer.answer_text === correctAnswer
                    ? "bg-green-500 border-green-700"
                    : ""
                } ${
                  isAnswerSubmitted &&
                  answer.answer_text !== correctAnswer &&
                  answer.answer_text === submittedAnswer
                    ? "bg-red-500 border-red-700"
                    : ""
                }`}
                onClick={() =>
                  !isAnswerSubmitted &&
                  submitQuestion({
                    user_id: session?.user.id as number,
                    answer_id: answer.id.toString(),
                  })
                }
                disabled={
                  isAnswerSubmitted && answer.answer_text !== correctAnswer
                }
              >
                <div className="p-8">{answer.answer_text}</div>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-end pad-x pb-8">
          <Button
            onClick={handleExplanationQuestionDialogOpen}
            disabled={!isAnswerSubmitted}
            variant={"secondary"}
          >
            Lihat Pembahasan
          </Button>
          <Button
            onClick={() => goToMaterial(currentIndex + 1)}
            disabled={
              currentIndex >= quiz.length - 1 ||
              isSubmitting ||
              !isAnswerSubmitted
            }
          >
            Selanjutnya <ArrowRight />
          </Button>
        </div>
      </div>
      <DialogExplanationQuestion
        id={data?.data.id ? `${data.data.id}` : ""}
        open={dialogExplanationQuestionOpen}
        setOpen={setDialogExplanationQuestionOpen}
      />
    </>
  );
}
