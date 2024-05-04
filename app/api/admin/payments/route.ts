import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
      sum,
      bonus,
      status,
      annoncementId,
      paymentUrl,
      transactionId,
      transactionType,
    } = body;

    if (!userId) {
      return new NextResponse("userId is required", { status: 400 });
    }

    const payment = await prismadb.payment.create({
      data: {
        userId,
        sum,
        bonus,
        status,
        annoncementId,
        paymentUrl,
        transactionId,
        transactionType,
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.log("[payment_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
