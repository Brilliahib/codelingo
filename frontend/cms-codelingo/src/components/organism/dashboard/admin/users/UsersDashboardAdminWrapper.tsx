"use client";

import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useGetAllUser } from "@/http/(admin)/user/get-all-user";
import { userColumns } from "@/components/atoms/datacolumn/DataUser";
import Link from "next/link";

export default function UsersDashboardAdminWrapper() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllUser(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  return (
    <>
      <div className="py-8 space-y-8">
        <div className="flex justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Search user..."
          />
          <Link href={"/dashboard/admin/user/create"}>
            <Button>Tambah User</Button>
          </Link>
        </div>
        <DataTable columns={userColumns} data={filteredData} />
      </div>
    </>
  );
}
