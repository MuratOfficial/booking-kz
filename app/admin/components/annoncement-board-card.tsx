import { Annoncement } from "@/app/(router)/cabinet/annoncements/page";
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
    <div className="grid grid-cols-5 h-fit w-full gap-2  hover:bg-slate-200 rounded-xl p-1">
      <Image
        src={card?.images[0]}
        alt={card?.city}
        width={240}
        height={320}
        className=" object-contain rounded-lg h-[70px] w-full"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
      />
      <div className="col-span-3 w-full h-full flex flex-col text-sm">
        <Link
          className="font-semibold hover:underline text-blue-500"
          href={`/admin/annoncements/${card.id}`}
        >
          {}
          1-комнатная квартира, 36 км кв., 13/17 этаж
        </Link>
        <p className="font-bold">
          {parseInt("155555").toLocaleString().replace(/,/g, " ")} ₸{" "}
        </p>
        <p className="text-xs text-slate-400">
          Астана, Есильский район, ул.Сарайшык 17/2
        </p>
      </div>
      <div className="flex flex-col justify-center  text-xs font-medium text-slate-700">
        <p className=" flex flex-row gap-x-1 items-center">
          <CalendarDays className="w-3" /> {currentDate.toLocaleDateString()}
        </p>
        <p className=" capitalize text-sm font-semibold">{card.serviceType}</p>
        {card.serviceType.toLocaleLowerCase() !== "аренда" && (
          <p className=" capitalize">{card?.serviceTypeExt}</p>
        )}
        {card.serviceType.toLocaleLowerCase() !== "аренда" && (
          <p className=" capitalize">
            {card?.isChecked ? (
              <span className="text-sky-500 flex flex-row gap-x-1 items-center">
                Проверено <Check className="w-2" />
              </span>
            ) : (
              <span className="text-rose-500 flex flex-row gap-x-1 items-center">
                Не проверено <X className="w-2" />
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export default AnnoncementBoardCard;
