import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { CalendarDays, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

interface PaymentHistoryProps {
  data: {
    date: Date;
    payType: string;
    link: string;
    title: string;
    payPrice: number;
  }[];
}

function PaymentHistory({ data }: PaymentHistoryProps) {
  return (
    <div className="bg-white rounded-2xl w-full p-4 flex flex-col gap-2">
      <h3 className="font-bold text-2xl text-slate-800">История платежей</h3>
      <Tabs defaultValue="all" className="w-full text-slate-800">
        <TabsList className="rounded-xl p-2 mb-4">
          <TabsTrigger value="all" className="rounded-lg font-semibold">
            Все
          </TabsTrigger>
          <TabsTrigger value="repl" className="rounded-lg font-semibold">
            Пополнения
          </TabsTrigger>
          <TabsTrigger value="exp" className="rounded-lg font-semibold">
            Расходы
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="w-full px-2 flex flex-col gap-y-4">
          {data.map((item, index) => (
            <div
              className="w-full flex flex-row items-center justify-between"
              key={index}
            >
              <div className="w-full flex flex-col gap-1">
                <div className="flex flex-row items-center gap-x-1 text-slate-500 text-xs">
                  <CalendarDays size={14} />
                  <p className="mr-1">{item.date.toLocaleDateString()}</p>
                  {item.payType === "Продление" && (
                    <Badge variant="outline" className="">
                      {item.payType}
                    </Badge>
                  )}
                  {item.payType === "Модификация" && (
                    <Badge variant="default" className="">
                      {item.payType}
                    </Badge>
                  )}
                  {item.payType === "Пополнение" && (
                    <Badge variant="secondary" className="text-green-500">
                      {item.payType}
                    </Badge>
                  )}
                  {item.payType === "Бонус" && (
                    <Badge variant="default" className="bg-blue-500">
                      {item.payType}
                    </Badge>
                  )}
                </div>
                <Link
                  href={item.link}
                  className="  hover:text-blue-600 text-slate-800 transition-all delay-100 duration-300 font-semibold  text-base text-left flex flex-row gap-x-1 items-center"
                >
                  <span className="line-clamp-2">{item.title}</span>
                </Link>
              </div>
              <div className="flex flex-col justify-center items-end w-full">
                {item.payPrice === 0 && (
                  <p className="font-bold text-slate-700 text-lg">Бесплатно</p>
                )}
                {item.payPrice > 0 && item.payType === "Бонус" && (
                  <p className="font-bold text-green-500 text-lg">
                    +{item.payPrice} б.
                  </p>
                )}
                {item.payPrice > 0 && item.payType !== "Бонус" && (
                  <p className="font-bold text-green-500 text-lg">
                    +{item.payPrice} ед.
                  </p>
                )}
                {item.payPrice < 0 && (
                  <p className="font-bold text-red-500 text-lg">
                    {item.payPrice} ед.
                  </p>
                )}
                <button className="flex flex-row items-center gap-x-1 text-[11px] text-slate-400 hover:text-blue-500">
                  <FileText size={12} />
                  Детали
                </button>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="repl" className="w-full px-2 flex flex-col gap-y-4">
          {data
            .filter((el) => el.payPrice > 0)
            .map((item, index) => (
              <div
                className="w-full flex flex-row items-center justify-between"
                key={index}
              >
                <div className="w-full flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-x-1 text-slate-500 text-xs">
                    <CalendarDays size={14} />
                    <p className="mr-1">{item.date.toLocaleDateString()}</p>
                    {item.payType === "Продление" && (
                      <Badge variant="outline" className="">
                        {item.payType}
                      </Badge>
                    )}
                    {item.payType === "Модификация" && (
                      <Badge variant="default" className="">
                        {item.payType}
                      </Badge>
                    )}
                    {item.payType === "Пополнение" && (
                      <Badge variant="secondary" className="text-green-500">
                        {item.payType}
                      </Badge>
                    )}
                    {item.payType === "Бонус" && (
                      <Badge variant="default" className="bg-blue-500">
                        {item.payType}
                      </Badge>
                    )}
                  </div>
                  <Link
                    href={item.link}
                    className="  hover:text-blue-600 text-slate-800 transition-all delay-100 duration-300 font-semibold  text-base text-left flex flex-row gap-x-1 items-center"
                  >
                    <span className="line-clamp-2">{item.title}</span>
                  </Link>
                </div>
                <div className="flex flex-col justify-center items-end w-full">
                  {item.payPrice === 0 && (
                    <p className="font-bold text-slate-700 text-lg">
                      Бесплатно
                    </p>
                  )}
                  {item.payPrice > 0 && item.payType === "Бонус" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.payPrice} б.
                    </p>
                  )}
                  {item.payPrice > 0 && item.payType !== "Бонус" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.payPrice} ед.
                    </p>
                  )}
                  {item.payPrice < 0 && (
                    <p className="font-bold text-red-500 text-lg">
                      {item.payPrice} ед.
                    </p>
                  )}
                  <button className="flex flex-row items-center gap-x-1 text-[11px] text-slate-400 hover:text-blue-500">
                    <FileText size={12} />
                    Детали
                  </button>
                </div>
              </div>
            ))}
        </TabsContent>
        <TabsContent value="exp" className="w-full px-2 flex flex-col gap-y-4">
          {data
            .filter((el) => el.payPrice < 0)
            .map((item, index) => (
              <div
                className="w-full flex flex-row items-center justify-between"
                key={index}
              >
                <div className="w-full flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-x-1 text-slate-500 text-xs">
                    <CalendarDays size={14} />
                    <p className="mr-1">{item.date.toLocaleDateString()}</p>
                    {item.payType === "Продление" && (
                      <Badge variant="outline" className="">
                        {item.payType}
                      </Badge>
                    )}
                    {item.payType === "Модификация" && (
                      <Badge variant="default" className="">
                        {item.payType}
                      </Badge>
                    )}
                    {item.payType === "Пополнение" && (
                      <Badge variant="secondary" className="text-green-500">
                        {item.payType}
                      </Badge>
                    )}
                    {item.payType === "Бонус" && (
                      <Badge variant="default" className="bg-blue-500">
                        {item.payType}
                      </Badge>
                    )}
                  </div>
                  <Link
                    href={item.link}
                    className="  hover:text-blue-600 text-slate-800 transition-all delay-100 duration-300 font-semibold  text-base text-left flex flex-row gap-x-1 items-center"
                  >
                    <span className="line-clamp-2">{item.title}</span>
                  </Link>
                </div>
                <div className="flex flex-col justify-center items-end w-full">
                  {item.payPrice === 0 && (
                    <p className="font-bold text-slate-700 text-lg">
                      Бесплатно
                    </p>
                  )}
                  {item.payPrice > 0 && item.payType === "Бонус" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.payPrice} б.
                    </p>
                  )}
                  {item.payPrice > 0 && item.payType !== "Бонус" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.payPrice} ед.
                    </p>
                  )}
                  {item.payPrice < 0 && (
                    <p className="font-bold text-red-500 text-lg">
                      {item.payPrice} ед.
                    </p>
                  )}
                  <button className="flex flex-row items-center gap-x-1 text-[11px] text-slate-400 hover:text-blue-500">
                    <FileText size={12} />
                    Детали
                  </button>
                </div>
              </div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PaymentHistory;
