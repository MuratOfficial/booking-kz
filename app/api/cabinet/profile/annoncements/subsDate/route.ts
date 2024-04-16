import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id } = body;

    if (!id) {
      return new NextResponse("id is required", { status: 400 });
    }

    let add30days: Date = new Date();
    add30days.setDate(add30days.getDate() + 30);

    const annoncement = await prismadb.annoncement.update({
      where: {
        id: id,
      },
      data: {
        subscriptionDate: add30days,
      },
    });

    return NextResponse.json(annoncement);
  } catch (error) {
    console.log("[ANNONCEMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
