import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { description, name, price, day1, day2, day3, price2, price3 } = body;

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    const modifier = await prismadb.modifierType.create({
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
    console.log("[modifier_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
