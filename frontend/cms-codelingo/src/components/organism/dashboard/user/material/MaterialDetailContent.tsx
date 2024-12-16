"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMarkCompleteMaterial } from "@/http/(user)/learning/material/add-mark-complete-material";
import { useGetAllMaterial } from "@/http/(user)/learning/material/get-all-material";
import { useGetMaterialDetail } from "@/http/(user)/learning/material/get-detail-material";
import { baseUrl } from "@/utils/misc";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

interface MaterialDetailProps {
  id: string;
}

export default function MaterialDetailContent({ id }: MaterialDetailProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetMaterialDetail(
    { id, token: session?.access_token as string },
    { enabled: status === "authenticated" }
  );
  const router = useRouter();
  const { mutate: markCompleteMaterial } = useMarkCompleteMaterial();
  const [currentMaterialId, setCurrentMaterialId] = useState<string>(id);

  const [learningPathId, setLearningPathId] = useState<number | null>(null);

  useEffect(() => {
    if (data?.data?.learning_path_id) {
      setLearningPathId(data?.data?.learning_path_id);
    }
  }, [data?.data?.learning_path_id]);

  const { data: material } = useGetAllMaterial(
    {
      id: learningPathId!,
      token: session?.access_token as string,
    },
    { enabled: learningPathId !== null }
  );

  const materials = material?.data || [];
  const currentIndex = materials.findIndex(
    (item) => item.id.toString() === currentMaterialId
  );

  const goToMaterial = (index: number) => {
    if (index >= 0 && index < materials.length) {
      const materialId = materials[index].id.toString();
      setCurrentMaterialId(materialId);
      router.push(`/materials/${materialId}`);
    }
  };

  const handleNextMaterial = () => {
    if (currentIndex < materials.length - 1) {
      markCompleteMaterial(currentMaterialId);
      goToMaterial(currentIndex + 1);
    } else {
      markCompleteMaterial(currentMaterialId);
    }
  };

  useEffect(() => {
    if (currentIndex === materials.length - 1) {
      markCompleteMaterial(currentMaterialId);
    }
  }, [currentIndex, materials.length, currentMaterialId, markCompleteMaterial]);

  const formatMaterialText = (htmlText: string): string => {
    return htmlText.replace(
      /<div class="ql-code-block">([\s\S]*?)<\/div>/g,
      (match, code) => {
        const highlightedCode = hljs.highlightAuto(code).value;
        return `<pre class="shiki shiki-themes github-dark github-light"><code class="hljs">${highlightedCode}</code></pre>`;
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col pt-12">
      <div className="flex-1 md:space-y-12 space-y-8 pad-x">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href={`/dashboard/learning/${data?.data.user_learning_path_id}`}
            className="flex-shrink-0"
          >
            <X className="cursor-pointer" />
          </Link>
          <Progress value={((currentIndex + 1) / materials.length) * 100} />
          <p>
            {currentIndex + 1}/{materials.length}
          </p>
        </div>
        <div>
          <h1 className="font-bold text-3xl">{data?.data.title}</h1>
        </div>
        <div
          className={`grid ${
            data?.data.material_image
              ? "md:grid-cols-2 xl:gap-24 md:gap-12"
              : "grid-cols-1"
          } gap-8`}
        >
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: formatMaterialText(data?.data.material_text ?? ""),
              }}
              className="prose leading-loose font-semibold text-lg"
            />
          </div>
          {data?.data.material_image && (
            <div>
              <Image
                src={`${baseUrl}/${data?.data.material_image}`}
                alt={data?.data.title ?? ""}
                width={1000}
                height={1000}
                className="w-full rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center md:static fixed bottom-0 left-0 w-full pad-x py-4 shadow-md md:bg-transparent bg-background">
        <Button
          variant={"background"}
          onClick={() => goToMaterial(currentIndex - 1)}
          disabled={currentIndex <= 0}
        >
          <ArrowLeft /> Sebelumnya
        </Button>
        <Button
          onClick={handleNextMaterial}
          disabled={currentIndex >= materials.length - 1}
        >
          Selanjutnya <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
