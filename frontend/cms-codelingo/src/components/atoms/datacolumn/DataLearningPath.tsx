"use client";

import { ColumnDef } from "@tanstack/react-table";

import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Learning } from "@/types/learning/learning";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface LearningRowProps extends Learning {
  deleteLearningPathHandler: (data: Learning) => void;
}

export const learningColumns: ColumnDef<LearningRowProps>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.title}
        </p>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.description}
        </p>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Rilis",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(new Date(data.created_at), "EEEE, d MMMM yyyy", {
            locale: id,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: "Tanggal Update",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(new Date(data.updated_at), "EEEE, d MMMM yyyy", {
            locale: id,
          })}
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
              href={`/dashboard/admin/learning/${data.id}/edit`}
              className="flex items-center text-white hover:text-background"
            >
              <SquarePen className="h-4 w-4" />
              <span className="ml-2">Edit Learning Path</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/learning/${data.id}`}
              className="flex items-center text-white hover:text-background"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Learning Path</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => data.deleteLearningPathHandler(data)}
            className="cursor-pointer text-red-500 focus:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus Learning Path</span>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
