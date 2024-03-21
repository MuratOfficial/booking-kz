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
  ArrowUpDown,
  Circle,
  Dot,
  Flame,
  MoreHorizontal,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

export type AnnoncementColumn = {
  id: string;
  city: string;
  isChecked: boolean;
  roomNumber: number;
  categoryType: string;
  serviceType: string;
  serviceTypeExt?: string;
  phase: string;
  topModifier?: number;
  hotModifier?: number;
  hurryModifier?: number;
  areaSq: number;
  price: number;
  user: string;
};

const columnHelper = createColumnHelper<AnnoncementColumn>();

export const columns: ColumnDef<AnnoncementColumn>[] = [
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
    accessorKey: "city",
    header: "Город",
    cell: ({ row }) => <div className="capitalize">{row.getValue("city")}</div>,
  },
  {
    accessorKey: "isChecked",
    header: "Проверено?",
    cell: ({ row }) => (
      <div className="capitalize text-xs">
        {row.getValue("isChecked") ? (
          <span className=" py-0.5 px-2 rounded-full bg-green-600 text-neutral-50">
            Проверено
          </span>
        ) : (
          <span className=" py-0.5 px-2 rounded-full bg-slate-600 text-neutral-50">
            Непроверено
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "phase",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Фаза
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize flex flex-row gap-x-1 items-center">
        {row.getValue("phase") === "активно" ? (
          <Circle className=" fill-green-600 stroke-none w-3" />
        ) : row.getValue("phase") === "проверка" ? (
          <Circle className=" fill-sky-600 stroke-none  w-3" />
        ) : (
          <Circle className=" fill-red-600 stroke-none  w-3" />
        )}{" "}
        {row.getValue("phase")}
      </div>
    ),
  },
  {
    accessorKey: "categoryType",
    header: "Категория",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("categoryType")}</div>
    ),
  },
  {
    accessorKey: "serviceType",
    header: "Тип",
    enableHiding: true,
    cell: ({ row }) => (
      <div className="capitalize ">
        <p className="font-semibold text-blue-600">
          {row.getValue("serviceType")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "serviceTypeExt",
    header: "Тип аренды",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("serviceType") === "Аренда" && (
          <p className="font-medium text-xs">
            {row.getValue("serviceTypeExt")}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "areaSq",
    header: "Площадь",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 items-center">
        <p className="font-medium">{row.getValue("areaSq")} м²</p>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Цена",
    enableHiding: true,

    cell: ({ row }) => (
      <div className="flex flex-row gap-1 items-center">
        <p className="font-medium">{row.getValue("price")} ₸</p>
      </div>
    ),
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const AnnoncementColumn = row.original;
      const router = useRouter();

      const onDelete = async (id: string) => {
        try {
          await axios.delete(`/api/admin/annoncements/${id}`);
          toast({ description: "Обьявление удалено", variant: "default" });
          router.refresh();
        } catch (error) {
          toast({
            description: "Убедитесь что вы удалили все обьекты обьявление",
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
              onClick={() =>
                navigator.clipboard.writeText(AnnoncementColumn.id)
              }
            >
              Скопировать ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/admin/annoncements/${AnnoncementColumn.id}`)
              }
            >
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(AnnoncementColumn.id)}>
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
