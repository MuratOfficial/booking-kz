"use client";
import Link from "next/link";
import React from "react";
import AnnoncementCard from "../cards/annoncement-cart";
import { cn } from "@/lib/utils";
import { Annoncement, Testimonial } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";

interface HotCategoryGridProps {
  title: string;
  data: (Annoncement & { testimonials: Testimonial[] } & {
    isFavorite?: boolean;
  })[];
  link?: string;
}

function HotCategoryGrid({ title, data, link }: HotCategoryGridProps) {
  const [annoncements, setAnnoncements] = React.useState<
    (Annoncement & { testimonials: Testimonial[] } & {
      isFavorite?: boolean;
    })[]
  >([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  let myArray = new Array(16);

  for (let i = 0; i < myArray.length; i++) {
    myArray[i] = i + 1; // Just using consecutive numbers for demonstration
  }

  React.useEffect(() => {
    setIsLoaded(true);
    setAnnoncements(data);
  }, []);

  const [startIndex, setStartIndex] = React.useState(0);

  const nextItem = (num: number) => {
    if (startIndex < annoncements.length - num) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevItem = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-2 ">
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
              startIndex === 0 &&
                " text-slate-500 hover:bg-slate-200 hover:text-slate-500"
            )}
            onClick={prevItem}
            disabled={startIndex === 0}
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
              startIndex === annoncements.length - 16 &&
                " text-slate-500 hover:bg-slate-200 hover:text-slate-500"
            )}
            onClick={() => nextItem(16)}
            disabled={startIndex === annoncements.length - 16}
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
      {isLoaded ? (
        <div className="w-full grid lg:grid-cols-8 md:grid-cols-4 xs:grid-cols-2 gap-2 ">
          {annoncements &&
            annoncements.length > 0 &&
            annoncements
              .slice(startIndex, startIndex + 16)
              .map((item, index) => (
                <AnnoncementCard data={item} key={startIndex + index} />
              ))}
        </div>
      ) : (
        <div className="w-full grid lg:grid-cols-8 md:grid-cols-4 xs:grid-cols-2 gap-2 ">
          {myArray.map((el, ind) => (
            <Skeleton
              className="rounded-xl aspect-[5/4] bg-slate-200"
              key={ind}
            />
          ))}
        </div>
      )}

      {/* <div className="w-full grid grid-cols-8 gap-2">
        {data &&
          data.length > 0 &&
          data
            .slice(startIndex, startIndex + 8)
            .map((item, index) => (
              <AnnoncementCard data={item} key={startIndex + index} />
            ))}
      </div> */}
    </div>
  );
}

export default HotCategoryGrid;
