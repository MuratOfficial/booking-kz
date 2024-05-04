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
import { toast } from "@/components/ui/use-toast";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import {
  ActivityIcon,
  AlertCircle,
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
  PlusCircle,
  User,
  UserCircle,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";

export type PaymentColumn = {
  id: string;
  user: string;
  sum: string;
  bonus?: string;
  status: string;
  createdAt: string;
  service: string;
};

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
    accessorKey: "sum",
    header: "Сумма",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 w-fit items-center rounded-full border border-slate-900 py-0.5 px-2">
        <p className="font-medium ">{row.getValue("sum")} ₸</p>
      </div>
    ),
  },
  {
    accessorKey: "bonus",
    header: "Бонус",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 w-fit items-center rounded-full border border-green-500 py-0.5 px-2">
        <p className="font-medium ">{row.getValue("bonus")} б</p>
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
        {row.getValue("status") === "cancel" && (
          <span className="flex flex-row gap-x-1 items-center">
            <XCircle className="w-4 stroke-gray-600" />
            Отмена
          </span>
        )}
        {row.getValue("status") === "fail" && (
          <span className="flex flex-row gap-x-1 items-center">
            <AlertCircle className="w-4 stroke-red-500" />
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
        {row.getValue("service") === "modifier" && (
          <span className="flex flex-row gap-x-1 items-center">
            <Zap className="w-4" />
            Модификация
          </span>
        )}
        {row.getValue("service") === "refill" && (
          <span className="flex flex-row gap-x-1 items-center">
            <Coins className="w-4 " />
            Пополнение
          </span>
        )}
        {row.getValue("service") === "refill-manual" && (
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
        {row.getValue("service") === "bonus" && (
          <span className="flex flex-row gap-x-1 items-center text-green-500">
            <PlusCircle className="w-4" />
            Бонус
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
      const onDelete = async (id: string) => {
        try {
          await axios.delete(`/api/admin/payments/${id}`);
          toast({ description: "Платеж удален", variant: "default" });
        } catch (error) {
          toast({
            description: "Упс... что-то пошло не так(",
            variant: "destructive",
          });
        }
      };

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
            <DropdownMenuItem asChild>
              <Link href={`/admin/payments/${PaymentColumn.id}`}>
                Редактировать
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(PaymentColumn.id)}>
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
