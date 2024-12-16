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
import { Material } from "@/types/material/material";
import { baseUrl } from "@/utils/misc";

interface MaterialRowProps extends Material {
  deleteMaterialHandler: (data: Material) => void;
}

export const materialColumns: ColumnDef<MaterialRowProps>[] = [
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
    accessorKey: "material_text",
    header: "Material Text",
    cell: ({ row }) => {
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {row.original.material_text}
        </p>
      );
    },
  },
  {
    accessorKey: "material_image",
    header: "Material Image",
    cell: ({ row }) => {
      const imageUrl = row.original.material_image;
      return (
        <Image
          src={`${baseUrl}/${row.original.material_image}`}
          alt={row.original.title}
          width={1000}
          height={1000}
          className="rounded object-cover max-w-[150px]"
        />
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
              <span className="ml-2">Edit Materi</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/material/${data.id}`}
              className="flex items-center text-white hover:text-background"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Materi</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => data.deleteMaterialHandler(data)}
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
