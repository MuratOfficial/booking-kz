"use client";
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Annoncement, Testimonial } from "@prisma/client";

interface AnnoncementCardProps {
  data: Annoncement & { testimonials: Testimonial[] };
}

function AnnoncementCard({ data }: AnnoncementCardProps) {
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

  const overallRanking = calculateOverallRanking(data!.testimonials);

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

  return (
    <div>
      <div>
        {data ? (
          <Carousel
            setApi={setApi}
            className="w-full group aspect-[5/4] relative rounded-xl items-center flex justify-center  "
          >
            <CarouselContent>
              {data?.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={img.url}
                    alt={`img+${index}`}
                    width={240}
                    height={320}
                    className=" object-cover rounded-xl  aspect-[5/4] cursor-pointer "
                    onClick={() => router.push(`/annoncements/${data.id}`)}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <Link
              href="/"
              className="absolute z-20 flex flex-row gap-x-0.5  font-semibold left-2 bottom-2 text-xs items-center rounded-full group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  py-0.5 px-1.5 items-center flex text-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              Перейти
            </Link> */}
            <button
              className="absolute left-2 opacity-70 hover:opacity-100 hover:bg-opacity-100 rounded-full group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent"
              onClick={scrollPrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="absolute right-2 opacity-70 hover:opacity-100 hover:bg-opacity-100 rounded-full group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent"
              onClick={scrollNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <button className="p-1 rounded-full bg-slate-200  bg-opacity-50 absolute top-2 right-2 transition delay-100 duration-300 hover:bg-opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 hover:fill-red-600 stroke-red-600 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
            {data.serviceType === "Аренда" && (
              <span className="py-0.5 px-1 group-hover:text-transparent  group-hover:bg-transparent flex flex-row items-center gap-x-0.5 rounded-full bg-slate-200  bg-opacity-50 absolute top-2 left-2 transition delay-100 duration-300 hover:bg-opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-yellow-500 fill-yellow-500 group-hover:fill-transparent group-hover:stroke-transparent transition delay-100 duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <span className="font-bold text-slate-900 group-hover:text-transparent   text-xs transition delay-100 duration-300">
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
                  className="w-3 h-3 stroke-neutral-100 group-hover:stroke-transparent transition delay-100 duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="font-semibold text-neutral-100 text-[8px] group-hover:text-transparent transition delay-100 duration-300">
                  Проверено
                </span>
              </span>
            )}

            <span className="absolute text-xs bottom-2 right-2 py-0.5 px-1.5 rounded-lg group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent">
              {current}/{count}
            </span>
            <div className="absolute flex flex-col justify-between bottom-0 w-full py-1 px-2 text-slate-900 group-hover:text-transparent  group-hover:bg-transparent transition delay-150 duration-500 h-[45%] bg-slate-200 bg-opacity-90 rounded-b-xl">
              <div className="text-slate-600 leading-tight group-hover:text-transparent transition delay-150 duration-500">
                <p className=" text-[11px] line-clamp-1 font-medium ">
                  {data?.roomNumber > 0 && `${data?.roomNumber}-комнат.`}{" "}
                  {data?.roomNumber > 0
                    ? data?.categoryType.toLowerCase()
                    : data?.categoryType}
                </p>
                <p className="relative line-clamp-1 text-[11px] font-medium">
                  {data?.cityOrDistrict}{" "}
                  {data?.cityOrTown && `, ${data.cityOrTown}`}{" "}
                  {data?.townOrStreet && `, ${data.townOrStreet}`}
                  {/* этаж {data.floor} из {data.floorFrom},{" "}
                  <span>{data.areaSq} м²</span> */}
                </p>
              </div>
              <div className="flex flex-row justify-between ">
                <p className=" font-extrabold text-sm leading-4">
                  {data.price.toLocaleString().replace(/,/g, " ")} ₸
                </p>
              </div>
            </div>
          </Carousel>
        ) : (
          <Skeleton className="h-[260px] rounded-xl w-[220px] bg-slate-50" />
        )}
      </div>
    </div>
  );
}

export default AnnoncementCard;
