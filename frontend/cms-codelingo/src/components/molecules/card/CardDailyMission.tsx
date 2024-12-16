import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function CardDailyMission() {
  return (
    <>
      <Card className="bg-transparent border md:block hidden">
        <CardContent className="p-8">
          <div className="md:space-y-6 space-y-4">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold text-muted/80">Misi Harian</h1>
              <Link
                href={"#"}
                className="text-lg font-bold uppercase text-primary hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <Zap className="h-8 w-8 text-yellow-400" fill="currentColor" />
              <div className="w-full space-y-4">
                <p className="font-semibold text-lg">
                  DAPATKAN <span className="text-yellow-300">+ 10 EXP</span>
                </p>
                <Progress value={50} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
