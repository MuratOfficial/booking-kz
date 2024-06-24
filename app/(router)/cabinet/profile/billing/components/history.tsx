import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import {
  AlertCircle,
  CalendarDays,
  CheckCircle2Icon,
  Clock,
  ExternalLink,
  FileText,
  XCircle,
} from "lucide-react";
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
    <div className="bg-white rounded-2xl w-full md:p-4 xs:p-2 lg:p-4 flex flex-col gap-2">
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
                className="w-full flex md:flex-row xs:flex-col lg:flex-row items-center justify-between border-b pb-1"
                key={index}
              >
                <div className="w-full flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-x-2 text-slate-500 text-xs">
                    <div className="flex flex-row gap-x-1 items-center">
                      <CalendarDays className="w-3" />
                      <p className="mr-1">
                        {item.createdAt.toLocaleDateString()}
                      </p>
                    </div>

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
                    <div className="capitalize flex flex-row gap-x-1 items-center text-xs font-semibold">
                      {item.status === "success" && (
                        <span className="flex flex-row gap-x-1 items-center text-green-600">
                          <CheckCircle2Icon className="w-3 stroke-green-600" />
                          Успешно
                        </span>
                      )}
                      {item.status === "cancel" && (
                        <span className="flex flex-row gap-x-1 items-center text-gray-600">
                          <XCircle className="w-3 stroke-gray-600" />
                          Отмена
                        </span>
                      )}
                      {item.status === "fail" && (
                        <span className="flex flex-row gap-x-1 items-center text-red-500">
                          <AlertCircle className="w-3 stroke-red-500" />
                          Ошибка
                        </span>
                      )}
                      {item.status === "pending" && (
                        <span className="flex flex-row gap-x-1 items-center text-slate-600">
                          <Clock className="w-3 stroke-slate-600" />В процессе
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-start">
                    <div className="flex flex-row flex-wrap gap-x-1 w-full  items-center text-sm font-medium text-slate-600">
                      {(item.transactionType === "refill" ||
                        item.transactionType === "refill-manual" ||
                        item.transactionType === "bonus") && (
                        <p>
                          Пополнение
                          {item.transactionType === "bonus"
                            ? " бонусом на "
                            : " на сумму "}
                          {item.transactionType === "bonus"
                            ? item.bonus
                            : item.sum}
                        </p>
                      )}
                      {(item.transactionType === "modifier" ||
                        item.transactionType === "subscription") && (
                        <p className="flex flex-row flex-wrap">
                          Покупка
                          {item.transactionType === "modifier" &&
                            " модификаций"}
                          {item.transactionType === "subscription" &&
                            " подписки"}{" "}
                          {item.annoncementId && (
                            <span className="flex flex-row flex-wrap ml-1">
                              для обьявления №
                              <Link
                                href={`/annoncements/${item.annoncementId}`}
                                target="_blank"
                                className=" hover:text-blue-600"
                              >
                                {item.annoncementId}
                              </Link>
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.paymentUrl && (
                    <Link
                      href={item.paymentUrl}
                      target="_blank"
                      className="flex flex-row ml-2 items-center gap-x-1 text-xs text-slate-400 hover:text-blue-500"
                    >
                      Детали транзакций <FileText className="w-3" />
                    </Link>
                  )}
                </div>
                <div className="flex flex-col justify-center items-end md:min-w-60 xs:min-w-full lg:min-w-60">
                  {item.transactionType === "refill" && (
                    <>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.sum} ед.
                      </p>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.bonus} б.
                      </p>
                    </>
                  )}
                  {item.transactionType === "refill-manual" && (
                    <>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.sum} ед.
                      </p>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.bonus} б.
                      </p>
                    </>
                  )}
                  {item.transactionType === "bonus" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.bonus} б.
                    </p>
                  )}
                  {item.transactionType === "modifier" && (
                    <>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.sum} ед.
                      </p>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.bonus} б.
                      </p>
                    </>
                  )}
                  {item.transactionType === "subscription" && (
                    <>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.sum} ед.
                      </p>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.bonus} б.
                      </p>
                    </>
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
        <TabsContent
          value="repl"
          className="w-full px-2 flex flex-col gap-y-4 items-center justify-center"
        >
          {refills && refills.length > 0 ? (
            refills?.map((item, index) => (
              <div
                className="w-full flex md:flex-row xs:flex-col lg:flex-row items-center justify-between border-b pb-1"
                key={index}
              >
                <div className="w-full flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-x-2 text-slate-500 text-xs">
                    <div className="flex flex-row gap-x-1 items-center">
                      <CalendarDays className="w-3" />
                      <p className="mr-1">
                        {item.createdAt.toLocaleDateString()}
                      </p>
                    </div>

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
                    <div className="capitalize flex flex-row gap-x-1 items-center text-xs font-semibold">
                      {item.status === "success" && (
                        <span className="flex flex-row gap-x-1 items-center text-green-600">
                          <CheckCircle2Icon className="w-3 stroke-green-600" />
                          Успешно
                        </span>
                      )}
                      {item.status === "cancel" && (
                        <span className="flex flex-row gap-x-1 items-center text-gray-600">
                          <XCircle className="w-3 stroke-gray-600" />
                          Отмена
                        </span>
                      )}
                      {item.status === "fail" && (
                        <span className="flex flex-row gap-x-1 items-center text-red-500">
                          <AlertCircle className="w-3 stroke-red-500" />
                          Ошибка
                        </span>
                      )}
                      {item.status === "pending" && (
                        <span className="flex flex-row gap-x-1 items-center text-slate-600">
                          <Clock className="w-3 stroke-slate-600" />В процессе
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-start">
                    <div className="flex flex-row flex-wrap gap-x-1 w-full  items-center text-sm font-medium text-slate-600">
                      {(item.transactionType === "refill" ||
                        item.transactionType === "refill-manual" ||
                        item.transactionType === "bonus") && (
                        <p>
                          Пополнение
                          {item.transactionType === "bonus"
                            ? " бонусом на "
                            : " на сумму "}
                          {item.transactionType === "bonus"
                            ? item.bonus
                            : item.sum}
                        </p>
                      )}
                      {(item.transactionType === "modifier" ||
                        item.transactionType === "subscription") && (
                        <p className="flex flex-row flex-wrap">
                          Покупка
                          {item.transactionType === "modifier" &&
                            " модификаций"}
                          {item.transactionType === "subscription" &&
                            " подписки"}{" "}
                          {item.annoncementId && (
                            <span className="flex flex-row flex-wrap ml-1">
                              для обьявления №
                              <Link
                                href={`/annoncements/${item.annoncementId}`}
                                target="_blank"
                                className=" hover:text-blue-600"
                              >
                                {item.annoncementId}
                              </Link>
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.paymentUrl && (
                    <Link
                      href={item.paymentUrl}
                      target="_blank"
                      className="flex flex-row ml-2 items-center gap-x-1 text-xs text-slate-400 hover:text-blue-500"
                    >
                      Детали транзакций <FileText className="w-3" />
                    </Link>
                  )}
                </div>
                <div className="flex flex-col justify-center items-end md:min-w-60 xs:min-w-full lg:min-w-60">
                  {item.transactionType === "refill" && (
                    <>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.sum} ед.
                      </p>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.bonus} б.
                      </p>
                    </>
                  )}
                  {item.transactionType === "refill-manual" && (
                    <>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.sum} ед.
                      </p>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.bonus} б.
                      </p>
                    </>
                  )}
                  {item.transactionType === "bonus" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.bonus} б.
                    </p>
                  )}
                  {item.transactionType === "modifier" && (
                    <>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.sum} ед.
                      </p>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.bonus} б.
                      </p>
                    </>
                  )}
                  {item.transactionType === "subscription" && (
                    <>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.sum} ед.
                      </p>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.bonus} б.
                      </p>
                    </>
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
                className="w-full flex md:flex-row xs:flex-col lg:flex-row items-center justify-between border-b pb-1"
                key={index}
              >
                <div className="w-full flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-x-2 text-slate-500 text-xs">
                    <div className="flex flex-row gap-x-1 items-center">
                      <CalendarDays className="w-3" />
                      <p className="mr-1">
                        {item.createdAt.toLocaleDateString()}
                      </p>
                    </div>

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
                    <div className="capitalize flex flex-row gap-x-1 items-center text-xs font-semibold">
                      {item.status === "success" && (
                        <span className="flex flex-row gap-x-1 items-center text-green-600">
                          <CheckCircle2Icon className="w-3 stroke-green-600" />
                          Успешно
                        </span>
                      )}
                      {item.status === "cancel" && (
                        <span className="flex flex-row gap-x-1 items-center text-gray-600">
                          <XCircle className="w-3 stroke-gray-600" />
                          Отмена
                        </span>
                      )}
                      {item.status === "fail" && (
                        <span className="flex flex-row gap-x-1 items-center text-red-500">
                          <AlertCircle className="w-3 stroke-red-500" />
                          Ошибка
                        </span>
                      )}
                      {item.status === "pending" && (
                        <span className="flex flex-row gap-x-1 items-center text-slate-600">
                          <Clock className="w-3 stroke-slate-600" />В процессе
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-start">
                    <div className="flex flex-row flex-wrap gap-x-1 w-full  items-center text-sm font-medium text-slate-600">
                      {(item.transactionType === "refill" ||
                        item.transactionType === "refill-manual" ||
                        item.transactionType === "bonus") && (
                        <p>
                          Пополнение
                          {item.transactionType === "bonus"
                            ? " бонусом на "
                            : " на сумму "}
                          {item.transactionType === "bonus"
                            ? item.bonus
                            : item.sum}
                        </p>
                      )}
                      {(item.transactionType === "modifier" ||
                        item.transactionType === "subscription") && (
                        <p className="flex flex-row flex-wrap">
                          Покупка
                          {item.transactionType === "modifier" &&
                            " модификаций"}
                          {item.transactionType === "subscription" &&
                            " подписки"}{" "}
                          {item.annoncementId && (
                            <span className="flex flex-row flex-wrap ml-1">
                              для обьявления №
                              <Link
                                href={`/annoncements/${item.annoncementId}`}
                                target="_blank"
                                className=" hover:text-blue-600"
                              >
                                {item.annoncementId}
                              </Link>
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.paymentUrl && (
                    <Link
                      href={item.paymentUrl}
                      target="_blank"
                      className="flex flex-row ml-2 items-center gap-x-1 text-xs text-slate-400 hover:text-blue-500"
                    >
                      Детали транзакций <FileText className="w-3" />
                    </Link>
                  )}
                </div>
                <div className="flex flex-col justify-center items-end md:min-w-60 xs:min-w-full lg:min-w-60">
                  {item.transactionType === "refill" && (
                    <>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.sum} ед.
                      </p>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.bonus} б.
                      </p>
                    </>
                  )}
                  {item.transactionType === "refill-manual" && (
                    <>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.sum} ед.
                      </p>
                      <p className="font-bold text-green-500 text-lg">
                        +{item.bonus} б.
                      </p>
                    </>
                  )}
                  {item.transactionType === "bonus" && (
                    <p className="font-bold text-green-500 text-lg">
                      +{item.bonus} б.
                    </p>
                  )}
                  {item.transactionType === "modifier" && (
                    <>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.sum} ед.
                      </p>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.bonus} б.
                      </p>
                    </>
                  )}
                  {item.transactionType === "subscription" && (
                    <>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.sum} ед.
                      </p>
                      <p className="font-bold text-red-500 text-lg">
                        -{item.bonus} б.
                      </p>
                    </>
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
