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
import { Learning } from "@/types/learning/learning";

interface DeleteLearningPathProps {
  confirmDelete: () => void;
  data?: Learning | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
}

const DeleteLearningPathDialog = ({
  open,
  setOpen,
  confirmDelete,
  data,
  isPending,
}: DeleteLearningPathProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Learning Path?</AlertDialogTitle>
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

export default DeleteLearningPathDialog;
