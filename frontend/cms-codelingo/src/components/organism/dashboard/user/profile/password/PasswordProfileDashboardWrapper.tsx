import CardDailyMission from "@/components/molecules/card/CardDailyMission";
import CardLearningProgress from "@/components/molecules/card/CardLearningProgress";
import FormUpdatePassword from "@/components/molecules/form/FormUpdatePassword";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function PasswordProfileDashboardWrapper() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-12 gap-8">
        <div className="md:w-8/12 w-full space-y-6">
          <FormUpdatePassword session={session!} />
        </div>
        <div className="md:w-4/12 w-full space-y-6">
          <CardDailyMission />
          <CardLearningProgress />
        </div>
      </div>
    </>
  );
}
