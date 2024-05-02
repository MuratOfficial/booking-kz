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

export const metadata: Metadata = {
  title: "Счет и Платежи",
};

const BillingPage = async () => {
  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;

  let userData;

  if (session?.user) {
    userData = await prismadb?.user?.findUnique({
      where: {
        id: userIdData?.id,
      },
    });
  } else {
    userData = null;
  }

  const refills = await fetchRefill();

  return (
    <div className="w-full grid grid-cols-4 gap-4 pb-4">
      <div className="w-full col-span-3 flex flex-col gap-2">
        <Points
          total={userData?.totalBalance || "0"}
          bonus={userData?.bonusBalance || "0"}
        />
        <PaymentHistory data={paymentHistory} />
      </div>
      <div className="w-full ">
        <PaymentBar refills={refills} />
      </div>
    </div>
  );
};

export default BillingPage;
