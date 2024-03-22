import React from "react";

import Image from "next/image";
import { Metadata } from "next";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import MyAnnoncementCard from "./components/my-annoncement-card";

export const metadata: Metadata = {
  title: "Мои обьявления",
  description: "etazhi.kz | etazhi.kz",
};

export interface Annoncement {
  city: string;
  rating: string;
  isChecked: boolean;
  roomNumber: string;
  floor: string;
  floorFrom: string;
  areaSq: string;
  price: string;
  images: string[];
  phase: string;
  phone: string;
  createdAt: Date;
  id: string;
  categoryType: string;
  serviceType: string;
  serviceTypeExt: string;
  subscription: Date;
  modificators: {
    topModifier: number;
    hotModifier: number;
    hurryModifier: number;
  };
  companySubscription: string;
  stats: {
    allCount: number;
    allMobileCount: number;
    lastSevenCount: number;
    lastSevenCountMobile: number;
    todayCount: number;
    todayCountMobile: number;
    graphicData: {
      name: string;
      uv: number;
      pv: number;
    }[];
  };
}

const AnnoncementsPage = async () => {
  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;

  const annoncements = await prismadb.annoncement.findMany({
    where: {
      userId: userIdData?.id,
    },
    include: {
      testimonials: true,
    },
  });

  return (
    <div className="w-full">
      {annoncements ? (
        <div className=" flex flex-col gap-4">
          {annoncements.map((el, ind) => (
            <MyAnnoncementCard data={el} key={ind} />
          ))}
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
