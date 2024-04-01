"use client";

import React, { useEffect, useState } from "react";
import { Annoncement, Testimonial } from "@prisma/client";
import AnnoncementListCard from "@/components/cards/annoncement-list-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface ShownAnnoncementsProps {
  annoncements: (Annoncement & { testimonials: Testimonial[] } & {
    isFavorite?: boolean;
  })[];
}

function ShownAnnoncements({ annoncements }: ShownAnnoncementsProps) {
  const [orderedAnnoncements, setOrderedAnnoncements] =
    useState<(Annoncement & { testimonials: Testimonial[] })[]>();
  const [sorted, setSorted] = useState("");

  const sortByPrice = () => {
    const sorted = [...annoncements].sort((a, b) => b.price - a.price);
    setOrderedAnnoncements(sorted);
    setSorted("price");
  };

  const sortByOverallRanking = () => {
    const sorted = [...annoncements].sort((a, b) => {
      const aOverall = parseFloat(a.testimonials[0]?.ranking.overall) || 0;
      const bOverall = parseFloat(b.testimonials[0]?.ranking.overall) || 0;
      return bOverall - aOverall;
    });
    setOrderedAnnoncements(sorted);
    setSorted("rate");
  };

  useEffect(() => {
    if (sorted === "price") {
      sortByPrice();
    } else if (sorted === "rate") {
      sortByOverallRanking();
    }
  }, [sorted, annoncements, orderedAnnoncements]);

  return (
    <div className="col-span-5 flex flex-col gap-4">
      <div className="flex flex-row justify-end items-center px-8 font-medium text-xs gap-x-2">
        Сортировать ›{" "}
        <button
          onClick={sortByOverallRanking}
          className={cn(
            "py-1 px-2 rounded-full text-slate-900 bg-slate-300 hover:bg-slate-900 hover:text-slate-300",
            sorted === "rate" && "bg-slate-900 text-slate-300"
          )}
        >
          По рейтингу
        </button>{" "}
        <button
          onClick={sortByPrice}
          className={cn(
            "py-1 px-2 rounded-full text-slate-900 bg-slate-300 hover:bg-slate-900 hover:text-slate-300",
            sorted === "price" && "bg-slate-900 text-slate-300"
          )}
        >
          По цене
        </button>{" "}
      </div>
      {sorted === "" ? (
        <>
          {annoncements?.slice(0, 10).map((el, index) => (
            <AnnoncementListCard data={el} key={index} />
          ))}
          {annoncements && annoncements?.length > 10 && (
            <Collapsible className="">
              <CollapsibleContent className="flex flex-col gap-8">
                {orderedAnnoncements?.slice(3).map((el, ind) => (
                  <AnnoncementListCard data={el} key={ind} />
                ))}
              </CollapsibleContent>
              <CollapsibleTrigger asChild>
                <button className=" px-3 py-2 data-[state=open]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                  Показать все {orderedAnnoncements?.length} обьявления
                </button>
              </CollapsibleTrigger>
              <CollapsibleTrigger asChild>
                <button className=" px-3 mt-4 py-2 data-[state=closed]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                  Скрыть
                </button>
              </CollapsibleTrigger>
            </Collapsible>
          )}
        </>
      ) : (
        <>
          {orderedAnnoncements?.slice(0, 10).map((el, index) => (
            <AnnoncementListCard data={el} key={index} />
          ))}
          {orderedAnnoncements && orderedAnnoncements?.length > 10 && (
            <Collapsible className="">
              <CollapsibleContent className="flex flex-col gap-8">
                {orderedAnnoncements?.slice(3).map((el, ind) => (
                  <AnnoncementListCard data={el} key={ind} />
                ))}
              </CollapsibleContent>
              <CollapsibleTrigger asChild>
                <button className=" px-3 py-2 data-[state=open]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                  Показать все {orderedAnnoncements?.length} обьявления
                </button>
              </CollapsibleTrigger>
              <CollapsibleTrigger asChild>
                <button className=" px-3 mt-4 py-2 data-[state=closed]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                  Скрыть
                </button>
              </CollapsibleTrigger>
            </Collapsible>
          )}
        </>
      )}
    </div>
  );
}

export default ShownAnnoncements;
