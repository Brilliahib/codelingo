import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import MaterialsDashboardAdminWrapper from "@/components/organism/dashboard/admin/materials/MaterialsDashboardAdminWrapper";

export default function DashboardAdminMaterialsPage() {
  return (
    <>
      <DashboardTitle title="Materials" />
      <MaterialsDashboardAdminWrapper />
    </>
  );
}
