import prismadb from "@/lib/prismadb";
import React from "react";
import AdminAnnoncementForm from "./components/admin-annoncement-form";

const AdminAnnoncementPage = async ({
  params,
}: {
  params: {
    annoncementId: string;
  };
}) => {
  let annoncement;

  if (params.annoncementId === "new") {
    annoncement = null;
  } else {
    annoncement = await prismadb.annoncement.findUnique({
      where: {
        id: params.annoncementId,
      },
    });
  }

  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const buildings = await prismadb.building.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-4/5 flex flex-col">
      <AdminAnnoncementForm
        initialData={annoncement}
        users={users}
        buildings={buildings}
      />
    </div>
  );
};

export default AdminAnnoncementPage;
