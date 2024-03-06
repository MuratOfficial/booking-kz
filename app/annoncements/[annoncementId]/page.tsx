import React from "react";
import HeaderButtons from "../components/header-buttons";
import CarouselWithThumbs from "../components/carousel-with-thumb";
import {
  Heart,
  MapPin,
  Phone,
  Share2,
  SquarePen,
  UserCheck2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

function AnnoncementPage() {
  return (
    <div className="py-4 px-16 min-h-screen flex flex-col gap-2 text-slate-900">
      <HeaderButtons />
      <div className="grid grid-cols-12 gap-4 w-full h-full">
        <div className="col-span-8  w-full h-full">
          <CarouselWithThumbs />
        </div>
        <div className="col-span-4 w-full h-full">
          <div className="bg-white rounded-xl w-full h-fit px-4 py-3 flex flex-col gap-2 sticky top-[10%]">
            <div className="grid grid-cols-3 gap-2 items-center">
              <span className=" flex flex-row w-fit items-center  gap-x-1 flex-wrap text-xs  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-yellow-400 fill-yellow-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <span className="font-bold text-slate-900 text-sm">10.0</span>
                <span className=" text-slate-500">68 отзывов</span>
              </span>

              <button className=" px-1.5 py-1 overflow-hidden  rounded-full  duration-300 ease-in-out   flex  flex-row gap-x-1 items-center hover:bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                <Heart className="stroke-slate-700" size={14} />
                <span className="text-slate-700 font-medium  text-xs ">
                  В Избранные
                </span>
              </button>
              <button className=" px-1.5 py-1 overflow-hidden  rounded-full  duration-300 ease-in-out   flex  flex-row gap-x-1 items-center hover:bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                <Share2 className="stroke-slate-700" size={14} />
                <span className="text-slate-700 font-medium  text-xs ">
                  Поделиться
                </span>
              </button>
            </div>
            <Separator />
            <div className="flex flex-row gap-x-2 items-center justify-start w-full flex-wrap mt-2">
              <p className="w-fit  font-semibold text-slate-900 text-2xl leading-5">
                {parseInt("256689").toLocaleString().replace(/,/g, " ")} ₸{" "}
              </p>
              <p className="font-normal text-lg opacity-80">посуточно</p>
            </div>
            <p className="mt-4 font-medium">
              2-комнатная квартира, этаж 3 из 5, площадь 73 м²
            </p>
            <div className="flex flex-row gap-x-1 items-start mt-2 text-sm font-semibold text-blue-500 mb-2">
              <MapPin size={16} />
              <p>г.Астана, Сарыаркинский район, ул. Кенесары 7</p>
            </div>
            <Separator />
            <div className="flex flex-row gap-x-1 items-center justify-center  text-lg font-semibold text-slate-900">
              <UserCheck2 size={18} />
              <p>user12566</p>
            </div>
            <div className="grid grid-cols-2 w-full gap-2 mb-2">
              <button className="flex flex-row p-3 hover:opacity-80 items-center gap-x-1.5 justify-center rounded-xl bg-blue-500 font-medium text-neutral-50">
                <Phone size={16} />
                <span>Позвонить</span>
              </button>
              <button className="flex flex-row p-3 hover:opacity-80 items-center gap-x-1.5 justify-center rounded-xl bg-green-500 font-medium text-neutral-50">
                <SquarePen size={16} />
                <span>Написать</span>
              </button>
            </div>
            <Separator />
            <div className="w-full flex flex-col gap-2">
              <p className="font-semibold">Основные удобства</p>
              <div className="w-full grid grid-col-2 gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnoncementPage;
