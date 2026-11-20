import prismadb from "@/lib/prismadb";
import React from "react";
import AnnoncementForm from "../components/new-annoncement-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Metadata } from "next";

export async function generateMetadata(
  props: {
    params: Promise<{
      annoncementId: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
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

const AnnoncementPage = async (
  props: {
    params: Promise<{
      annoncementId: string;
    }>;
  }
) => {
  const params = await props.params;
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

  const cities = await prismadb.city.findMany({
    include: {
      buildings: true,
    },
  });

  return (
    <div className="w-full flex flex-col">
      <AnnoncementForm
        user={userData}
        initialData={annoncement}
        buildings={buildings}
        cities={cities}
      />
    </div>
  );
};

export default AnnoncementPage;
