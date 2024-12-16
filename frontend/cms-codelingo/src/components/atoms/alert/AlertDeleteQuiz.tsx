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
import { Quiz } from "@/types/quiz/quiz";

interface DeleteQuizProps {
  confirmDelete: () => void;
  data?: Quiz | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
}

const DeleteQuizDialog = ({
  open,
  setOpen,
  confirmDelete,
  data,
  isPending,
}: DeleteQuizProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Quiz?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus <strong>{data?.title}</strong>?
            Data yang sudah dihapus tidak dapat dikembalikan.
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

export default DeleteQuizDialog;
