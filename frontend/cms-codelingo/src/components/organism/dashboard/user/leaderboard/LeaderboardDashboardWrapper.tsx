import CardDailyMission from "@/components/molecules/card/CardDailyMission";
import CardProfile from "@/components/molecules/card/CardProfile";
import CardProfileLeaderboard from "@/components/molecules/card/CardProfileLeaderboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function LeaderboardDashboardWrapper() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-12 gap-8">
        <div className="md:w-8/12 w-full space-y-6">
          <CardProfileLeaderboard session={session!} />
        </div>
        <div className="md:w-4/12 w-full space-y-6">
          <CardProfile session={session!} />
          <CardDailyMission />
        </div>
      </div>
    </>
  );
}
