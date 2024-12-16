import ExplanationDetailDashboardWrapper from "@/components/organism/dashboard/user/explanation/ExplanationDetailDashboardWrapper";
import KeyExplanationDetailDashboardWrapper from "@/components/organism/dashboard/user/explanation/KeyExplanationDetailDashboardWrapper";

interface DashboardExplanationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnswerDetailPage({
  params,
}: DashboardExplanationDetailPageProps) {
  const { id } = await params;

  return (
    <>
      <KeyExplanationDetailDashboardWrapper id={id} />
    </>
  );
}
