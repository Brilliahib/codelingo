import QuestionDashboardAdminWrapper from "@/components/organism/dashboard/admin/question/QuestionDashboardAdminWrapper";

interface QuizDetailProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminQuizPage({
  params,
}: QuizDetailProps) {
  const { id } = await params;
  return (
    <>
      <QuestionDashboardAdminWrapper id={id} />
    </>
  );
}
