import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import AnnoncementBoardCard from "./annoncement-board-card";
import { annoncements } from "@/lib/externalData";
import prismadb from "@/lib/prismadb";
import { Annoncement } from "@prisma/client";

interface AnnoncementBoardProps {
  annoncementBoardCards: Annoncement[] | null;
}

function AnnoncementsBoard({ annoncementBoardCards }: AnnoncementBoardProps) {
  return (
    <div className="col-span-2 h-full flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center text-slate-600">
        <p className="text-xl font-semibold ml-4">Последние обьявления</p>
        <button className=" w-6 hover:text-blue-500 transition delay-75 duration-200 hover:translate-x-1 ">
          <ArrowRightCircle />{" "}
        </button>
      </div>

      <div className="w-full h-full  bg-white rounded-xl p-4 flex flex-col gap-2">
        {annoncementBoardCards?.map((el, ind) => (
          <AnnoncementBoardCard card={el} key={ind} />
        ))}
      </div>
    </div>
  );
}

export default AnnoncementsBoard;
