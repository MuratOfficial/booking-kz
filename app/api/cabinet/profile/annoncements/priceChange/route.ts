import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAnnoncementOwner } from "@/lib/auth-guard";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, price } = body ?? {};

    const { annoncement, error } = await requireAnnoncementOwner(id);
    if (error) return error;

    const numericPrice = Number(price);
    if (!Number.isInteger(numericPrice) || numericPrice < 0) {
      return new NextResponse("Invalid price", { status: 400 });
    }

    const updated = await prismadb.annoncement.update({
      where: {
        id: annoncement.id,
      },
      data: {
        price: numericPrice,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.log("[ANNONCEMENT_PRICE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
