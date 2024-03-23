import React, { Suspense } from "react";
import Filter from "./components/filter";
import AnnoncementListCard from "@/components/cards/annoncement-list-card";
import HotSuggestCard from "@/components/cards/hot-suggest-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import prismadb from "@/lib/prismadb";
import LoadingAnnoncements from "../cabinet/annoncements/components/loading-annoncements";
import { Skeleton } from "@/components/ui/skeleton";

const FilterPage = async ({
  searchParams,
}: {
  searchParams?: {
    serviceType?: string;
    phase?: string;
    categoryType?: string[];
    roomNumber?: string[];
    priceFrom?: string;
    priceTo?: string;
    areaSqFrom?: string;
    areaSqTo?: string;
    city?: string;
    more?: string[];
  };
}) => {
  const annoncements = await prismadb.annoncement.findMany({
    where: {
      serviceType: searchParams?.serviceType,
      phase: {
        in: ["активно", "проверка"],
      },

      categoryType: Array.isArray(searchParams?.categoryType)
        ? {
            in: searchParams?.categoryType && [...searchParams?.categoryType],
          }
        : searchParams?.categoryType,

      roomNumber: Array.isArray(searchParams?.roomNumber)
        ? {
            in: searchParams?.roomNumber && [
              ...searchParams?.roomNumber?.map((el) => parseInt(el)),
            ],
            gte: searchParams?.roomNumber?.includes("5+") ? 5 : undefined,
          }
        : searchParams?.roomNumber
        ? parseInt(searchParams?.roomNumber)
        : {
            gte: searchParams?.roomNumber === "5+" ? 5 : undefined,
          },
      price: {
        gte: parseInt(searchParams?.priceFrom || "0"),
        lte: parseInt(searchParams?.priceTo || "9990000000"),
      },
      areaSq: {
        gte: parseInt(searchParams?.areaSqFrom || "0"),
        lte: parseInt(searchParams?.areaSqTo || "999000"),
      },
      cityOrDistrict: searchParams?.city,
      additionalFilters: {
        some: {
          value: Array.isArray(searchParams?.more)
            ? {
                in: searchParams?.more && [...searchParams?.more],
              }
            : searchParams?.more,
        },
      },
    },
    include: {
      testimonials: true,
    },
  });

  return (
    <div className="w-full flex flex-col min-h-screen p-4 gap-4">
      <Suspense
        fallback={<Skeleton className=" w-full h-72 rounded-2xl bg-blue-300" />}
      >
        <Filter />
      </Suspense>

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
          <Suspense fallback={<LoadingAnnoncements />}>
            {annoncements?.slice(0, 10).map((el, index) => (
              <AnnoncementListCard data={el} key={index} />
            ))}
            {annoncements && annoncements?.length > 10 && (
              <Collapsible className="">
                <CollapsibleContent className="flex flex-col gap-8">
                  {annoncements?.slice(3).map((el, ind) => (
                    <AnnoncementListCard data={el} key={ind} />
                  ))}
                </CollapsibleContent>
                <CollapsibleTrigger asChild>
                  <button className=" px-3 py-2 data-[state=open]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                    Показать все {annoncements?.length} обьявления
                  </button>
                </CollapsibleTrigger>
                <CollapsibleTrigger asChild>
                  <button className=" px-3 mt-4 py-2 data-[state=closed]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                    Скрыть
                  </button>
                </CollapsibleTrigger>
              </Collapsible>
            )}
          </Suspense>
        </div>
        <div className="col-span-2 bg-white rounded-xl h-fit w-full flex flex-col gap-4 items-center py-2 px-3">
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
};

export default FilterPage;
