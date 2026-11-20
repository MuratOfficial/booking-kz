import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAnnoncementOwner } from "@/lib/auth-guard";

// Owners may only archive an active listing or re-activate an archived one
// that has already passed moderation. Moving out of "проверка" (moderation)
// is reserved for admins via /api/admin/annoncements.
export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, phase } = body ?? {};

    const { annoncement, error } = await requireAnnoncementOwner(id);
    if (error) return error;

    const allowed =
      (annoncement.phase === "активно" && phase === "блокировано") ||
      (annoncement.phase === "блокировано" &&
        phase === "активно" &&
        annoncement.isChecked === true);

    if (!allowed) {
      return new NextResponse("Phase change not allowed", { status: 403 });
    }

    const updated = await prismadb.annoncement.update({
      where: {
        id: annoncement.id,
      },
      data: {
        phase,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.log("[ANNONCEMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
