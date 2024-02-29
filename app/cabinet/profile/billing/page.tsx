import React from "react";
import Points from "./components/points";
import PaymentHistory from "./components/history";

function BillingPage() {
  return (
    <div className="w-full grid grid-cols-4 gap-4">
      <div className="w-full col-span-3 flex flex-col gap-2">
        <Points />
        <PaymentHistory />
      </div>
      <div className="w-full "></div>
    </div>
  );
}

export default BillingPage;
