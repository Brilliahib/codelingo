import CardDailyMission from "@/components/molecules/card/CardDailyMission";
import CardListExplanation from "@/components/molecules/card/CardListExplanation";
import CardListLearning from "@/components/molecules/card/CardListLearning";
import CardProfile from "@/components/molecules/card/CardProfile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function ExplanationDashboardWrapper() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-12 gap-8">
        <div className="md:w-8/12 w-full space-y-6">
          <CardListExplanation />
        </div>
        <div className="md:w-4/12 w-full space-y-6">
          <CardProfile session={session!} />
          <CardDailyMission />
        </div>
      </div>
    </>
  );
}
