"use client";
import {
  ArrowUpFromDot,
  ArrowUpSquare,
  Copy,
  Crown,
  Eye,
  Flame,
  Gem,
  MapPin,
  RotateCcw,
  Smartphone,
  Star,
  ThumbsUp,
  TicketPercent,
  Zap,
} from "lucide-react";
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
import { Graphics } from "../layouts/graphics";
import { Annoncement } from "@/app/cabinet/annoncements/page";
import { Skeleton } from "../ui/skeleton";

interface AnnoncementPreviewCardProps {
  data: Annoncement;
}

function AnnoncementPreviewCard({ data }: AnnoncementPreviewCardProps) {
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
    <div className="flex w-full flex-col gap-y-2">
      <div className="w-full grid grid-cols-4 items-center justify-between  gap-x-4">
        {data.categoryType ? (
          <div className="col-span-3 flex flex-col gap-1">
            <p className="px-2  text-slate-900 font-bold text-xl text-left ">
              {data?.roomNumber}-комнатная {data.categoryType}, {data.areaSq}{" "}
              м², {data.floor}/{data.floorFrom} этаж, {data.serviceTypeExt} за{" "}
              {data.price} ₸
            </p>
            <div className="flex flex-row gap-x-4">
              <p className="px-3 py-1 text-slate-500 uppercase bg-white text-xs font-semibold rounded-full  text-center w-fit">
                {data.serviceType} {data.categoryType} {data?.serviceTypeExt}
              </p>
              <div className="px-3 py-1 text-slate-500  bg-white text-xs font-semibold rounded-full  text-center w-fit flex flex-row gap-x-2">
                <p>ID: {data.id}</p>
                <button>
                  <Copy size={16} className="hover:stroke-slate-900" />
                </button>
              </div>
              {data.isChecked && (
                <div className="px-2 py-1 text-neutral-100  bg-blue-500 text-xs font-semibold rounded-full  text-center w-fit flex flex-row gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-neutral-100"
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
            </div>
          </div>
        ) : (
          <Skeleton className="col-span-3 rounded-lg h-16" />
        )}

        {data.city ? (
          <div className="px-2 py-1 items-center justify-center flex flex-col gap-y-1 text-slate-500 font-semibold  text-sm bg-white rounded-xl py-2 text-center">
            <p className="flex flex-row gap-x-1 items-center justify-center">
              {data.city}
            </p>
            <Link
              href="/"
              className="text-xs w-full text-center text-slate-300 hover:text-blue-600"
            >
              Показать на карте
            </Link>
          </div>
        ) : (
          <Skeleton className="col-span-1 rounded-lg h-16" />
        )}
      </div>

      {data.categoryType ? (
        <div className="w-full   bg-white rounded-xl grid grid-cols-8">
          <div className="aspect-square flex items-center justify-center  col-span-2">
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
            <div className="flex flex-col gap-2 py-2 px-3 w-full ">
              <p className="text-sm font-semibold text-slate-800">Описание</p>
              <p className="line-clamp-5 text-sm text-slate-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                qui minima, iusto natus distinctio magnam labore, possimus
                maxime sed a vel excepturi nemo laborum, eum consequatur commodi
                iste vero mollitia? Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Debitis doloremque possimus iusto quia,
                voluptates dolore rem exercitationem a recusandae fuga dolor
                aliquid, temporibus mollitia incidunt atque natus nostrum, ea
                itaque?
              </p>
              <Separator />
              <div className="text-sm flex flex-col gap-1">
                <p className="text-sm font-semibold text-slate-800 ">
                  Контакты:{" "}
                  <span className="text-slate-600 font-normal">
                    {data.phone}
                  </span>
                </p>
                <p className="text-sm font-semibold text-slate-800 ">
                  Добавлено:
                  <span className="text-slate-600 font-normal pl-1">
                    {data.createdAt.toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 col-span-3 gap-2 w-full h-full p-2">
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
            {data.phase === "moderation" || data.phase === "active" ? (
              <button className="w-full relative justify-start pl-4 hover:bg-red-700 bg-red-500 group w-full h-full hover:shadow-xl transition-all duration-300 rounded-xl shadow-sm flex flex-row items-center ">
                <span className="w-fit z-10 uppercase font-bold text-neutral-100">
                  В архив
                </span>
                <span
                  className="absolute bg-contain right-2 w-[100%] h-[100%] scale-75 top-0 bg-no-repeat bg-right delay-100 duration-500 -z-0 group-hover:scale-95 transition-all "
                  style={{ backgroundImage: "url(/svg/svg6.svg)" }}
                ></span>
              </button>
            ) : (
              <button className="w-full relative justify-start pl-4 hover:bg-cyan-700 bg-cyan-500 group w-full h-full hover:shadow-xl transition-all duration-300 rounded-xl shadow-sm flex flex-row items-center ">
                <span className="w-fit z-10 uppercase font-bold text-neutral-100">
                  Восстановить
                </span>
                <span
                  className="absolute bg-contain right-2 w-[100%] h-[100%] scale-75 top-0 bg-no-repeat bg-right delay-100 duration-500 -z-0 group-hover:scale-95 transition-all "
                  style={{ backgroundImage: "url(/svg/svg6.svg)" }}
                ></span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <Skeleton className="w-full rounded-lg h-60" />
      )}

      {data.categoryType ? (
        <div className="w-full bg-blue-400 relative rounded-2xl flex flex-col gap-y-2 py-8 px-8 mt-2 h-fit z-10 ">
          <Image
            src="/svg/svg7.svg"
            alt="bg-img"
            width={900}
            height={900}
            className="w-3/5 absolute bottom-0 right-0 -z-10 opacity-50"
          />
          <p className="text-2xl font-semibold uppercase text-neutral-100">
            Текущие подписки
          </p>
          <div className="w-full flex flex-row gap-2">
            <div className="w-fit py-2 px-4 rounded-xl bg-blue-600 flex flex-col items-center justify-center">
              <p className="text-sm font-semibold text-neutral-200">
                Осталось дней до переноса в Архив
              </p>
              <p className="text-sm font-semibold text-neutral-200">
                {" "}
                <span className="font-extrabold px-1.5 py-0.5 bg-blue-400 rounded-md">
                  {Math.floor(
                    (currentDate.getTime() - data.subscription.getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) > 0
                    ? 30 -
                      Math.floor(
                        (currentDate.getTime() - data.subscription.getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    : 0}
                </span>{" "}
                дн.
              </p>
            </div>
            <button className="w-fit h-full py-2 px-4 bg-blue-600 group hover:bg-blue-700 transition delay-100 duration-300 rounded-xl flex flex-row items-center justify-center">
              <RotateCcw className=" stroke-neutral-100 group-hover:-rotate-45 transition-all duration-300 delay-75" />
              <span className="text-sm font-semibold text-neutral-100 ml-1">
                Продлить
              </span>
            </button>
            <button className="w-fit text-sm font-semibold text-neutral-100 ml-1 h-full py-2 px-4 bg-blue-400 group hover:bg-blue-700 transition delay-100 duration-300 rounded-xl flex flex-row items-center justify-center">
              Неделя
            </button>
            <button className="w-fit text-sm font-semibold text-neutral-100 ml-1 h-full py-2 px-4 bg-blue-400 group hover:bg-blue-700 transition delay-100 duration-300 rounded-xl flex flex-row items-center justify-center">
              14 дней
            </button>
            <button className="w-fit text-sm font-semibold text-neutral-100 ml-1 h-full py-2 px-4 bg-blue-400 group hover:bg-blue-700 transition delay-100 duration-300 rounded-xl flex flex-row items-center justify-center">
              30 дней
            </button>
          </div>
          <div className="w-full p-3 mt-2 rounded-xl bg-blue-600 flex flex-col items-center justify-center">
            <p className=" font-semibold text-neutral-100 mb-1">
              Осталось модификаторов
            </p>
            <div className="flex flex-row gap-x-2 w-full pt-1 mb-2 items-center justify-center">
              <p className="text-sm font-semibold bg-amber-500 text-neutral-100 px-2 py-1 rounded-md flex flex-row gap-x-1 items-center">
                <ArrowUpFromDot size={19} /> {data.modificators.topModifier} раз
              </p>
              <p className="text-sm font-semibold bg-rose-500 text-neutral-100 px-2 py-1 rounded-md flex flex-row gap-x-1 items-center">
                <Flame size={19} /> {data.modificators.hotModifier} раз
              </p>
              <p className="text-sm font-semibold bg-cyan-500 text-neutral-100 px-2 py-1 rounded-md flex flex-row gap-x-1 items-center">
                <Zap size={19} /> {data.modificators.hurryModifier} раз
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button className="w-full h-16 py-2 px-4 border-2 border-neutral-100 hover:border-amber-500 group hover:bg-amber-500 transition delay-100 duration-300 rounded-xl flex flex-row items-center justify-center">
                <ArrowUpFromDot
                  className=" stroke-neutral-100 group-hover:-translate-y-2 transition-all duration-300 delay-75"
                  size={28}
                />
                <p className="text-sm font-semibold text-neutral-100 ml-1 flex flex-col">
                  Отправить в ТОП{" "}
                  <span className="text-xs font-light">
                    24 часа выше бесплатных обьявлении
                  </span>
                </p>
              </button>
              <button className="w-full h-16 py-2 px-4 border-2 border-neutral-100 hover:border-rose-500 group hover:bg-rose-500 transition delay-100 duration-300 rounded-xl flex flex-row items-center justify-center">
                <Flame
                  className=" stroke-neutral-100 group-hover:fill-neutral-100 transition duration-300 delay-75"
                  size={28}
                />
                <p className="text-sm font-semibold text-neutral-100 ml-1 flex flex-col">
                  Отправить в Горячие{" "}
                  <span className="text-xs font-light">
                    24 часа в Горячих предложениях
                  </span>
                </p>
              </button>
              <button className="w-full h-16 py-2 px-4 border-2 border-neutral-100 hover:border-cyan-500 group hover:bg-cyan-500 transition delay-100 duration-300 rounded-xl flex flex-row items-center justify-center">
                <Zap
                  className=" stroke-neutral-100 group-hover:rotate-180 group-hover:fill-neutral-100 transition duration-500 delay-75"
                  size={28}
                />
                <p className="text-sm font-semibold text-neutral-100 ml-3 flex flex-col">
                  Поставить СРОЧНО{" "}
                  {/* <span className="text-xs font-light">
                24 часа в Горячих предложениях
              </span> */}
                </p>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2  mt-6 text-neutral-100">
            <p className="text-2xl uppercase font-bold">
              Приобретите КОМБО и сэкономьте на модификаторах!
            </p>
            <div className="grid grid-cols-3 gap-2 ">
              <div className="p-3 rounded-xl group  relative hover:bg-neutral-100 transition-all delay-100 duration-500 bg-purple-600 flex cursor-pointer hover:text-purple-600 text-neutral-100 flex-col items-center justify-center text-lg  ">
                <Flame size={28} className="group-hover:fill-purple-600" />

                {data.companySubscription === "HOT" && (
                  <div className="absolute flex flex-row gap-x-1 px-1 py-0.5 text-neutral-50 font-semibold text-xs bg-yellow-400 rounded-r-md top-6 left-0">
                    <Crown size={16} />
                    <p>Приобретено</p>{" "}
                  </div>
                )}
                <p className="font-extrabold ">Горячие на сутки</p>
                <p className="font-black text-xl">КОМБО 8x</p>
                <p className="flex flex-row gap-x-1 text-sm font-semibold mt-2">
                  <Flame size={19} /> 8 раз в Горячие Предложения
                </p>
                <p className="flex flex-row gap-x-1 text-sm font-semibold mt-2">
                  <TicketPercent size={19} /> -50% экономии
                </p>
              </div>
              <div className="p-3 rounded-xl group relative  hover:bg-neutral-100 transition-all delay-100 duration-500 bg-rose-600 flex cursor-pointer hover:text-rose-600 text-neutral-100 flex-col items-center justify-center text-lg  ">
                <Star size={28} className="group-hover:fill-rose-600" />
                {data.companySubscription === "TURBO" && (
                  <div className="absolute flex flex-row gap-x-1 px-1 py-0.5 text-neutral-50 font-semibold text-xs bg-yellow-400 rounded-r-md top-6 left-0">
                    <Crown size={16} />
                    <p>Приобретено</p>{" "}
                  </div>
                )}
                <p className="font-extrabold ">Turbo</p>
                <p className="font-black text-xl">КОМБО 15x</p>
                <p className="flex flex-row gap-x-1 text-sm font-semibold mt-2">
                  <Flame size={19} /> 15 раз в Горячие Предложения
                </p>
                <p className="flex flex-row gap-x-1 text-sm font-semibold mt-2">
                  <ArrowUpFromDot size={19} /> 15 раз в Поднять в ТОП
                </p>
                <p className="flex flex-row gap-x-1 text-sm font-semibold mt-2">
                  <TicketPercent size={19} /> -50% экономии
                </p>
              </div>
              <div className="p-3 rounded-xl group relative hover:bg-neutral-100 transition-all delay-100 duration-500 bg-indigo-800 flex cursor-pointer hover:text-indigo-800 text-neutral-100 flex-col items-center justify-center text-lg  ">
                <Gem size={28} className="group-hover:fill-indigo-800" />
                {data.companySubscription === "PREMIUM" && (
                  <div className="absolute flex flex-row gap-x-1 px-1 py-0.5 text-neutral-50 font-semibold text-xs bg-yellow-400 rounded-r-md top-6 left-0">
                    <Crown size={16} />
                    <p>Приобретено</p>{" "}
                  </div>
                )}
                <p className="font-extrabold ">Premium</p>
                <p className="font-black text-xl">КОМБО 50x</p>
                <p className="flex flex-row gap-x-1 text-sm font-semibold mt-2">
                  <Flame size={19} /> 50 раз в Горячие Предложения
                </p>
                <p className="flex flex-row gap-x-1 text-sm font-semibold mt-2">
                  <ArrowUpFromDot size={19} /> 50 раз в Поднять в ТОП
                </p>
                <p className="flex flex-row gap-x-1 text-sm font-semibold mt-2">
                  <TicketPercent size={19} /> -80% экономии
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className="aspect-square rounded-xl" />
      )}

      <div className="w-full border-4 border-slate-900 bg-white relative rounded-2xl flex flex-col gap-y-2 py-8 px-8 mt-2 h-fit z-10 bg-right-bottom bg-contain bg-opacity-40 bg-no-repeat">
        <p className="text-2xl font-bold uppercase text-slate-900">
          Статистика
        </p>
        <div className="w-full flex flex-row gap-2">
          <div className="w-fit py-4 px-6 rounded-xl bg-slate-900 flex flex-row gap-2 items-center justify-center">
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-neutral-100">
                Просмотров всего
              </p>
              <p className="text-sm font-semibold text-neutral-100 flex flex-row gap-x-1 items-center mt-1">
                <Eye size={19} /> {data.stats.allCount}
              </p>
              <p className="text-sm font-semibold text-neutral-100 flex flex-row gap-x-1 items-center">
                <Smartphone size={19} /> {data.stats.allMobileCount}
              </p>
            </div>
            <Separator orientation="vertical" className="h-14 mx-2" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-neutral-100">
                За 7 дней
              </p>
              <p className="text-sm font-semibold text-neutral-100 flex flex-row gap-x-1 items-center mt-1">
                <Eye size={19} /> {data.stats.lastSevenCount}{" "}
                {data.stats.todayCount && (
                  <span className="text-green-500">
                    +{data.stats.todayCount}
                  </span>
                )}
              </p>
              <p className="text-sm font-semibold text-neutral-100 flex flex-row gap-x-1 items-center">
                <Smartphone size={19} /> {data.stats.lastSevenCountMobile}{" "}
                {data.stats.todayCountMobile && (
                  <span className="text-green-500">
                    +{data.stats.todayCountMobile}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <p className="py-1 px-2 rounded-lg text-sm uppercase font-semibold mt-4 bg-white bg-opacity-80 w-fit">
          График просмотров
        </p>
        <Graphics data={data.stats.graphicData} />
      </div>
    </div>
  );
}

export default AnnoncementPreviewCard;
