"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Annoncement } from "@prisma/client";
import React from "react";

interface AnnoncementDescriptionProps {
  annoncement: Annoncement | null;
}

function AnnoncementDescription({ annoncement }: AnnoncementDescriptionProps) {
  const [openText, setOpenText] = React.useState(false);

  function handleClick(state: boolean) {
    if (state) {
      setOpenText(false);
    } else {
      setOpenText(true);
    }
  }

  return (
    <div className="w-full rounded-xl bg-white flex flex-col gap-2 text-slate-900 h-full px-4 py-3">
      <p className="font-semibold text-lg text-left w-fit">Описание обьекта</p>
      <Separator />
      <div className="lg:grid md:flex flex-row flex-wrap grid-cols-7 gap-2 text-sm">
        <p className="font-semibold col-span-2">
          Состояние ремонта:{" "}
          <span className="font-medium text-slate-900/70">
            {annoncement?.repairType || "Н/у"}
          </span>
        </p>
        <p className="font-semibold col-span-2">
          Высота потолков:{" "}
          <span className="font-medium text-slate-900/70">
            {annoncement?.roofHeight || "Н/у"}
          </span>
        </p>
        <p className="font-semibold col-span-1">
          Этаж:{" "}
          <span className="font-medium text-slate-900/70">{`${annoncement?.floor} из ${annoncement?.floorFrom}`}</span>
        </p>
        <p className="font-semibold col-span-2">
          Год строительства:{" "}
          <span className="font-medium text-slate-900/70">
            {annoncement?.yearBuild || "Н/у"}
          </span>
        </p>
      </div>
      <Separator />

      {annoncement?.description.length! > 1000 ? (
        <div className="w-full relative">
          <p
            className={cn(
              "text-justify text-sm font-normal max-h-40 line-clamp-[8]",
              openText && "max-h-fit line-clamp-none"
            )}
          >
            {annoncement?.description}
          </p>
          <button
            onClick={() => handleClick(openText)}
            className={cn(
              "absolute bottom-0 w-full bg-white bg-opacity-80 p-2 font-semibold text-sm text-blue-500",
              openText && "relative"
            )}
          >
            {openText ? "Скрыть текст" : "Показать полностью"}
          </button>
        </div>
      ) : (
        <p className="text-justify text-sm font-normal line-clamp-4">
          {annoncement?.description}
        </p>
      )}
    </div>
  );
}

export default AnnoncementDescription;
