import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import LeaderboardDashboardWrapper from "@/components/organism/dashboard/user/leaderboard/LeaderboardDashboardWrapper";

export default function DashboardLeaderboardPage() {
  return (
    <>
      <DashboardTitle title="Leaderboard" />
      <LeaderboardDashboardWrapper />
    </>
  );
}
