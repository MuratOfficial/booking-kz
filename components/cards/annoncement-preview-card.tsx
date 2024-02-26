"use client";
import { Copy, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

function AnnoncementPreviewCard() {
  const [api, setApi] = React.useState<CarouselApi>();

  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollPrev = React.useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const images = [
    "/random/1.jpg",
    "/random/2.jpg",
    "/random/3.jpg",
    "/random/4.jpg",
    "/random/5.jpg",
    "/random/6.jpg",
  ];

  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex flex-row gap-x-4">
        <p className="px-3 py-1 text-neutral-100 uppercase bg-cyan-500 text-xs font-semibold rounded-full  text-center w-fit">
          Аренда квартир посуточно
        </p>
        <div className="px-3 py-1 text-neutral-100  bg-cyan-500 text-xs font-semibold rounded-full  text-center w-fit flex flex-row gap-x-2">
          <p>ID: 45678995djtw</p>
          <button>
            <Copy size={16} className="hover:stroke-slate-900" />
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 items-center justify-between  gap-x-4">
        <p className="px-2  text-slate-900 font-bold text-xl text-left col-span-3">
          2-комнатная квартира, 60 м², 14/14 этаж, посуточно за 18000 ₸
        </p>

        <div className="px-2 py-1 items-center justify-center flex flex-col gap-y-1 text-neutral-100 font-semibold  text-sm bg-red-500 rounded-xl py-2 text-center">
          <p className="flex flex-row gap-x-1 items-center justify-center">
            <MapPin size={16} /> Актау, 17 мкр, 7
          </p>
          <Link
            href="/"
            className="text-xs w-full text-center text-neutral-300 hover:text-cyan-50"
          >
            Показать на карте
          </Link>
        </div>
      </div>

      <div className="w-full   bg-white rounded-2xl grid grid-cols-5">
        <div className="aspect-square flex items-center justify-center  col-span-2">
          <Carousel
            setApi={setApi}
            className="w-full group max-h-screen relative rounded-xl items-center flex justify-center"
          >
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={img}
                    alt={`img+${index}`}
                    width={900}
                    height={1200}
                    className=" object-cover aspect-square max-h-screen rounded-l-2xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <button
              className="absolute left-2 rounded-full group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent"
              onClick={scrollPrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="absolute right-2 rounded-full group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent"
              onClick={scrollNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            <span className="absolute bottom-2 right-2 py-1 px-2 rounded-lg group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent">
              {current}/{count}
            </span>
          </Carousel>
        </div>
        <div className="w-full  col-span-3 gap-2 flex flex-col justify-between">
          <div className="flex flex-col gap-2 p-4 w-full ">
            <p className="text-sm font-semibold text-slate-800">Описание</p>
            <p className="line-clamp-6 text-sm text-slate-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis qui
              minima, iusto natus distinctio magnam labore, possimus maxime sed
              a vel excepturi nemo laborum, eum consequatur commodi iste vero
              mollitia? Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Debitis doloremque possimus iusto quia, voluptates dolore
              rem exercitationem a recusandae fuga dolor aliquid, temporibus
              mollitia incidunt atque natus nostrum, ea itaque?
            </p>
            <Separator />
            <div className="text-sm flex flex-row">
              <p className="text-sm font-semibold text-slate-800 w-1/2">
                Контакты:{" "}
                <span className="text-slate-600 font-normal">+788848998</span>
              </p>
              <Separator orientation="vertical" className="h-6" />
              <p className="text-sm font-semibold text-slate-800 w-1/2 pl-2">
                Добавлено:
                <span className="text-slate-600 font-normal pl-1">
                  15 февраля, 2024 г.
                </span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full h-full p-2">
            <button className="w-full relative justify-start pl-4 hover:bg-blue-700 bg-blue-500 group w-full h-full hover:shadow-xl transition-all delay-100 duration-500 rounded-xl shadow-sm flex flex-row items-center ">
              <span className="w-fit z-10 uppercase font-bold text-neutral-100">
                Подписки
              </span>
              <span
                className="absolute bg-contain right-2 w-[100%] h-[100%] scale-75 top-0 bg-no-repeat bg-right delay-100 duration-500 -z-0 group-hover:scale-100 transition-all "
                style={{ backgroundImage: "url(/svg/svg3.svg)" }}
              ></span>
            </button>
            <button className="w-full relative justify-start pl-4 hover:bg-yellow-600 bg-yellow-400 group w-full h-full hover:shadow-xl transition-all duration-300 rounded-xl shadow-sm flex flex-row items-center ">
              <span className="w-fit z-10 uppercase font-bold text-neutral-100">
                Редактировать
              </span>
              <span
                className="absolute bg-contain right-2 w-[100%] h-[100%] scale-75 top-0 bg-no-repeat bg-right delay-100 duration-500 -z-0 group-hover:scale-95 transition-all "
                style={{ backgroundImage: "url(/svg/svg4.svg)" }}
              ></span>
            </button>
            <button className="w-full relative justify-start hover:bg-slate-900 pl-4 bg-slate-700 group w-full h-full hover:shadow-xl transition-all duration-300 rounded-xl shadow-sm flex flex-row items-center ">
              <span className="w-fit z-10 uppercase font-bold text-neutral-100">
                Изменить фотографии
              </span>
              <span
                className="absolute bg-contain right-2 w-[100%] h-[100%] scale-75 top-0 bg-no-repeat bg-right delay-100 duration-500 -z-0 group-hover:scale-100 transition-all "
                style={{ backgroundImage: "url(/svg/svg5.svg)" }}
              ></span>
            </button>
            <button className="w-full relative justify-start pl-4 hover:bg-red-700 bg-red-500 group w-full h-full hover:shadow-xl transition-all duration-300 rounded-xl shadow-sm flex flex-row items-center ">
              <span className="w-fit z-10 uppercase font-bold text-neutral-100">
                В архив
              </span>
              <span
                className="absolute bg-contain right-2 w-[100%] h-[100%] scale-75 top-0 bg-no-repeat bg-right delay-100 duration-500 -z-0 group-hover:scale-95 transition-all "
                style={{ backgroundImage: "url(/svg/svg6.svg)" }}
              ></span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-500 rounded-2xl flex flex-col gap-y-2 p-4 mt-2 h-[480px]">
        <p>Подписки</p>
      </div>
    </div>
  );
}

export default AnnoncementPreviewCard;
