import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Question } from "@/types/quiz/quiz";

interface DeleteQuestionProps {
  confirmDelete: () => void;
  data?: Question | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
}

const DeleteQuestionDialog = ({
  open,
  setOpen,
  confirmDelete,
  data,
  isPending,
}: DeleteQuestionProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Pertanyaan?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus pertanyaan? Data yang sudah
            dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={`border-0`}
            onClick={confirmDelete}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteQuestionDialog;
