import React from "react";

import Image from "next/image";
import { Metadata } from "next";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import MyAnnoncementCard from "./components/my-annoncement-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const metadata: Metadata = {
  title: "Мои обьявления",
  description: "etazhi.kz | etazhi.kz",
};

const AnnoncementsPage = async ({
  searchParams,
}: {
  searchParams?: {
    serviceType?: string;
    phase?: string;
  };
}) => {
  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;

  const annoncements = await prismadb.annoncement.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: userIdData?.id,
      serviceType: searchParams?.serviceType,
      phase: searchParams?.phase,
    },
    include: {
      testimonials: true,
    },
  });

  return (
    <div className="w-full">
      {annoncements.length > 0 ? (
        <div className=" flex flex-col gap-8">
          {annoncements.slice(0, 3).map((el, ind) => (
            <MyAnnoncementCard data={el} key={ind} />
          ))}
          {annoncements.length > 3 && (
            <Collapsible className="">
              <CollapsibleContent className="flex flex-col gap-8">
                {annoncements.slice(3).map((el, ind) => (
                  <MyAnnoncementCard data={el} key={ind} />
                ))}
              </CollapsibleContent>
              <CollapsibleTrigger asChild>
                <button className=" px-3 py-2 data-[state=open]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                  Показать все {annoncements.length} обьявления
                </button>
              </CollapsibleTrigger>
              <CollapsibleTrigger asChild>
                <button className=" px-3 mt-4 py-2 data-[state=closed]:hidden rounded-xl  transition-all delay-75 duration-200 w-full border text-slate-400 hover:text-slate-800 hover:border-slate-700 font-semibold">
                  Скрыть
                </button>
              </CollapsibleTrigger>
            </Collapsible>
          )}
        </div>
      ) : (
        <div className="w-full justify-center items-center flex flex-col h-fit py-16 gap-y-6">
          <p className=" text-slate-700 text-xl uppercase font-bold text-center mx-auto mb-8">
            Обьявлении нету
          </p>
          <Image
            width={480}
            height={600}
            src="/svg/svg2.svg"
            alt="empty"
            className="max-w-[420px]"
          />
        </div>
      )}
    </div>
  );
};

export default AnnoncementsPage;
