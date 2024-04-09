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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CarouselWithThumbsProps {
  images?: {
    url: string;
  }[];
  isChecked: boolean;
}

function CarouselWithThumbs({ images, isChecked }: CarouselWithThumbsProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [apiThumb, setApiThumb] = React.useState<CarouselApi>();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({});

  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!api || !emblaThumbsApi || !apiThumb) return;
      api.scrollTo(index);
      emblaThumbsApi.scrollTo(index);
      apiThumb.scrollTo(index);
    },
    [api, emblaThumbsApi]
  );

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
    if (!api || !emblaThumbsApi || !apiThumb) return;
    api.scrollPrev();
    apiThumb.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (!api || !emblaThumbsApi || !apiThumb) return;
    api.scrollNext();
    apiThumb.scrollNext();
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
              <CldImage
                width="1400"
                height="1000"
                loading="lazy"
                className="object-contain rounded-xl aspect-[8/5] w-full cursor-zoom-in  "
                src={img.url}
                sizes="100vw"
                onClick={() => setDialogOpen(true)}
                overlays={[
                  {
                    position: {
                      x: 0,
                      y: 0,
                    },
                    text: {
                      color: "#f1f5f9",
                      fontFamily: "Source Sans Pro",
                      fontSize: 60,
                      fontWeight: "bold",
                      letterSpacing: 14,
                      text: "etazhi.kz",
                    },
                    effects: [
                      {
                        opacity: "40",
                      },
                    ],
                  },
                  {
                    position: {
                      x: 600,
                      y: 400,
                    },
                    text: {
                      color: "#f1f5f9",
                      fontFamily: "Source Sans Pro",
                      fontSize: 60,
                      fontWeight: "bold",
                      letterSpacing: 14,
                      text: "etazhi.kz",
                    },
                    effects: [
                      {
                        opacity: "60",
                      },
                    ],
                  },
                  {
                    position: {
                      x: -600,
                      y: -400,
                    },
                    text: {
                      color: "#f1f5f9",
                      fontFamily: "Source Sans Pro",
                      fontSize: 60,
                      fontWeight: "bold",
                      letterSpacing: 14,
                      text: "etazhi.kz",
                    },
                    effects: [
                      {
                        opacity: "40",
                      },
                    ],
                  },
                ]}
                alt={img.url}
                defaultImage="/default.png"
              />

              {/* <Image
                width={1400}
                height={1000}
                loading="lazy"
                className="  "
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
                src={img.url}
                sizes="100vw"
                alt={`img+${index}`}
              /> */}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* <Image
          width={1400}
          height={1000}
          loading="lazy"
          className="  "
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
          src={img.url}
          sizes="100vw"
          alt={`img+${index}`}
        /> */}

        {isChecked && (
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
                    Данная недвижимость проверена модератором и не является
                    фейком
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

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
      <Carousel
        className="w-full"
        ref={emblaThumbsRef}
        opts={{}}
        setApi={setApiThumb}
      >
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-screen flex flex-col gap-2 backdrop-blur-sm w-full max-w-[90%]  w-full rounded-xl bg-opacity-80">
          <Carousel
            setApi={setApi}
            className="w-full group aspect-[12/5]  relative rounded-xl items-center flex justify-center  "
          >
            <CarouselContent>
              {images?.map((img, index) => (
                <CarouselItem key={index}>
                  <CldImage
                    width="1400"
                    height="1000"
                    loading="lazy"
                    className="object-contain rounded-xl aspect-[12/5] w-full   "
                    src={img.url}
                    sizes="100vw"
                    overlays={[
                      {
                        position: {
                          x: 0,
                          y: 0,
                        },
                        text: {
                          color: "#f1f5f9",
                          fontFamily: "Source Sans Pro",
                          fontSize: 60,
                          fontWeight: "bold",
                          letterSpacing: 14,
                          text: "etazhi.kz",
                        },
                        effects: [
                          {
                            opacity: "40",
                          },
                        ],
                      },
                      {
                        position: {
                          x: 600,
                          y: 400,
                        },
                        text: {
                          color: "#f1f5f9",
                          fontFamily: "Source Sans Pro",
                          fontSize: 60,
                          fontWeight: "bold",
                          letterSpacing: 14,
                          text: "etazhi.kz",
                        },
                        effects: [
                          {
                            opacity: "60",
                          },
                        ],
                      },
                      {
                        position: {
                          x: -600,
                          y: -400,
                        },
                        text: {
                          color: "#f1f5f9",
                          fontFamily: "Source Sans Pro",
                          fontSize: 60,
                          fontWeight: "bold",
                          letterSpacing: 14,
                          text: "etazhi.kz",
                        },
                        effects: [
                          {
                            opacity: "40",
                          },
                        ],
                      },
                    ]}
                    alt={img.url}
                    defaultImage="/default.png"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

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
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CarouselWithThumbs;
