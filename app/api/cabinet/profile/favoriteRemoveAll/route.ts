import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireUser } from "@/lib/auth-guard";

export async function PATCH() {
  try {
    const { user, error } = await requireUser();
    if (error) return error;

    await prismadb.user.update({
      where: {
        id: user.id,
      },
      data: {
        favourites: [],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
