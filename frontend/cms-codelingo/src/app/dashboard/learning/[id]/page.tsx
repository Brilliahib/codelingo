import LearningDetailDashboardWrapper from "@/components/organism/dashboard/user/learning/LearningDetailDashboardWrapper";

interface DashboardLearningDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardLearningDetailPage({
  params,
}: DashboardLearningDetailPageProps) {
  const { id } = await params;

  return (
    <>
      <LearningDetailDashboardWrapper id={Number(id)} />
    </>
  );
}
