import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import ProfileDashboardWrapper from "@/components/organism/dashboard/user/profile/ProfileDashboardWrapper";

export default function DashboardProfilePage() {
  return (
    <>
      <DashboardTitle title="Profile" />
      <ProfileDashboardWrapper />
    </>
  );
}
