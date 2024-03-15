import { Separator } from "@/components/ui/separator";
import React from "react";

function AllStats() {
  return (
    <div className=" h-full flex flex-col gap-2 row-span-2">
      <div className="flex flex-row justify-between items-center text-slate-600">
        <p className="text-xl font-semibold ml-4">Показатели</p>
      </div>
      <div className="w-full bg-white h-full rounded-xl flex flex-col gap-4 py-3 px-4">
        <div className="flex flex-col gap-1">
          <div className=" text-sm font-semibold text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full text-center">Добавление</p>
            <p className="w-full text-center">Всего</p>
            <p className="w-full text-center">За месяц</p>
            <p className="w-full text-center">За неделю</p>
          </div>
          <Separator />
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Обьявления (Продажа)</p>
            <p className="w-full text-center">1880</p>
            <p className="w-full text-center">188</p>
            <p className="w-full text-center">64</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Обьявления (Аренда)</p>
            <p className="w-full text-center">1880</p>
            <p className="w-full text-center">188</p>
            <p className="w-full text-center">64</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Пользователи</p>
            <p className="w-full text-center">120</p>
            <p className="w-full text-center">30</p>
            <p className="w-full text-center">12</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Платежи</p>
            <p className="w-full text-center">120</p>
            <p className="w-full text-center">30</p>
            <p className="w-full text-center">12</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className=" text-sm font-semibold text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full text-center">Просмотры</p>
            <p className="w-full text-center">Всего</p>
            <p className="w-full text-center">За месяц</p>
            <p className="w-full text-center">За неделю</p>
          </div>
          <Separator />
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Обьявления (Продажа)</p>
            <p className="w-full text-center">1880</p>
            <p className="w-full text-center">188</p>
            <p className="w-full text-center">64</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Обьявления (Аренда)</p>
            <p className="w-full text-center">1880</p>
            <p className="w-full text-center">188</p>
            <p className="w-full text-center">64</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Горячие (Продажа)</p>
            <p className="w-full text-center">120</p>
            <p className="w-full text-center">30</p>
            <p className="w-full text-center">12</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Горячие (Аренды)</p>
            <p className="w-full text-center">120</p>
            <p className="w-full text-center">30</p>
            <p className="w-full text-center">12</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className=" text-sm font-semibold text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full text-center">Платежи</p>
            <p className="w-full text-center">Всего</p>
            <p className="w-full text-center">За месяц</p>
            <p className="w-full text-center">За неделю</p>
          </div>
          <Separator />
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Обьявления (Продажа)</p>
            <p className="w-full text-center">1880</p>
            <p className="w-full text-center">188</p>
            <p className="w-full text-center">64</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Обьявления (Аренда)</p>
            <p className="w-full text-center">1880</p>
            <p className="w-full text-center">188</p>
            <p className="w-full text-center">64</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Горячие (Продажа)</p>
            <p className="w-full text-center">120</p>
            <p className="w-full text-center">30</p>
            <p className="w-full text-center">12</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Горячие (Аренды)</p>
            <p className="w-full text-center">120</p>
            <p className="w-full text-center">30</p>
            <p className="w-full text-center">12</p>
          </div>
          <div className=" text-xs font-medium text-slate-800 grid grid-cols-4 gap-2  items-center  px-1">
            <p className="w-full ">Подписки</p>
            <p className="w-full text-center">120</p>
            <p className="w-full text-center">30</p>
            <p className="w-full text-center">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllStats;
