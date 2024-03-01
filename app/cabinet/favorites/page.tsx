import FavoriteCard from "@/components/cards/favorite-card";
import { annoncements } from "@/lib/externalData";
import { HeartOff } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Избранные",
  description: "booking.kz | booking.kz",
};

function FavoritesPage() {
  const data = annoncements.slice(0, 3);
  return (
    <div className="flex flex-col items-center gap-2 w-full pb-4">
      <div className="flex flex-row justify-between w-full items-center">
        <h2 className="text-2xl text-slate-900 uppercase font-bold">
          Избранные ({data.length})
        </h2>
        <button className="flex text-sm flex-row items-center group font-semibold gap-x-2 py-2 px-3 hover:bg-slate-900  border-slate-900 hover:text-white rounded-xl transition-all delay-100 duration-300 bg-white">
          <HeartOff
            size={20}
            className="group-hover:stroke-red-500 transition-all delay-100 duration-300 stroke-slate-900"
          />{" "}
          Очистить все
        </button>
      </div>
      {data.length > 0 ? (
        <div className="w-full flex flex-col gap-2">
          {" "}
          {data.map((item, index) => (
            <FavoriteCard key={index} data={item} />
          ))}
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
}

export default FavoritesPage;
