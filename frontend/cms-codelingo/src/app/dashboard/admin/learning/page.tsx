import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import LearningDashboardAdminWrapper from "@/components/organism/dashboard/admin/learning/LearningDashboardAdminWrapper";

export default function DashboardAdminLearningPage() {
  return (
    <>
      <DashboardTitle title="Learning Path" />
      <LearningDashboardAdminWrapper />
    </>
  );
}
