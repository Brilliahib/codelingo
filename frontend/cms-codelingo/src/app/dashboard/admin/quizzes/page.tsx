import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import QuizzesDashboardAdminWrapper from "@/components/organism/dashboard/admin/quizzes/QuizzesDashboardAdminWrapper";

export default function DashboardAdminLearningPage() {
  return (
    <>
      <DashboardTitle title="Quizzes" />
      <QuizzesDashboardAdminWrapper />
    </>
  );
}
