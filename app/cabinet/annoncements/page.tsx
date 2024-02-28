import React from "react";

import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мои обьявления",
  description: "booking.kz | booking.kz",
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

function AnnoncementsPage() {
  return (
    <div className="w-full justify-center items-center flex flex-col h-fit py-16 gap-y-6">
      <p className=" text-blue-700 text-3xl uppercase font-bold text-center mx-auto mb-8">
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
  );
}

export default AnnoncementsPage;
