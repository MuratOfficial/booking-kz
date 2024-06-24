"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import TestimonialCard from "./testimonial-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUp, MessageCircle, Star, X } from "lucide-react";
import { Testimonial, User } from "@prisma/client";
import { Element } from "react-scroll";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewTestimonialForm } from "./new-testimonial-form";
import { NewCommentaryForm } from "./new-commentary-form";

interface AnnoncementTestimonials {
  testimonials: (Testimonial & { user: User })[] | [] | null;
  isUserValid: boolean | null;
  serviceType?: string | null;
}

function AnnoncementTestimonials({
  testimonials,
  isUserValid,
  serviceType,
}: AnnoncementTestimonials) {
  const [onClose, setOnClose] = React.useState(false);

  const handleChildClose = (type: boolean) => {
    setOnClose(type);
  };

  type RankingKeys = Exclude<keyof Testimonial["ranking"], "overall">;

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

  const overallRanking = calculateOverallRanking(testimonials || []);

  const rating = [
    { name: "Чистота", rating: overallRanking.ranking1 },
    { name: "Соответствие фото", rating: overallRanking.ranking2 },
    { name: "Расположение", rating: overallRanking.ranking3 },
    { name: "Качество обслуживания", rating: overallRanking.ranking4 },
    { name: "Состояние ремонта", rating: overallRanking.ranking5 },
    { name: "Инфраструктура", rating: overallRanking.ranking6 },
  ];

  return (
    <div className="w-full rounded-xl bg-white flex flex-col gap-2 text-slate-900 h-full px-4 pt-3 pb-6">
      <div className="flex md:flex-row xs:flex-col lg:flex-row gap-x-2 items-center justify-between">
        <Element name="testimonials">
          {serviceType === "Аренда" ? (
            <p className="font-semibold text-lg text-left w-fit">
              Отзывы и оценка гостей
            </p>
          ) : (
            <p className="font-semibold text-lg text-left w-fit">Комментарии</p>
          )}
        </Element>
        {serviceType === "Аренда" && (
          <span className=" flex flex-row w-fit items-center  gap-x-1 flex-wrap text-sm  pr-4">
            <span className=" text-slate-500 text-xs">
              {testimonials?.length !== 0 ? (
                <>
                  {testimonials?.length}{" "}
                  {testimonials?.length && testimonials?.length > 1
                    ? "отзывов"
                    : "отзыв"}
                </>
              ) : (
                "Нету отзывов"
              )}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 stroke-yellow-400 fill-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <span className="font-bold text-slate-900 text-lg">
              {overallRanking.overall.toFixed(1)}
            </span>
          </span>
        )}
      </div>
      {serviceType === "Аренда" && (
        <div className="lg:grid md:grid xs:flex flex-col grid-cols-2 gap-4 mt-4">
          {rating.map((el, index) => (
            <div
              className="grid grid-cols-2 gap-2 font-semibold text-sm"
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
      )}

      {serviceType === "Аренда" ? (
        <Separator className="my-4" />
      ) : (
        <Separator className="my-2" />
      )}

      <div className="flex flex-col gap-6 w-full">
        {testimonials && testimonials?.length > 0 ? (
          <>
            {testimonials?.slice(0, 3).map((el, ind) => (
              <TestimonialCard
                key={ind}
                cardData={el}
                serviceType={serviceType}
              />
            ))}
            {testimonials?.length > 3 && (
              <Collapsible className="w-full flex items-center flex-col">
                <CollapsibleContent className="w-full flex items-center flex-col gap-6">
                  {testimonials?.slice(3).map((el, ind) => (
                    <TestimonialCard
                      key={ind}
                      cardData={el}
                      serviceType={serviceType}
                    />
                  ))}
                </CollapsibleContent>
                <CollapsibleTrigger asChild>
                  <button className=" px-3 py-2 data-[state=open]:hidden rounded-xl hover:opacity-80 transition-all delay-75 duration-200 bg-slate-800 text-white font-semibold">
                    Показать все {testimonials?.length}{" "}
                    {serviceType === "Аренда" ? "отзыва" : "комментарии"}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleTrigger asChild>
                  <button className=" px-3 mt-2 py-2 rounded-xl data-[state=open]:flex data-[state=closed]:hidden hover:opacity-80 transition-all delay-75 duration-200 ">
                    <ChevronsUp />
                  </button>
                </CollapsibleTrigger>
              </Collapsible>
            )}
          </>
        ) : (
          <p className="w-full text-center text-sm font-medium text-slate-600">
            {serviceType === "Аренда" ? "Отзывов нету" : "Комментарии нету"}
          </p>
        )}
        {isUserValid && (
          <Dialog onOpenChange={setOnClose} open={onClose}>
            <DialogTrigger asChild>
              {serviceType === "Аренда" ? (
                <button className="flex w-fit font-semibold items-center flex-row gap-x-1 hover:bg-slate-500 bg-blue-500 rounded-lg px-2.5 py-1.5 self-center  text-white text-sm ">
                  <Star className="w-4" /> Поставьте оценку и оставьте отзыв{" "}
                  <MessageCircle className="w-4 " />
                </button>
              ) : (
                <button className="flex w-fit font-semibold items-center flex-row gap-x-1 hover:bg-slate-500 bg-blue-500 rounded-lg px-2.5 py-1.5 self-center  text-white text-sm ">
                  <MessageCircle className="w-4 " /> Напишите комментарий
                </button>
              )}
            </DialogTrigger>
            <DialogContent className="rounded-xl py-4">
              <DialogHeader className="font-bold text-xl text-slate-800">
                <DialogTitle>
                  {serviceType === "Аренда" ? "Оценка и отзыв" : "Комментарий"}
                </DialogTitle>
              </DialogHeader>
              {serviceType === "Аренда" ? (
                <NewTestimonialForm setOpen={handleChildClose} />
              ) : (
                <NewCommentaryForm setOpen={handleChildClose} />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default AnnoncementTestimonials;
