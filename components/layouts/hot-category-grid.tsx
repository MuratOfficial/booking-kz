import Link from "next/link";
import React from "react";
import AnnoncementCard from "../cards/annoncement-cart";

function HotCategoryGrid() {
  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="w-full flex flex-row justify-between items-center">
        <h3 className="font-bold text-slate-900 uppercase text-xl">Продажа</h3>
        <Link
          href="/"
          className="text-blue-500 hover:text-neutral-100 hover:bg-slate-900 rounded-xl py-2 px-4 transition-all delay-150 duration-500"
        >
          Посмотреть все
        </Link>
      </div>

      <div className="w-full grid grid-cols-5 gap-4">
        <AnnoncementCard />
      </div>
    </div>
  );
}

export default HotCategoryGrid;
