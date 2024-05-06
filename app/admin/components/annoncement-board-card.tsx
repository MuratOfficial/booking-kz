import { Annoncement } from "@prisma/client";
import { CalendarDays, Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AnnoncementBoardCardProps {
  card: Annoncement;
}

function AnnoncementBoardCard({ card }: AnnoncementBoardCardProps) {
  const currentDate = new Date();

  return (
    <div className="grid grid-cols-5 h-[100px] w-full gap-2  hover:bg-slate-200 rounded-xl ">
      {card?.images[0]?.url ? (
        <Image
          src={card?.images[0]?.url || ""}
          alt={card?.cityOrDistrict}
          width={240}
          height={320}
          className=" object-contain rounded-lg h-[100px] w-full"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
        />
      ) : (
        <div className="h-[100px]"></div>
      )}

      <div className="col-span-3 w-full h-full flex flex-col text-sm p-1">
        <Link
          className="font-semibold hover:underline text-blue-500"
          href={`/admin/annoncements/${card.id}`}
        >
          {card?.roomNumber}-комнатная {card.categoryType}, {card.areaSq} м²,{" "}
          {card.floor}/{card.floorFrom} этаж{" "}
        </Link>
        <p className="font-bold">
          {parseInt("155555").toLocaleString().replace(/,/g, " ")} ₸{" "}
        </p>
        <p className="text-xs text-slate-400 flex flex-row gap-x-1 line-clamp-1">
          {card?.cityOrDistrict && `${card?.cityOrDistrict}`}

          <span className="flex flex-row gap-x-1">
            {card?.cityOrTown && `, ${card?.cityOrTown}`}
            {card?.townOrStreet && `, ${card?.townOrStreet}`}
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-center p-1  text-xs font-medium text-slate-700">
        <p className=" flex flex-row gap-x-1 items-center">
          <CalendarDays className="w-3" /> {currentDate.toLocaleDateString()}
        </p>
        <p className=" capitalize text-sm font-semibold">{card.serviceType}</p>
        {card.serviceType.toLocaleLowerCase() !== "аренда" && (
          <p className=" capitalize">{card?.serviceTypeExt}</p>
        )}
        {card.serviceType.toLocaleLowerCase() !== "аренда" && (
          <p className=" ">
            {card?.phase === "активно" ? (
              <span className="text-sky-500 flex flex-row gap-x-1 items-center">
                Проверено
              </span>
            ) : (
              <span className="text-rose-500 flex flex-row gap-x-1 items-center">
                Не проверено
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export default AnnoncementBoardCard;
