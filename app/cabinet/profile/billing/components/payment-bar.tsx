import { Coins, CreditCard } from "lucide-react";
import React from "react";

function PaymentBar() {
  return (
    <div className="w-full py-4 px-2 rounded-3xl bg-gradient-to-l from-green-500 to-green-400 flex flex-col">
      <button className="flex flex-row gap-x-1 bg-green-700 items-center transition delay-75 duration-300 justify-center text-neutral-50 hover:bg-neutral-50 rounded-xl font-semibold p-2 hover:text-blue-500">
        <CreditCard className=" stroke-2" size={20} /> Пополнить
      </button>
      <p className="text-slate-50 text-sm mt-4 flex flex-row gap-x-1 w-full text-center items-center justify-center">
        <Coins size={16} />
        Бонусы при пополнении
      </p>
    </div>
  );
}

export default PaymentBar;
