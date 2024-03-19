"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Circle,
  Dot,
  LinkIcon,
  MoreHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";

export type ChatColumn = {
  id: string;
  user1: string;
  user2: string;
  annoncementLink: string;
  status: "active" | "blocked" | "archived";
};

export const columns: ColumnDef<ChatColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Выбрать все"
        className=" shadow-inner bg-slate-100"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Выбрать строку"
        className=" shadow-inner bg-slate-100"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "annoncementLink",
    header: "Обьявление",
    cell: ({ row }) => (
      <Link
        href={row.getValue("annoncementLink")}
        className="line-clamp-1 max-w-40 hover:text-blue-500 hover:underline underline-offset-2 gap-1 flex flex-row items-center"
      >
        <LinkIcon className="w-3" /> {row.getValue("annoncementLink")}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => (
      <div className="capitalize text-xs">
        {row.getValue("status") === "active" && (
          <span className=" py-0.5 px-2 rounded-full bg-green-600 text-neutral-50">
            Активно
          </span>
        )}
        {row.getValue("status") === "blocked" && (
          <span className=" py-0.5 px-2 rounded-full bg-red-600 text-neutral-50">
            Заблокировано
          </span>
        )}
        {row.getValue("status") === "archived" && (
          <span className=" py-0.5 px-2 rounded-full bg-slate-600 text-neutral-50">
            Архив
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "user1",
    header: "Пользователь 1",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 items-center">
        <User className="w-4" />
        <p className="font-medium">{row.getValue("user1")}</p>
      </div>
    ),
  },
  {
    accessorKey: "user2",
    header: "Пользователь 2",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 items-center">
        <User className="w-4" />
        <p className="font-medium">{row.getValue("user2")}</p>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ChatColumn = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(ChatColumn.id)}
            >
              Скопировать ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Заблокировать</DropdownMenuItem>
            <DropdownMenuItem>Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
