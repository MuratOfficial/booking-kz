"use client";

import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Separator } from "../ui/separator";
import { Annoncement } from "@/app/cabinet/annoncements/page";
import {
  ArrowUpFromDot,
  ClipboardList,
  ClipboardPen,
  Copy,
  ExternalLink,
  Eye,
  Flame,
  HeartCrack,
  MapPin,
  MessageCircle,
  Share2,
  Trash2,
  UserRoundCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface AnnoncementListCardProps {
  data: Annoncement;
}

function AnnoncementListCard({ data }: AnnoncementListCardProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const currentDate = new Date();

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

  return (
    <div className="w-full rounded-xl hover:shadow-xl transition delay-100 duration-300 cursor-pointer">
      <div className="w-full   bg-white rounded-xl grid grid-cols-12">
        <div className="  h-full flex items-center justify-center  col-span-4">
          <Carousel
            setApi={setApi}
            className="w-full group max-h-screen relative rounded-xl items-center flex justify-center"
          >
            <CarouselContent>
              {data.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={img}
                    alt={`img+${index}`}
                    width={900}
                    height={1200}
                    className=" object-cover  min-h-[200px]  max-h-[240px] rounded-l-xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <button
              className="absolute hover:opacity-100 hover:bg-opacity-100 left-2 rounded-full opacity-60 group-hover:text-slate-800 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1.5 items-center flex text-transparent"
              onClick={scrollPrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="absolute hover:opacity-100 hover:bg-opacity-100 right-2 rounded-full opacity-60 group-hover:text-slate-800 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1.5 items-center flex text-transparent"
              onClick={scrollNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <div className="absolute top-2 right-2">
              <button className="relative p-1 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-7 flex transition-[width] flex-row gap-x-1 items-center bg-slate-200  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5   group-hover/1:stroke-red-600 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span className="text-slate-700 font-medium transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-xs absolute left-2 pl-4 overflow-hidden  duration-300 ease-in-out hover:pl-4 transform">
                  Добавить в Избранное
                </span>
              </button>
            </div>

            <span className="absolute bottom-2 right-2 text-sm py-1 px-2 rounded-lg group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent">
              {current}/{count}
            </span>
          </Carousel>
        </div>
        <div className="w-full  col-span-8  flex flex-row items-center max-h-[240px] p-2">
          <div className="flex flex-col gap-2 w-[70%] h-full py-2 px-3 justify-between">
            <div className="col-span-3 flex flex-col gap-1 w-full">
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="  text-slate-900 group font-semibold text-lg text-left flex flex-row gap-x-1 items-center">
                    {data?.roomNumber}-комнатная {data.categoryType},{" "}
                    {data.areaSq} м², {data.floor}/{data.floorFrom} этаж{" "}
                  </p>
                  <div className="flex flex-row gap-x-4">
                    <p className=" text-slate-900/50 flex flex-row items-center gap-x-1 font-medium text-sm rounded-full  text-center w-fit">
                      <MapPin className="stroke-red-500" size={12} />{" "}
                      {data?.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-slate-900/90 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis qui
              minima, iusto natus distinctio magnam labore, possimus maxime sed
              a vel excepturi nemo laborum, eum consequatur commodi iste vero
              mollitia? Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Debitis doloremque possimus iusto quia, voluptates dolore
              rem exercitationem a recusandae fuga dolor aliquid, temporibus
              mollitia incidunt atque natus nostrum, ea itaque?
            </p>
            <div className="flex flex-row gap-x-1 text-green-500 items-center">
              <UserRoundCheck size={14} />
              <p className="text-xs font-semibold">Физическое лицо</p>
            </div>
            <div className="text-sm flex flex-row items-center gap-1">
              {/* <p className="text-sm font-semibold text-slate-800 ">
                Контакты:{" "}
                <span className="text-slate-600 font-normal">{data.phone}</span>
              </p> */}
              <p className=" font-semibold text-slate-500 text-xs">
                <span className="text-slate-400 font-normal pl-1">
                  {data.createdAt.toLocaleDateString()}
                </span>
              </p>
              <div className="flex flex-row gap-0.5 items-center text-slate-400 px-4 text-xs">
                <Eye size={16} /> {data?.stats?.allCount}
              </div>
            </div>

            {/* <div className="flex flex-row  gap-2 w-full h-fit p-2 items-center">
              <div className="flex flex-row  gap-2 w-full h-fit">
                <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-52 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                  <HeartCrack className="stroke-slate-800" />
                  <span className="text-slate-800 font-semibold transition-[width] line-clamp-1 group-hover/1:w-48 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                    Убрать из Избранных
                  </span>
                </button>

                <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                  <ClipboardPen className="stroke-blue-500" />
                  <span className="text-blue-500 font-semibold transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                    Сделать заметку
                  </span>
                </button>
                <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                  <MessageCircle className="stroke-yellow-400" />
                  <span className="text-yellow-400 font-semibold transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                    Оставить отзыв
                  </span>
                </button>
                <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                  <Share2 className="stroke-sky-400" />
                  <span className="text-sky-400 font-semibold transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                    Поделиться
                  </span>
                </button>
              </div>

              <HoverCard>
                <HoverCardTrigger className="bg-slate-100 cursor-pointer flex flex-row gap-x-1 items-center text-slate-800 w-fit h-fit rounded-xl px-3 py-1 text-sm font-semibold">
                  <ClipboardList size={19} /> Заметки
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col bg-slate-100 text-slate-800 shadow-xl">
                  <div className="flex flex-row gap-x-1 items-center text-sm">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                    <button className="p-1 rounded-full ">
                      <Trash2
                        size={16}
                        className="hover:stroke-red-500 transition-all delay-75 duration-300 "
                      />
                    </button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div> */}
          </div>
          <Separator className="h-[80%] bg-slate-300" orientation="vertical" />
          <div className="flex flex-col gap-2 w-[30%] h-full py-2 px-2 justify-between">
            <span className=" flex flex-row w-fit items-center gap-x-2  text-sm self-end ">
              <span className=" text-slate-500">68 отзывов</span>
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
              <span className="font-bold text-slate-900">{data.rating}</span>
            </span>
            <div className="flex flex-col self-end gap-2">
              {data.isChecked && (
                <div className="px-2 py-1 self-end text-blue-500 border-2  border-blue-500 text-xs font-semibold rounded-full  text-center w-fit flex flex-row gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p>Проверено</p>
                </div>
              )}
              {/* {data.modificators.topModifier > 0 && (
                <p className="text-sm font-semibold w-fit self-end bg-amber-500 text-neutral-100 px-2 py-1 rounded-full flex flex-row gap-x-1 items-center">
                  <ArrowUpFromDot size={14} />{" "}
                </p>
              )}
              {data.modificators.hotModifier > 0 && (
                <p className="text-sm font-semibold w-fit self-end bg-rose-500 text-neutral-100 px-2 py-1 rounded-full flex flex-row gap-x-1 items-center">
                  <Flame size={14} /> {data.modificators.hotModifier} раз
                </p>
              )}
              {data.modificators.hurryModifier > 0 && (
                <p className="text-sm font-semibold w-fit self-end bg-cyan-500 text-neutral-100 px-2 py-1 rounded-full flex flex-row gap-x-1 items-center">
                  <Zap size={14} /> {data.modificators.hurryModifier} раз
                </p>
              )} */}
            </div>

            <div className="flex flex-row gap-x-1 items-center justify-end self-end w-fit flex-wrap ">
              <p className="w-fit  font-bold text-slate-900 text-lg leading-5">
                {parseInt(data.price).toLocaleString().replace(/,/g, " ")} ₸{" "}
              </p>
              <p className="font-normal text-sm">{data?.serviceTypeExt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnoncementListCard;
