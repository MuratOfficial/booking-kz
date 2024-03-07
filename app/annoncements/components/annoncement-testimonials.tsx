"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import TestimonialCard from "./testimonial-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUp } from "lucide-react";

function AnnoncementTestimonials() {
  const rating = [
    { name: "Чистота", rating: 9.8 },
    { name: "Соответствие фото", rating: 2.0 },
    { name: "Расположение", rating: 9.8 },
    { name: "Качество обслуживания", rating: 10.0 },
    { name: "Состояние ремонта", rating: 10.0 },
    { name: "Инфраструктура", rating: 10.0 },
  ];

  const exampleTestimonials = [
    {
      name: "User123",
      rating: 9.8,
      text: "Hello, world",
      date: "22.03.2024",
    },
    {
      name: "User123",
      rating: 9.8,
      text: "Hello, world",
      date: "22.03.2024",
    },
    {
      name: "User123",
      rating: 9.8,
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quam suscipit earum necessitatibus, saepe eos autem architecto, porrolabore ipsa quo est dolorem sapiente, ad error praesentium? Blanditiis, ex totam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo cupiditate vitae eius, voluptatem quo cum amet aliquid fugit quae.Corporis, totam provident dolore accusamus ipsa dolorem iste obcaecati modi aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicingelit. Quod ipsa hic quo sit reprehenderit perferendis harum iure odiocum veniam impedit, saepe repudiandae culpa ducimus reiciendis nesciunt fuga nobis illum. Et illo fuga ipsam tempore inventore harum excepturi reprehenderit magni atque explicabo ut assumenda, quos voluptatum optioenim eius ad nobis. Quod error consequatur, nihil deserunt atque ex quoearum. Vel et ratione dolore consequuntur sapiente temporibus. Odioanimi incidunt deleniti error quod, dolorem facilis atque, amet possimus commodi ea sapiente nobis omnis, asperiores perferendis ab sed sequiquas necessitatibus! Voluptatibus doloremque aspernatur dolorem commod voluptatem, quo vitae deserunt laboriosam omnis distinctio officiis facere corrupti, dolor aliquid voluptates recusandae est natus reprehenderit magni necessitatibus ea sed veritatis amet. Nisi, obcaecati? Nam voluptatum quam maiores aut obcaecati, odio perferendis porro enim non sint. Recusandae adipisci nesciunt consectetur exmollitia sint blanditiis, veritatis magni ut rem vero, quia at quasiomnis facilis.",
      date: "22.03.2024",
    },
    {
      name: "User123",
      rating: 9.8,
      text: "Hello, world",
      date: "22.03.2024",
    },
  ];

  return (
    <div className="w-full rounded-xl bg-white flex flex-col gap-2 text-slate-900 h-full px-4 pt-3 pb-6">
      <div className="flex flex-row gap-x-2 items-center justify-between">
        <p className="font-semibold text-lg text-left w-fit">
          Отзывы и оценка гостей
        </p>
        <span className=" flex flex-row w-fit items-center  gap-x-1 flex-wrap text-sm  pr-4">
          <span className=" text-slate-500 pr-2">68 отзывов</span>
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
          <span className="font-bold text-slate-900 text-lg">10.0</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
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

              <span>{el.rating}</span>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-6 w-full">
        {exampleTestimonials.slice(0, 3).map((el, ind) => (
          <TestimonialCard key={ind} cardData={el} />
        ))}
        <Collapsible className="w-full flex items-center flex-col">
          <CollapsibleContent className="w-full flex items-center flex-col gap-6">
            {exampleTestimonials.slice(3).map((el, ind) => (
              <TestimonialCard key={ind} cardData={el} />
            ))}
          </CollapsibleContent>
          <CollapsibleTrigger asChild>
            <button className=" px-3 py-2 data-[state=open]:hidden rounded-xl hover:opacity-80 transition-all delay-75 duration-200 bg-slate-800 text-white font-semibold">
              Показать все {exampleTestimonials.length} отзыва
            </button>
          </CollapsibleTrigger>
          <CollapsibleTrigger asChild>
            <button className=" px-3 mt-2 py-2 rounded-xl data-[state=open]:flex data-[state=closed]:hidden hover:opacity-80 transition-all delay-75 duration-200 ">
              <ChevronsUp />
            </button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    </div>
  );
}

export default AnnoncementTestimonials;
