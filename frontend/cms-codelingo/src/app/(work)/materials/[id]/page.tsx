import MaterialDetailContent from "@/components/organism/dashboard/user/material/MaterialDetailContent";

interface MaterialDetailPagelPageProps {
  params: Promise<{ id: string }>;
}

export default async function MaterialDetailPage({
  params,
}: MaterialDetailPagelPageProps) {
  const { id } = await params;
  return (
    <>
      <MaterialDetailContent id={id} />
    </>
  );
}
