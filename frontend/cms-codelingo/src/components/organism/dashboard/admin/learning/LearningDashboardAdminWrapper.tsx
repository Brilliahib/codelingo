"use client";

import DeleteLearningPathDialog from "@/components/atoms/alert/AlertDeleteLearningPath";
import { learningColumns } from "@/components/atoms/datacolumn/DataLearningPath";
import DialogCreateLearningPath from "@/components/atoms/dialog/DialogCreateLearningPath";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDeleteLearning } from "@/http/(admin)/learning/delete-learning-path";
import { useGetAllLearningPathAdmin } from "@/http/(admin)/learning/get-all-learning";
import { Learning } from "@/types/learning/learning";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function LearningDashboardAdminWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllLearningPathAdmin(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((learning) =>
      learning.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const [dialogCreateLearningPathOpen, setDialogCreateLearningPathOpen] =
    useState(false);

  const handleLearningPathDialogOpen = () => {
    setDialogCreateLearningPathOpen(true);
  };

  const [selectedQuestion, setSelectedQuestion] = useState<Learning | null>(
    null
  );
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteMaterialHandler, isPending: isDeletePending } =
    useDeleteLearning({
      onSuccess: () => {
        setSelectedQuestion(null);
        toast({
          title: "Berhasil menghapus learning path!",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["learning-path-list"],
        });
      },
      onError: (error) => {
        toast({
          title: "Gagal menghapus learning path!",
          variant: "destructive",
          description: error.response?.data.message,
        });
      },
    });

  const deleteLearningPathHandler = (data: Learning) => {
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
            props="Search learning path..."
          />
          <Button onClick={handleLearningPathDialogOpen}>
            Tambah Learning Path
          </Button>
        </div>
        <DataTable
          columns={learningColumns}
          data={
            data?.data.map((site) => ({
              ...site,
              deleteLearningPathHandler: deleteLearningPathHandler,
            })) ?? []
          }
        />
      </div>
      <DialogCreateLearningPath
        open={dialogCreateLearningPathOpen}
        setOpen={setDialogCreateLearningPathOpen}
      />
      <DeleteLearningPathDialog
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={handleDeleteQuiz}
        data={selectedQuestion}
        isPending={isDeletePending}
      />
    </>
  );
}
