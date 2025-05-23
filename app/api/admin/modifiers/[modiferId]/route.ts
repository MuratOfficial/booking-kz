import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { modiferId: string } }
) {
  try {
    const modifier = await prismadb.modifierType.delete({
      where: {
        id: params.modiferId,
      },
    });

    return NextResponse.json(modifier);
  } catch (error) {
    console.log("[modifier_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { modiferId: string } }
) {
  try {
    const body = await req.json();

    const { description, name, price, day1, day2, day3, price2, price3 } = body;

    if (!params.modiferId) {
      return new NextResponse("modifier id is required", { status: 400 });
    }

    const modifier = await prismadb.modifierType.update({
      where: {
        id: params.modiferId,
      },
      data: {
        modifierDesc: description,
        modifier: name,
        modifierPrice: price,
        modifierDays: day1,
        modifierDays2: day2,
        modifierDays3: day3,
        modifierPrice2: price2,
        modifierPrice3: price3,
      },
    });

    return NextResponse.json(modifier);
  } catch (error) {
    console.log("[modifier_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
