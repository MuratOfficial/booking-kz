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
import { MoreHorizontal, Newspaper, Podcast } from "lucide-react";
import Link from "next/link";

export type SubsColumn = {
  id: string;
  name: string;
  price: string;
  color: string;
};

// const columnHelper = createColumnHelper<SubsColumn>();

export const columns: ColumnDef<SubsColumn>[] = [
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
    accessorKey: "name",
    header: "Название",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 items-center">
        <Podcast className="w-4" />
        <p className="font-medium">{row.getValue("name")}</p>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Стоимость",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 w-fit items-center rounded-full border border-slate-900 py-0.5 px-2">
        <p className="font-medium ">{row.getValue("price")} ₸</p>
      </div>
    ),
  },

  {
    accessorKey: "color",
    header: "Цвет",
    cell: ({ row }) => (
      <div className="capitalize flex flex-row gap-x-1 items-center">
        <span
          style={{ backgroundColor: `#${row.getValue("color")}` }}
          className="w-5 h-5 rounded-full"
        ></span>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const SubsColumn = row.original;
      const onDelete = async (id: string) => {
        try {
          await axios.delete(`/api/admin/subscriptions/${id}`);
          toast({ description: "Продвижение удалено", variant: "default" });
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
              onClick={() => navigator.clipboard.writeText(SubsColumn.id)}
            >
              Скопировать ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/subscriptions/${SubsColumn.id}`}>
                Редактировать
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(SubsColumn.id)}>
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
