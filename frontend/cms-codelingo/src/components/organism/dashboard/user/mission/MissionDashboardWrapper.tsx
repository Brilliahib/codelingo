import CardDailyMission from "@/components/molecules/card/CardDailyMission";
import CardProfile from "@/components/molecules/card/CardProfile";
import CardMission from "@/components/molecules/card/CardMission";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function MissionDashboardWrapper() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-12 gap-8">
        <div className="md:w-8/12 w-full space-y-6">
          <CardMission />
        </div>
        <div className="md:w-4/12 w-full space-y-6">
          <CardProfile session={session!} />
          <CardDailyMission />
        </div>
      </div>
    </>
  );
}
