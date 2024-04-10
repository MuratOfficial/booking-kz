import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { description, name, price, icon, color, days } = body;

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    const subscription = await prismadb.subscription.create({
      data: {
        description,
        name,
        price,
        icon,
        color,
        days,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[subscription_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
