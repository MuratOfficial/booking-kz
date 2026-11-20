import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAnnoncementOwner } from "@/lib/auth-guard";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id } = body ?? {};

    const { annoncement, error } = await requireAnnoncementOwner(id);
    if (error) return error;

    let add30days: Date = new Date();
    add30days.setDate(add30days.getDate() + 30);

    const updated = await prismadb.annoncement.update({
      where: {
        id: annoncement.id,
      },
      data: {
        subscriptionDate: add30days,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.log("[ANNONCEMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
