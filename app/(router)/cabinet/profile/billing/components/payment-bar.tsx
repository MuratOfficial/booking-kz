import { Coins, CreditCard } from "lucide-react";
import React from "react";

function PaymentBar() {
  return (
    <div className="w-full py-4 px-4 rounded-3xl bg-gradient-to-l from-green-500 to-green-400 flex flex-col">
      <button className="flex flex-row gap-x-1 bg-green-700 items-center transition delay-75 duration-300 justify-center text-neutral-50 hover:bg-neutral-50 rounded-xl font-semibold p-2 hover:text-blue-500">
        <CreditCard className=" stroke-2" size={20} /> Пополнить
      </button>
      <div className="w-full border-2 mt-4 flex flex-col items-center p-2 rounded-3xl">
        <p className="text-slate-50 text-sm  flex flex-row gap-x-1 w-full font-semibold items-center justify-center">
          <Coins size={16} className="stroke-2" />
          Бонусы
        </p>
        <p className="text-slate-50 text-sm  flex flex-row gap-x-1 w-full font-semibold  items-center justify-center">
          при пополнении
        </p>
        <div className="flex flex-row gap-x-1 mt-2 items-center">
          <p className="text-sm text-slate-700 font-semibold">от</p>
          <p className="font-bold text-slate-700 text-lg">15000 ₸</p>
          <p className="font-bold text-neutral-50 py-0.5 px-1.5 rounded-lg bg-yellow-400">
            +10%
          </p>
        </div>
        <div className="flex flex-row gap-x-1 mt-2 items-center">
          <p className="text-sm text-slate-700 font-semibold">от</p>
          <p className="font-bold text-slate-700 text-lg">25000 ₸</p>
          <p className="font-bold text-neutral-50 py-0.5 px-1.5 rounded-lg bg-yellow-400">
            +15%
          </p>
        </div>
        <div className="flex flex-row gap-x-1 mt-2 items-center">
          <p className="text-sm text-slate-700 font-semibold">от</p>
          <p className="font-bold text-slate-700 text-lg">50000 ₸</p>
          <p className="font-bold text-neutral-50 py-0.5 px-1.5 rounded-lg bg-yellow-400">
            +20%
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentBar;
