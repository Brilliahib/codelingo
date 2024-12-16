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
import { Quiz } from "@/types/quiz/quiz";

interface QuizRowProps extends Quiz {
  deleteQuizHandler: (data: Quiz) => void;
}

export const quizColumns: ColumnDef<QuizRowProps>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {row.original.title}
        </p>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {row.original.description}
        </p>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Learning Path",
    cell: ({ row }) => {
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {row.original.learning_path.title}
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
              href={`/dashboard/admin/quizzes/${data.id}/edit`}
              className="flex items-center text-white hover:text-background"
            >
              <SquarePen className="h-4 w-4" />
              <span className="ml-2">Edit Quiz</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/quizzes/${data.id}`}
              className="flex items-center text-white hover:text-background"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Quiz</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => data.deleteQuizHandler(data)}
            className="cursor-pointer text-red-500 focus:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus Quiz</span>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
