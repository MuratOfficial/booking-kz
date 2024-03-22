import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function PATCH(req: Request) {
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

    const { id, phase } = body;

    if (!id) {
      return new NextResponse("user id is required", { status: 400 });
    }

    const annoncement = await prismadb.annoncement.update({
      where: {
        id: id,
      },
      data: {
        phase,
      },
    });

    return NextResponse.json(annoncement);
  } catch (error) {
    console.log("[ANNONCEMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
