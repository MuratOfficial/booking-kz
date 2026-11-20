import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAdmin } from "@/lib/auth-guard";

export async function DELETE(req: Request, props: { params: Promise<{ refillId: string }> }) {
  const params = await props.params;
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

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

export async function PATCH(req: Request, props: { params: Promise<{ refillId: string }> }) {
  const params = await props.params;
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

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
