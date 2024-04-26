import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { fetchUserData } from "@/lib/fetchUserData";

export async function PATCH(
  req: Request,
  { params }: { params: { annoncementId: string } }
) {
  const user = await fetchUserData();
  try {
    const body = await req.json();

    // const session = await getServerSession(authOptions);
    // const annoncementIdData = JSON.parse(JSON.stringify(session));

    // const admin = await prismadb.user.findUnique({
    //   where: {
    //     id: annoncementIdData?.user?.id,
    //   },
    // });

    // if (admin?.isAdmin === false) {
    //   return new NextResponse("Access denied", { status: 401 });
    // }

    const {} = body;

    if (!params.annoncementId) {
      return new NextResponse("user id is required", { status: 400 });
    }

    if (user) {
      const favorites = user?.favourites;

      const isFavorite = favorites?.find(
        (el) => el.annoncementId === params.annoncementId
      )
        ? true
        : false;

      const userFavorites = isFavorite
        ? favorites?.filter((el) => el.annoncementId !== params.annoncementId)
        : favorites?.concat([
            {
              annoncementId: params.annoncementId,
              text: "",
            },
          ]);

      const userUpdate = await prismadb.user.update({
        where: {
          id: user.id,
        },
        data: {
          favourites: userFavorites,
        },
      });

      return NextResponse.json(userUpdate);
    } else {
      return new NextResponse("USER_AUTH_ERROR", { status: 500 });
    }
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("USER_AUTH_ERROR", { status: 500 });
  }
}
