"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface DropdownChatButtonsProps {
  chatId?: string;
  annoncementId?: string;
}

function DropdownChatButtons({
  chatId,
  annoncementId,
}: DropdownChatButtonsProps) {
  const { toast } = useToast();
  const router = useRouter();

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/api/chats/${id}`);
      toast({ description: "Чат удален", variant: "default" });
    } catch (error) {
      toast({
        description: "Что-то пошло не так",
        variant: "destructive",
      });
    } finally {
      router.push("/cabinet/chats");
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group/1 p-2 rounded-full hover:bg-slate-300">
          <MoreHorizontal className="group-hover/1:stroke-blue-500 stroke-slate-900" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-slate-700 text-sm font-semibold">
        <DropdownMenuItem asChild>
          <Link href={`/annoncements/${annoncementId}`}>
            Перейти к обьявлению
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDelete(chatId || "")}>
          Удалить чат
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownChatButtons;
