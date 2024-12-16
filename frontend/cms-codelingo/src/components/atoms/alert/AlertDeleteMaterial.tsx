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
import { Material } from "@/types/material/material";

interface DeleteMaterialProps {
  confirmDelete: () => void;
  data?: Material | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
}

const DeleteMaterialDialog = ({
  open,
  setOpen,
  confirmDelete,
  data,
  isPending,
}: DeleteMaterialProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Materi?</AlertDialogTitle>
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

export default DeleteMaterialDialog;
