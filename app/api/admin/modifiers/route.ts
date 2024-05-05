import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { description, name, price } = body;

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    const modifier = await prismadb.modifierType.create({
      data: {
        modifierDesc: description,
        modifier: name,
        modifierPrice: price,
      },
    });

    return NextResponse.json(modifier);
  } catch (error) {
    console.log("[modifier_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
