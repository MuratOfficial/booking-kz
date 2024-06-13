import { Annoncement } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HotSuggestCardProps {
  data: Annoncement;
}

function HotSuggestCard({ data }: HotSuggestCardProps) {
  return (
    <div className="lg:grid xs:grid md:flex flex-col grid-cols-4 h-fit border-b w-full gap-2   pb-1">
      {data?.images[0] ? (
        <Image
          src={data?.images[0]?.url || ""}
          alt={data?.images[0]?.url || ""}
          width={240}
          height={320}
          className=" object-cover rounded-lg xs:h-[70px] md:aspect-video md:h-full lg:h-[70px] w-full"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
        />
      ) : (
        <div className="bg-white rounded-lg xs:h-[70px] lg:h-[70px] aspect-square"></div>
      )}

      <div className="col-span-3 w-full h-full flex flex-col text-sm">
        <Link className="font-semibold hover:underline text-blue-500" href="/">
          {data?.roomNumber}-комнатная {data?.categoryType.toLowerCase()},{" "}
          {data?.areaSq}м кв., {data?.floor}/{data?.floorFrom} этаж
        </Link>
        <p className="font-bold">
          {data?.price.toLocaleString().replace(/,/g, " ")} ₸{" "}
        </p>
        <p className="text-xs text-slate-400">
          {data?.cityOrDistrict} {data?.cityOrTown && `, ${data.cityOrTown}`}{" "}
          {data?.townOrStreet && `, ${data.townOrStreet}`}
        </p>
      </div>
    </div>
  );
}

export default HotSuggestCard;
