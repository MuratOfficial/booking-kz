import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAdmin } from "@/lib/auth-guard";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await req.json();

    const { title, total, bonus, bonusPerc } = body;

    if (!total) {
      return new NextResponse("total is required", { status: 400 });
    }

    const refill = await prismadb.refill.create({
      data: {
        title,
        total,
        bonus,
        bonusPerc,
      },
    });

    return NextResponse.json(refill);
  } catch (error) {
    console.log("[refill_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
