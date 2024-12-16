"use client";

import DeleteQuizDialog from "@/components/atoms/alert/AlertDeleteQuiz";
import { quizColumns } from "@/components/atoms/datacolumn/DataQuiz";
import DialogCreateQuizzes from "@/components/atoms/dialog/DialogCreateQuizzes";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDeleteQuiz } from "@/http/(admin)/quiz/delete-quiz";
import { useGetAllQuizAdmin } from "@/http/(admin)/quiz/get-all-quiz";
import { Quiz } from "@/types/quiz/quiz";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function QuizzesDashboardAdminWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllQuizAdmin(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((quiz) =>
      quiz.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const [dialogCreateQuizzesOpen, setDialogCreateQuizzesOpen] = useState(false);

  const handleQuizzesDialogOpen = () => {
    setDialogCreateQuizzesOpen(true);
  };

  const [selectedQuestion, setSelectedQuestion] = useState<Quiz | null>(null);
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteMaterialHandler, isPending: isDeletePending } =
    useDeleteQuiz({
      onSuccess: () => {
        setSelectedQuestion(null);
        toast({ title: "Berhasil menghapus quiz!", variant: "success" });
        queryClient.invalidateQueries({
          queryKey: ["quizzes-list"],
        });
      },
      onError: (error) => {
        toast({
          title: "Gagal menghapus quiz!",
          variant: "destructive",
          description: error.response?.data.message,
        });
      },
    });

  const deleteQuizHandler = (data: Quiz) => {
    setSelectedQuestion(data);
    setOpenAlertDelete(true);
  };

  const handleDeleteQuiz = () => {
    if (selectedQuestion?.id) {
      deleteMaterialHandler({
        id: selectedQuestion.id.toLocaleString(),
        token: session?.access_token as string,
      });
    }
  };
  return (
    <>
      <div className="py-8 space-y-8">
        <div className="flex justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Search Quiz..."
          />
          <Button onClick={handleQuizzesDialogOpen}>Tambah Quiz</Button>
        </div>
        <DataTable
          columns={quizColumns}
          data={
            data?.data.map((site) => ({
              ...site,
              deleteQuizHandler: deleteQuizHandler,
            })) ?? []
          }
        />
      </div>
      <DialogCreateQuizzes
        open={dialogCreateQuizzesOpen}
        setOpen={setDialogCreateQuizzesOpen}
      />
      <DeleteQuizDialog
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={handleDeleteQuiz}
        data={selectedQuestion}
        isPending={isDeletePending}
      />
    </>
  );
}
