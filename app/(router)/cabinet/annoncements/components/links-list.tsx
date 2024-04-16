"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface LinksListProps {
  rentCount?: number;
  sellCount?: number;
  allCount?: number;
  archiveCount?: number;
  moderateCount?: number;
}

function LinksList({
  rentCount,
  sellCount,
  allCount,
  archiveCount,
  moderateCount,
}: LinksListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { replace } = useRouter();
  const [isOpenPopover, setOpenPopover] = React.useState("");

  const handleFilter = (term: string, filter: string) => {
    const params = new URLSearchParams(searchParams);

    if (filter === "phase") {
      if (term) {
        params.set("phase", term);
      } else {
        params.delete("phase");
      }
    }
    if (filter === "serviceType") {
      if (term) {
        params.set("serviceType", term);
      } else {
        params.delete("serviceType");
      }
    }

    replace(`/cabinet/annoncements?${params.toString()}`);
  };

  return (
    <div className="flex flex-row gap-2 flex-wrap text-slate-900 bg-white w-fit p-2 rounded-lg text-sm font-medium">
      <Popover open={isOpenPopover === "open1" ? true : false}>
        <PopoverTrigger asChild onMouseOver={() => setOpenPopover("open1")}>
          <span
            onClick={() => router.push("/cabinet/annoncements")}
            className={cn(
              " cursor-pointer transition duration-200 delay-75 hover:text-white hover:bg-slate-900 rounded-full px-3 py-2 border border-slate-900",
              pathname.startsWith("/cabinet/annoncements") &&
                "text-white bg-slate-900"
            )}
          >
            Все обьявления <span className="font-bold">{allCount || 0}</span>
          </span>
        </PopoverTrigger>
        <PopoverContent
          className="rounded-xl p-1 w-fit min-w-36 flex flex-col gap-2 text-sm"
          onMouseOver={() => setOpenPopover("open1")}
          onMouseOut={() => setOpenPopover("")}
          onBlur={() => setOpenPopover("")}
        >
          <button
            onClick={() => handleFilter("Аренда", "serviceType")}
            className={cn(
              " cursor-pointer transition duration-200 delay-75 hover:text-white hover:bg-slate-900 rounded-lg px-3 py-2 border border-slate-900",
              searchParams.has("serviceType", "Аренда") &&
                "text-white bg-slate-900"
            )}
          >
            Аренда <span className="font-bold">{rentCount || 0}</span>
          </button>
          <button
            onClick={() => handleFilter("Продажа", "serviceType")}
            className={cn(
              " cursor-pointer transition duration-200 delay-75 hover:text-white hover:bg-slate-900 rounded-lg px-3 py-2 border border-slate-900",
              searchParams.has("serviceType", "Продажа") &&
                "text-white bg-slate-900"
            )}
          >
            Продажа <span className="font-bold">{sellCount || 0}</span>
          </button>
        </PopoverContent>
      </Popover>

      <button
        onClick={() => handleFilter("проверка", "phase")}
        className={cn(
          " cursor-pointer transition duration-200 delay-75 hover:text-white hover:bg-slate-900 rounded-full px-3 py-2 border border-slate-900",
          searchParams.has("phase", "проверка") && "text-white bg-slate-900"
        )}
      >
        У модератора <span className="font-bold">{moderateCount || 0}</span>
      </button>
      <button
        onClick={() => handleFilter("блокировано", "phase")}
        className={cn(
          " cursor-pointer transition duration-200 delay-75 hover:text-white hover:bg-slate-900 rounded-full px-3 py-2 border border-slate-900",
          searchParams.has("phase", "блокировано") && "text-white bg-slate-900"
        )}
      >
        Архив <span className="font-bold">{archiveCount || 0}</span>
      </button>
      <Link
        href="/cabinet/profile/billing"
        className={cn(
          " cursor-pointer transition duration-200 delay-75 hover:text-white hover:bg-slate-900 rounded-full px-3 py-2 border border-slate-900",
          pathname.startsWith("/cabinet/profile/billing") &&
            "text-white bg-slate-900"
        )}
      >
        Счет и платежи
      </Link>
    </div>
  );
}

export default LinksList;
