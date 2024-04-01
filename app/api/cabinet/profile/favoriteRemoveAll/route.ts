import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const userIdData = JSON.parse(JSON.stringify(session))?.user;
    const userId: string = userIdData?.id;

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

    if (!userId) {
      return new NextResponse("user id is required", { status: 400 });
    }

    const userUpdate = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        favourites: [],
      },
    });

    return NextResponse.json(userUpdate);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
