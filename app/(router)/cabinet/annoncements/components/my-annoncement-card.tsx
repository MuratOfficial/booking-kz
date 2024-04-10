"use client";

import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  ArrowBigUp,
  CheckCircle2,
  Copy,
  Crown,
  Eye,
  Flame,
  Heart,
  Loader2,
  MapPin,
  RefreshCcw,
  Rocket,
  Star,
  ThumbsUpIcon,
  UserRoundCheck,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Annoncement, Subscription, Testimonial } from "@prisma/client";
import { Graphics } from "@/components/layouts/graphics";
import { PhotoChangingForm } from "./photo-changing-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import PhaseChangeButton from "./phase-change-button";
import Link from "next/link";

interface MyAnnoncementCardProps {
  data: Annoncement & { testimonials: Testimonial[] };
  subs?: Subscription[] | null;
}

function MyAnnoncementCard({ data, subs }: MyAnnoncementCardProps) {
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

  const router = useRouter();

  function calculateOverallRanking(testimonials: Testimonial[]) {
    let totalOverall = 0;
    let totalCount = 0;

    testimonials.forEach((testimonial) => {
      const ranking = testimonial.ranking;
      const overall = parseFloat(ranking.overall);
      if (!isNaN(overall)) {
        totalOverall += overall;
        totalCount++;
      }
    });

    if (totalCount === 0) {
      return 0;
    }

    return totalOverall / totalCount;
  }

  const icons = [
    {
      value: "1",
      icon: <Crown className="w-7" />,
    },
    {
      value: "2",
      icon: <Flame className="w-7" />,
    },
    {
      value: "3",
      icon: <CheckCircle2 className="w-7" />,
    },
    {
      value: "4",
      icon: <Rocket className="w-7" />,
    },
    {
      value: "5",
      icon: <ThumbsUpIcon className="w-7" />,
    },
    {
      value: "6",
      icon: <Star className="w-7" />,
    },
    {
      value: "7",
      icon: <Heart className="w-7" />,
    },
  ];

  const overallRanking = calculateOverallRanking(data.testimonials);

  return (
    <div className="flex flex-col w-full bg-white bg-opacity-40 backdrop-blur-sm rounded-xl ">
      <div className="flex flex-row items-center justify-between px-4 pt-2 pb-1">
        <div className="flex flex-row gap-x-4 items-center ">
          <p className="text-slate-400 text-xs uppercase">
            {data.serviceType} {data?.serviceTypeExt} {data.categoryType}
          </p>
          <div className="flex text-slate-400 flex-row items-center gap-x-2">
            <p className=" text-xs uppercase">ID: {data.id}</p>
            <button onClick={() => navigator.clipboard.writeText(data.id)}>
              <Copy className="w-4 hover:text-blue-500" />
            </button>
          </div>
        </div>
        <div className="flex text-slate-400 flex-row gap-x-4 items-center text-xs">
          <p>
            На сайте до:{" "}
            <span className=" underline underline-offset-2">
              {data?.subscriptionDate?.toLocaleDateString()}
            </span>
          </p>
          <button className="flex flex-row items-center group transition delay-75 duration-200 gap-x-1 items-center hover:text-blue-500">
            <RefreshCcw className="w-3 group-hover:rotate-180 transition delay-75 duration-200" />{" "}
            Продлить
          </button>
        </div>
      </div>
      <div className="w-full rounded-xl hover:shadow-xl shadow-md transition delay-100 duration-300 ">
        <div className="w-full   bg-white rounded-xl grid grid-cols-12">
          <div className="  h-full flex items-center justify-center  col-span-3">
            <Carousel
              setApi={setApi}
              className="w-full group h-[240px] relative rounded-xl items-center flex justify-center"
            >
              <CarouselContent>
                {data.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={img.url}
                      alt={`img+${index}`}
                      width={900}
                      height={1200}
                      className=" object-cover  h-[240px] rounded-l-xl"
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
              {data.serviceType === "Аренда" && (
                <span className="py-0.5 px-2 group-hover:text-transparent  group-hover:bg-transparent flex flex-row items-center gap-x-0.5 rounded-full bg-slate-200  bg-opacity-50 absolute top-2 left-2 transition delay-100 duration-300 hover:bg-opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 stroke-yellow-500 fill-yellow-500 group-hover:fill-transparent group-hover:stroke-transparent transition delay-100 duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <span className="font-bold text-slate-900 group-hover:text-transparent   text-base transition delay-100 duration-300">
                    {overallRanking}
                  </span>
                </span>
              )}

              {data.isChecked && data.serviceType === "Аренда" && (
                <span className=" py-0.5 px-1.5 group-hover:text-transparent  group-hover:bg-transparent flex flex-row items-center gap-x-1 rounded-r-full bg-blue-500  absolute top-10 left-0 transition delay-100 duration-300 hover:bg-opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-neutral-100 group-hover:stroke-transparent transition delay-100 duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span className="font-medium text-neutral-100 text-[10px] group-hover:text-transparent transition delay-100 duration-300">
                    Проверено
                  </span>
                </span>
              )}

              <span className="absolute bottom-2 right-2 text-sm py-1 px-2 rounded-lg group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent">
                {current}/{count}
              </span>
            </Carousel>
          </div>
          <div className="w-full  col-span-9  flex flex-row items-center max-h-[240px] p-2 ">
            <div className="flex flex-col gap-2 w-[60%] h-full py-2 px-3 justify-between">
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
                        {data?.cityOrDistrict && `${data?.cityOrDistrict}`}
                        {data?.cityOrTown && `, ${data?.cityOrTown}`}
                        {data?.townOrStreet && `, ${data?.townOrStreet}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="line-clamp-2 text-sm text-slate-900/90 mt-2">
                {data?.description}
              </p>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-x-1 text-green-500 items-center">
                  <UserRoundCheck size={14} />
                  <p className="text-xs font-semibold">Физическое лицо</p>
                </div>
                <Link
                  href={`/annoncements/${data.id}`}
                  className="text-slate-500 hover:text-blue-500 text-xs hover:underline underline-offset-2 font-medium"
                >
                  Перейти к обьявлению
                </Link>
              </div>

              <div className="w-full flex flex-row justify-between items-end">
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
                    <Eye size={16} /> {data?.stats?.allCount || 0}
                  </div>
                </div>
                <div className="flex flex-row gap-x-1 items-center justify-center">
                  {data?.modificators?.hotModifier !== 0 &&
                    data?.modificators?.hotModifier && (
                      <Flame className="w-4 text-red-500" />
                    )}
                  {data?.modificators?.topModifier !== 0 &&
                    data?.modificators?.topModifier && (
                      <ArrowBigUp className="w-5 text-amber-500" />
                    )}
                  {data?.modificators?.hurryModifier !== 0 &&
                    data?.modificators?.hurryModifier && (
                      <Zap className="w-4 text-sky-500" />
                    )}
                </div>
                <div className="flex flex-row gap-x-1 items-center justify-end self-end w-fit flex-wrap ">
                  <p className="w-fit  font-bold text-slate-900 text-lg leading-5">
                    {data.price.toLocaleString().replace(/,/g, " ")} ₸{" "}
                  </p>
                  <p className="font-normal text-sm">{data?.serviceTypeExt}</p>
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
            <Separator
              className="h-[85%] bg-slate-300"
              orientation="vertical"
            />
            <div className="flex flex-col gap-2 w-[40%] h-full py-2 px-2 justify-between">
              <Graphics data={data.stats?.graphicData || []} />
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full grid grid-cols-5 gap-4 p-4">
        <div className="col-span-4 w-full grid-rows-4 grid gap-4">
          <div className=" grid grid-cols-3 gap-2">
            <button className="rounded-full px-3 py-1 text-sm  transition delay-75 duration-200 flex flex-row gap-x-2 items-center font-medium text-neutral-50 shadow-lg bg-red-500 opacity-70 hover:opacity-100">
              <Flame className="w-5" /> В Горячие
            </button>
            <button className="rounded-full px-3 py-1 text-sm  transition delay-75 duration-200 flex flex-row gap-x-2 items-center font-medium text-neutral-50 shadow-lg bg-amber-500 opacity-70 hover:opacity-100">
              <ArrowBigUp className="w-5" /> В ТОП
            </button>
            <button className="rounded-full px-3 py-1 text-sm  transition delay-75 duration-200 flex flex-row gap-x-2 items-center font-medium text-neutral-50 shadow-lg bg-sky-500 opacity-70 hover:opacity-100">
              <Zap className="w-5" /> Срочно
            </button>
          </div>
          <div className=" row-span-3 grid grid-cols-2 w-full gap-4">
            {subs?.map((el, ind) => (
              <div
                key={ind}
                style={{ borderColor: `#${el.color}` }}
                className="border-2  rounded-xl flex flex-col justify-between px-4 py-2"
              >
                <div className="flex flex-row gap-x-2 items-center">
                  <span style={{ color: `#${el.color}` }}>
                    {" "}
                    {icons.filter((item) => item.value === el.icon)[0].icon}
                  </span>

                  <p className=" font-semibold text-lg">{el.name}</p>
                </div>
                <p className="text-slate-800 text-sm text-center font-medium">
                  {el.description}
                </p>
                <div className="flex flex-row justify-between items-center ">
                  <p
                    className=" font-semibold text-2xl"
                    style={{ color: `#${el.color}` }}
                  >
                    {el.price} ₸
                  </p>
                  <button
                    className="text-white rounded-full py-2 px-4  text-sm hover:opacity-80"
                    style={{ backgroundColor: `#${el.color}` }}
                  >
                    Подключить
                  </button>
                </div>
              </div>
            ))}

            {/* <div className="border-2 border-yellow-400 rounded-xl flex flex-col justify-between px-4 py-2">
              <div className="flex flex-row gap-x-2 items-center">
                <Crown className="text-yellow-400 w-7" />
                <p className=" font-semibold text-lg">
                  Пакет продвижения на 10 дней
                </p>
              </div>
              <p className="text-slate-800 text-sm text-center font-medium">
                Каждый день в ТОП, каждый день в Горячие
              </p>
              <div className="flex flex-row justify-between items-center ">
                <p className="text-yellow-400 font-semibold text-2xl">2720 ₸</p>
                <button className="text-white rounded-full py-2 px-4 bg-yellow-400 text-sm hover:opacity-80">
                  Подключить
                </button>
              </div>
            </div> */}
          </div>
        </div>
        <div className=" grid grid-rows-4 gap-2">
          <button className=" rounded-xl px-3 py-1 text-sm justify-center items-center uppercase flex flex-row gap-x-2 transition delay-75 duration-200  font-medium text-slate-500 border-2 hover:border-slate-800 hover:text-neutral-50 hover:bg-slate-800 border-slate-200">
            Изменить цену
          </button>
          <button
            onClick={() => router.push(`/cabinet/annoncements/${data.id}`)}
            className=" rounded-xl px-3 py-1 text-sm justify-center items-center uppercase flex flex-row gap-x-2 transition delay-75 duration-200  font-medium text-slate-500 border-2 hover:border-slate-800 hover:text-neutral-50 hover:bg-slate-800 border-slate-200"
          >
            Редактировать
          </button>
          <button
            onClick={() => router.push(`/cabinet/annoncements/${data.id}`)}
            className=" rounded-xl px-3 py-1 text-sm justify-center items-center uppercase flex flex-row gap-x-2 transition delay-75 duration-200  font-medium text-slate-500 border-2 hover:border-slate-800 hover:text-neutral-50 hover:bg-slate-800 border-slate-200"
          >
            Изменить фотографии
          </button>
          {data?.phase === "блокировано" && (
            <PhaseChangeButton
              title="Активировать"
              id={data.id}
              phase="активно"
            />
          )}{" "}
          {data?.phase === "активно" && (
            <PhaseChangeButton
              title="В архив"
              id={data.id}
              phase="блокировано"
            />
          )}
          {data?.phase === "проверка" && (
            <button
              type="submit"
              disabled
              className="opacity-70 pointer-events-none rounded-xl px-3 py-1 text-sm justify-center items-center uppercase flex flex-row gap-x-2 transition delay-75 duration-200  font-medium text-slate-500 border-2 hover:border-slate-800 hover:text-neutral-50 hover:bg-slate-800 border-slate-200"
            >
              В архив
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAnnoncementCard;
