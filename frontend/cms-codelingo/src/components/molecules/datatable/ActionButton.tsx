"use client";

import { PropsWithChildren } from "react";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ActionButton = ({ children }: PropsWithChildren) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0 bg-transparent border-0 text-white hover:bg-transparent shadow-none">
          <span className="sr-only">Buka Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-poppins" align="end">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButton;
