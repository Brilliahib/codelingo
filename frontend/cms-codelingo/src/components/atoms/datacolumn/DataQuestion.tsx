"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Question } from "@/types/quiz/quiz";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { baseUrl } from "@/utils/misc";

interface QuestionRowProps extends Question {
  deleteQuestionHandler: (data: Question) => void;
}

export const questionColumns: ColumnDef<QuestionRowProps>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "question_text",
    header: "Pertanyaan",
    cell: ({ row }) => {
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {row.original.question_text}
        </p>
      );
    },
  },
  {
    accessorKey: "question_image",
    header: "Gambar Pertanyaan",
    cell: ({ row }) => {
      const imageSrc = row.original.question_image;
      return (
        <>
          {imageSrc ? (
            <Image
              src={`${baseUrl}/${imageSrc}`}
              alt="Question Image"
              width={1000}
              height={1000}
              className="rounded object-cover max-w-[150px]"
            />
          ) : (
            <p className="text-gray-500">Tidak ada gambar</p>
          )}
        </>
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
              href={`/dashboard/admin/material/${data.id}/edit`}
              className="flex items-center text-white hover:text-background"
            >
              <SquarePen className="h-4 w-4" />
              <span className="ml-2">Edit Question</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/material/${data.id}`}
              className="flex items-center text-white hover:text-background"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Question</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => data.deleteQuestionHandler(data)}
            className="cursor-pointer text-red-500 focus:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus Materi</span>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
