import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Heart, Zap } from "lucide-react";
import Image from "next/image";
import chestCommon from "/public/images/chest_common.png";
import chestSilver from "/public/images/chest_silver.png";
import chestGold from "/public/images/chest_gold.png";
import { Button } from "@/components/ui/button";

export default function CardMission() {
  return (
    <>
      <Card>
        <CardContent className="flex flex-row items-center justify-between gap-4 p-8">
          <Zap className="h-12 w-12 text-yellow-400" fill="currentColor" />
          <div className="w-4/5 flex flex-col gap-4">
            <h1 className="font-bold place-items-start">Pelajari 5 Modul</h1>
            <div className="flex flex-row w-11/12 items-center justify-center gap-4">
              <Progress value={60} />
              <Image
                src={chestCommon}
                alt="Chest Common"
                width={40}
                height={40}
              />
            </div>
          </div>
          <Button variant={"secondary"} className="w-1/6">
            CLAIMED
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center justify-between gap-4 p-8">
          <Heart className="h-12 w-12 text-red-500" fill="currentColor" />
          <div className="w-4/5 flex flex-col gap-4">
            <h1 className="font-bold place-items-start">Pelajari 5 Modul</h1>
            <div className="flex flex-row w-11/12 items-center justify-center gap-4">
              <Progress value={60} />
              <Image
                src={chestSilver}
                alt="Chest Common"
                width={40}
                height={40}
              />
            </div>
          </div>
          <Button className="w-1/6">CLAIM</Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center justify-between gap-4 p-8">
          <Clock className="h-12 w-12 text-[#38B5FC]" />
          <div className="w-4/5 flex flex-col gap-4">
            <h1 className="font-bold place-items-start">Pelajari 5 Modul</h1>
            <div className="flex flex-row w-11/12 items-center justify-center gap-4">
              <Progress value={60} />
              <Image src={chestGold} alt="Chest Gold" width={40} height={40} />
            </div>
          </div>
          <Button variant={"secondary"} className="w-1/6">
            🔒CLAIM
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
