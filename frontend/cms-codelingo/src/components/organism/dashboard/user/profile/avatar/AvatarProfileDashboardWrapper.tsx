import CardDailyMission from "@/components/molecules/card/CardDailyMission";
import AvatarProfileDashboardContent from "./AvatarProfileDashboardContent";
import CardLearningProgress from "@/components/molecules/card/CardLearningProgress";

export default function AvatarProfileDashboardWrapper() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-12 gap-8">
        <div className="md:w-8/12 w-full space-y-6">
          <AvatarProfileDashboardContent />
        </div>
        <div className="md:w-4/12 w-full space-y-6">
          <CardDailyMission />
          <CardLearningProgress />
        </div>
      </div>
    </>
  );
}
