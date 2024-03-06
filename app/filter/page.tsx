import React from "react";
import Filter from "./components/filter";
import { annoncements } from "@/lib/externalData";
import AnnoncementListCard from "@/components/cards/annoncement-list-card";
import HotSuggestCard from "@/components/cards/hot-suggest-card";

function FilterPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const annoncementsList = annoncements.slice(0, 10);

  return (
    <div className="w-full flex flex-col min-h-screen p-4 gap-4">
      <Filter />
      <div className="w-full grid grid-cols-7 gap-4">
        <div className="col-span-5 flex flex-col gap-4">
          <div className="flex flex-row justify-end items-center px-8 font-medium text-xs gap-x-2">
            Сортировать ›{" "}
            <button className="py-1 px-2 rounded-full text-slate-900 bg-slate-300 hover:bg-slate-900 hover:text-slate-300">
              По рейтингу
            </button>{" "}
            <button className="py-1 px-2 rounded-full text-slate-900 bg-slate-300 hover:bg-slate-900 hover:text-slate-300">
              По цене
            </button>{" "}
          </div>
          {annoncementsList.map((el, index) => (
            <AnnoncementListCard data={el} key={index} />
          ))}
        </div>
        <div className="col-span-2 bg-white rounded-xl h-full w-full flex flex-col gap-4 items-center py-2 px-3">
          <h1 className="font-semibold">Горячие предложения</h1>
          <HotSuggestCard />
          <HotSuggestCard />
          <HotSuggestCard />
          <HotSuggestCard />
          <HotSuggestCard />
        </div>
      </div>
    </div>
  );
}

export default FilterPage;
