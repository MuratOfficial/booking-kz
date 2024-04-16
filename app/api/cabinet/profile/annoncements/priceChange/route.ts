import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, price } = body;

    if (!id) {
      return new NextResponse("id is required", { status: 400 });
    }

    const annoncement = await prismadb.annoncement.update({
      where: {
        id: id,
      },
      data: {
        price,
      },
    });

    return NextResponse.json(annoncement);
  } catch (error) {
    console.log("[ANNONCEMENT_PRICE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
