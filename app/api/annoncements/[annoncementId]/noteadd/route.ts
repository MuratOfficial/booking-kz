import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireUser } from "@/lib/auth-guard";

export async function PATCH(req: Request, props: { params: Promise<{ annoncementId: string }> }) {
  const params = await props.params;
  try {
    const { user, error } = await requireUser();
    if (error) return error;

    const body = await req.json().catch(() => ({}));
    const { note } = body ?? {};

    if (!params.annoncementId) {
      return new NextResponse("annoncement id is required", { status: 400 });
    }

    await prismadb.user.update({
      where: {
        id: user.id,
      },
      data: {
        favourites: {
          updateMany: {
            where: {
              annoncementId: params.annoncementId,
            },
            data: {
              text: typeof note === "string" ? note.slice(0, 1000) : "",
            },
          },
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
