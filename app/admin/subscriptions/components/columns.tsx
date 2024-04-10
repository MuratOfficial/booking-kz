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
  ActivityIcon,
  ArrowUpDown,
  CalendarDays,
  CheckCircle2Icon,
  Circle,
  Clock,
  Coins,
  Crown,
  Dot,
  Flame,
  History,
  KeyRound,
  MoreHorizontal,
  Newspaper,
  User,
  UserCircle,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";

export type PaymentColumn = {
  id: string;
  user: string;
  cost: number;
  status: "success" | "fail" | "pending";
  createdAt: string;
  service: "modification" | "adding" | "subscription" | "prolong";
};

const columnHelper = createColumnHelper<PaymentColumn>();

export const columns: ColumnDef<PaymentColumn>[] = [
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
    accessorKey: "user",
    header: "Пользователь",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 items-center">
        <User className="w-4" />
        <p className="font-medium">{row.getValue("user")}</p>
      </div>
    ),
  },
  {
    accessorKey: "cost",
    header: "Сумма",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 w-fit items-center rounded-full border border-slate-900 py-0.5 px-2">
        <p className="font-medium ">{row.getValue("cost")} ₸</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => (
      <div className="capitalize flex flex-row gap-x-1 items-center">
        {row.getValue("status") === "success" && (
          <span className="flex flex-row gap-x-1 items-center">
            <CheckCircle2Icon className="w-4 stroke-green-600" />
            Успешно
          </span>
        )}
        {row.getValue("status") === "fail" && (
          <span className="flex flex-row gap-x-1 items-center">
            <XCircle className="w-4 stroke-red-500" />
            Ошибка
          </span>
        )}
        {row.getValue("status") === "pending" && (
          <span className="flex flex-row gap-x-1 items-center">
            <Clock className="w-4 stroke-slate-600" />В процессе
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Создана",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 items-center">
        <CalendarDays className="w-4" />
        <p className="font-medium">{row.getValue("createdAt")}</p>
      </div>
    ),
  },
  {
    accessorKey: "service",
    header: "Транзакция",
    cell: ({ row }) => (
      <div className="capitalize flex flex-row gap-x-1 items-center">
        {row.getValue("service") === "modification" && (
          <span className="flex flex-row gap-x-1 items-center">
            <Zap className="w-4" />
            Модификация
          </span>
        )}
        {row.getValue("service") === "adding" && (
          <span className="flex flex-row gap-x-1 items-center">
            <Coins className="w-4 " />
            Пополнение
          </span>
        )}
        {row.getValue("service") === "subscription" && (
          <span className="flex flex-row gap-x-1 items-center">
            <Crown className="w-4 " />
            Подписка
          </span>
        )}
        {row.getValue("service") === "prolong" && (
          <span className="flex flex-row gap-x-1 items-center">
            <History className="w-4 " />
            Продление
          </span>
        )}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const PaymentColumn = row.original;

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
              onClick={() => navigator.clipboard.writeText(PaymentColumn.id)}
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
