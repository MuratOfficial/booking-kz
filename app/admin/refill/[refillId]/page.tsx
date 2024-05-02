import prismadb from "@/lib/prismadb";
import React from "react";
import AdminRefillForm from "./components/admin-refill-form";

const AdminRefillPage = async ({
  params,
}: {
  params: {
    refillId: string;
  };
}) => {
  let refill;

  if (params.refillId === "new") {
    refill = null;
  } else {
    refill = await prismadb.refill.findUnique({
      where: {
        id: params.refillId,
      },
    });
  }

  return (
    <div className="w-4/5 flex flex-col">
      <AdminRefillForm initialData={refill} />
    </div>
  );
};

export default AdminRefillPage;
