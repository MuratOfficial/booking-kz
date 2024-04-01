"use client";
import Link from "next/link";
import React from "react";
import AnnoncementCard from "../cards/annoncement-cart";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { cn } from "@/lib/utils";
import { Annoncement, Testimonial } from "@prisma/client";

interface HotCategoryGridProps {
  title: string;
  data: (Annoncement & { testimonials: Testimonial[] } & {
    isFavorite?: boolean;
  })[];
  link?: string;
}

function HotCategoryGrid({ title, data, link }: HotCategoryGridProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  const [statePrev, setStatePrev] = React.useState(false);
  const [stateNext, setStateNext] = React.useState(true);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setStatePrev(api.canScrollPrev());

      setStateNext(api.canScrollNext());
    });
  }, [api]);

  const scrollPrev = React.useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);
  return (
    <Carousel
      setApi={setApi}
      className="flex flex-col gap-2 py-2"
      opts={{
        duration: 50,
      }}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <Link
          href={link || ""}
          className="font-bold text-slate-900 uppercase text-base"
        >
          {title}
        </Link>
        <div className=" w-fit flex flex-row gap-x-2">
          <button
            className={cn(
              " rounded-full transition-all delay-100 duration-300 hover:bg-blue-500 hover:text-neutral-100 text-slate-900 transition delay-100 duration-300  bg-slate-200 bg-opacity-70  p-2 items-center flex ",
              !statePrev &&
                " text-slate-500 hover:bg-slate-200 hover:text-slate-500"
            )}
            onClick={scrollPrev}
            disabled={!statePrev}
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
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <button
            className={cn(
              " rounded-full transition-all delay-100 duration-300 hover:bg-blue-500 hover:text-neutral-100 text-slate-900 transition delay-100 duration-300  bg-slate-200 bg-opacity-70  p-2 items-center flex ",
              !stateNext &&
                " text-slate-500 hover:bg-slate-200 hover:text-slate-500"
            )}
            onClick={scrollNext}
            disabled={!stateNext}
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
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <CarouselContent>
        <CarouselItem key={1}>
          <div className="w-full grid grid-cols-8 gap-3">
            {data?.slice(0, 16)?.map((item, ind) => (
              <AnnoncementCard key={ind} data={item} />
            ))}
          </div>
        </CarouselItem>
        {data?.length > 16 && (
          <CarouselItem key={2}>
            <div className="w-full grid grid-cols-8 gap-3">
              {data?.slice(16, 32)?.map((item, ind) => (
                <AnnoncementCard key={ind} data={item} />
              ))}
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  );
}

export default HotCategoryGrid;
