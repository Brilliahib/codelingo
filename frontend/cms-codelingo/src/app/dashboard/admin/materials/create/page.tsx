import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import MaterialCreateDashboardAdminWrapper from "@/components/organism/dashboard/admin/materials/MaterialCreateDashboardAdminWrapper";

export default function DashboardAdminCreateMaterialPage() {
  return (
    <>
      <DashboardTitle title="Tambah Materi" />
      <MaterialCreateDashboardAdminWrapper />
    </>
  );
}
