"use client";

import DeleteMaterialDialog from "@/components/atoms/alert/AlertDeleteMaterial";
import { materialColumns } from "@/components/atoms/datacolumn/DataMaterial";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDeleteMaterial } from "@/http/(admin)/material/delete-material";
import { useGetAllMaterialAdmin } from "@/http/(admin)/material/get-all-material";
import { Material } from "@/types/material/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function MaterialsDashboardAdminWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllMaterialAdmin(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const filteredData =
    data?.data.filter((quiz) =>
      quiz.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const { mutate: deleteMaterialHandler, isPending: isDeletePending } =
    useDeleteMaterial({
      onSuccess: () => {
        setSelectedMaterial(null);
        toast({ title: "Berhasil menghapus tipe games!", variant: "success" });
        queryClient.invalidateQueries({
          queryKey: ["materials-list"],
        });
      },
      onError: (error) => {
        toast({
          title: "Gagal menghapus tipe games!",
          variant: "destructive",
          description: error.response?.data.message,
        });
      },
    });

  const deleteMaterialsHandler = (data: Material) => {
    setSelectedMaterial(data);
    setOpenAlertDelete(true);
  };

  const handleDeleteMaterial = () => {
    if (selectedMaterial?.id) {
      deleteMaterialHandler({
        id: selectedMaterial.id.toLocaleString(),
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
            props="Search Materials..."
          />
          <Link href={"/dashboard/admin/materials/create"}>
            <Button>Tambah Materials</Button>
          </Link>
        </div>
        <DataTable
          columns={materialColumns}
          data={
            data?.data.map((site) => ({
              ...site,
              deleteMaterialHandler: deleteMaterialsHandler,
            })) ?? []
          }
        />
      </div>
      <DeleteMaterialDialog
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmDelete={handleDeleteMaterial}
        data={selectedMaterial}
        isPending={isDeletePending}
      />
    </>
  );
}
