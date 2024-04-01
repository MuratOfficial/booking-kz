"use client";
import React from "react";

import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CldImage } from "next-cloudinary";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

const images = [
  "/random/1.jpg",
  "/random/2.jpg",
  "/random/3.jpg",
  "/random/4.jpg",
  "/random/5.jpg",
  "/random/6.jpg",
  "/random/4.jpg",
  "/random/5.jpg",
  "/random/6.jpg",
  "/random/5.jpg",
  "/random/6.jpg",
];

interface CarouselWithThumbsProps {
  images?: {
    url: string;
  }[];
  isChecked: boolean;
}

function CarouselWithThumbs({ images, isChecked }: CarouselWithThumbsProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!api || !emblaThumbsApi) return;
      api.scrollTo(index);
    },
    [api, emblaThumbsApi]
  );

  const [fetched, setFetched] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!api || !emblaThumbsApi) return;
    setCurrent(api.selectedScrollSnap());
    emblaThumbsApi.scrollTo(api.selectedScrollSnap());
  }, [api, emblaThumbsApi, setCurrent]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    onSelect();
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, onSelect]);

  const scrollPrev = React.useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Carousel
        setApi={setApi}
        className="w-full group aspect-[8/5] w-full relative rounded-xl items-center flex justify-center  bg-white"
      >
        <CarouselContent>
          {images?.map((img, index) => (
            <CarouselItem key={index}>
              {fetched ? (
                <CldImage
                  width={1400}
                  height={1000}
                  priority
                  className=" object-cover rounded-xl aspect-[8/5] w-full  cursor-pointer "
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
                  src="https://res.cloudinary.com/dhof3tglo/image/upload/v1710220609/vckqkhnl4s6ol8otyq4b.jpg"
                  sizes="100vw"
                  overlays={[
                    {
                      position: {
                        x: "80%",
                        y: "80%",
                      },
                      text: {
                        color: "slate",
                        fontFamily: "Source Sans Pro",
                        fontSize: 80,
                        fontWeight: "black",
                        text: "etazhi.kz",
                      },
                    },
                  ]}
                  alt={`img+${index}`}
                />
              ) : (
                <div className="relative">
                  <Image
                    src={img.url}
                    alt={`img+${index}`}
                    width={1400}
                    height={1000}
                    priority
                    className=" object-cover rounded-xl aspect-[8/5] w-full  cursor-pointer "
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
                  />
                  <p className="font-bold text-3xl opacity-60 right-2 bottom-2 absolute">
                    etazhi.kz
                  </p>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="px-2 py-1 absolute left-4 top-4 self-end text-neutral-50   bg-sky-500 text-xs font-semibold rounded-full  text-center w-fit flex flex-row gap-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4 stroke-neutral-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <p className="cursor-help">Проверено</p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-60 text-xs">
                  Данная недвижимость проверена модератором и не является фейком
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <button
          className="absolute left-2 opacity-60 hover:opacity-100 hover:bg-opacity-100 rounded-full text-slate-900 transition delay-100 duration-300  bg-slate-50 bg-opacity-70  p-2 items-center flex "
          onClick={scrollPrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
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
          className="absolute right-2 opacity-60 hover:opacity-100 hover:bg-opacity-100 rounded-full text-slate-900 transition delay-100 duration-300  bg-slate-50 bg-opacity-70  p-2 items-center flex "
          onClick={scrollNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
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

        <span className="absolute text-sm bottom-2 right-2 py-1 px-2 rounded-lg text-slate-900 transition delay-100 duration-300  bg-slate-200 bg-opacity-60  p-1 items-center flex ">
          {current === 0 ? 1 : current}/{count}
        </span>
      </Carousel>
      <Carousel className="w-full" ref={emblaThumbsRef}>
        <CarouselContent className="w-full -ml-2">
          {images?.map((thumb, index) => (
            <CarouselItem key={index} className=" basis-[12%] pl-2">
              <Image
                src={thumb.url}
                alt={`img+${index}`}
                width={200}
                height={140}
                onClick={() => onThumbClick(index)}
                className={cn(
                  " object-cover rounded-md aspect-[8/5] w-full  cursor-pointer border-2 border-transparent",

                  current === index + 1 && "border-blue-500"
                )}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default CarouselWithThumbs;
