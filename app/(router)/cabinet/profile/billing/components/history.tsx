import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { CalendarDays, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { Payment } from "@prisma/client";

interface PaymentHistoryProps {
  data: Payment[] | undefined | [] | null;
}

function PaymentHistory({ data }: PaymentHistoryProps) {
  const refills = data?.filter(
    (item) =>
      item.transactionType !== "subscription" &&
      item.transactionType !== "modifier"
  );
  const spents = data?.filter(
    (item) =>
      item.transactionType === "subscription" ||
      item.transactionType === "modifier"
  );

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
        <TabsContent
          value="all"
          className="w-full px-2 flex flex-col gap-y-4 items-center justify-center"
        >
          {data && data.length > 0 ? (
            data?.map((item, index) => (
              <div
                className="w-full flex flex-row items-center justify-between"
                key={index}
              >
                <div className="w-full flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-x-1 text-slate-500 text-xs">
                    <CalendarDays size={14} />
                    <p className="mr-1">
                      {item.createdAt.toLocaleDateString()}
                    </p>
                    {item.transactionType === "subscription" && (
                      <Badge variant="outline" className="">
                        Подписка
                      </Badge>
                    )}
                    {item.transactionType === "modifier" && (
                      <Badge variant="default" className="">
                        Модификация
                      </Badge>
                    )}
                    {(item.transactionType === "refill" ||
                      item.transactionType === "refill-manual") && (
                      <Badge variant="secondary" className="text-green-500">
                        Пополнение
                      </Badge>
                    )}
                    {item.transactionType === "bonus" && (
                      <Badge variant="default" className="bg-blue-500">
                        Бонус
                      </Badge>
                    )}
                  </div>
                  {item.paymentUrl && (
                    <Link
                      href={item.paymentUrl}
                      className="flex flex-row ml-2 items-center gap-x-1 text-sm text-slate-400 hover:text-blue-500"
                    >
                      Детали транзакций <FileText className="w-4" />
                    </Link>
                  )}
                </div>
                <div className="flex flex-col justify-center items-end w-full">
                  {item.transactionType === "refill" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.sum} ед.
                    </p>
                  )}
                  {item.transactionType === "refill-manual" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.sum} ед.
                    </p>
                  )}
                  {item.transactionType !== "bonus" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.bonus} б.
                    </p>
                  )}
                  {item.transactionType === "modifier" && (
                    <p className="font-bold text-red-500 text-lg">
                      -{item.sum} ед.
                    </p>
                  )}
                  {item.transactionType === "subscription" && (
                    <p className="font-bold text-red-500 text-lg">
                      -{item.sum} ед.
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm font-medium text-slate-600 text-center p-8">
              История платежей пуста.
            </p>
          )}
        </TabsContent>
        <TabsContent value="repl" className="w-full px-2 flex flex-col gap-y-4">
          {refills && refills.length > 0 ? (
            refills?.map((item, index) => (
              <div
                className="w-full flex flex-row items-center justify-between"
                key={index}
              >
                <div className="w-full flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-x-1 text-slate-500 text-xs">
                    <CalendarDays size={14} />
                    <p className="mr-1">
                      {item.createdAt.toLocaleDateString()}
                    </p>
                    {item.transactionType === "subscription" && (
                      <Badge variant="outline" className="">
                        Подписка
                      </Badge>
                    )}
                    {item.transactionType === "modifier" && (
                      <Badge variant="default" className="">
                        Модификация
                      </Badge>
                    )}
                    {(item.transactionType === "refill" ||
                      item.transactionType === "refill-manual") && (
                      <Badge variant="secondary" className="text-green-500">
                        Пополнение
                      </Badge>
                    )}
                    {item.transactionType === "bonus" && (
                      <Badge variant="default" className="bg-blue-500">
                        Бонус
                      </Badge>
                    )}
                  </div>
                  {item.paymentUrl && (
                    <Link
                      href={item.paymentUrl}
                      className="flex flex-row ml-2 items-center gap-x-1 text-sm text-slate-400 hover:text-blue-500"
                    >
                      Детали транзакций <FileText className="w-4" />
                    </Link>
                  )}
                </div>
                <div className="flex flex-col justify-center items-end w-full">
                  {item.transactionType === "refill" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.sum} ед.
                    </p>
                  )}
                  {item.transactionType === "refill-manual" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.sum} ед.
                    </p>
                  )}
                  {item.transactionType !== "bonus" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.bonus} б.
                    </p>
                  )}
                  {item.transactionType === "modifier" && (
                    <p className="font-bold text-red-500 text-lg">
                      -{item.sum} ед.
                    </p>
                  )}
                  {item.transactionType === "subscription" && (
                    <p className="font-bold text-red-500 text-lg">
                      -{item.sum} ед.
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm font-medium text-slate-600 text-center p-8">
              История пополнении пуста.
            </p>
          )}
        </TabsContent>
        <TabsContent value="exp" className="w-full px-2 flex flex-col gap-y-4">
          {spents && spents?.length > 0 ? (
            spents?.map((item, index) => (
              <div
                className="w-full flex flex-row items-center justify-between"
                key={index}
              >
                <div className="w-full flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-x-1 text-slate-500 text-xs">
                    <CalendarDays size={14} />
                    <p className="mr-1">
                      {item.createdAt.toLocaleDateString()}
                    </p>
                    {item.transactionType === "subscription" && (
                      <Badge variant="outline" className="">
                        Подписка
                      </Badge>
                    )}
                    {item.transactionType === "modifier" && (
                      <Badge variant="default" className="">
                        Модификация
                      </Badge>
                    )}
                    {(item.transactionType === "refill" ||
                      item.transactionType === "refill-manual") && (
                      <Badge variant="secondary" className="text-green-500">
                        Пополнение
                      </Badge>
                    )}
                    {item.transactionType === "bonus" && (
                      <Badge variant="default" className="bg-blue-500">
                        Бонус
                      </Badge>
                    )}
                  </div>
                  {item.paymentUrl && (
                    <Link
                      href={item.paymentUrl}
                      className="flex flex-row ml-2 items-center gap-x-1 text-sm text-slate-400 hover:text-blue-500"
                    >
                      Детали транзакций <FileText className="w-4" />
                    </Link>
                  )}
                </div>
                <div className="flex flex-col justify-center items-end w-full">
                  {item.transactionType === "refill" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.sum} ед.
                    </p>
                  )}
                  {item.transactionType === "refill-manual" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.sum} ед.
                    </p>
                  )}
                  {item.transactionType !== "bonus" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.bonus} б.
                    </p>
                  )}
                  {item.transactionType === "modifier" && (
                    <p className="font-bold text-red-500 text-lg">
                      -{item.sum} ед.
                    </p>
                  )}
                  {item.transactionType === "subscription" && (
                    <p className="font-bold text-red-500 text-lg">
                      -{item.sum} ед.
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm font-medium text-slate-600 text-center p-8">
              История расходов пуста.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PaymentHistory;
