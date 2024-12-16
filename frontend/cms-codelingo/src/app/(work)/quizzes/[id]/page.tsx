import QuizDetailContent from "@/components/organism/dashboard/user/quiz/QuizDetailContent";

interface QuizDetailProps {
  params: Promise<{ id: string }>;
}

export default async function QuizDetailPage({ params }: QuizDetailProps) {
  const { id } = await params;
  return (
    <>
      <QuizDetailContent id={id} />
    </>
  );
}
