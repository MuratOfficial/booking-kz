import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import AnnoncementPreviewCard from "@/components/cards/annoncement-preview-card";

function CabinetPage() {
  const annoncementCardData = ["1"];

  return (
    <div className="w-full grid grid-cols-5 gap-4">
      <div className="rounded-3xl h-fit bg-gradient-to-r from-blue-500 to-blue-400 col-span-1 p-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="items-center hover:text-blue-500 transition duration-300 font-semibold rounded-full hover:bg-neutral-100 text-center flex flex-row gap-x-1 justify-center text-neutral-100">
              Активные
            </AccordionTrigger>
            <AccordionContent>Empty.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="items-center hover:text-blue-500 transition duration-300 font-semibold rounded-full hover:bg-neutral-100 text-center flex flex-row gap-x-1 justify-center text-neutral-100">
              Архив
            </AccordionTrigger>
            <AccordionContent>Empty.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="items-center hover:text-blue-500 transition duration-300 font-semibold rounded-full hover:bg-neutral-100 text-center flex flex-row gap-x-1 justify-center text-neutral-100">
              У модератора
            </AccordionTrigger>
            <AccordionContent>Empty.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link
          href="/"
          className="font-semibold flex flex-row items-center justify-center gap-x-1 h-fit bg-blue-500 rounded-full text-neutral-50  transition delay-150 duration-500 p-2 hover:text-blue-500 hover:bg-neutral-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Обьявление
        </Link>
        <div
          className="w-full py-16 bg-no-repeat bg-center bg-contain my-2"
          style={{ backgroundImage: `url(/svg/svg1.svg)` }}
        ></div>
      </div>
      <div className="rounded-3xl aspect-square col-span-4   flex flex-col gap-4 w-full">
        {annoncementCardData ? (
          <AnnoncementPreviewCard />
        ) : (
          <div className="w-full justify-center items-center flex flex-col h-full gap-y-6">
            <p className=" text-blue-900 text-3xl uppercase font-bold text-center mx-auto mb-8">
              Выберите раздел в меню слева
            </p>
            <Image
              width={480}
              height={600}
              src="/svg/svg2.svg"
              alt="empty"
              className="max-w-[480px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CabinetPage;
