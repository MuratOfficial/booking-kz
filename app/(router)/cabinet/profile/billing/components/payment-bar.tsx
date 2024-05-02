"use client";
import { Refill } from "@prisma/client";
import { Coins, CreditCard } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentBarProps {
  refills?: Refill[] | null;
}

function PaymentBar({ refills }: PaymentBarProps) {
  const [picked, setPicked] = React.useState("");

  return (
    <div className="w-full py-4 px-4 rounded-3xl bg-gradient-to-l from-green-500 to-green-400 flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex flex-row gap-x-1 bg-green-700 items-center transition delay-75 duration-300 justify-center text-neutral-50 hover:bg-neutral-50 rounded-xl font-semibold p-2 hover:text-blue-500">
            <CreditCard className=" stroke-2" size={20} /> Пополнить
          </button>
        </DialogTrigger>
        <DialogContent className=" max-w-fit min-w-36 rounded-lg">
          <DialogHeader>
            <DialogTitle>Выберите сумму пополнения</DialogTitle>
          </DialogHeader>
          <div className="w-full gap-4 grid grid-cols-2">
            {refills?.map((el, ind) => (
              <div
                className={cn(
                  "flex flex-col p-4 w-full justify-center items-center border-2 cursor-pointer hover:border-slate-800 border-slate-100 rounded-xl",
                  picked === el.id && "border-slate-800"
                )}
                key={ind}
                onClick={() => setPicked(el.id)}
              >
                <div className="flex flex-row gap-x-1  items-center">
                  <p className="font-bold text-slate-700 text-lg">
                    {el.total} ₸
                  </p>
                  <p className="font-bold text-neutral-50 py-0.5 px-1.5 rounded-lg bg-yellow-400">
                    +{el?.bonusPerc}%
                  </p>
                </div>
                <p className=" items-center text-sm text-green-500 font-semibold">
                  + {el?.bonus} б.
                </p>
              </div>
            ))}
          </div>
          <DialogFooter className="w-full flex flex-row gap-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Закрыть
              </Button>
            </DialogClose>
            <Button>Подтвердить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="w-full border-2 mt-4 flex flex-col items-center p-2 rounded-3xl">
        <p className="text-slate-50 text-sm  flex flex-row gap-x-1 w-full font-semibold items-center justify-center">
          <Coins size={16} className="stroke-2" />
          Бонусы
        </p>
        <p className="text-slate-50 text-sm  flex flex-row gap-x-1 w-full font-semibold  items-center justify-center">
          при пополнении
        </p>
        {refills?.map((el, key) => (
          <div
            className="flex flex-col mt-2 w-full justify-center items-center"
            key={key}
          >
            <div className="flex flex-row gap-x-1  items-center">
              <p className="font-bold text-slate-700 text-lg">{el.total} ₸</p>
              <p className="font-bold text-neutral-50 py-0.5 px-1.5 rounded-lg bg-yellow-400">
                +{el?.bonusPerc}%
              </p>
            </div>
            <p className=" items-center text-sm text-green-50 font-semibold">
              + {el?.bonus} б.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentBar;
