import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import UsersDashboardAdminWrapper from "@/components/organism/dashboard/admin/users/UsersDashboardAdminWrapper";

export default function DashboardAdminUsers() {
  return (
    <>
      <DashboardTitle title="Users" />
      <UsersDashboardAdminWrapper />
    </>
  );
}
