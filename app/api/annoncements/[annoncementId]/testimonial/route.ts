import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { annoncementId: string } }
) {
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

    const { comment, ranking } = body;

    if (!params.annoncementId) {
      return new NextResponse("user id is required", { status: 400 });
    }

    const testimonial = await prismadb.testimonial.create({
      data: {
        userId: userId,
        annoncementId: params.annoncementId,
        ranking,
        comment,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
