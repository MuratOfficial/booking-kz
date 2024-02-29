import { Coins, ExternalLink, Info, WalletCards } from "lucide-react";
import Link from "next/link";
import React from "react";

function Points() {
  return (
    <div className="w-full rounded-2xl  bg-white gap-4  p-4 grid grid-cols-2">
      <div className="h-fit text-slate-800 flex flex-col gap-4 border border-slate-300 shadow-md rounded-xl p-6 items-start ">
        <div className="w-full flex flex-row justify-between ">
          <p className="text-base font-medium text-slate-700">Общая сумма</p>
          <WalletCards size={20} className="stroke-slate-500" />
        </div>

        <p className="text-3xl font-bold text-slate-900">988 ед.</p>
      </div>
      <div className="h-fit text-slate-800 flex flex-col gap-4 border border-slate-300 shadow-md rounded-xl p-6 items-start ">
        <div className="w-full flex flex-row justify-between ">
          <p className="text-base font-medium text-slate-700">Бонусы</p>
          <Coins size={20} className="stroke-slate-500" />
        </div>
        <div className="w-full flex flex-row justify-between ">
          <p className="text-3xl font-bold text-slate-900">420 б.</p>
          <p className="text-xs text-red-400 w-32 text-right font-semibold">
            Истечение бонусов через 24 дн.
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-x-1 items-center group">
        <Info
          size={16}
          className="stroke-slate-500 group-hover:stroke-blue-500 transition-all delay-75 duration-300"
        />
        <Link
          href="/"
          className="font-semibold text-slate-500 text-sm flex flex-row gap-x-1 transition-all delay-75 duration-300 items-center group/1 group-hover:text-blue-500"
        >
          Бонусы и сроки их действия
          <ExternalLink
            size={16}
            className="opacity-0 group-hover/1:opacity-100 transition-all delay-75 duration-300 stroke-blue-500"
          />
        </Link>
      </div>
    </div>
  );
}

export default Points;
