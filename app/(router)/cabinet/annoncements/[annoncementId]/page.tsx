import prismadb from "@/lib/prismadb";
import React from "react";
import AnnoncementForm from "../components/new-annoncement-form";

const AnnoncementPage = async ({
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

  const buildings = await prismadb.building.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-4/5 flex flex-col">
      <AnnoncementForm initialData={annoncement} buildings={buildings} />
    </div>
  );
};

export default AnnoncementPage;
