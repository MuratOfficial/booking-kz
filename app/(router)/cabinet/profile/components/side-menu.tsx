"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideMenuProfile() {
  const pathname = usePathname();
  return (
    <div className="rounded-3xl h-fit bg-gradient-to-r from-slate-900 to-slate-800 col-span-1 pt-4 pb-2 px-2 flex flex-col gap-1">
      <Link
        href="/cabinet/profile/billing"
        className={cn(
          "font-semibold flex flex-row items-center justify-center gap-x-1 h-fit  rounded-full text-neutral-50  transition delay-150 duration-500 p-1.5 hover:text-slate-900 hover:bg-neutral-50",
          pathname.startsWith("/cabinet/profile/billing") &&
            "bg-neutral-50 text-slate-900"
        )}
      >
        Счет и Платежи
      </Link>
      <Link
        href="/cabinet/profile/notifications"
        className={cn(
          "font-semibold flex flex-row items-center justify-center gap-x-1 h-fit  rounded-full text-neutral-50  transition delay-150 duration-500 p-1.5 hover:text-slate-900 hover:bg-neutral-50",
          pathname.startsWith("/cabinet/profile/notifications") &&
            "bg-neutral-50 text-slate-900"
        )}
      >
        Оповещения
      </Link>
      <Link
        href="/cabinet/profile/settings"
        className={cn(
          "font-semibold flex flex-row items-center justify-center gap-x-1 h-fit  rounded-full text-neutral-50  transition delay-150 duration-500 p-1.5 hover:text-slate-900 hover:bg-neutral-50",
          pathname.startsWith("/cabinet/profile/settings") &&
            "bg-neutral-50 text-slate-900"
        )}
      >
        Настройки
      </Link>
      <div
        className="w-full py-16 bg-no-repeat bg-center bg-contain my-2"
        style={{ backgroundImage: `url(/svg/settings.svg)` }}
      ></div>
    </div>
  );
}

export default SideMenuProfile;
