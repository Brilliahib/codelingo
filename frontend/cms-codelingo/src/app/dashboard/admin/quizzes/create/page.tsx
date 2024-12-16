import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import QuestionCreateDashboardAdminWrapper from "@/components/organism/dashboard/admin/question/QuestionCreateDashboardAdminWrapper";

export default function DashboardAdminCreateQuestionPage() {
  return (
    <>
      <DashboardTitle title="Tambah Pertanyaan" />
      <QuestionCreateDashboardAdminWrapper />
    </>
  );
}
