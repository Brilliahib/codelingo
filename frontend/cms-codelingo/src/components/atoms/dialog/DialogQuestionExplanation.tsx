"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetQuestionExplanationDetail } from "@/http/(user)/learning/quiz/get-detail-explanation-question";
import { baseUrl } from "@/utils/misc";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface DialogExplanationQuestionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogExplanationQuestion({
  open,
  setOpen,
  id,
}: DialogExplanationQuestionProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetQuestionExplanationDetail(
    { id, token: session?.access_token as string },
    { enabled: status === "authenticated" }
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Pembahasan Soal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {data?.data.explanation_image && (
            <div>
              <Image
                src={`${baseUrl}/${data?.data.explanation_image}`}
                alt={data?.data.explanation_text ?? ""}
                width={1000}
                height={1000}
                className="w-full rounded-xl"
              />
            </div>
          )}
          <h1 className="font-bold text-base">{data?.data.explanation_text}</h1>
        </div>
      </DialogContent>
    </Dialog>
  );
}
