import prismadb from "@/lib/prismadb";
import React from "react";
import AnnoncementForm from "../components/new-annoncement-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

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

  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;

  let userData;

  if (session?.user) {
    userData = await prismadb?.user?.findUnique({
      where: {
        id: userIdData?.id,
      },
    });
    console.log(userData);
  } else {
    userData = null;
  }

  const buildings = await prismadb.building.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-4/5 flex flex-col">
      <AnnoncementForm
        initialData={annoncement}
        user={userData}
        buildings={buildings}
      />
    </div>
  );
};

export default AnnoncementPage;
