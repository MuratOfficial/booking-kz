import React from "react";
import Points from "./components/points";
import PaymentHistory from "./components/history";
import { paymentHistory } from "@/lib/externalData";
import PaymentBar from "./components/payment-bar";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prismadb from "@/lib/prismadb";
import { fetchRefill } from "@/lib/fetchRefill";
import { fetchUserData } from "@/lib/fetchUserData";

export const metadata: Metadata = {
  title: "Счет и Платежи",
};

const BillingPage = async () => {
  const userData = await fetchUserData();

  const refills = await fetchRefill();

  return (
    <>
      <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4 ">
        <div className="w-full lg:col-span-3 md:col-span-2 flex flex-col gap-2">
          <Points
            total={userData?.totalBalance || "0"}
            bonus={userData?.bonusBalance || "0"}
          />
          <PaymentHistory data={userData?.payments} />
        </div>
        <div className="min-h-screen">
          <div className=" sticky top-[12%]">
            <PaymentBar
              refills={refills}
              userId={userData?.id}
              phone={userData?.phone}
              email={userData?.email}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingPage;
