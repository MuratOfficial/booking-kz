import FavoriteCard from "@/components/cards/favorite-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { fetchFavorites } from "@/lib/fetchAnnoncement";

import { HeartOff } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import FavoriteAllButton from "./components/delete-all";
import { fetchUserData } from "@/lib/fetchUserData";

export const metadata: Metadata = {
  title: "Избранные",
  description: "etazhi.kz | etazhi.kz",
};

const FavoritesPage = async () => {
  const favorites = await fetchFavorites();
  const userData = await fetchUserData();

  const userNotes = userData?.favourites;

  return (
    <div className="flex flex-col items-center gap-2 w-full pb-4">
      <div className="flex flex-row justify-between w-full items-center">
        <h2 className="text-2xl text-slate-900 uppercase font-bold">
          Избранные ({favorites.length})
        </h2>
        <FavoriteAllButton />
      </div>
      {favorites.length > 0 ? (
        <div className="w-full flex flex-col gap-4">
          {favorites.slice(0, 3).map((item, index) => (
            <FavoriteCard userNotes={userNotes} key={index} data={item} />
          ))}
          {favorites && favorites?.length > 3 && (
            <Collapsible className="">
              <CollapsibleContent className="flex flex-col gap-8">
                {favorites?.slice(3).map((el, ind) => (
                  <FavoriteCard userNotes={userNotes} data={el} key={ind} />
                ))}
              </CollapsibleContent>
              <CollapsibleTrigger asChild>
                <button className=" px-3 py-2 data-[state=open]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                  Показать все {favorites?.length} обьявления
                </button>
              </CollapsibleTrigger>
              <CollapsibleTrigger asChild>
                <button className=" px-3 mt-4 py-2 data-[state=closed]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                  Скрыть
                </button>
              </CollapsibleTrigger>
            </Collapsible>
          )}
        </div>
      ) : (
        <div className="w-full items-center justify-center flex flex-col py-4">
          <Image
            width={480}
            height={600}
            src="/svg/like.svg"
            alt="not-found"
            className="max-w-[360px]"
          />
          <p className=" text-slate-800 text-lg uppercase font-bold text-center mx-auto">
            Нету обьявлении в Избранных
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
