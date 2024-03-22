import prismadb from "@/lib/prismadb";
import React from "react";
import AnnoncementForm from "../components/new-annoncement-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: {
    annoncementId: string;
  };
}): Promise<Metadata> {
  // read route params
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

  return {
    title: annoncement ? `Обьявление ID ${annoncement.id}` : "Новое обьявление",
  };
}

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

  return (
    <div className="w-full flex flex-col">
      <AnnoncementForm
        user={userData}
        initialData={annoncement}
        buildings={buildings}
      />
    </div>
  );
};

export default AnnoncementPage;
