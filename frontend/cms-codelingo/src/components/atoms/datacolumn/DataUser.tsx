"use client";

import { ColumnDef } from "@tanstack/react-table";

import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Eye, SquarePen } from "lucide-react";
import { User } from "@/types/user/user";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.name}
        </p>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.username}
        </p>
      );
    },
  },
  {
    accessorKey: "exp",
    header: "Exp",
    cell: ({ row }) => {
      const data = row.original;
      return <p suppressHydrationWarning>{data.exp.toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const data = row.original;
      return <p suppressHydrationWarning>{data.level}</p>;
    },
  },
  {
    accessorKey: "league",
    header: "Liga",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.league}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/user/${data.id}/edit`}
              className="flex items-center text-white hover:text-background"
            >
              <SquarePen className="h-4 w-4" />
              <span className="ml-2">Edit User</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/user/${data.id}`}
              className="flex items-center text-white hover:text-background"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail User</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
