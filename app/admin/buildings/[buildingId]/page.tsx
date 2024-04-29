import prismadb from "@/lib/prismadb";
import React from "react";
import AdminSubscriptionForm from "./components/admin-subscription-form";

const AdminSubsPage = async ({
  params,
}: {
  params: {
    subscriptionId: string;
  };
}) => {
  let subscription;

  if (params.subscriptionId === "new") {
    subscription = null;
  } else {
    subscription = await prismadb.subscription.findUnique({
      where: {
        id: params.subscriptionId,
      },
    });
  }

  return (
    <div className="w-4/5 flex flex-col">
      <AdminSubscriptionForm initialData={subscription} />
    </div>
  );
};

export default AdminSubsPage;
