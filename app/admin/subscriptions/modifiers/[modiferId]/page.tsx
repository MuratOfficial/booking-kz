import prismadb from "@/lib/prismadb";
import React from "react";
import AdminmodifierForm from "./components/admin-modifier-form";

const AdminModifierPage = async ({
  params,
}: {
  params: {
    modiferId: string;
  };
}) => {
  let modifier;

  if (params.modiferId === "new") {
    modifier = null;
  } else {
    modifier = await prismadb.modifierType.findUnique({
      where: {
        id: params.modiferId,
      },
    });
  }

  return (
    <div className="w-4/5 flex flex-col">
      <AdminmodifierForm initialData={modifier} />
    </div>
  );
};

export default AdminModifierPage;
