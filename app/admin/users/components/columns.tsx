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
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Circle,
  Dot,
  Flame,
  KeyRound,
  MoreHorizontal,
  Newspaper,
  User,
  UserCircle,
  Wrench,
  Zap,
} from "lucide-react";

export type UserColumn = {
  id: string;
  username: string;
  phone: string;
  email: string;
  annoncements: number;
  status: "active" | "blocked";
  role: "moderator" | "admin" | "user";
  totalBalance: number;
};

const columnHelper = createColumnHelper<UserColumn>();

export const columns: ColumnDef<UserColumn>[] = [
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
    accessorKey: "username",
    header: "Логин",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 items-center">
        <User className="w-4" />
        <p className="font-medium">{row.getValue("username")}</p>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Телефон",
    cell: ({ row }) => (
      <div className="capitalize font-medium text-blue-500">
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="  text-slate-500">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "annoncements",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Обьявления
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize flex flex-row gap-x-1 items-center justify-center">
        <Newspaper className="w-4" />
        {row.getValue("annoncements")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("status") === "active" ? (
          <span className="text-xs text-neutral-50 bg-green-600 rounded-xl py-1 px-2">
            Активен
          </span>
        ) : (
          <span className="text-xs text-neutral-50 bg-red-600 rounded-xl py-1 px-2">
            Заблокирован
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Тип",
    enableHiding: true,
    cell: ({ row }) => (
      <div className="capitalize flex flex-row gap-x-1 items-center">
        {row.getValue("role") === "moderator" && (
          <span className="flex flex-row gap-x-1 items-center">
            <Wrench className="w-4" />
            Модератор
          </span>
        )}
        {row.getValue("role") === "user" && (
          <span className="flex flex-row gap-x-1 items-center">
            <UserCircle className="w-4" />
            Пользователь
          </span>
        )}
        {row.getValue("role") === "admin" && (
          <span className="flex flex-row gap-x-1 items-center">
            <KeyRound className="w-4" />
            Админ
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "totalBalance",
    header: "Баланс",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 items-center rounded-full border border-slate-900 py-0.5 px-2">
        <p className="font-medium ">{row.getValue("totalBalance")} ед.</p>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const UserColumn = row.original;

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
              onClick={() => navigator.clipboard.writeText(UserColumn.id)}
            >
              Скопировать ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Редактировать</DropdownMenuItem>
            <DropdownMenuItem>Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
