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

    const { comment, ranking } = body;

    if (!params.annoncementId) {
      return new NextResponse("annoncement id is required", { status: 400 });
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
    console.log("[COMMENTARY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
