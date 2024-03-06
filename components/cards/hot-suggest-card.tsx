import Image from "next/image";
import Link from "next/link";
import React from "react";

function HotSuggestCard() {
  return (
    <div className="grid grid-cols-4 h-fit border-b w-full gap-2  pb-1">
      <Image
        src="/random/1.jpg"
        alt="hot-suggest"
        width={240}
        height={320}
        className=" object-cover rounded-lg h-[70px] w-full"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
      />
      <div className="col-span-3 w-full h-full flex flex-col text-sm">
        <Link className="font-semibold hover:underline text-blue-500" href="/">
          1-комнатная квартира, 36 км кв., 13/17 этаж
        </Link>
        <p className="font-bold">
          {parseInt("155555").toLocaleString().replace(/,/g, " ")} ₸{" "}
        </p>
        <p className="text-xs text-slate-400">
          Астана, Есильский район, ул.Сарайшык 17/2
        </p>
      </div>
    </div>
  );
}

export default HotSuggestCard;
