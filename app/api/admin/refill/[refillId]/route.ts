import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { refillId: string } }
) {
  try {
    const refill = await prismadb.refill.delete({
      where: {
        id: params.refillId,
      },
    });

    return NextResponse.json(refill);
  } catch (error) {
    console.log("[refill_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { refillId: string } }
) {
  try {
    const body = await req.json();

    const { title, total, bonus, bonusPerc } = body;

    if (!params.refillId) {
      return new NextResponse("refill id is required", { status: 400 });
    }

    const refill = await prismadb.refill.update({
      where: {
        id: params.refillId,
      },
      data: {
        title,
        total,
        bonus,
        bonusPerc,
      },
    });

    return NextResponse.json(refill);
  } catch (error) {
    console.log("[refill_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
