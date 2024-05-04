import prismadb from "@/lib/prismadb";
import React from "react";
import AdminPaymentForm from "./components/admin-payment-form";

const AdminPaymentPage = async ({
  params,
}: {
  params: {
    paymentId: string;
  };
}) => {
  let payment;

  if (params.paymentId === "new") {
    payment = null;
  } else {
    payment = await prismadb.payment.findUnique({
      where: {
        id: params.paymentId,
      },
    });
  }

  const users = await prismadb.user.findMany({});
  const refills = await prismadb.refill.findMany({});
  const subs = await prismadb.subscription.findMany({});

  return (
    <div className="w-4/5 flex flex-col">
      <AdminPaymentForm
        initialData={payment}
        users={users}
        refills={refills}
        subscriptions={subs}
      />
    </div>
  );
};

export default AdminPaymentPage;
