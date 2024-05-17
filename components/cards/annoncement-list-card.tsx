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
import {
  Briefcase,
  Building2,
  Eye,
  MapPin,
  UserRoundCheck,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Analytics, Annoncement, Building, Testimonial } from "@prisma/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AnnoncementListCardProps {
  data: Annoncement & {
    testimonials: Testimonial[];
    analytics: Analytics[];
    buildingName: Building | null;
  } & {
    isFavorite?: boolean;
  };
}

const FormSchema = z.object({
  id: z.string().min(2, {
    message: "id must be at least 2 characters.",
  }),
});

function AnnoncementListCard({ data }: AnnoncementListCardProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const currentDate = new Date();

  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  function calculateOverallRanking(testimonials: Testimonial[]) {
    const overallPoints: Record<string, number> = {
      overall: 0,
      ranking1: 0,
      ranking2: 0,
      ranking3: 0,
      ranking4: 0,
      ranking5: 0,
      ranking6: 0,
    };
    const totalCounts: Record<string, number> = {
      overall: 0,
      ranking1: 0,
      ranking2: 0,
      ranking3: 0,
      ranking4: 0,
      ranking5: 0,
      ranking6: 0,
    };

    testimonials.forEach((testimonial) => {
      const ranking = testimonial.ranking;
      for (let key in ranking) {
        const value = parseFloat(ranking[key as keyof typeof ranking]);
        if (!isNaN(value)) {
          overallPoints[key] += value;
          totalCounts[key]++;
        }
      }
    });

    const overallAverages: Record<string, number> = {};
    for (let key in overallPoints) {
      const totalCount = totalCounts[key];
      if (totalCount > 0) {
        overallAverages[key] = overallPoints[key] / totalCount;
      } else {
        overallAverages[key] = 0;
      }
    }

    return overallAverages;
  }

  const overallRanking = calculateOverallRanking(data.testimonials || []);

  const rating = [
    { name: "Чистота", rating: overallRanking.ranking1 },
    { name: "Соответствие фото", rating: overallRanking.ranking2 },
    { name: "Расположение", rating: overallRanking.ranking3 },
    { name: "Качество обслуживания", rating: overallRanking.ranking4 },
    { name: "Состояние ремонта", rating: overallRanking.ranking5 },
    { name: "Инфраструктура", rating: overallRanking.ranking6 },
  ];

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

  // function calculateOverallRanking(testimonials: Testimonial[]) {
  //   let totalOverall = 0;
  //   let totalCount = 0;

  //   testimonials.forEach((testimonial) => {
  //     const ranking = testimonial.ranking;
  //     const overall = parseFloat(ranking.overall);
  //     if (!isNaN(overall)) {
  //       totalOverall += overall;
  //       totalCount++;
  //     }
  //   });

  //   if (totalCount === 0) {
  //     return 0;
  //   }

  //   return totalOverall / totalCount;
  // }

  // const overallRanking = calculateOverallRanking(data.testimonials);

  function overallCount(analytics: Analytics[]) {
    let totalCount = 0;
    let mobileCount = 0;
    if (analytics) {
      for (const item of analytics) {
        if (typeof item.viewCount === "number") {
          totalCount += item.viewCount;
        }
        if (typeof item.mobileCount === "number") {
          mobileCount += item.mobileCount;
        }
      }
    }

    return { totalCount, mobileCount };
  }

  const overallAnalyticsView = overallCount(data.analytics);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data?.id,
    },
  });

  const onFavourite = async (formData: z.infer<typeof FormSchema>) => {
    try {
      await axios.patch(`/api/annoncements/${data.id}/favourite`, formData);

      router.refresh();
    } catch (error) {
      router.push("/auth");
      console.log(error);
    }
  };

  return (
    <div className="w-full rounded-xl hover:shadow-xl transition delay-100 duration-300 ">
      <div
        className="w-full   bg-white rounded-xl grid grid-cols-12"
        style={{
          backgroundColor: `${
            data.hurryModifierDate && data?.hurryModifierDate > currentDate
              ? "#fee2e2"
              : "white"
          }`,
        }}
      >
        <div className="  h-full flex items-center justify-center  col-span-4">
          <Carousel
            setApi={setApi}
            className="w-full group h-[240px] relative rounded-xl items-center flex justify-center"
          >
            <CarouselContent>
              {data?.images?.map((img, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={img?.url}
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
            <div className="absolute top-2 right-2">
              <form onSubmit={form.handleSubmit(onFavourite)}>
                {data.isFavorite ? (
                  <button className="relative p-1 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-7 flex transition-[width] flex-row gap-x-1 items-center bg-slate-200  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5   stroke-red-600 fill-red-600 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <span className="text-slate-700 font-medium transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-xs absolute left-2 pl-4 overflow-hidden  duration-300 ease-in-out hover:pl-4 transform">
                      В Избранных
                    </span>
                  </button>
                ) : (
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
                )}
              </form>
            </div>

            <span className="absolute bottom-2 right-2 text-sm py-1 px-2 rounded-lg group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent">
              {current}/{count}
            </span>
          </Carousel>
        </div>
        <div
          className="w-full  col-span-8  flex flex-row items-center max-h-[240px] p-2 cursor-pointer"
          onClick={() => router.push(`/annoncements/${data.id}`)}
        >
          <div className="flex flex-col gap-2 w-[70%] h-full py-2 px-3 justify-between">
            <div className="col-span-3 flex flex-col gap-1 w-full">
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1 w-full">
                  <p className="  text-slate-900 group font-semibold text-lg text-left flex flex-row gap-x-1 items-center">
                    {data?.roomNumber}-комнатная {data.categoryType},{" "}
                    {data.areaSq} м², {data.floor}/{data.floorFrom} этаж{" "}
                  </p>
                  <div className="flex flex-row justify-between gap-x-4 flex-wrap">
                    <p className=" text-slate-900/50 flex flex-row items-center gap-x-1 font-medium text-sm rounded-full  text-center w-fit">
                      <MapPin className="stroke-red-500" size={12} />{" "}
                      {data?.cityOrDistrict && `${data?.cityOrDistrict}`}
                      {!data?.buildingName && (
                        <span className="flex flex-row gap-x-1">
                          {data?.cityOrTown && `, ${data?.cityOrTown}`}
                          {data?.townOrStreet && `, ${data?.townOrStreet}`}
                        </span>
                      )}
                    </p>
                    {data?.buildingName && (
                      <p className=" text-slate-900/50 flex flex-row items-center gap-x-1 font-medium text-sm rounded-full  w-fit">
                        <Building2 className="stroke-blue-500" size={12} />{" "}
                        {data?.buildingName.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-slate-900/90 mt-2">
              {data?.description}
            </p>
            <div className="flex flex-row gap-x-1  items-center">
              {data?.fizOrBiz === "fiz" && (
                <div className="text-green-500 flex flex-row gap-x-1 items-center">
                  <UserRoundCheck className="w-4" />
                  <p className="text-xs font-semibold">Физическое лицо</p>
                </div>
              )}
              {data?.fizOrBiz === "biz" && (
                <div className="text-violet-500 flex flex-row gap-x-1 items-center">
                  <Briefcase className="w-4" />
                  <p className="text-xs font-semibold">Юридическое лицо</p>
                </div>
              )}
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
                <Eye className="w-4" /> {overallAnalyticsView.totalCount || 0}
              </div>
              <div className="flex flex-row gap-x-1 items-center justify-center">
                {data?.hotModifierDate &&
                  data?.hotModifierDate > currentDate && (
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 128 128"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className="iconify iconify--noto"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <radialGradient
                        id="IconifyId17ecdb2904d178eab8626"
                        cx="68.884"
                        cy="124.296"
                        r="70.587"
                        gradientTransform="matrix(-1 -.00434 -.00713 1.6408 131.986 -79.345)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".314" stopColor="#ff9800"></stop>
                        <stop offset=".662" stopColor="#ff6d00"></stop>
                        <stop offset=".972" stopColor="#f44336"></stop>
                      </radialGradient>
                      <path
                        d="M35.56 40.73c-.57 6.08-.97 16.84 2.62 21.42c0 0-1.69-11.82 13.46-26.65c6.1-5.97 7.51-14.09 5.38-20.18c-1.21-3.45-3.42-6.3-5.34-8.29c-1.12-1.17-.26-3.1 1.37-3.03c9.86.44 25.84 3.18 32.63 20.22c2.98 7.48 3.2 15.21 1.78 23.07c-.9 5.02-4.1 16.18 3.2 17.55c5.21.98 7.73-3.16 8.86-6.14c.47-1.24 2.1-1.55 2.98-.56c8.8 10.01 9.55 21.8 7.73 31.95c-3.52 19.62-23.39 33.9-43.13 33.9c-24.66 0-44.29-14.11-49.38-39.65c-2.05-10.31-1.01-30.71 14.89-45.11c1.18-1.08 3.11-.12 2.95 1.5z"
                        fill="url(#IconifyId17ecdb2904d178eab8626)"
                      ></path>
                      <radialGradient
                        id="IconifyId17ecdb2904d178eab8627"
                        cx="64.921"
                        cy="54.062"
                        r="73.86"
                        gradientTransform="matrix(-.0101 .9999 .7525 .0076 26.154 -11.267)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".214" stopColor="#fff176"></stop>
                        <stop offset=".328" stopColor="#fff27d"></stop>
                        <stop offset=".487" stopColor="#fff48f"></stop>
                        <stop offset=".672" stopColor="#fff7ad"></stop>
                        <stop offset=".793" stopColor="#fff9c4"></stop>
                        <stop
                          offset=".822"
                          stopColor="#fff8bd"
                          stopOpacity=".804"
                        ></stop>
                        <stop
                          offset=".863"
                          stopColor="#fff6ab"
                          stopOpacity=".529"
                        ></stop>
                        <stop
                          offset=".91"
                          stopColor="#fff38d"
                          stopOpacity=".209"
                        ></stop>
                        <stop
                          offset=".941"
                          stopColor="#fff176"
                          stopOpacity="0"
                        ></stop>
                      </radialGradient>
                      <path
                        d="M76.11 77.42c-9.09-11.7-5.02-25.05-2.79-30.37c.3-.7-.5-1.36-1.13-.93c-3.91 2.66-11.92 8.92-15.65 17.73c-5.05 11.91-4.69 17.74-1.7 24.86c1.8 4.29-.29 5.2-1.34 5.36c-1.02.16-1.96-.52-2.71-1.23a16.09 16.09 0 0 1-4.44-7.6c-.16-.62-.97-.79-1.34-.28c-2.8 3.87-4.25 10.08-4.32 14.47C40.47 113 51.68 124 65.24 124c17.09 0 29.54-18.9 19.72-34.7c-2.85-4.6-5.53-7.61-8.85-11.88z"
                        fill="url(#IconifyId17ecdb2904d178eab8627)"
                      ></path>
                    </svg>
                  )}

                {data?.topModifierDate &&
                  data?.topModifierDate > currentDate && (
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 128 128"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className="iconify iconify--noto"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        fill="#ca2c31"
                        d="M3.77 71.73l16.34-16.1l27.82-4.93l-2.75 14.56L7.57 76.82l-2.43-1.05z"
                      ></path>
                      <path
                        fill="#a02422"
                        d="M22.94 59.76L5.2 75.88l13.05 6.36l19.81-10.11v-4.77l4.05-10.92z"
                      ></path>
                      <path
                        d="M64.92 88.15l-8.57 3.72l-8.09 17.15s7.12 15.77 7.44 15.77c.32 0 4.37.32 4.37.32l14.4-16.1l3.64-27.5l-13.19 6.64z"
                        fill="#a02422"
                      ></path>
                      <path
                        d="M56.5 100.84s4.77-.97 8.17-2.59c3.4-1.62 7.6-4.04 7.6-4.04l-1.54 13.43l-15.05 17.13s-.59-.73-3.09-6.17c-1.99-4.34-2.68-5.89-2.68-5.89l6.59-11.87z"
                        fill="#ca2c31"
                      ></path>
                      <path
                        d="M31.58 80.66s-5.74-.48-12.03 7.47c-5.74 7.26-8.43 19.08-9.47 22.12s-3.53 3.66-2.7 5.05s4.42 1.31 8.85.76s8.23-1.94 8.23-1.94s-.19.48-.83 1.52c-.23.37-1.03.9-.97 1.45c.14 1.31 11.36 1.34 20.32-7.88c9.68-9.95 4.98-18.11 4.98-18.11L31.58 80.66z"
                        fill="#f7d74d"
                      ></path>
                      <path
                        d="M33.31 85.29s-6.19.33-11.31 8.28s-7.5 17.16-7.01 17.78c.48.62 10.02-2.83 12.31-2.14c1.57.48.76 2.07 1.18 2.49c.35.35 4.49.94 11.19-6.32c6.71-7.26 5.12-17.46 5.12-17.46l-11.48-2.63z"
                        fill="#fbf0b4"
                      ></path>
                      <path
                        d="M36.35 74.44s-3.11 2.77-4.22 4.36c-1.11 1.59-1.11 1.73-1.04 2.21c.07.48 1.22 5.75 6.01 10.37c5.88 5.67 11.13 6.43 11.89 6.43c.76 0 5.81-5.67 5.81-5.67l-18.45-17.7z"
                        fill="#858585"
                      ></path>
                      <path
                        d="M50.1 91.24s5.04 3.31 13.49.47c11.55-3.88 20.02-12.56 30.51-23.52c10.12-10.58 18.61-23.71 18.61-23.71l-5.95-19.93L50.1 91.24z"
                        fill="#437687"
                      ></path>
                      <path
                        d="M67.99 80.33l1.39-4.32l3.48.49s2.65 1.25 4.6 2.16c1.95.91 4.46 1.6 4.46 1.6l-4.95 4.18s-2.7-1.02-4.67-1.88c-2.22-.97-4.31-2.23-4.31-2.23z"
                        fill="#3f545f"
                      ></path>
                      <path
                        d="M84.32 16.14s-9.62 5.58-23.41 18.63c-12.43 11.76-21.64 22.4-23.87 31.45c-1.86 7.58-.87 12.18 3.36 17.15c4.47 5.26 9.71 7.87 9.71 7.87s3.94.06 20.38-12.59C91 62.86 107.43 36.42 107.43 36.42L84.32 16.14z"
                        fill="#8dafbf"
                      ></path>
                      <path
                        d="M104.18 41.84s-8.37-3.57-14.34-11.9c-5.93-8.27-5.46-13.86-5.46-13.86s4.96-3.89 16.11-8.34c7.5-2.99 17.71-4.52 21.07-2.03s-2.3 14.98-2.3 14.98l-10.31 19.96l-4.77 1.19z"
                        fill="#d83f22"
                      ></path>
                      <path
                        d="M68.17 80.4s-7.23-3.69-11.83-8.94c-8.7-9.91-10.5-20.79-10.5-20.79l4.37-5.13S51.3 57.1 60.63 67.09c6.08 6.51 12.43 9.49 12.43 9.49s-1.27 1.07-2.63 2.11c-.87.67-2.26 1.71-2.26 1.71z"
                        fill="#6896a5"
                      ></path>
                      <path
                        d="M112.71 44.48s4.34-5.23 8.45-17.02c5.74-16.44.74-21.42.74-21.42s-1.69 7.82-7.56 18.69c-4.71 8.71-10.41 17-10.41 17s3.14 1.41 4.84 1.9c2.14.62 3.94.85 3.94.85z"
                        fill="#a02422"
                      ></path>
                      <path
                        d="M39.81 69.66c1.3 1.24 3.27-.06 4.56-3.1c1.3-3.04 1.28-4.74.28-5.46c-1.24-.9-3.32 1.07-4.23 2.82c-1 1.94-1.59 4.8-.61 5.74z"
                        fill="#b3e1ee"
                      ></path>
                      <path
                        d="M84.95 20.13s-7.61 5.47-15.73 12.91c-7.45 6.83-12.39 12.17-13.07 13.41c-.72 1.33-.73 3.21-.17 4.17s1.8 1.46 2.93.62c1.13-.85 9.18-9.75 16.45-16.11c6.65-5.82 11.78-9.51 11.78-9.51s2.08-3.68 1.74-4.52c-.34-.85-3.93-.97-3.93-.97z"
                        fill="#b3e1ee"
                      ></path>
                      <path
                        d="M84.95 20.13s5.62-4.31 11.74-7.34c5.69-2.82 11.35-5.17 12.37-3.13c.97 1.94-5.37 4.58-10.95 8.14c-5.58 3.56-10.95 7.81-10.95 7.81s-.82-1.5-1.35-2.89a23.7 23.7 0 0 1-.86-2.59z"
                        fill="#ed6a65"
                      ></path>
                      <path
                        d="M89.59 39.25c-5.57-5.13-13.32-3.75-17.14.81c-3.92 4.7-3.63 11.88 1 16.2c4.21 3.92 12.04 4.81 16.76-.69c4.2-4.88 3.94-12.13-.62-16.32z"
                        fill="#e1e1e1"
                      ></path>
                      <path
                        d="M75.33 41.87c-3.31 3.25-3.13 9.69.81 12.63c3.44 2.57 8.32 2.44 11.38-.69c3.06-3.13 3.06-8.82.19-11.76c-3.3-3.37-8.59-3.9-12.38-.18z"
                        fill="#3f545f"
                      ></path>
                      <path
                        d="M50 76.89s6.19-6.28 6.87-5.6c.68.68.59 4.49-2.37 8.73c-2.97 4.24-9.5 11.79-14.67 16.88c-5.1 5.01-12.29 10.74-12.97 10.64c-.53-.08-2.68-1.15-3.54-2.19c-.84-1.03 1.67-5.9 2.68-7.51c1.02-1.61 24-20.95 24-20.95z"
                        fill="#a02524"
                      ></path>
                      <path
                        d="M21.23 101.85c-.08 1.44 2.12 3.54 2.12 3.54L56.87 71.3s-1.57-1.77-6.19 1.1c-4.66 2.9-8.74 6.38-14.76 12.21c-8.39 8.14-14.61 15.8-14.69 17.24z"
                        fill="#ca2c31"
                      ></path>
                      <path
                        d="M19.06 36.95c-1.11 1.11-1.16 2.89.08 3.91c1.1.91 2.89.32 3.56-.5s.59-2.6-.3-3.48c-.89-.89-2.66-.6-3.34.07z"
                        fill="#ffffff"
                      ></path>
                      <path
                        d="M41.02 35.65c-.84.93-.57 2.31.21 2.82s1.95.46 2.52-.24c.51-.63.57-1.89-.21-2.67c-.68-.67-1.98-.51-2.52.09z"
                        opacity=".5"
                        fill="#ffffff"
                      ></path>
                      <path
                        d="M55.55 11.89s1.22-3.48 1.94-3.52c.73-.04 1.78 3.48 1.78 3.48s3.61.04 3.85.57c.31.68-2.31 2.96-2.31 2.96s.85 3.4.45 3.81c-.45.45-3.56-1.34-3.56-1.34s-3.2 2.23-3.89 1.62c-.6-.53.65-4.13.65-4.13s-3-2.19-2.84-2.8c.23-.86 3.93-.65 3.93-.65z"
                        fill="#ffffff"
                      ></path>
                      <path
                        d="M97.01 95.33c1.21.67 2.73.29 3.29-1c.51-1.15-.43-2.52-1.28-2.89c-.85-.37-2.34.12-2.88 1.09c-.53.96.14 2.4.87 2.8z"
                        fill="#ffffff"
                      ></path>
                      <path
                        d="M114.19 65.84c-.69-1.07-2.18-1.42-3.15-.56c-.94.84-.71 2.16-.18 2.83c.53.67 1.95.92 2.81.37s.94-2 .52-2.64z"
                        fill="#ffffff"
                      ></path>
                    </svg>
                  )}
                {data?.hurryModifierDate &&
                  data?.hurryModifierDate > currentDate && (
                    <svg
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <path
                            fill="#AEADB3"
                            d="M182.41,340.038c-2.095,0-4.191-0.799-5.789-2.397c-3.197-3.199-3.197-8.382,0-11.579l57.696-57.696 c4.379-4.379,6.791-10.202,6.791-16.395s-2.411-12.015-6.791-16.393L102.959,104.218c-10.42-10.421-10.42-27.376,0-37.797 l49.317-49.316c10.42-10.42,27.376-10.42,37.795,0l8.525,8.527c3.197,3.197,3.197,8.382,0,11.578 c-3.199,3.197-8.382,3.196-11.579-0.001l-8.525-8.526c-4.036-4.035-10.603-4.035-14.638,0.001l-49.317,49.317 c-4.036,4.035-4.036,10.602,0,14.637l131.358,131.359c7.472,7.472,11.587,17.405,11.587,27.973c0,10.567-4.116,20.5-11.587,27.973 l-57.696,57.697C186.601,339.239,184.506,340.038,182.41,340.038z"
                          ></path>{" "}
                          <path
                            fill="#AEADB3"
                            d="M488.249,335.051c-2.095,0-4.191-0.799-5.789-2.397l-10.909-10.908 c-3.197-3.197-3.197-8.382,0-11.578c3.197-3.199,8.382-3.197,11.578-0.001l10.909,10.908c3.197,3.197,3.197,8.382,0,11.578 C492.44,334.25,490.345,335.051,488.249,335.051z"
                          ></path>{" "}
                        </g>{" "}
                        <path
                          fill="#FB0125"
                          d="M242.398,4.746c-6.328-6.328-16.588-6.328-22.916,0l-54.084,54.083 c-6.328,6.328-6.328,16.588,0,22.916l261.617,261.617c6.328,6.328,16.588,6.328,22.916,0l54.084-54.084 c6.328-6.328,6.328-16.588,0-22.916L242.398,4.746z"
                        ></path>{" "}
                        <path
                          fill="#CC111E"
                          d="M445.678,324.702L184.059,63.085c-6.328-6.328-6.328-16.588,0-22.916l-18.662,18.661 c-6.328,6.328-6.328,16.588,0,22.916l261.617,261.617c6.328,6.328,16.588,6.328,22.916,0l18.662-18.662 C462.265,331.03,452.005,331.03,445.678,324.702z"
                        ></path>{" "}
                        <path
                          fill="#FEA921"
                          d="M137.46,325.411l52.367,52.367c2.549,2.549,6.683,2.549,9.233,0l10.023-10.023 c2.549-2.55,2.549-6.683,0-9.233l-52.367-52.367c-2.549-2.549-6.683-2.549-9.233,0l-10.023,10.023 C134.911,318.728,134.911,322.862,137.46,325.411z"
                        ></path>{" "}
                        <path
                          fill="#E58200"
                          d="M209.082,358.523l-18.662-18.662c2.549,2.549,2.55,6.683,0,9.233l-10.023,10.023 c-2.55,2.55-6.683,2.55-9.233,0l18.662,18.662c2.549,2.549,6.683,2.55,9.233,0l10.023-10.023 C211.632,365.207,211.632,361.074,209.082,358.523z"
                        ></path>{" "}
                        <path
                          fill="#FEA921"
                          d="M143.498,331.448l40.293,40.293L60.226,507.537c-5.027,5.703-13.825,5.98-19.2,0.605L7.098,474.213 c-5.375-5.375-5.099-14.173,0.605-19.2L143.498,331.448z"
                        ></path>{" "}
                        <path
                          fill="#E58200"
                          d="M60.226,507.536l123.565-135.795l-18.662-18.662L41.564,488.875c-5.027,5.703-13.825,5.98-19.2,0.605 l18.662,18.662C46.402,513.516,55.199,513.24,60.226,507.536z"
                        ></path>{" "}
                        <polygon
                          fill="#FE8901"
                          points="131.703,342.18 173.059,383.536 183.791,371.742 143.498,331.448 "
                        ></polygon>{" "}
                        <polygon
                          fill="#E57501"
                          points="173.059,383.536 183.791,371.742 165.129,353.08 154.397,364.874 "
                        ></polygon>{" "}
                        <path
                          fill="#FF3E4C"
                          d="M466.791,299.329L466.791,299.329c-6.374,6.374-16.71,6.374-23.084,0L217.461,73.083 c-6.374-6.374-6.374-16.71,0-23.084l0,0c6.374-6.374,16.71-6.374,23.084,0l226.246,226.246 C473.167,282.62,473.167,292.955,466.791,299.329z"
                        ></path>{" "}
                      </g>
                    </svg>
                  )}
              </div>
            </div>
          </div>
          <Separator className="h-[80%] bg-slate-300" orientation="vertical" />
          <div className="flex flex-col gap-2 w-[30%] h-full py-2 px-2 justify-between">
            {data.serviceType === "Аренда" && (
              <>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className=" flex flex-row w-fit items-center gap-x-1  self-end ">
                      <span className=" text-slate-500 text-xs">
                        {data?.testimonials.length} отзывов
                      </span>
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
                      <span className="font-bold text-slate-900">
                        {overallRanking.overall.toFixed(1)}
                      </span>
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className=" max-w-full p-3 bg-slate-100">
                    <div className="grid grid-cols-1 gap-2">
                      {rating.map((el, index) => (
                        <div
                          className="grid grid-cols-2 gap-1 font-semibold text-xs"
                          key={index}
                        >
                          <p>{el.name}</p>
                          <div className="flex flex-row justify-between w-full items-center">
                            <div className="w-[144px]   ">
                              <div
                                style={{ width: `${el.rating * 10}%` }}
                                className="bg-blue-500 h-2 rounded-full"
                              ></div>
                            </div>

                            <span>{el.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </>
            )}

            <div className="flex flex-col self-end gap-2">
              {data.isChecked && (
                <div className="px-2 py-1 self-end text-blue-500  text-xs font-semibold rounded-full  text-center w-fit flex flex-row gap-x-1">
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
                {data.price.toLocaleString().replace(/,/g, " ")} ₸{" "}
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
