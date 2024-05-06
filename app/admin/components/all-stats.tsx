import { Separator } from "@/components/ui/separator";
import React from "react";

interface AllStatsProps {
  rentCount: number | null;
  sellCount: number | null;
  userCount: number | null;
  paymentCount: number | null;
}

function AllStats({
  rentCount,
  sellCount,
  userCount,
  paymentCount,
}: AllStatsProps) {
  return (
    <div className=" h-full flex flex-col gap-2 row-span-2">
      <div className="flex flex-row justify-between items-center text-slate-600">
        <p className="text-xl font-semibold ml-4">Показатели</p>
      </div>
      <div className="w-full bg-white h-full rounded-xl grid grid-rows-4 gap-4 py-6 px-8">
        <div className="flex flex-row justify-between items-center text-xl font-bold text-slate-800">
          <p>Обьявления (Аренда)</p>
          <p>{rentCount}</p>
        </div>
        <div className="flex flex-row justify-between items-center text-xl font-bold text-slate-800">
          <p>Обьявления (Продажа)</p>
          <p>{sellCount}</p>
        </div>
        <div className="flex flex-row justify-between items-center text-xl font-bold text-slate-800">
          <p>Пользователи</p>
          <p>{userCount}</p>
        </div>
        <div className="flex flex-row justify-between items-center text-xl font-bold text-slate-800">
          <p>Платежи</p>
          <p>{paymentCount}</p>
        </div>
      </div>
    </div>
  );
}

export default AllStats;
