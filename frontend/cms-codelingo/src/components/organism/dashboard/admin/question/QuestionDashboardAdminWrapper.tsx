"use client";

import DeleteQuestionDialog from "@/components/atoms/alert/AlertDeleteQuestion";
import { questionColumns } from "@/components/atoms/datacolumn/DataQuestion";
import SearchInput from "@/components/atoms/search/SearchInput";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDeleteQuestion } from "@/http/(admin)/question/delete-question";
import { useGetAllQuestion } from "@/http/(admin)/question/get-all-question";
import { useGetDetailQuiz } from "@/http/(admin)/quiz/get-detail-quiz";
import { Question } from "@/types/quiz/quiz";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface QuestionParams {
  id: string;
}

export default function QuestionDashboardAdminWrapper({ id }: QuestionParams) {
  const { data: session, status } = useSession();
  const { data } = useGetAllQuestion(
    {
      id,
      token: session?.access_token as string,
    },
    { enabled: status === "authenticated" }
  );

  const { data: quiz } = useGetDetailQuiz(
    {
      id,
      token: session?.access_token as string,
    },
    { enabled: status === "authenticated" }
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const filteredData =
    data?.data.filter((question) =>
      question.question_text.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const { mutate: deleteMaterialHandler, isPending: isDeletePending } =
    useDeleteQuestion({
      onSuccess: () => {
        setSelectedQuestion(null);
        toast({ title: "Berhasil menghapus pertanyaan!", variant: "success" });
        queryClient.invalidateQueries({
          queryKey: ["question-list"],
        });
      },
      onError: (error) => {
        toast({
          title: "Gagal menghapus pertanyaan!",
          variant: "destructive",
          description: error.response?.data.message,
        });
      },
    });

  const deleteQuestionHandler = (data: Question) => {
    setSelectedQuestion(data);
    setOpenAlertDelete(true);
  };

  const handleDeleteQuestion = () => {
    if (selectedQuestion?.id) {
      deleteMaterialHandler({
        id: selectedQuestion.id.toLocaleString(),
        token: session?.access_token as string,
      });
    }
  };
  return (
    <>
      <DashboardTitle title={quiz?.data.title ?? ""} />
      <div className="py-8 space-y-8">
        <div className="flex justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Cari pertanyaan..."
          />
          <Link href={"/dashboard/admin/quizzes/create"}>
            <Button>Tambah Pertanyaan</Button>
          </Link>
        </div>
        <DataTable
          columns={questionColumns}
          data={
            data?.data.map((site) => ({
              ...site,
              deleteQuestionHandler: deleteQuestionHandler,
            })) ?? []
          }
        />
      </div>
      <DeleteQuestionDialog
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={handleDeleteQuestion}
        data={selectedQuestion}
        isPending={isDeletePending}
      />
    </>
  );
}
