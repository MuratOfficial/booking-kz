import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
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
