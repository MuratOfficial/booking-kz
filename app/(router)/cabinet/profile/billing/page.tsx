import React from "react";
import Points from "./components/points";
import PaymentHistory from "./components/history";
import { paymentHistory } from "@/lib/externalData";
import PaymentBar from "./components/payment-bar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Счет и Платежи",
};

function BillingPage() {
  return (
    <div className="w-full grid grid-cols-4 gap-4 pb-4">
      <div className="w-full col-span-3 flex flex-col gap-2">
        <Points />
        <PaymentHistory data={paymentHistory} />
      </div>
      <div className="w-full ">
        <PaymentBar />
      </div>
    </div>
  );
}

export default BillingPage;
